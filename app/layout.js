import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import { IdProvider } from "../context/idContext";
import { OrderDetailsProvider } from "../context/orderDetailsContext";
import { SearchInputProvider } from "../context/searshInputContext";
import { RefreshProvider } from "../context/refreshContext";
import { NamePageInAdminProvider } from "../context/namePageInAdmin";
import { ToastContainer } from "react-toastify";
import RTLController from './components/RTLController.jsx'

import Image from "next/image";
// import { metadata } from "../utils/functions";


// metadata

// const cairo = Cairo({
//   subsets: ['arabic', 'latin'],
//   weight: ['200', '300', '400', '600', '700', '800', '900'],
//   variable: '--font-cairo',
// });

export default function RootLayout({ children }) {
   const lang = typeof window !== 'undefined'? localStorage.getItem("lang"):'';

   

  return (
    <html lang={lang} dir={lang == "ar"? "rtl" : "ltr"} >
      <body >
        
        <ToastContainer
          position={lang === "ar" ? "bottom-left" : "bottom-right"}/>

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
