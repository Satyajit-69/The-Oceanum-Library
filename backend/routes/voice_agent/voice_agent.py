from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.agent import gemini_agent

router = APIRouter()

class ChatRequest(BaseModel):
    user_input: str

class ChatResponse(BaseModel):
    success: bool
    response: str = None
    error: str = None

@router.post("/voice_chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Handle voice assistant chat requests"""
    try:
        if not request.user_input:
            raise HTTPException(status_code=400, detail="user_input is required")
        
        # Get response from Gemini agent
        response = gemini_agent(request.user_input)
        
        return ChatResponse(
            success=True,
            response=response
        )
        
    except Exception as e:
        return ChatResponse(
            success=False,
            error=str(e)
        )