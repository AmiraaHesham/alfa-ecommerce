// IdContext.jsx
'use client';

import { createContext, useContext, useState } from 'react';

const IdContext = createContext(undefined);
const nameEnContext = createContext(undefined);
const nameArContext = createContext(undefined);
const photoContext = createContext(undefined);

export function IdProvider({ children }) {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedNameEn, setSelectedNameEn] = useState(null);
  const [selectedNameAr, setSelectedNameAr] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <IdContext.Provider value={{ selectedId, setSelectedId ,selectedNameAr,setSelectedNameAr ,selectedNameEn ,setSelectedNameEn ,selectedPhoto ,setSelectedPhoto}}>
      {children}
    </IdContext.Provider>
  );
}

export function useIdContext() {
  const context = useContext(IdContext);
  if (!context) {
    throw new Error('useIdContext must be used within IdProvider');
  }
  return context;
}