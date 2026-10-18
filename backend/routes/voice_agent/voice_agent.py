
import os
import base64
import binascii

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

router = APIRouter()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise RuntimeError("OPENAI_API_KEY is not set")

client = OpenAI(api_key=OPENAI_API_KEY)


class AudioRequest(BaseModel):
    audio: str
    temperature: float = Field(default=0.7, ge=0, le=2)
    system_prompt: str = "You are Lexa, a helpful AI assistant."
    conversation_history: list[dict[str, str]] = Field(default_factory=list)


@router.post("/voice_chat")
async def voice_chat(request: AudioRequest):
    try:
        # 1. Decode base64 audio
        try:
            audio_bytes = base64.b64decode(
                request.audio,
                validate=True,
            )
        except (binascii.Error, ValueError):
            raise HTTPException(
                status_code=400,
                detail="Invalid base64 audio",
            )

        if not audio_bytes:
            raise HTTPException(
                status_code=400,
                detail="Audio is empty",
            )

        # 2. Transcribe audio with OpenAI
        import io

        audio_file = io.BytesIO(audio_bytes)
        audio_file.name = "recording.webm"

        transcription = client.audio.transcriptions.create(
            model="gpt-4o-mini-transcribe",
            file=audio_file,
        )

        user_text = transcription.text.strip()

        if not user_text:
            raise HTTPException(
                status_code=400,
                detail="Could not detect speech in the audio",
            )

        # 3. Build conversation messages
        messages = [
            {
                "role": "system",
                "content": (
                    request.system_prompt
                    + "\nRespond naturally and conversationally. "
                    "Be concise for simple questions and detailed "
                    "for complex ones. Ask for clarification if needed."
                ),
            }
        ]

        # Accept only supported conversation roles
        for msg in request.conversation_history[-20:]:
            role = msg.get("role")
            content = msg.get("content", "")

            if role in ("user", "assistant") and content.strip():
                messages.append({
                    "role": role,
                    "content": content,
                })

        messages.append({
            "role": "user",
            "content": user_text,
        })

        # 4. Generate the response
        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=messages,
            temperature=request.temperature,
        )

        answer = response.choices[0].message.content or ""

        return {
            "success": True,
            "response": answer.strip(),
            "transcription": user_text,
            "model_used": "gpt-4.1-mini",
            "transcription_model": "gpt-4o-mini-transcribe",
        }

    except HTTPException:
        raise
    except Exception:
        # Log the exception privately on the server in production.
        raise HTTPException(
            status_code=500,
            detail="Voice chat failed. Please try again.",
        )
