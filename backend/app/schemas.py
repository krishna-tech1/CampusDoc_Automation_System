from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# User Schemas
class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: Optional[str] = "staff"

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        from_attributes = True

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Document Schemas
class DocumentBase(BaseModel):
    document_type: str
    title: str

class DocumentCreate(DocumentBase):
    pass

class Document(DocumentBase):
    id: int
    user_id: int
    reference_number: str
    created_at: datetime
    file_path: str

    class Config:
        from_attributes = True

# Form Data Schemas
class CircularForm(BaseModel):
    title: str
    department: str
    date: str
    subject: str
    content: str
    signature_name: str
    designation: str

class ProposalForm(BaseModel):
    proposal_title: str
    event_name: str
    date_venue: str
    objectives: str
    budget_details: str
    coordinator_name: str

class ReportForm(BaseModel):
    event_name: str
    date: str
    chief_guest: str
    participants_count: int
    description: str
    outcome: str
    prepared_by: str
