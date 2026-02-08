from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import uuid, os
from services.rag_ingest import ingest_pdf
import json
from datetime import datetime

router = APIRouter()

UPLOAD_DIR = "uploads"
METADATA_FILE = "uploads/metadata.json"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def save_metadata(pdf_id: str, filename: str):
    """Save PDF metadata to JSON file"""
    metadata = {}
    if os.path.exists(METADATA_FILE):
        with open(METADATA_FILE, 'r') as f:
            metadata = json.load(f)
    
    metadata[pdf_id] = {
        "filename": filename,
        "upload_date": datetime.now().isoformat(),
        "pdf_id": pdf_id
    }
    
    with open(METADATA_FILE, 'w') as f:
        json.dump(metadata, f, indent=2)

def get_all_metadata():
    """Get all PDF metadata"""
    if os.path.exists(METADATA_FILE):
        with open(METADATA_FILE, 'r') as f:
            return json.load(f)
    return {}

@router.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        # Validate file type
        if not file.filename.endswith('.pdf'):
            raise HTTPException(status_code=400, detail="Only PDF files are allowed")
        
        # Read file content
        content = await file.read()
        
        # Check file size (10MB limit)
        if len(content) > 10 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="File size exceeds 10MB limit")
        
        # Generate unique ID and save
        pdf_id = str(uuid.uuid4())
        file_path = f"{UPLOAD_DIR}/{pdf_id}.pdf"

        with open(file_path, "wb") as f:
            f.write(content)
        
        print(f"✅ File saved: {file_path}")

        # Save metadata
        save_metadata(pdf_id, file.filename)

        # Ingest into vector DB
        ingest_pdf(file_path, collection_name=pdf_id)

        # Return proper JSON response
        return JSONResponse(
            status_code=200,
            content={
                "pdf_id": pdf_id,
                "filename": file.filename,
                "message": "PDF processed successfully. Ask anything about this PDF."
            }
        )
    
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Error uploading PDF: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")

@router.get("/list-pdfs")
async def list_pdfs():
    """List all uploaded PDFs"""
    try:
        metadata = get_all_metadata()
        pdfs = [
            {
                "pdf_id": pdf_id,
                "filename": info["filename"],
                "upload_date": info["upload_date"]
            }
            for pdf_id, info in metadata.items()
        ]
        return {"pdfs": pdfs}
    except Exception as e:
        print(f"❌ Error listing PDFs: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))