# College Document Automation System

A full-stack web application designed to automate the creation of official college documents (Circulars, Proposals, and Event Reports) using predefined Word templates (`.docx`).

## 🚀 Features

- **JWT Authentication**: Secure login for staff and administrators.
- **Dynamic Document Generation**: Uses `docxtpl` to replace placeholders in `.docx` templates.
- **Automated Metadata**: Auto-generates reference numbers and current dates.
- **History Tracking**: Stores all generated documents for future reference and redownload.
- **Modern UI**: Clean, responsive dashboard built with React and Tailwind CSS.
- **Role-based Access**: Supports Admin and Staff roles.

## 🛠️ Tech Stack

### Frontend
- **React (Vite)**: Modern frontend library and build tool.
- **Tailwind CSS**: Utility-first CSS framework for custom design.
- **Axios**: HTTP client for API requests.
- **Lucide React**: Beautiful icons.
- **React Router**: Client-side routing.

### Backend
- **FastAPI**: High-performance Python web framework.
- **PostgreSQL**: Robust relational database (SQLAlchemy ORM).
- **Jose / Passlib**: Security and JWT handling.
- **docxtpl**: template-based Word document generation.

## 📂 Project Structure

```text
clg_hackthon/
├── backend/
│   ├── app/
│   │   ├── routers/       # API endpoints (Auth, Documents)
│   │   ├── utils/         # Document generation logic
│   │   ├── models.py      # SQLAlchemy DB models
│   │   ├── schemas.py     # Pydantic validation models
│   │   ├── templates/     # .docx base templates
│   │   └── main.py        # Entry point
│   ├── requirements.txt
│   └── seed.py            # Initial DB setup script
└── frontend/
    ├── src/
    │   ├── components/    # Reusable UI components
    │   ├── pages/         # Dashboard, Forms, Login
    │   └── App.jsx        # Routing and layout
    └── tailwind.config.js
```

## 📋 API Endpoints

### Auth
- `POST /auth/register`: Create a new user.
- `POST /auth/login`: Get JWT token.
- `GET /auth/me`: Get current user info.

### Documents
- `POST /documents/generate/{doc_type}`: Generate a new document (circular/proposal/report).
- `GET /documents/history`: List all generated documents for the current user.
- `GET /documents/download/{doc_id}`: Download a specific document.

## ⚙️ Setup & Installation

### 1. Prerequisites
- Python 3.9+
- Node.js 18+
- PostgreSQL database

### 2. Backend Setup
1. Navigate to the `backend` folder.
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # venv\Scripts\activate on Windows
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure `.env`:
   ```env
   DATABASE_URL=postgresql://user:password@localhost/clg_automation
   SECRET_KEY=your_super_secret_key
   ```
5. Initialize Database & Seed:
   ```bash
   python seed.py
   ```
6. Run the server:
   ```bash
   uvicorn app.main:app --reload
   ```

### 3. Frontend Setup
1. Navigate to the `frontend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run development server:
   ```bash
   npm run dev
   ```

## 📝 Document Templates
The system expects `.docx` files in `backend/app/templates/` with Jinja2-style placeholders:
- `{{ title }}`
- `{{ current_date }}`
- `{{ ref_number }}`
- `{{ department }}`
- ... and other field-specific tags.

---
Developed for College Staff Productivity.
