"use client";
import { useLanguage } from "../../../context/LanguageContext.js";

export default function Header({ page_title }) {
  const { locale, setLocale } = useLanguage();

  return (
    <header className="h-[80px] flex justify-between items-center px-10 font-semibold w-full bg-white  border-b-[1px]">
      <h1 className="text-2xl text-blue-950 ">{page_title}</h1>
      <div className="gap-2 flex ">
      <button onClick={() => setLocale("en")}>English</button>
      <button onClick={() => setLocale("ar")}>العربية</button>
      </div>
    </header>
  );
}
