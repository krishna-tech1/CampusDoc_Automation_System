from app.database import SessionLocal, engine
from app import models, auth

def seed():
    models.Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    # Check if user exists
    user = db.query(models.User).filter(models.User.email == "admin@college.edu").first()
    if not user:
        admin_user = models.User(
            name="College Administrator",
            email="admin@college.edu",
            password=auth.get_password_hash("admin123"),
            role="admin"
        )
        db.add(admin_user)
        
        staff_user = models.User(
            name="Staff Member",
            email="staff@college.edu",
            password=auth.get_password_hash("staff123"),
            role="staff"
        )
        db.add(staff_user)
        
        db.commit()
        print("Database seeded with sample users:")
        print("Admin: admin@college.edu / admin123")
        print("Staff: staff@college.edu / staff123")
    else:
        print("Database already contains users.")
    db.close()

if __name__ == "__main__":
    seed()
