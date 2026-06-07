"use client";
import { use, useEffect } from "react";
import { useLanguage } from "../../../context/LanguageContext.js";
import { postRequest } from "../../../utils/requestsUtils.js";
import { useNamePageInAdminContext } from "../../../context/namePageInAdmin.jsx";

export default function Header({ page_title }) {
  const { locale, setLocale } = useLanguage();
  const { selectedNamePage, setSelectedNamePage } = useNamePageInAdminContext();
  const { t } = useLanguage();

  switch (selectedNamePage) {
    case "Categories Management":
      setSelectedNamePage("categories_management");
      break;
    case "Products Management":
      setSelectedNamePage("products_management");

      break;
    case "Orders Management":
      setSelectedNamePage("orders_management");
      break;
    case "Dashboard Overview":
      setSelectedNamePage("dashboard_overview");
      break;
    case "Homepage Management":
      setSelectedNamePage("homepage_management");
      break;
    case "Users Management":
      setSelectedNamePage("users_management");
      break;
    case "Admins Management":
      setSelectedNamePage("admins_management");
      break;
    case "Contact Management":
      setSelectedNamePage("contact_management");
      break;
    case "Returns Management":
      setSelectedNamePage("returns_management");
      break;
       case "ShippingCost Management":
      setSelectedNamePage("ShippingCost_management");
      break;
  }

  const userId =
    typeof window !== "undefined" ? localStorage.getItem("id") : "";

  const changeLanguage = async () => {
    await postRequest(`/api/users/${userId}/langauge/${locale}`, "", "");
  };
  const lang =
    typeof window !== "undefined" ? localStorage.getItem("lang") : "";
  useEffect(() => {
    let en = document.querySelector("#en");
    let ar = document.querySelector("#ar");

    if (lang === "en") {
      en.classList.add("bg-red-600");
      ar.classList.add("bg-red-200");

      en.classList.remove("bg-red-200");
      ar.classList.remove("bg-red-600");
    } else {
      ar.classList.add("bg-red-600");
      en.classList.add("bg-red-200");
      en.classList.remove("bg-red-600");
      ar.classList.remove("bg-red-200");
    }
  });

  return (
    <header className="md:h-[70px] xs:h-[50px] flex justify-between items-center px-5 font-semibold w-full bg-white  border-b-[1px]">
      <h1 id="page-title" className="md:text-2xl xs:text-lg ">
        {t(selectedNamePage)}
      </h1>
      <div className="gap-2 flex xs:text-[10px] md:text-sm ">
        <button
          id="en"
          className=" p-2 rounded-md text-white"
          onClick={() => {
            setLocale("en");
            changeLanguage();
          }}
        >
          English
        </button>
        <button
          id="ar"
          className=" p-2 rounded-md text-white "
          onClick={() => {
            setLocale("ar");
            changeLanguage();
          }}
        >
          العربية
        </button>
      </div>
    </header>
  );
}
