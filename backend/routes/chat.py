from fastapi import APIRouter
from pydantic import BaseModel
from services.rag_query import answer_from_pdf

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    pdf_id: str

class ChatResponse(BaseModel):
    reply: str

@router.post("/chat", response_model=ChatResponse)
def chat(data: ChatRequest):
    reply = answer_from_pdf(
        question=data.message,
        pdf_id=data.pdf_id
    )
    return {"reply": reply}
