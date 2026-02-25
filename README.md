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

## ☁️ Deployment on Render

### Backend (Web Service)
1.  **Connect Repo**: Connect your GitHub repository to Render.
2.  **Service Type**: Create a "Web Service".
3.  **Root Directory**: `backend`
4.  **Runtime**: `Python 3`
5.  **Build Command**: `pip install -r requirements.txt`
6.  **Start Command**: `gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app`
7.  **Environment Variables**:
    - `DATABASE_URL`: (Your Neon connection string)
    - `SECRET_KEY`: (A random secure string)
    - `ACCESS_TOKEN_EXPIRE_MINUTES`: `60`

### Frontend (Static Site)
1.  **Connect Repo**: Connect the same GitHub repository.
2.  **Service Type**: Create a "Static Site".
3.  **Root Directory**: `frontend`
4.  **Build Command**: `npm run build`
5.  **Publish Directory**: `dist`
6.  **Environment Variables**:
    - `VITE_API_URL`: (The URL of your deployed Render backend, e.g., `https://clg-docs-api.onrender.com`)
7.  **Redirects/Rewrites**:
    - Go to **Redirects/Rewrites** in Render settings.
    - Add: `Source: /*`, `Destination: /index.html`, `Action: Rewrite`. (This allows React Router to work).

## 📝 Document Templates
The system expects `.docx` files in `backend/app/templates/` with Jinja2-style placeholders:
- `{{ title }}`
- `{{ current_date }}`
- `{{ ref_number }}`
- `{{ department }}`
- ... and other field-specific tags.

---
Developed for College Staff Productivity.
