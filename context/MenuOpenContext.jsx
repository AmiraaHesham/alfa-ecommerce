"use client";

import { createContext, useContext, useState, useCallback } from "react";

const MenuOpenContext = createContext(undefined);

export function MenuOpenProvider({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = useCallback(() => setIsMenuOpen(true), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  return (
    <MenuOpenContext.Provider
      value={{
        isMenuOpen,
        openMenu,
        closeMenu,
        toggleMenu,
      }}
    >
      {children}
    </MenuOpenContext.Provider>
  );
}

export function useMenuOpen() {
  const context = useContext(MenuOpenContext);
  if (!context) {
    throw new Error("useMenuOpen must be used within MenuOpenProvider");
  }
  return context;
}