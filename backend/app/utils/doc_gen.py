from docxtpl import DocxTemplate
import os
from datetime import datetime
import uuid

TEMPLATES_DIR = os.path.join(os.path.dirname(__file__), "..", "templates")
GENERATED_DIR = os.path.join(os.path.dirname(__file__), "..", "generated")

def generate_document(template_name: str, data: dict):
    """
    template_name: 'circular', 'proposal', or 'report'
    data: dictionary containing placeholders
    """
    template_path = os.path.join(TEMPLATES_DIR, f"{template_name}.docx")
    
    if not os.path.exists(template_path):
        raise FileNotFoundError(f"Template {template_name}.docx not found")

    doc = DocxTemplate(template_path)
    
    # Auto-generate common fields
    ref_num = f"CLG-{datetime.now().strftime('%Y%m%d')}-{uuid.uuid4().hex[:6].upper()}"
    curr_date = datetime.now().strftime("%d-%m-%Y")
    
    context = {
        **data,
        "ref_number": ref_num,
        "current_date": curr_date
    }
    
    doc.render(context)
    
    file_name = f"{template_name}_{ref_num}.docx"
    output_path = os.path.join(GENERATED_DIR, file_name)
    
    doc.save(output_path)
    
    return file_name, output_path, ref_num
