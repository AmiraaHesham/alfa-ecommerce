'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext({
  locale: 'ar',
  setLocale: () => {},
  t: (key) => key,
});

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState('ar');
  const [messages, setMessages] = useState({});

  useEffect(() => {
    fetch(`/locales/${locale}.json`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error('Failed to load locale:', err));
  }, [locale]);

  const t = (key) => messages[key] || key;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};