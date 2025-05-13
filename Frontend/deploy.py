from web3 import Web3
import json
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path='hello.env')

# Load wallet and Infura provider
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
PUBLIC_KEY = Web3.to_checksum_address(os.getenv("PUBLIC_KEY"))
INFURA_URL = os.getenv("INFURA_URL")

print(f"Private Key: {PRIVATE_KEY}")
print(f"Public Key: {PUBLIC_KEY}")
print(f"Infura URL: {INFURA_URL}")

# Initialize Web3 instance
w3 = Web3(Web3.HTTPProvider(INFURA_URL))
assert w3.is_connected(), "Web3 is not connected"

# Load the ABI and bytecode from the compiled contract JSON
with open("RentalPayment.json", "r") as file:
    contract_data = json.load(file)

abi = contract_data["abi"]
bytecode = contract_data["bytecode"]

# Create contract object
RentalContract = w3.eth.contract(abi=abi, bytecode=bytecode)

# Build deployment transaction
nonce = w3.eth.get_transaction_count(PUBLIC_KEY)
transaction = RentalContract.constructor().build_transaction({
    "from": PUBLIC_KEY,
    "nonce": nonce,
    "gas": 1500000,
    "gasPrice": w3.to_wei("10", "gwei")
})
balance = w3.eth.get_balance(PUBLIC_KEY)
print(f"Balance: {w3.from_wei(balance, 'ether')} ETH")

try:
    # Sign and send the transaction
    signed_tx = w3.eth.account.sign_transaction(transaction, PRIVATE_KEY)
    print(signed_tx)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)

    # Wait for the transaction receipt
    print(f"Deploying contract... TX hash: {tx_hash.hex()}")
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print(f"✅ Contract deployed at: {tx_receipt.contractAddress}")

except Exception as e:
    print(f"An error occurred: {e}")
