"use client";
import { useCart } from "./CartContext";
import { useState, useEffect } from "react";
import Web3 from "web3";


export default function CartPage() {
  const { cartItems, setCartItems } = useCart();
  const [loading, setLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  // Define the ABI here for your contract
  const contractAddress = "0x03A0A4992eA2BD969Fac0122E5Cea1b356f44CA9"; // Replace this with your deployed contract address
  const abi = [
    {
      "inputs": [],
      "name": "payForRental",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  // Check if the current account is the contract owner
  useEffect(() => {
    const checkOwner = async () => {
      if (typeof window.ethereum === "undefined") return;

      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const userAddress = accounts[0];

      const contract = new web3.eth.Contract(abi, contractAddress);

      try {
        const owner = await contract.methods.owner().call();
        console.log("Contract Owner:", owner);  // Log the owner address
        console.log("Current User Address:", userAddress);  // Log the current user address
        setIsOwner(owner.toLowerCase() === userAddress.toLowerCase());
      } catch (err) {
        console.error("Failed to fetch owner:", err);
      }
    };

    checkOwner();
  }, []); // Empty dependency array ensures this runs only once

  const updateHours = (index, hours) => {
    const updated = [...cartItems];
    updated[index].hours = Math.max(1, Math.min(720, hours));
    setCartItems(updated);
  };

  const removeItem = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.cost * (item.hours || 1),
    0
  );

  const handlePayNow = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("Please install MetaMask.");
      return;
    }
  
    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const accounts = await web3.eth.getAccounts();
    const userAddress = accounts[0];
  
    const contract = new web3.eth.Contract(abi, contractAddress);
  
    try {
      // 1. Send payment transaction via MetaMask
      console.log("Transaction params:", {
        from: userAddress,
        value: web3.utils.toWei(total.toString(), "ether"),
      });
      const tx = await contract.methods.payForRental().send({
        from: userAddress,
        value: web3.utils.toWei(total.toString(), "ether"),
      });
      console.log("Transaction successful:", tx);
    
      // 2. Log the transaction manually to Flask backend
      const response = await fetch("http://127.0.0.1:3000/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: userAddress,
          to: contractAddress,
          amount: total,
          tx_hash: tx.transactionHash,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        alert("Payment successful and logged!");
      } else {
        console.error("Server error:", result.message);
        alert(`Payment failed: ${result.message}`);
      }
    }catch (err) {
      console.error("Payment failed:", err);
      alert("Payment failed. Check console.");
    }
  };
  

  const handleWithdraw = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("Please install MetaMask.");
      return;
    }

    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const accounts = await web3.eth.getAccounts();
    const userAddress = accounts[0];

    const contract = new web3.eth.Contract(abi, contractAddress);

    try {
      const tx = await contract.methods.withdraw().send({
        from: userAddress,
      });

      alert("Withdrawal successful! TX: " + tx.transactionHash);
    } catch (err) {
      console.error("Withdraw failed:", err);
      alert("Withdrawal failed. Are you the contract owner?");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded shadow flex flex-col gap-2"
            >
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-600">Rate: {item.cost} ETH/hr</p>
              <p className="text-sm text-gray-500">
                Time-Locked: {item.timeLocked ? "Yes" : "No"}
              </p>

              {/* Quantity Control (Increase/Decrease Hours) */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Rental Duration:</label>
                <button
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() => updateHours(index, (item.hours || 1) - 1)}
                >
                  -
                </button>
                <span className="px-2">{item.hours || 1} hrs</span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() => updateHours(index, (item.hours || 1) + 1)}
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <div className="text-right text-blue-700 font-semibold">
                Subtotal: {(item.cost * (item.hours || 1)).toFixed(2)} ETH
              </div>

              {/* Remove */}
              <button
                onClick={() => removeItem(index)}
                className="text-red-500 hover:underline text-sm mt-2 self-end"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total and Pay Now */}
          <div className="text-right font-bold text-xl mt-4">
            Total: {total.toFixed(2)} ETH
          </div>
          <div className="text-right">
            <button
              onClick={handlePayNow}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg mt-2"
            >
              Pay Now
            </button>
          </div>
          {isOwner && (
            <div className="text-right">
              <button
                onClick={handleWithdraw}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg mt-2"
              >
                Withdraw Funds
              </button>
            </div>
          )}
          {!isOwner && <p className="text-center text-red-500 mt-4">.</p>}
        </div>
      )}
    </div>
  );
}

