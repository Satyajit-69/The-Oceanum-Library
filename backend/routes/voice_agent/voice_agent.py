from fastapi import APIRouter
from pydantic import BaseModel
from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
client = genai.Client(api_key=GOOGLE_API_KEY)

class AudioRequest(BaseModel):
    audio: str  # base64 string
    model: str = "gemini-2.5-flash"
    temperature: float = 0.7
    system_prompt: str = "You are Lexa, a helpful AI assistant."
    conversation_history: list = []

@router.post("/voice_chat")
async def voice_chat(request: AudioRequest):
    try:
        # Build conversation context
        contents = []
        
        # Add conversation history if available
        for msg in request.conversation_history:
            contents.append({
                "role": msg.get("role", "user"),
                "parts": [{"text": msg.get("content", "")}]
            })
        
        # Add current audio input
        contents.append({
            "role": "user",
            "parts": [
                {
                    "inline_data": {
                        "mime_type": "audio/webm",
                        "data": request.audio,
                    }
                }
            ],
        })

        response = client.models.generate_content(
            model=request.model,
            contents=contents,
            config={
                "system_instruction": f"""
{request.system_prompt}

THINKING PROCESS (Internal - before responding):
1. What did the user say? (transcribe and understand the audio)
2. What is the core question or request?
3. Review the conversation history for context
4. What information or action is needed to respond?
5. How can I provide the most helpful and natural response?
6. Should my response be brief or detailed based on the question?

RESPONSE RULES:
- Listen carefully to the user's voice input
- Maintain conversation context from previous exchanges
- Respond naturally and conversationally (this is voice chat)
- Be concise for simple questions, detailed for complex ones
- Be warm, friendly, and helpful
- If you're unsure, ask for clarification

Provide your response directly in a natural, conversational tone suitable for voice interaction.
                """,
                "temperature": request.temperature,
            }
        )

        return {
            "success": True,
            "response": response.text.strip(),
            "transcription": "Audio processed",  # Gemini doesn't return transcription separately
            "model_used": request.model
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }


