"use client";
import { useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function RTLController({ children }) {
  const { locale } = useLanguage();

  useEffect(() => {
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
    localStorage.setItem("lang", locale);
  }, [locale]);

  return <>{children}</>;
}
