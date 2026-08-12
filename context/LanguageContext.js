'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext({
  locale: 'ar',
  setLocale: () => {},
  t: (key) => key,
});

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState(null);
  const [messages, setMessages] = useState({});

  // قراءة اللغة الأساسية من localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('lang');

    if (savedLang) {
      setLocale(savedLang);
    } else {
      localStorage.setItem('lang', 'ar');
      setLocale('ar');
    }
  }, []);

  // حفظ اللغة عند تغييرها
  useEffect(() => {
    if (!locale) return;

    localStorage.setItem('lang', locale);
  }, [locale]);

  // تحميل الترجمة
  useEffect(() => {
    if (!locale) return;

    fetch(`/locales/${locale}.json`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load locale: ${locale}`);
        }

        return res.json();
      })
      .then((data) => {
        setMessages(data);
      })
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
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        t,
      }}
    >
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