'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext({
  locale: '',
  setLocale: () => { },
  t: (key) => key,
});

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState(''); // default آمن
  const [messages, setMessages] = useState({});

  // ✅ هنا بس نستخدم localStorage و navigator
  useEffect(() => {
    const storedLang = localStorage.getItem("lang");

    if (storedLang) {
      setLocale(storedLang);
    } else {
      const userLang =
        navigator.language || navigator.userLanguage;

      setLocale(userLang.split('-')[0]);
    }
  }, []);

  // تحميل الترجمة
  useEffect(() => {
    if (!locale) return;

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