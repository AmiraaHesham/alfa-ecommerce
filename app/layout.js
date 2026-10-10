import "./globals.css";

import { LanguageProvider } from "../context/LanguageContext";
import { IdProvider } from "../context/idContext";
import { OrderDetailsProvider } from "../context/orderDetailsContext";
import { SearchInputProvider } from "../context/searshInputContext";
import { RefreshProvider } from "../context/refreshContext";
import { NamePageInAdminProvider } from "../context/namePageInAdmin";
import { CartDrawerOpenProvider } from "../context/CartDrawerOpenContext";
import { ToastContainer } from "react-toastify";
import RTLController from './components/RTLController.jsx'
import GlobalErrorOverlay from './components/GlobalErrorOverlay.jsx'

import { cookies } from "next/headers";

export async function generateMetadata  () {
  const cookieStore =  cookies();
  const lang = cookieStore.get("lang")?.value || "ar";

  const isArabic = lang === "ar";

  return {
    title: isArabic
      ? "ألفا جروب للتقنية"
      : "Alfa Group Tech",

    description: isArabic
      ? "ألفا جروب للتقنية هو متجرك الإلكتروني لشراء أحدث الأجهزة والإلكترونيات. اكتشف تشكيلة متنوعة من المنتجات التقنية بأسعار مميزة وعروض تناسب احتياجاتك."
      : "Alfa Group Tech is your online destination for the latest electronics and technology products. Discover a wide range of products at great prices and find the best deals in one place.",

    keywords: isArabic
      ? [
          "ألفا جروب",
          "ألفا جروب للتقنية",
          "إلكترونيات",
          "أجهزة",
          "تسوق إلكتروني",
          "منتجات تقنية",
        ]
      : [
          "Alfa Group",
          "Alfa Group Tech",
          "electronics",
          "technology",
          "online shopping",
          "electronic products",
        ],

    icons: {
      icon: "/favicon.ico",
    },
  };
}

// import { Tajawal } from "next/font/google";

// const tajawal = Tajawal({
//   subsets: ["arabic", "latin"],
//   weight: ["400", "500", "700"],
// });
import { IBM_Plex_Sans_Arabic } from "next/font/google";

const plex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex",
});

import { Cairo } from "next/font/google";
import localFont from "next/font/local";

// const cairo = plex({
//   subsets: ["arabic", "latin"],
//   weight: ["400", "500", "600", "700"],
//   variable: "--font-cairo",
// });

const albertSans = localFont({
  src: "./font/AlbertSans-Regular.woff2",
  weight: "400",
  variable: "--font-albert-sans",
});

const urbanistSemiBold = localFont({
  src: "./font/Urbanist-SemiBold.woff2",
  weight: "600",
  variable: "--font-urbanist-semibold",
});

const urbanistBold = localFont({
  src: "./font/Urbanist-Bold.woff2",
  weight: "700",
  variable: "--font-urbanist-bold",
});

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${plex.variable} ${albertSans.variable} ${urbanistSemiBold.variable} ${urbanistBold.variable} bg-[#f6f5f8]`}
      >

        <ToastContainer
          position={"bottom-center"} />

        <LanguageProvider>
          <GlobalErrorOverlay />
          <RTLController>
            <IdProvider>

              <SearchInputProvider>
                <RefreshProvider>
                  <OrderDetailsProvider>
                    <CartDrawerOpenProvider>
                      <NamePageInAdminProvider>
                        {children}

                      </NamePageInAdminProvider>
                    </CartDrawerOpenProvider>

                  </OrderDetailsProvider>
                </RefreshProvider>
              </SearchInputProvider>
            </IdProvider>
          </RTLController>
        </LanguageProvider>
      </body>
    </html>
  );
}
