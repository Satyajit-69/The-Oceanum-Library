import os
import json
import speech_recognition as sr
from dotenv import load_dotenv
import google.generativeai as genai
from google.cloud import texttospeech
import playsound
import uuid

# -------------------- ENV SETUP --------------------
load_dotenv(override=True)

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel("gemini-2.5-flash")

# Google TTS client
tts_client = texttospeech.TextToSpeechClient()

# -------------------- MEMORY --------------------
messages = [
    {
        "role": "system",
        "content": "You are a friendly conversational voice assistant. "
                   "Keep responses short, natural, and spoken-friendly."
    }
]

# -------------------- TTS --------------------
def speak(text):
    synthesis_input = texttospeech.SynthesisInput(text=text)

    voice = texttospeech.VoiceSelectionParams(
        language_code="en-US",
        name="en-US-Chirp-HD-F"
    )

    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3
    )

    response = tts_client.synthesize_speech(
        input=synthesis_input,
        voice=voice,
        audio_config=audio_config
    )

    filename = f"tts_{uuid.uuid4().hex}.mp3"
    with open(filename, "wb") as f:
        f.write(response.audio_content)

    playsound.playsound(filename)
    os.remove(filename)

# -------------------- STT --------------------
def listen():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("\n🎙️ Listening...")
        r.adjust_for_ambient_noise(source, duration=0.8)
        r.pause_threshold = 1.5
        audio = r.listen(source)

    try:
        return r.recognize_google(audio)
    except:
        return None

# -------------------- MAIN LOOP --------------------
print("✅ Gemini Voice Agent Started")
print("🛑 Say 'exit' or 'stop' to quit\n")

while True:
    user_text = listen()

    if not user_text:
        print("⚠️ Didn't catch that")
        continue

    print(f"🗣️ You: {user_text}")

    if user_text.lower() in ["exit", "quit", "stop"]:
        speak("Goodbye. Have a nice day!")
        break

    # Save to memory
    messages.append({"role": "user", "content": user_text})

    # Gemini response
    response = model.generate_content(
        contents=[m["content"] for m in messages]
    )

    reply = response.text.strip()
    print(f"🤖 Gemini: {reply}")

    # Save assistant reply
    messages.append({"role": "assistant", "content": reply})

    # Speak
    speak(reply)
