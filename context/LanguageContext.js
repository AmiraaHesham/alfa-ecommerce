'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext({
  locale: 'ar',
  setLocale: () => {},
  t: (key) => key,
});
const lang = typeof window !== "undefined" ? localStorage.getItem("lang") : "ar";

const  CurrentTranslation = lang === "undefined"|| lang === null ? navigator.language.split('-')[0] : lang;
export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState(CurrentTranslation);
  const [messages, setMessages] = useState({});

  // ✅ تحديد اللغة أول مرة
  // useEffect(() => {
  //   const storedLang = localStorage.getItem('lang');
  //   const supportedLangs = ['ar', 'en'];

  //   if (storedLang && supportedLangs.includes(storedLang)) {
  //     setLocale(storedLang);
  //   } else {
  //     const browserLang = navigator.language?.split('-')[0];
  //     setLocale(supportedLangs.includes(browserLang) ? browserLang : 'ar');
  //   }
  // }, []);

  // ✅ حفظ اللغة
  useEffect(() => {
    localStorage.setItem('lang', locale);
  }, [locale]);

  // ✅ تحميل الترجمة
  useEffect(() => {
    if (!locale) return;

    fetch(`/locales/${locale}.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load locale: ${locale}`);
        return res.json();
      })
      .then((data) => setMessages(data))
      .catch((error) => {
        console.error(error);
        setMessages({});
      });
  }, [locale]);

  const t = (key) => {
    if (!key) return '';
    return messages[key] ?? key;
  };

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
}