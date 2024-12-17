import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE_URI = f"sqlite:///{os.path.join(BASE_DIR, 'database', 'db.sqlite3')}"
GANACHE_URL = "http://127.0.0.1:7545"
CONTRACT_COMPILED_PATH = os.path.join(BASE_DIR, "contracts", "__compiled.json")
CONTRACT_ADDRESS = "0xeE63354a12f3A2BB33199A10Fc7D721242a69A25"