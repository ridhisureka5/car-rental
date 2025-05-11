"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, provider, signInWithPopup } from '../lib/firebase';

export default function Login() {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem('authenticated', 'true');
      localStorage.setItem('user', JSON.stringify({ name: user.displayName, email: user.email }));
      router.push('/');
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated');
    if (isAuthenticated) router.push('/');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="bg-slate-800 p-8 rounded shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Sign in to RentX</h2>
        <button
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
