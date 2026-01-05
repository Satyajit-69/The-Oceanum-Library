import os
from dotenv import load_dotenv
load_dotenv()  # 👈 this loads .env into environment

from langchain_google_genai import GoogleGenerativeAIEmbeddings

emb = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
vec = emb.embed_query("hello world")

print(len(vec))
