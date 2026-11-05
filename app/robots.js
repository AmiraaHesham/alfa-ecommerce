import { SITE_URL } from "../lib/seo";

export const SITEMAP_PATH = "/sitemap.xml";

// Private, transactional, search and duplicate-content routes. Public product,
// category, home, about, image and Next.js asset paths must remain crawlable.
export const DISALLOW_PATHS = [
  "/admin/",
  "/api/",
  "/signin",
  "/signup",
  "/forgotpassword",
  "/confirmedemail",
  "/email-failed",
  "/checkout",
  "/user/cart",
  "/user/profile",
  "/user/wishlist",
  "/user/ordershistory",
  "/user/orderdetails/",
  "/user/returnorders",
  "/user/returnorderdetails/",
  "/user/search/",
  "/__reviews-preview",
];

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW_PATHS,
      },
    ],
    sitemap: `${SITE_URL}${SITEMAP_PATH}`,
  };
}
