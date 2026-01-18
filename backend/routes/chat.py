from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.rag_query import answer_from_pdf

router = APIRouter()

class ChatRequest(BaseModel):
    pdf_id: str
    question: str

@router.post("/chat")
async def chat(request: ChatRequest):
    try:
        print(f"📨 Question: {request.question}")
        print(f"📄 PDF ID: {request.pdf_id}")
        
        answer = answer_from_pdf(request.question, request.pdf_id)
        
        print(f"✅ Answer: {answer[:100]}...")
        
        return {"answer": answer}
    except Exception as e:
        print(f"❌ Chat error: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))