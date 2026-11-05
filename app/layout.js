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

import {
  SITE_URL,
  SITE_NAME_AR,
  SITE_NAME_EN,
  DEFAULT_OG_IMAGE,
  buildOrganizationJsonLd,
  buildWebsiteJsonLd,
  serializeJsonLd,
} from "../lib/seo";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME_AR} | ${SITE_NAME_EN}`,
    template: `%s | ${SITE_NAME_AR}`,
  },
  description:
    "ألفا جروب للتقنية هو متجرك الإلكتروني لشراء أحدث الأجهزة والإلكترونيات. اكتشف تشكيلة متنوعة من المنتجات التقنية بأسعار مميزة وعروض تناسب احتياجاتك.",
  keywords: [
    "ألفا جروب",
    "ألفا جروب للتقنية",
    "إلكترونيات",
    "أجهزة",
    "تسوق إلكتروني",
    "منتجات تقنية",
  ],
  applicationName: SITE_NAME_AR,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: SITE_URL,
    siteName: SITE_NAME_AR,
    title: `${SITE_NAME_AR} | ${SITE_NAME_EN}`,
    description:
      "اكتشف أحدث الأجهزة والإلكترونيات بأسعار مميزة من ألفا جروب تكنولوجي.",
    images: [{ url: DEFAULT_OG_IMAGE, alt: SITE_NAME_AR }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME_AR} | ${SITE_NAME_EN}`,
    description:
      "اكتشف أحدث الأجهزة والإلكترونيات بأسعار مميزة من ألفا جروب تكنولوجي.",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
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
  display: "optional",
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
  display: "optional",
  preload: false,
});

const urbanistSemiBold = localFont({
  src: "./font/Urbanist-SemiBold.woff2",
  weight: "600",
  variable: "--font-urbanist-semibold",
  display: "optional",
  preload: false,
});

const urbanistBold = localFont({
  src: "./font/Urbanist-Bold.woff2",
  weight: "700",
  variable: "--font-urbanist-bold",
  display: "optional",
  preload: false,
});

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${plex.variable} ${albertSans.variable} ${urbanistSemiBold.variable} ${urbanistBold.variable} bg-[#f6f5f8]`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(buildOrganizationJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(buildWebsiteJsonLd()),
          }}
        />

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
