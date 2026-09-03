"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import { useRefresh } from "../../../context/refreshContext";
import { getRequest } from "../../../utils/requestsUtils";
import { MdOutlineShoppingCart, MdClose } from "react-icons/md";
import { FiHeart } from "react-icons/fi";
import { PiListBold, PiUser, PiHouse } from "react-icons/pi";
import { RiShoppingBag4Fill, RiTruckLine } from "react-icons/ri";

export default function BottomNav() {
  const { t } = useLanguage();
  const navigate = useRouter();
  const { refreshKey } = useRefresh();
  const [itemNum, setItemNum] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const userId =
    typeof window !== "undefined" ? localStorage.getItem("id") : "";

  const getProductInCart = async () => {
    try {
      if (userId) {
        const res = await getRequest(`/api/shopCarts`);
        const rseData = res.data;
        setItemNum(rseData.itemLines.length);
      } else {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        setItemNum(cart.length);
      }
    } catch (err) {
      console.error("Failed to get product in cart", err);
    }
  };

  useEffect(() => {
    getProductInCart();
  }, [refreshKey]);

  const goToAccount = () => {
    if (userId) {
      navigate.push("/user/profile");
    } else {
      navigate.push("/signin");
    }
  };

  const menuLinks = [
    { href: "/user/home", label: t("homepage"), icon: <PiHouse /> },
    { href: "/user/wishlist", label: t("wishlist"), icon: <FiHeart /> },
    { href: "/user/cart", label: t("cart"), icon: <MdOutlineShoppingCart /> },
    { href: "/user/profile", label: t("my_account"), icon: <PiUser /> },
    { href: "/user/ordershistory", label: t("orders"), icon: <RiShoppingBag4Fill /> },
    { href: "/user/returnorders", label: t("returns"), icon: <RiTruckLine /> },
    { href: "/user/about", label: t("about_us") },
    { href: "/user/home#footer", label: t("contact_us") },
  ];

  return (
    <>
      <nav
        className="xs:flex lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-2px_8px_rgba(0,0,0,0.08)] pb-[env(safe-area-inset-bottom)]"
      >
        <div className="flex w-full h-16 max-w-lg mx-auto">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-1 text-gray-700"
          >
            <span className="text-[22px] leading-none">
              <PiListBold />
            </span>
            <span className="text-[11px] font-medium">{t("menu")}</span>
          </button>

          <Link
            href="/user/wishlist"
            className="flex-1 flex flex-col items-center justify-center gap-1 py-1 text-gray-700"
          >
            <span className="text-[22px] leading-none">
              <FiHeart />
            </span>
            <span className="text-[11px] font-medium">{t("wishlist")}</span>
          </Link>

          <Link
            href="/user/cart"
            className="flex-1 flex flex-col items-center justify-center gap-1 py-1 text-gray-700 relative"
          >
            <span className="relative text-[22px] leading-none">
              <MdOutlineShoppingCart />
              {itemNum > 0 && (
                <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-red-600 text-white text-[10px] font-semibold flex items-center justify-center leading-none">
                  {itemNum > 99 ? "99+" : itemNum}
                </span>
              )}
            </span>
            <span className="text-[11px] font-medium">{t("cart")}</span>
          </Link>

          <button
            type="button"
            onClick={goToAccount}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-1 text-gray-700"
          >
            <span className="text-[22px] leading-none">
              <PiUser />
            </span>
            <span className="text-[11px] font-medium">{t("my_account")}</span>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="xs:flex sm:hidden fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
          ></div>
          <div className="absolute top-0 bottom-0 left-0 w-72 max-w-[80%] bg-white shadow-xl flex flex-col transition-transform duration-300">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <span className="font-semibold text-gray-800">{t("menu")}</span>
              <MdClose
                className="w-6 h-6 text-gray-600 cursor-pointer"
                onClick={() => setMenuOpen(false)}
              />
            </div>
            <div className="flex flex-col p-3 gap-1 overflow-y-auto">
              {menuLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-100 text-sm"
                >
                  {link.icon && <span className="text-xl">{link.icon}</span>}
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
