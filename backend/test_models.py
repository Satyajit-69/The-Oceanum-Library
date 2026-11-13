from database import Base
from models import User, AuthAccount 




print("Tables with registration")
print(Base.metadata.tables.keys())




print("primary keys") 
for pk in AuthAccount.__table__.primary_key:
    print(pk)
