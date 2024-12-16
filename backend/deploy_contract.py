import json
import os
from web3 import Web3
from dotenv import load_dotenv

# Carregar variáveis de ambiente do arquivo .env
load_dotenv()

GANACHE_URL = os.getenv("GANACHE_URL")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
ACCOUNT_ADDRESS = os.getenv("ACCOUNT_ADDRESS")

# Inicializar a conexão com o Ganache
web3 = Web3(Web3.HTTPProvider(GANACHE_URL))
if not web3.isConnected():
    raise Exception("Erro ao conectar ao Ganache. Verifique o URL configurado.")

# Verificar se a conta tem saldo suficiente
if not ACCOUNT_ADDRESS:
    raise Exception("Endereço da conta não configurado. Adicione no .env como ACCOUNT_ADDRESS.")

balance = web3.eth.get_balance(ACCOUNT_ADDRESS)
if balance == 0:
    raise Exception("A conta configurada não tem saldo. Verifique o Ganache.")

# Compilar o contrato inteligente
with open("contracts/Betting.json", "r") as file:
    compiled_contract = json.load(file)

contract_abi = compiled_contract["abi"]
contract_bytecode = compiled_contract["bytecode"]

# Construir a transação de deploy
BettingContract = web3.eth.contract(abi=contract_abi, bytecode=contract_bytecode)

# Obter nonce da conta (número de transações enviadas)
nonce = web3.eth.get_transaction_count(ACCOUNT_ADDRESS)

# Criar a transação de deploy
transaction = BettingContract.constructor().build_transaction({
    "chainId": 1337,  # ID padrão do Ganache
    "gas": 3000000,  # Limite de gás
    "gasPrice": web3.to_wei("20", "gwei"),
    "nonce": nonce
})

# Assinar a transação com a chave privada
signed_txn = web3.eth.account.sign_transaction(transaction, private_key=PRIVATE_KEY)

# Enviar a transação para a blockchain
tx_hash = web3.eth.send_raw_transaction(signed_txn.rawTransaction)
print(f"Deploy enviado. Hash da transação: {tx_hash.hex()}")

# Aguardar a confirmação do deploy
tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash)
contract_address = tx_receipt.contractAddress

print(f"Contrato implantado com sucesso no endereço: {contract_address}")

# Salvar o endereço do contrato no arquivo .env
with open(".env", "a") as env_file:
    env_file.write(f"\nCONTRACT_ADDRESS={contract_address}\n")
