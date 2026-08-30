import "./globals.css";

import { LanguageProvider } from "../context/LanguageContext";
import { IdProvider } from "../context/idContext";
import { OrderDetailsProvider } from "../context/orderDetailsContext";
import { SearchInputProvider } from "../context/searshInputContext";
import { RefreshProvider } from "../context/refreshContext";
import { NamePageInAdminProvider } from "../context/namePageInAdmin";
import { ToastContainer } from "react-toastify";
import RTLController from './components/RTLController.jsx'
// import { Roboto } from "next/font/google";

// const roboto = Roboto({
//   subsets: ["latin"],
//   weight: ["400", "500", "700"],
// });
// import { Poppins } from "next/font/google";

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
// });
export const metadata = {
  title: "Alfa Group | E-commerce",
  description: "Alfa Group - Shop the latest products and best deals.",
  keywords: ["Alfa Group", "e-commerce", "online shopping", "products"],
  icons: {
    icon: "/favicon.ico",
  },
};

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={montserrat.className} >

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
