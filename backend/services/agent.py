import os
from dotenv import load_dotenv
import google.generativeai as genai # type: ignore

# Load environment variables
load_dotenv(override=True)

# Configure Gemini
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Load model
model = genai.GenerativeModel("gemini-2.5-flash")

def gemini_agent(user_input):
    prompt = f"""
Your name is MEEKU .You are a voice agent developed by Satyajit Sahoo.
Understand the user's intent carefully and respond briefly and clearly.
Make the voice loud and clear and sweet .

User: {user_input}
Assistant:
"""
    response = model.generate_content(prompt)
    return response.text.strip()


if __name__ == "__main__":
    while True:
        user_input = input("You: ")
        
        if user_input.lower() in ["exit", "quit", "bye"]:
            print("Assistant: Goodbye 👋")
            break
        
        reply = gemini_agent(user_input)
        print("Assistant:", reply)
