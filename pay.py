from flask import Flask, request, jsonify
from web3 import Web3
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from flask_cors import CORS
from datetime import datetime
from urllib.parse import quote_plus

# Load environment variables from hello.env
load_dotenv(dotenv_path='hello.env')

app = Flask(__name__)
CORS(app)

# -------------------- Web3 Setup -------------------- #
INFURA_URL = os.getenv("INFURA_URL")
CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS")

if not INFURA_URL or not CONTRACT_ADDRESS:
    raise EnvironmentError("Missing INFURA_URL or CONTRACT_ADDRESS in hello.env")

w3 = Web3(Web3.HTTPProvider(INFURA_URL))

if not w3.is_connected():
    raise ConnectionError("Web3 is not connected. Check INFURA_URL or internet connection.")

try:
    contract_address = Web3.to_checksum_address(CONTRACT_ADDRESS)
except Exception as e:
    raise ValueError(f"Invalid CONTRACT_ADDRESS: {CONTRACT_ADDRESS}") from e

# -------------------- MongoDB Setup -------------------- #
MONGO_USER = quote_plus(os.getenv("MONGO_USER"))
MONGO_PASS = quote_plus(os.getenv("MONGO_PASS"))
MONGO_CLUSTER = os.getenv("MONGO_CLUSTER", "car-rentalsapp.uch9y16.mongodb.net")
MONGO_DBNAME = os.getenv("MONGO_DBNAME", "car-rentals")

if not MONGO_USER or not MONGO_PASS:
    raise EnvironmentError("Missing MongoDB username or password in hello.env")

mongo_uri = f"mongodb+srv://{MONGO_USER}:{MONGO_PASS}@{MONGO_CLUSTER}{MONGO_DBNAME}?retryWrites=true&w=majority"

# Connect to MongoDB Atlas
try:
    mongo = MongoClient(mongo_uri)
    db = mongo[MONGO_DBNAME]
    payments = db["payments"]
    print("Connected to MongoDB")
except Exception as e:
    print("MongoDB connection error:", e)
    raise ConnectionError("Could not connect to MongoDB Atlas") from e

# -------------------- Routes -------------------- #

@app.route("/pay", methods=["POST"])
def log_payment():
    try:

        data = request.get_json()
        print("Received payment data:", data)

        required_fields = ["carId", "amount", "userAddress", "txHash"]
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({"status": "error", "message": f"Missing fields: {', '.join(missing_fields)}"}), 400

        car_id = data["carId"]

        try:
            amount_eth = float(data["amount"])
        except ValueError:
            return jsonify({"status": "error", "message": "Invalid amount format"}), 400

        try:
            user_address = Web3.to_checksum_address(data["userAddress"])
        except Exception:
            return jsonify({"status": "error", "message": "Invalid Ethereum address"}), 400

        tx_hash = data["txHash"]

        try:
            timestamp = datetime.utcfromtimestamp(w3.eth.get_block("latest")["timestamp"])
        except Exception as e:
            print("Web3 error, using UTC:", str(e))
            timestamp = datetime.utcnow()

        payment_data = {
            "carId": car_id,
            "userAddress": user_address,
            "amount": amount_eth,
            "txHash": tx_hash,
            "timestamp": timestamp
        }

        result = payments.insert_one(payment_data)
        print(f"Document inserted with ID: {result.inserted_id}")

        return jsonify({"status": "logged"}), 200

    except Exception as e:
        print("Unexpected server error:", str(e))
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route("/", methods=["GET"])
def index():
    return jsonify({"message": "Flask server is running"}), 200

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3001, debug=True)
