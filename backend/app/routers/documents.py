from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import models, schemas, database, auth
from ..utils.doc_gen import generate_document
from typing import List
import os
from fastapi.responses import FileResponse

router = APIRouter(prefix="/documents", tags=["documents"])

@router.post("/generate/{doc_type}")
def create_doc(
    doc_type: str, 
    form_data: dict, # Using dict here to accommodate different form schemas
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    if doc_type not in ["circular", "proposal", "report"]:
        raise HTTPException(status_code=400, detail="Invalid document type")

    try:
        file_name, file_path, ref_num = generate_document(doc_type, form_data)
        
        # Save to DB
        new_doc = models.Document(
            user_id=current_user.id,
            document_type=doc_type,
            reference_number=ref_num,
            file_path=file_path,
            title=form_data.get("title", form_data.get("proposal_title", form_data.get("event_name", "Untitled")))
        )
        db.add(new_doc)
        db.commit()
        db.refresh(new_doc)
        
        return {
            "message": "Document generated successfully",
            "document": new_doc,
            "download_url": f"/documents/download/{new_doc.id}"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/history", response_model=List[schemas.Document])
def get_history(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    docs = db.query(models.Document).filter(models.Document.user_id == current_user.id).all()
    return docs

@router.get("/download/{doc_id}")
def download_doc(
    doc_id: int,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    doc = db.query(models.Document).filter(models.Document.id == doc_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    
    if doc.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized to download this document")

    if not os.path.exists(doc.file_path):
        raise HTTPException(status_code=404, detail="File not found on server")

    return FileResponse(
        path=doc.file_path,
        filename=os.path.basename(doc.file_path),
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )
