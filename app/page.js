// Add the "use client" directive at the top
"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Header from "./Header";

export default function Home() {
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState("");

  const Rentpage = () => {
    router.push('/rent'); // Navigate to Rent page
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error("Connection request rejected:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this feature.");
    }
  };

  return (
    <>
      <Header />
      <main className="bg-gray-50 text-gray-900">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center py-20 px-6">
          <h1 className="text-5xl font-bold mb-4">Rent a Car on the Blockchain</h1>
          <p className="text-lg text-gray-700 max-w-xl mb-6">
            Decentralized, transparent, and secure car rentals. Pay in ETH, get time-locked car access. No middlemen.
          </p>
          <div className="flex gap-4">
            <button
              onClick={connectWallet}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow inline-block">
              {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
            </button>

            <button
              onClick={Rentpage}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow inline-block">
              RENT
            </button>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-white text-center">
          <h2 className="text-3xl font-bold mb-10">How It Works</h2>
          <div className="flex flex-wrap justify-center gap-10 px-6">
            <div className="max-w-sm">
              <h3 className="text-xl font-semibold mb-2">1. Connect Wallet</h3>
              <p className="text-gray-600">Use MetaMask to authenticate and get started.</p>
            </div>
            <div className="max-w-sm">
              <h3 className="text-xl font-semibold mb-2">2. Choose a Car</h3>
              <p className="text-gray-600">Browse available cars and select your rental duration.</p>
            </div>
            <div className="max-w-sm">
              <h3 className="text-xl font-semibold mb-2">3. Pay in ETH</h3>
              <p className="text-gray-600">Smart contracts handle secure and trustless payments.</p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-100 text-center px-6">
          <h2 className="text-3xl font-bold mb-10">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <FeatureCard title="Decentralized Access" description="No third parties. Fully trustless system." />
            <FeatureCard title="Time-Locked Control" description="Access to car is limited to your rental time." />
            <FeatureCard title="GPS Lock (Optional)" description="Control ignition via oracles and GPS integration." />
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white text-center py-6 mt-10 shadow-inner">
          <p className="text-sm text-gray-500">© 2025 Car Rental DApp. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
