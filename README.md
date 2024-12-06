# PROJECT TITLE PaletGen

#### Video Demo: [Your Video URL](<URL HERE>)

#### Description:
AI color palette generator that can generate color palette from the image or your idea.

## Features
- [Feature 1]: Color palette generation from user prompt.
- [Feature 2]: Color palette generation from image.
- [Feature 3]: Color palette generation from both image and user prompt.

## Files and Structure
- **frontend/**: Contains the Next.js code for the frontend.
- **backend/**: Contains the Flask backend code.
- **README.md**: Documentation for the project.

## Key Design Decisions
- Gemini API for the image analyzing and generation of color palette.
- Nextjs for the frontend development
- Python Flask for the backend development

## Installation and Usage
### Prerequisites:
- Python 3.x
- Deno 2.x
- Google Gemini API

### Steps to Run:
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd <repo-directory>
   ```
2. Run the Flask backend:
   ```bash
   cd backend
   echo "GEMINI_API=<your-api-key>" > .env
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirement.txt
   deactive
   source .venv/bin/activate
   flask run
3. Run the NextJS frontend:
   ```bash
   cd frontend
   deno install
   deno task dev
   ```

