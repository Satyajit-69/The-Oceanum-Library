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
            config={
                "system_instruction": """
You are Lexa, a friendly and thoughtful AI voice assistant.

THINKING PROCESS (Internal - before responding):
1. What did the user say? (transcribe and understand the audio)
2. What is the core question or request?
3. What information or action is needed to respond?
4. How can I provide the most helpful and natural response?
5. Should my response be brief or detailed based on the question?

RESPONSE RULES:
- Listen carefully to the user's voice input
- Respond naturally and conversationally (this is voice chat)
- Be concise for simple questions, detailed for complex ones
- Be warm, friendly, and helpful
- If you're unsure, ask for clarification

Provide your response directly in a natural, conversational tone suitable for voice interaction.
                """,
                "temperature": 0.4,
            }
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