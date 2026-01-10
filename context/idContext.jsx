// IdContext.jsx
"use client";

import { createContext, useContext, useState } from "react";

const IdContext = createContext(undefined);

export function IdProvider({ children }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedImgesSliders, setSelectedImagesSliders] = useState([]);
 

  return (
    <IdContext.Provider
      value={{
        selectedCategoryId,
        setSelectedCategoryId,
        selectedProductId,
        setSelectedProductId,
        selectedAdminId,
        setSelectedAdminId,
        selectedUserId,
        setSelectedUserId,
        selectedOrderId,
        setSelectedOrderId,
        selectedImgesSliders,
        setSelectedImagesSliders
      }}
    >
      {children}
    </IdContext.Provider>
  );
}

export function useIdContext() {
  const context = useContext(IdContext);
  if (!context) {
    throw new Error("useIdContext must be used within IdProvider");
  }
  return context;
}
