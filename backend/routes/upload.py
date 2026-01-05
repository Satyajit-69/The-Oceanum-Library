from fastapi import APIRouter, UploadFile, File
import uuid, os
from services.rag_ingest import ingest_pdf

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    pdf_id = str(uuid.uuid4())
    file_path = f"{UPLOAD_DIR}/{pdf_id}.pdf"

    with open(file_path, "wb") as f:
        f.write(await file.read())

    ingest_pdf(file_path, collection_name=pdf_id)

    return {
        "pdf_id": pdf_id,
        "message": "PDF processed successfully. Ask anything about this PDF."
    }
