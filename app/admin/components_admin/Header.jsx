"use client";
import { use, useEffect } from "react";
import { useLanguage } from "../../../context/LanguageContext.js";
import { postRequest } from "../../../utils/requestsUtils.js";

export default function Header({ page_title }) {
  const { locale, setLocale } = useLanguage();
  const { t } = useLanguage();
  
  switch (page_title) {
    case "Categories Management":
      page_title="categories_management";
      break;
    case "Products Management":
           page_title="products_management";
      
      break;
    case "Orders Management":
            page_title= "orders_management";
      break;
      case "Dashboard Overview":
            page_title= "dashboard_overview";
      break;
      case "Homepage Management":
            page_title= "homepage_management";
      break;
      case "Users Management":
            page_title= "users_management";
      break;
      case "Admins Management":
            page_title= "admins_management";
      break;
      case "Contact Management":
            page_title= "contact_management";
      break;
  }

  // const language =()=>{
  //   await postRequest(`/api/users/${userId}/langauge/${language}`)
  // }

  useEffect(() => {
    let en = document.querySelector("#en");
    let ar = document.querySelector("#ar");

    if (localStorage.lang === "en") {
      en.classList.add("bg-blue-600");
      ar.classList.add("bg-blue-200");

      en.classList.remove("bg-blue-200");
      ar.classList.remove("bg-blue-600");
    } else {
      ar.classList.add("bg-blue-600");
      en.classList.add("bg-blue-200");
      en.classList.remove("bg-blue-600");
      ar.classList.remove("bg-blue-200");
    }
  });

  return (
    <header className="md:h-[70px] xs:h-[50px] flex justify-between items-center px-5 font-semibold w-full bg-white  border-b-[1px]">
      <h1 id="page-title" className="md:text-2xl xs:text-lg text-blue-950 ">{t(page_title)}</h1>
      <div className="gap-2 flex xs:text-[10px] md:text-sm ">
        <button
          id="en"
          className=" p-2 rounded-md text-white"
          onClick={() => {
            setLocale("en");
          }}
        >
          English
        </button>
        <button
          id="ar"
          className=" p-2 rounded-md text-white "
          onClick={() => {
            setLocale("ar");
          }}
        >
          العربية
        </button>
      </div>
    </header>
  );
}
