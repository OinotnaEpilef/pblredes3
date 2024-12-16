from flask import Flask, jsonify, request
from web3 import Web3
from database.models import session, Event
from config import GANACHE_URL, CONTRACT_COMPILED_PATH

app = Flask(__name__)
w3 = Web3(Web3.HTTPProvider(GANACHE_URL))

# Load the contract
with open(CONTRACT_COMPILED_PATH, 'r') as file:
    contract_data = json.load(file)
contract = w3.eth.contract(address=None, abi=contract_data['abi'])

@app.route('/events', methods=['GET'])
def get_events():
    events = session.query(Event).all()
    return jsonify([{"id": e.id, "description": e.description, "odds": e.odds, "status": e.status} for e in events])

@app.route('/events', methods=['POST'])
def create_event():
    data = request.json
    description = data['description']
    tx_hash = contract.functions.createEvent(description).transact({'from': w3.eth.accounts[0]})
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

    new_event = Event(description=description, odds=2.00)  # Odds iniciais fixas
    session.add(new_event)
    session.commit()
    return jsonify({"status": "success", "event_id": new_event.id})

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
    app.run(debug=True)