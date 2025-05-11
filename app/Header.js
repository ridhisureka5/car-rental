// components/Header.tsx
// components/Header.tsx
"use client";
import Head from "next/head";


import { useRouter } from 'next/navigation';


function Header() {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/login");
  }
  return (
    <>
      <Head>
        <title>Car Rental DApp</title>
        <meta name="description" content="Rent cars using blockchain technology" />
      </Head>
      <header className="w-full bg-slate-800 shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">RentX</h1>
        <button 
        onClick={handleLogin}
        className="bg-slate-900 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded">
          Login/Register
        </button>
      </header>
    </>
  );
}

export default Header;
