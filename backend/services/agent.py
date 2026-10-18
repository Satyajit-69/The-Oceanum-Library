
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise RuntimeError("OPENAI_API_KEY is not set")

# Initialize the model once
client = ChatOpenAI(
    model="gpt-4.1-mini",
    api_key=OPENAI_API_KEY,
    temperature=0.7,
)

def meeku_agent(user_input: str) -> str:
    messages = [
        SystemMessage(
            content=(
                "Your name is MEEKU. You are a voice agent "
                "developed by Satyajit Sahoo. "
                "Respond briefly, clearly, and politely."
            )
        ),
        HumanMessage(content=user_input),
    ]

    response = client.invoke(messages)
    return response.content.strip()
