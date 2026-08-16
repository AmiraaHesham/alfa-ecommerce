import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import { IdProvider } from "../context/idContext";
import { OrderDetailsProvider } from "../context/orderDetailsContext";
import { SearchInputProvider } from "../context/searshInputContext";
import { RefreshProvider } from "../context/refreshContext";
import { NamePageInAdminProvider } from "../context/namePageInAdmin";
import { ToastContainer } from "react-toastify";
import RTLController from './components/RTLController.jsx'

export default function RootLayout({ children }) {
   return (
    <html lang="ar" dir="rtl">
      <body >
        
        <ToastContainer
          position={"bottom-center"}/>

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
