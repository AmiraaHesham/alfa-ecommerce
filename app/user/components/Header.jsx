"use client";
import { useLanguage } from "../../../context/LanguageContext";
import { FaCircleUser, FaRegCircleUser } from "react-icons/fa6";

import Link from "next/link";
import { IoMdCart, IoMdSearch } from "react-icons/io";
import { MdElectricBolt, MdOutlineElectricBolt } from "react-icons/md";

export default function Header() {
  const { t } = useLanguage();
  return (
    <header className="w-full h-[60px] px-16 flex items-center justify-between bg-white">
      <div className="flex gap-3 items-center xs:justify-center md:justify-start ">
        <span className="text-xl bg-blue-500 p-2 text-white rounded-md">
          <MdElectricBolt />
        </span>
        <div className="cursor-default md:block xs:hidden">
          <h1 className="text-xl  text-blue-950 font-bold font-sans">متجر ألفا</h1>
        </div>
      </div>
      <nav>
        <ul className="flex items-center text-sm font-semibold gap-3">
          <li>الاقسام</li>
          <li>المنتجات المميزة</li>
          <li>المنتجات</li>
        </ul>
      </nav>
 <div className="flex items-center justify-start border w-[400px] px-3 rounded-md bg-gray-100 h-9">
        <span className="text-gray-600 text-lg "><IoMdSearch /></span>
        <input 
         onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                getAllUsers();
              }
            }}
        type="text" placeholder={t('search')}
         className="bg-none outline-none placeholder:text-sm h-8 bg-gray-100 flex items-center p-2 rounded-lg"/>
      </div>   
         <div className="flex items-center gap-3 text-2xl">
        <IoMdCart />
        <FaRegCircleUser />
      </div>
    </header>
  );
}
