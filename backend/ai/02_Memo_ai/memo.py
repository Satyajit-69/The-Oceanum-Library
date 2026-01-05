import os
import json
import re
from dotenv import load_dotenv
from neo4j import GraphDatabase
import google.generativeai as genai

# ===================== ENV =====================
load_dotenv(dotenv_path=".env", override=True)

USER = "Satyajit"

# ===================== LLM =====================
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
llm = genai.GenerativeModel("gemini-2.5-flash")

# ===================== NEO4J =====================
db = GraphDatabase.driver(
    os.getenv("NEO4J_URI"),
    auth=(os.getenv("NEO4J_USERNAME"), os.getenv("NEO4J_PASSWORD"))
)

# ===================== HELPERS =====================
def normalize_relation(rel: str) -> str:
    """
    Neo4j-safe relationship name:
    - UPPERCASE
    - spaces → _
    - remove invalid chars
    """
    rel = rel.upper().strip()
    rel = re.sub(r"\s+", "_", rel)
    rel = re.sub(r"[^A-Z0-9_]", "", rel)
    return rel

def normalize_label(label: str) -> str:
    """
    Neo4j-safe label:
    Food, Company, Skill, Movie, etc.
    """
    return re.sub(r"[^A-Za-z]", "", label.capitalize())

# ===================== ENTITY EXTRACTION =====================
def extract(text):
    """
    Gemini decides EVERYTHING:
    - entity
    - type (label)
    - relation (edge)
    """
    prompt = f"""
You are an information extraction AI.

From the user's text, extract entities and how the user is related to them.

Rules:
- Decide the relation YOURSELF (no fixed list).
- Relation must describe how USER connects to ENTITY.
- Use short verb phrases in UPPERCASE (e.g. WORKS_AT, LIKES, LEARNING, WATCHED).
- Type must be a clean category (Food, Company, Skill, Movie, Place, etc.)

Return ONLY valid JSON in this exact format:

[
  {{
    "entity": "Entity Name",
    "type": "Category",
    "relation": "RELATION_NAME"
  }}
]

Text:
"{text}"

Return ONLY the JSON array.
"""

    try:
        raw = llm.generate_content(prompt).text.strip()

        # Extract JSON safely
        if "[" in raw:
            raw = raw[raw.find("["): raw.rfind("]") + 1]

        data = json.loads(raw)

        valid = []
        for e in data:
            if all(k in e for k in ("entity", "type", "relation")):
                valid.append(e)

        print(f"🧠 Gemini extracted {len(valid)} entities")
        return valid

    except Exception as e:
        print("⚠️ Extraction failed:", e)
        return []

# ===================== SAVE TO GRAPH =====================
def save_batch(entities):
    """
    Sir-style graph:
    - Unique nodes
    - Typed labels
    - Dynamic relations from Gemini
    """
    if not entities:
        return

    with db.session() as session:
        for e in entities:
            label = normalize_label(e["type"])
            rel = normalize_relation(e["relation"])

            query = f"""
            MERGE (u:User {{name: $user}})
            MERGE (e:{label} {{name: $entity}})
            MERGE (u)-[:{rel}]->(e)
            """

            session.run(
                query,
                user=USER,
                entity=e["entity"]
            )

    print(f"✓ Saved {len(entities)} nodes & relations (Gemini-driven)")

# ===================== SHOW GRAPH =====================
def show_graph():
    with db.session() as session:
        result = session.run("""
            MATCH (u:User {name: $user})-[r]->(e)
            RETURN type(r) AS relation,
                   labels(e)[0] AS label,
                   e.name AS name
            LIMIT 50
        """, user=USER)

        rows = list(result)
        if not rows:
            print("🕸️ Graph empty")
            return

        print("\n🧠 Knowledge Graph:")
        for r in rows:
            print(f"  {r['relation']} → {r['name']} ({r['label']})")

# ===================== MAIN LOOP =====================
print("✅ Agent Ready (Gemini controls relations)")

while True:
    inp = input("\nYou: ").strip()

    if inp.lower() in ["exit", "quit"]:
        break

    if inp.lower() == "show":
        show_graph()
        continue

    entities = extract(inp)
    save_batch(entities)

    reply = llm.generate_content(f"Reply briefly: {inp}").text
    print(f"\n🤖 {reply}")
