import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

# Fail fast (production-safe)
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise RuntimeError("GOOGLE_API_KEY is not set")

# Initialize client (once)
client = genai.Client(api_key=GOOGLE_API_KEY)

def gemini_agent(user_input: str) -> str:
    prompt = f"""
Your name is MEEKU. You are a voice agent developed by Satyajit Sahoo.
Respond briefly, clearly, and politely.

User: {user_input}
Assistant:
"""
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text.strip()
