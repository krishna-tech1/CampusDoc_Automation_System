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
        # Check and Create/Update Admin
        admin = db.query(models.User).filter(models.User.email == "admin@college.edu").first()
        if not admin:
            admin = models.User(
                name="College Administrator",
                email="admin@college.edu",
                password=auth_utils.get_password_hash("admin123"),
                role="admin"
            )
            db.add(admin)
        else:
            # Force update password to 'admin123' if already exists
            admin.password = auth_utils.get_password_hash("admin123")
        
        # Check and Create Staff
        staff = db.query(models.User).filter(models.User.email == "staff@college.edu").first()
        if not staff:
            staff = models.User(
                name="Staff Member",
                email="staff@college.edu",
                password=auth_utils.get_password_hash("staff123"),
                role="staff"
            )
            db.add(staff)
        
        db.commit()
    except Exception as e:
        print(f"Seeding error: {e}")
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
