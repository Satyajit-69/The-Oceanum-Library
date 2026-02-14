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

@router.post("/voice_chat")
async def voice_chat(request: AudioRequest):
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[
                {
                    "role": "user",
                    "parts": [
                        {
                            "inline_data": {
                                "mime_type": "audio/webm",
                                "data": request.audio,
                            }
                        }
                    ],
                }
            ],
        )

        return {
            "success": True,
            "response": response.text.strip()
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
