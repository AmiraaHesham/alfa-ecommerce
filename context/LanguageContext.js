'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext({
  locale: '',
  setLocale: () => {},
  t: (key) => key,
});

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState("");
  const [messages, setMessages] = useState({});

  // ✅ تحديد اللغة أول مرة
  useEffect(() => {
    const storedLang = localStorage.getItem("lang");

    if (storedLang && ["ar", "en"].includes(storedLang)) {
      setLocale(storedLang);
    } else {
      const browserLang = navigator.language?.split('-')[0];

      if (["ar", "en"].includes(browserLang)) {
        setLocale(browserLang);
      } else {
        setLocale("ar"); // fallback
      }
    }
  }, []);

  // ✅ حفظ اللغة
  useEffect(() => {
    if (locale) {
      localStorage.setItem("lang", locale);
    }
  }, [locale]);

  // ✅ تحميل الترجمة
  useEffect(() => {
    if (!locale) return;
console.log("Loading messages for locale:", locale);
    fetch(`/locales/${locale}.json`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch(() => setMessages({}));
  }, [locale]);

  const t = (key) => messages[key] || key;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};