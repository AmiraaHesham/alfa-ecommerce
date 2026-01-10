"use client";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import { useLanguage } from "../context/LanguageContext";
import {  useEffect } from "react";
import { Tajawal } from "next/font/google";
import { IdProvider } from '../context/idContext'; 
import { RefreshProvider } from '../context/refreshContext';
import { TableProvider } from '../context/tableContext';
import { ToastContainer } from "react-toastify";
// import { metadata } from "../utils/functions";

function RTLController({ children }) {
  const { locale } = useLanguage();

  useEffect(() => {
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
    localStorage.setItem("lang" ,locale)

  }, [locale]);

  return <>{children}</>;
}
// metadata

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-tajawal", 
});



export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body className="">
                   <ToastContainer
                  position={localStorage.lang==='ar'? 'bottom-left':'bottom-right'}
                   />

        <LanguageProvider>
          <RTLController>
                      <IdProvider>
        <RefreshProvider>
        {/* <TableProvider> */}

            {children}
            {/* </TableProvider> */}
            </RefreshProvider>
                </IdProvider>

            </RTLController>
        </LanguageProvider>
      </body>
    </html>
  );
}
