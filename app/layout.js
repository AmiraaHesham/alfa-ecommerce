"use client";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import { useLanguage } from "../context/LanguageContext";
import { ReactNode, useEffect } from "react";
import { Tajawal } from "next/font/google";


function RTLController({ children }) {
  const { locale } = useLanguage();

  useEffect(() => {
    document.documentElement.dir = locale === "en" ? "ltr" : "rtl";
    document.documentElement.lang = locale;
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
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body className="font-sans">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var lang = localStorage.getItem('lang') || 'ar';
                document.documentElement.lang = lang;
                document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
              })();
            `,
          }}
        />
        <LanguageProvider>
          <RTLController>{children}</RTLController>
        </LanguageProvider>
      </body>
    </html>
  );
}
