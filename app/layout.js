"use client";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import { useLanguage } from "../context/LanguageContext";
import {  useEffect } from "react";
import { Tajawal } from "next/font/google";
import { IdProvider } from '../context/idContext'; // ← المسار يعتمد على مكان حفظ الملف
import { RefreshProvider } from '../context/refreshContext';


function RTLController({ children }) {
  const { locale } = useLanguage();

  useEffect(() => {
    document.documentElement.dir = locale === "en" ? "ltr" : "rtl";
    document.documentElement.lang = locale;
    localStorage.setItem("lang" ,locale)
  }, [locale]);

  return <>{children}</>;
}

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-tajawal", // لاستخدامه كـ CSS Variable
});

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" className={tajawal.variable}>
      <body className="">
       
        <LanguageProvider>
          <RTLController>
                      <IdProvider>
        <RefreshProvider>

            {children}
            </RefreshProvider>
                </IdProvider>

            </RTLController>
        </LanguageProvider>
      </body>
    </html>
  );
}
