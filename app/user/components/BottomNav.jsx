"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import { useRefresh } from "../../../context/refreshContext";
import { getRequest } from "../../../utils/requestsUtils";
import { getCategories } from "../../../utils/functions";
import {
  MdOutlineShoppingCart,
  MdDevices,
  MdOutlineKitchen,
  MdYard,
  MdChildCare,
  MdOutlineSpa,
} from "react-icons/md";
import { FiHeart } from "react-icons/fi";
import { PiListBold, PiUser, PiHouse, PiSquaresFour } from "react-icons/pi";
import { RiShoppingBag4Fill, RiTruckLine } from "react-icons/ri";

const getCategoryIcon = (name) => {
  const n = (name || "").toLowerCase();
  if (n.includes("electron")) return <MdDevices />;
  if (n.includes("appliance")) return <MdOutlineKitchen />;
  if (n.includes("home") || n.includes("garden") || n.includes("furniture"))
    return <MdYard />;
  if (n.includes("baby") || n.includes("kid") || n.includes("toy") || n.includes("children"))
    return <MdChildCare />;
  if (n.includes("beauty") || n.includes("care") || n.includes("cosme") || n.includes("spa"))
    return <MdOutlineSpa />;
  return <PiSquaresFour />;
};

export default function BottomNav() {
  const { t ,locale} = useLanguage();
  const navigate = useRouter();
  const { refreshKey } = useRefresh();
  const [itemNum, setItemNum] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("categories");
  const [categoriesList, setCategoriesList] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  const openMenu = () => {
    setMenuOpen(true);
    setActiveTab("categories");
    if (!categoriesList.length) getCategoriesList();
  };

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

  const getCategoriesList = async () => {
    try {
      setCategoriesLoading(true);
      const res = await getCategories();
      setCategoriesList(res.data.content || []);
    } catch (err) {
      console.error("Failed to get categories", err);
    } finally {
      setCategoriesLoading(false);
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
        className={`"xs:flex lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-2px_8px_rgba(0,0,0,0.08)] pb-[env(safe-area-inset-bottom)]"`}
      >
        <div className="flex w-full h-16 max-w-lg mx-auto">
          <button
            type="button"
            onClick={openMenu}
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
          <div
            className={`absolute top-0 bottom-0 ${
              locale === "ar" ? "right-0" : "left-0"
            } w-80 max-w-[50%] pt-5 bg-white flex flex-col`}
          >
            <div className="flex w-full border-b border-gray-300 shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab("categories")}
                className={`flex-1 h-12 flex items-center justify-center text-sm font-semibold uppercase tracking-wide transition-colors ${
                  activeTab === "categories"
                    ? "bg-gray-200 text-gray-900 border-b-2 border-red-600"
                    : "bg-gray-100 text-gray-500 border-b-2 border-transparent"
                }`}
              >
                {t("categories")}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("menu")}
                className={`flex-1 h-12 flex items-center justify-center text-sm font-semibold uppercase tracking-wide transition-colors ${
                  activeTab === "menu"
                    ? "bg-gray-200 text-gray-900 border-b-2 border-red-600"
                    : "bg-gray-100 text-gray-500 border-b-2 border-transparent"
                }`}
              >
                {t("menu")}
              </button>
            </div>

            {activeTab === "categories" ? (
              <div className="flex-1 overflow-y-auto bg-white">
                <Link
                  href="/user/products/category/all/null"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 h-14 border-b border-gray-200"
                >
                  <span className="text-2xl text-gray-500 shrink-0">
                    <PiSquaresFour />
                  </span>
                  <span className="text-sm font-semibold text-gray-800">
                    {t("all")}
                  </span>
                </Link>
                {categoriesLoading ? (
                  [...Array(4)].map((_, i) => (
                    <div
                      key={`cat-skeleton-${i}`}
                      className="h-14 border-b border-gray-200 bg-gray-100 animate-pulse"
                    ></div>
                  ))
                ) : (
                  categoriesList.map((item) => (
                    <Link
                      key={item.itemCategoryId}
                      href={`/user/products/category/${encodeURIComponent(
                        item.nameEn
                      )}/${item.itemCategoryId}`}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 h-14 border-b border-gray-200 hover:bg-gray-50"
                    >
                      <span className="text-2xl text-gray-500 shrink-0">
                        {getCategoryIcon(item.nameEn)}
                      </span>
                      <span className="text-sm font-semibold text-gray-800">
                        {locale === "ar" ? item.nameAr : item.nameEn}
                      </span>
                    </Link>
                  ))
                )}
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto bg-white py-2">
                {menuLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-200 hover:bg-gray-50"
                  >
                    {link.icon && (
                      <span className="text-xl text-gray-600 shrink-0">
                        {link.icon}
                      </span>
                    )}
                    <span className="text-sm font-semibold text-gray-800">
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
