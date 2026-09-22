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

export const metadata = {
  title: "alfagrouptech.com",
  description: "Alfa Group - Shop the latest products and best deals.",
  keywords: ["Alfa Group", "e-commerce", "online shopping", "products"],
  icons: {
    icon: "/favicon.ico",
  },
};


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
