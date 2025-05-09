// components/Header.tsx
// components/Header.tsx
import Head from "next/head";




function Header() {
  return (
    <>
      <Head>
        <title>Car Rental DApp</title>
        <meta name="description" content="Rent cars using blockchain technology" />
      </Head>
      <header className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Car Rental DApp</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded">
          Login/Register
        </button>
      </header>
    </>
  );
}

export default Header;
