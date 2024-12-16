import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE_URI = f"sqlite:///{os.path.join(BASE_DIR, 'database', 'db.sqlite3')}"
GANACHE_URL = "http://127.0.0.1:8545"
CONTRACT_COMPILED_PATH = os.path.join(BASE_DIR, "contracts", "__compiled.json")