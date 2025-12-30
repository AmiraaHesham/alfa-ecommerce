"use client"
import Image from "next/image";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext.js";
import { IoMdSearch } from "react-icons/io";
import { MdFilterList } from "react-icons/md";
import { FaRegCalendar } from "react-icons/fa6";

export default function Orders_Failter({placeholder , view}) {
    const { t } = useLanguage();
    switch (!placeholder){
      case "Search by order code or name":    t("search_by_order_code_or_name")
      break;
      case "Search by user name or email":    t("search_by_user_name_or_email")
      break;

    }
  
  return (
<div>
    <div className="w-full  bg-white mt-3 rounded-lg border flex md:flex-row xs:flex-col gap-5  items-start  p-4 ">
      <div className="flex items-center justify-center border px-3 rounded-md bg-gray-100 h-9">
        <span className="text-gray-400 text-lg "><IoMdSearch /></span>
        <input type="text" placeholder={placeholder} className="bg-none outline-none placeholder:text-sm  h-8  w-[250px] bg-gray-100 p-2 rounded-lg"/>
      </div>
      <div className="flex items-center gap-4">
 <div className="flex items-center justify-center border px-3 rounded-md bg-gray-100 h-9">
        <span className="text-gray-400 text-lg "><MdFilterList /></span>
        <select type="text" className="bg-none outline-none text-gray-700  w-[200px] h-9 text-sm font-semibold bg-gray-100 p-2 rounded-lg ">
        <option value="all_statuses">All Statuses</option>
        <option value="all_statuses">All Statuses</option>
        <option value="all_statuses">All Statuses</option>
        <option value="all_statuses">All Statuses</option>
        </select>
       
      </div>
       <span className={`text-gray-700 text-xl ${view}`}><FaRegCalendar/></span>
      </div>
   
      </div>
</div>

  )}