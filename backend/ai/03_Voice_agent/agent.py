import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv(override=True)

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel("gemini-2.5-flash")

def gemini_agent(user_input):
    prompt = f"""
You are a actualy voice agent.
Understand the user's intent and respond briefly 
be careful while listening and responding the answer.

User: {user_input}
Assistant:
"""
    response = model.generate_content(prompt)
    return response.text.strip()
