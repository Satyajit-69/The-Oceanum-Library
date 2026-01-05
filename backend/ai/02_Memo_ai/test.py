from dotenv import load_dotenv
import os
from neo4j import GraphDatabase

load_dotenv(dotenv_path=".env", override=True)  # 👈 THIS LINE

driver = GraphDatabase.driver(
    os.getenv("NEO4J_URI"),
    auth=(os.getenv("NEO4J_USERNAME"), os.getenv("NEO4J_PASSWORD"))
)

with driver.session() as session:
    print(session.run("RETURN 'CONNECTED' AS msg").single()["msg"])

driver.close()
