// context/LanguageContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState('ar');
  const [messages, setMessages] = useState({});

  useEffect(() => {
    fetch(`/locales/${locale}.json`)
      .then(res => res.json())
      .then(data => setMessages(data));
  }, [locale]);

  const t = (key) => messages[key] || key; // إذا لم يُوجد المفتاح، يُعيد المفتاح نفسه

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};