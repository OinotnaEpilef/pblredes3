from flask import Flask, jsonify, request
from web3 import Web3
from database.models import session, Event, User
from config import GANACHE_URL, CONTRACT_COMPILED_PATH, CONTRACT_ADDRESS
import json
from flask_cors import CORS

app = Flask(__name__)
w3 = Web3(Web3.HTTPProvider(GANACHE_URL))
CORS(app)

# Load the contract
with open(CONTRACT_COMPILED_PATH, 'r') as file:
    contract_data = json.load(file)
contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=contract_data['abi'])

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']

    user = session.query(User).filter_by(username=username).first()
    if not user:
        new_user = User(username=username, balance=100.0)
        session.add(new_user)
        session.commit()
        return jsonify({"message": "User created", "username": username, "balance": 100.0})
    return jsonify({"message": "User connected", "username": username, "balance": user.balance})

@app.route('/events', methods=['GET'])
def get_events():
    events = session.query(Event).all()
    return jsonify([{"id": e.id, "description": e.description, "side_a": e.side_a, "side_b": e.side_b, "odds_a": e.odds_b, "status": e.status, "result": e.result} for e in events])

@app.route('/events', methods=['POST'])
def create_event():
    data = request.json
    description = data['description']
    side_a = data['side_a']
    side_b = data['side_b']
    odds_a = data['odds_a']
    odds_b = data['odds_b']

    tx_hash = contract.functions.createEvent(description).transact({'from': w3.eth.accounts[0]})
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

    new_event = Event(description=description, side_a=side_a, side_b=side_b, odds_a=odds_a, odds_b=odds_b)
    session.add(new_event)
    session.commit()
    return jsonify({"estatus": "success", "event_id": new_event.id})

@app.route('/bet', methods=['POST'])
def place_bet():
    data = request.json
    event_id = data['event_id']
    choice = data['choice']
    amount = data['amount']

    event = session.query(Event).filter_by(id=event_id).first()
    if not event or not event.status:
        return jsonify({"error": "Invalid event"}), 400

    tx_hash = contract.functions.placeBet(event_id, choice).transact({'from': w3.eth.accounts[0], 'value': amount})
    w3.eth.wait_for_transaction_receipt(tx_hash)
    return jsonify({"status": "bet placed"})

if __name__ == '__main__':
    app.run(debug=True, port=5001)