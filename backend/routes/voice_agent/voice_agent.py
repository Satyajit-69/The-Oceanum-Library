from fastapi import APIRouter
from pydantic import BaseModel
import base64
import whisper
import uuid
import os
from services.agent import gemini_agent

router = APIRouter()

# Load whisper model once
whisper_model = whisper.load_model("base")

class AudioRequest(BaseModel):
    audio: str

@router.post("/voice_chat")
async def voice_chat(request: AudioRequest):
    try:
        # 1️⃣ Decode base64 audio
        audio_bytes = base64.b64decode(request.audio)

        # 2️⃣ Save temporary file
        file_name = f"temp_{uuid.uuid4()}.webm"
        with open(file_name, "wb") as f:
            f.write(audio_bytes)

        # 3️⃣ Speech-to-text
        result = whisper_model.transcribe(file_name)
        user_text = result["text"]

        # 4️⃣ Remove temp file
        os.remove(file_name)

        # 5️⃣ Send to Gemini
        ai_response = gemini_agent(user_text)

        return {
            "success": True,
            "transcription": user_text,
            "response": ai_response
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
