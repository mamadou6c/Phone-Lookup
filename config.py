# Import from installed package
from dotenv import load_dotenv
import os

load_dotenv()

class Config:
    API_KEY = os.getenv('API_KEY') 