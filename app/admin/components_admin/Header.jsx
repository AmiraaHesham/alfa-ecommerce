"use client";
import { useLanguage } from "../../../context/LanguageContext.js";

export default function Header({ page_title }) {
  const { locale, setLocale } = useLanguage();
    const { t } = useLanguage();
switch (page_title) {
    case "Categories Management": t("categories_management");
    break;
    case "Products Management": t("products_management");
    break;
    case "Orders Management": t("orders_management");

}

    
  return (
    <header className="h-[70px] flex justify-between items-center px-10 font-semibold w-full bg-white  border-b-[1px]">
      <h1 className="text-2xl text-blue-950 ">{page_title}</h1>
      <div className="gap-2 flex ">
      <button onClick={() =>{localStorage.setItem("long",locale) ,setLocale("en") }
      }>English</button>
      <button onClick={() => {localStorage.setItem("long",locale),setLocale("ar") }}>العربية</button>
      </div>
    </header>
  );
}
