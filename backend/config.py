import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE_URI = f"sqlite:///{os.path.join(BASE_DIR, 'database', 'db.sqlite3')}"
GANACHE_URL = "http://127.0.0.1:7545"
CONTRACT_COMPILED_PATH = os.path.join(BASE_DIR, "contracts", "__compiled.json")
CONTRACT_ADDRESS = "0x2F16388c2fc854D9d303E6A96d83BC3A831d933d"