'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

const LanguageContext = createContext({
  locale: 'ar',
  setLocale: () => {},
  t: (key) => key,
});

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState(null);
  const [messages, setMessages] = useState({});
  const [isLanguageReady, setIsLanguageReady] = useState(false);

  // تحديد اللغة من localStorage أو لغة المتصفح
  useEffect(() => {
    let savedLang = null;

    try {
      savedLang = localStorage.getItem('lang');
    } catch (error) {
      console.error('Unable to read saved language:', error);
    }

    const browserLang =
      typeof navigator !== 'undefined'
        ? navigator.language?.toLowerCase().split('-')[0]
        : 'ar';

    // اللغات المدعومة فقط
    const supportedLanguages = ['ar', 'en'];

    const initialLang = supportedLanguages.includes(savedLang)
      ? savedLang
      : supportedLanguages.includes(browserLang)
        ? browserLang
        : 'ar';

    setLocale(initialLang);
    setIsLanguageReady(true);
  }, []);

  // حفظ اللغة عند تغييرها
  useEffect(() => {
    if (!locale || !isLanguageReady) return;

    try {
      localStorage.setItem('lang', locale);
    } catch (error) {
      console.error('Unable to save language:', error);
    }
  }, [locale, isLanguageReady]);

  // تحميل ملف الترجمة
  useEffect(() => {
    if (!locale) return;

    let cancelled = false;

    const loadMessages = async () => {
      try {
        const response = await fetch(`/locales/${locale}.json`);

        if (!response.ok) {
          throw new Error(`Failed to load locale: ${locale}`);
        }

        const data = await response.json();

        if (!cancelled) {
          setMessages(data);
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Translation loading error:', error);
          setMessages({});
        }
      }
    };

    loadMessages();

    return () => {
      cancelled = true;
    };
  }, [locale]);

  // دالة الترجمة
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
        isLanguageReady,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};