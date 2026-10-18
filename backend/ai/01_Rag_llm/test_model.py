
import os
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI

env_path = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(env_path, override=True)

api_key = os.getenv("OPENAI_API_KEY")


if not api_key:
    raise ValueError(f"OPENAI_API_KEY not found")

client = OpenAI(api_key=api_key)

response = client.responses.create(
    model="gpt-6-luna",
    input="Write a one-sentence bedtime story about a unicorn."
)

print(response.output_text)
