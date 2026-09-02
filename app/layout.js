import "./globals.css";

import { LanguageProvider } from "../context/LanguageContext";
import { IdProvider } from "../context/idContext";
import { OrderDetailsProvider } from "../context/orderDetailsContext";
import { SearchInputProvider } from "../context/searshInputContext";
import { RefreshProvider } from "../context/refreshContext";
import { NamePageInAdminProvider } from "../context/namePageInAdmin";
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
// import { IBM_Plex_Sans_Arabic } from "next/font/google";

// const plex = IBM_Plex_Sans_Arabic({
//   subsets: ["arabic", "latin"],
//   weight: ["400", "500", "600", "700"],
// });

import { Cairo } from "next/font/google";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className} >

        <ToastContainer
          position={"bottom-center"} />

        <LanguageProvider>
          <RTLController>
            <IdProvider>

              <SearchInputProvider>
                <RefreshProvider>
                  <OrderDetailsProvider>
                    <NamePageInAdminProvider>
                      {children}

                    </NamePageInAdminProvider>

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
