import os
import json
import speech_recognition as sr
from dotenv import load_dotenv
import google.generativeai as genai

# -------------------- SETUP --------------------
load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY missing")

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel("gemini-2.5-flash")

# Folder where agent is allowed to write
OUTPUT_DIR = "."
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Memory (conversation history)
messages = [
    {
        "role": "system",
        "content": (
            "You are an AI coding agent like Cursor.\n"
            "If the user asks to create code or a file, "
            "respond ONLY in valid JSON like:\n\n"
            "{\n"
            '  "action": "create_file",\n'
            '  "filename": "example.py",\n'
            '  "content": "print(\\"hello\\")"\n'
            "}\n\n"
            "Otherwise respond normally in text."
        )
    }
]

# -------------------- SPEECH TO TEXT --------------------
def listen():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("\n🎙️ Speak...")
        r.adjust_for_ambient_noise(source, duration=1)
        audio = r.listen(source)
    return r.recognize_google(audio)

# -------------------- GEMINI RESPONSE --------------------
def ask_gemini():
    prompt = "\n".join(
        f"{m['role'].upper()}: {m['content']}" for m in messages
    )
    response = model.generate_content(prompt)
    return response.text.strip()

# -------------------- FILE CREATION --------------------
def create_file(filename, content):
    safe_path = os.path.join(OUTPUT_DIR, filename)

    with open(safe_path, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"✅ File created: {os.path.abspath(safe_path)}")


# -------------------- MAIN LOOP --------------------
def main():
    print("🚀 Gemini Cursor Agent Ready (say 'exit' to stop)")

    while True:
        try:
            user_text = listen()
            print(f"🗣️ You: {user_text}")

            if user_text.lower() in ["exit", "quit", "stop"]:
                print("👋 Exiting agent")
                break

            messages.append({"role": "user", "content": user_text})

            reply = ask_gemini()
            print("\n🤖 Gemini response:\n", reply)

            # Try parsing JSON action
            try:
                data = json.loads(reply)

                if data.get("action") == "create_file":
                    filename = data["filename"]
                    content = data["content"]

                    confirm = input(
                        f"\n❓ Create file '{filename}'? (yes/no): "
                    ).strip().lower()

                    if confirm == "yes":
                        create_file(filename, content)
                        messages.append({
                            "role": "assistant",
                            "content": f"Created file {filename}"
                        })
                    else:
                        print("❌ File creation cancelled")

                else:
                    messages.append({"role": "assistant", "content": reply})

            except json.JSONDecodeError:
                # Normal conversational response
                messages.append({"role": "assistant", "content": reply})

        except Exception as e:
            print("⚠️ Error:", e)

# -------------------- RUN --------------------
if __name__ == "__main__":
    main()
