from neo4j import GraphDatabase
import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

driver = GraphDatabase.driver(
    "neo4j://localhost:7687",
    auth=("neo4j", "password")
)

with driver.session() as session:
    session.run("""
    MERGE (u:User {id: $uid})
    CREATE (m:Memory {
        role: "user",
        content: $content,
        timestamp: datetime()
    })
    MERGE (u)-[:HAS_MEMORY]->(m)
    """, uid="user1", content="I am a gym rat")

print("Memory saved")
