# Import from installed package
from dotenv import load_dotenv
import os

load_dotenv()

class Config:
   OPENCAGE_API_KEY = os.getenv('OPENCAGE_API_KEY') 
