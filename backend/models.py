# SQLAlchemy uses the term "model" to refer to these classes and instances that interact with the database.

from tokenize import Name
from sqlalchemy import Column, Integer, String
from database import Base 

class Item(Base):
    __tablename__ = 'items'
    id = Column(Integer, primary_key=True)
    name = Column(String(256))
    email = Column(String(256))
 