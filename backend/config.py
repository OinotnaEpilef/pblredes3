import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE_URI = f"sqlite:///{os.path.join(BASE_DIR, 'database', 'db.sqlite3')}"
GANACHE_URL = "http://127.0.0.1:7545"
CONTRACT_COMPILED_PATH = os.path.join(BASE_DIR, "contracts", "__compiled.json")
CONTRACT_ADDRESS = "0x7a9aeAB5CA0052312efC89F66141dc7625364d46"