"use client";

import { createContext, useContext, useState } from "react";

const CartDrawerOpenContext = createContext(undefined);

export function CartDrawerOpenProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartDrawerOpenContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen
      }}
    >
      {children}
    </CartDrawerOpenContext.Provider>
  );
}

export function useCartDrawerOpen() {
  const context = useContext(CartDrawerOpenContext);
  if (!context) {
    throw new Error("useCartDrawerOpenContext must be used within CartDrawerOpenProvider");
  }
  return context;
}


 
