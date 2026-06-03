# Job Search Portal & Resume Analyzer
---
#### A comprehensive MERN stack application designed to bridge the gap between job seekers and recruiters. This platform features a job board and AI Resume Analyzer that uses Google Gemini to provide instant, insights for candidates.
---

## Key Features

### For Students / Job Seekers
- **AI Resume Analysis**: Compare your resume PDF or self-description against specific job descriptions to get a match score.
- **Strategic Insights**: Receive AI-generated feedback on strengths and missing skills.
- **Analysis History**: View a persistent record of all past analyses directly in your profile or via the sidebar.
- **Job Tracking**: Browse, search, and filter jobs; apply with one click and track application status.
- **Profile Dashboard**: Manage your skills, contact info, and digital resume.

### For Recruiters / Admins
- **Company Branding**: Register and manage multiple company profiles with logos.
- **Job Lifecycle Management**: Post new job openings, edit details
- **Applicant Management**: View all applicants for a job and update their status (Accepted, Rejected, Interview).

---

## Tech Stack

**Frontend:**
- **React.js** (Functional Components, Hooks)
- **Redux Toolkit**: Centralized state management for Auth, Jobs, Applications, and AI reports.
- **Redux Persist**: Ensures your analysis data survives page refreshes.
- **Tailwind CSS & Shadcn/UI**: For a modern, responsive, and accessible user interface.
- Lucide React Icons.

**Backend:**
- Node.js & Express.js.
- **MongoDB & Mongoose**: NoSQL database for flexible data modeling.
- **Google Generative AI (Gemini 1.5 Flash)**: Powers the intelligent resume parsing and scoring.
- **Multer & Cloudinary**: For secure file handling and image/PDF storage.
- **PDF-Parse**: Extracting text data from buffers for AI processing.
- JWT (JSON Web Tokens) with Cookie-based authentication.

---

## Setup & Installation

- Node.js (v18+)
- MongoDB Atlas account or local instance
- Google AI Studio API Key (for Gemini)
- Cloudinary Account

### 1. Environment Configuration
Create a `.env` file in the `backend/` directory:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
GOOGLE_API_KEY=your_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
---

## AI Analyzer Logic

The core intelligence of the application resides in the `ai.services.js` module. It uses a structured prompt engineering approach:

1.  **Text Extraction**: `pdf-parse` extracts text from uploaded PDF resumes.
2.  **Contextual Analysis**: The AI receives three inputs: Resume Text, User Summary, and Target Job Description.
3.  **Schema Enforcement**: Using `Zod` and `zod-to-json-schema`, the backend forces Gemini to return a strict JSON object containing:
    - `matchScore`: 0-100% compatibility.
    - `matchingSkills` & `missingSkills`: Detailed arrays of keywords.
    - `aiFeedback`: Actionable points to improve the resume.
4.  **Persistence**: Every report is automatically saved to MongoDB and linked to the `userId` for future reference.

