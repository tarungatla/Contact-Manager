#mandatory code
import psycopg2
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
#Creates database engine

engine = create_engine('postgresql://postgres:nurataltag@localhost:5432/contact')
# postgresql://postgres:nurataltag@localhost/demo
Base = declarative_base()

SessionLocal = sessionmaker(bind=engine, expire_on_commit=False) #session for db