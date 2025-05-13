"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, { ...item, hours: 1 }]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
}


export function useCart() {
  return useContext(CartContext);
  if(!context){
    throw new Error("useCART MUST BE THERE ")
  }
   return context;
}
