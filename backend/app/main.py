from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base, SessionLocal
from .routers import auth, documents
from . import models, auth as auth_utils
import os

# Create DB tables
Base.metadata.create_all(bind=engine)

# Auto-seed logic for environments without shell access
def auto_seed():
    db = SessionLocal()
    try:
        user = db.query(models.User).filter(models.User.email == "admin@college.edu").first()
        if not user:
            admin_user = models.User(
                name="College Administrator",
                email="admin@college.edu",
                password=auth_utils.get_password_hash("admin123"),
                role="admin"
            )
            db.add(admin_user)
            staff_user = models.User(
                name="Staff Member",
                email="staff@college.edu",
                password=auth_utils.get_password_hash("staff123"),
                role="staff"
            )
            db.add(staff_user)
            db.commit()
    finally:
        db.close()

auto_seed()

# Ensure generated directory exists
os.makedirs("app/generated", exist_ok=True)

app = FastAPI(title="College Document Automation System")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, specify frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router)
app.include_router(documents.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to College Document Automation API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
