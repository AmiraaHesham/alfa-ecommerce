"use client"
import Image from "next/image";
import { MdCancel } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useLanguage } from "../../../../context/LanguageContext.js";
export default function Orders_Details() {
    const { t } = useLanguage();
  
  return (
<div className="w-full flex justify-between items-center">
    <div className="w-full h-[100px] flex justify-between gap-10">
        <div className="w-[50%] p-4 rounded-lg border bg-white">
            <h1 className="text-sm mb-3 text-gray-600 font-semibold">{t("pending_orders")}</h1>
            <h2 className="text-xl font-semibold bg-blue-100 text-blue-600  w-[60px] rounded-2xl py-1 px-2">12</h2>
        </div>
         <div className="w-[50%] p-4 rounded-lg border bg-white">
            <h1 className="text-sm mb-3 text-gray-600 font-semibold">{t("total_revenue_today")}</h1>
            <h2 className="text-xl font-semibold bg-green-100 text-green-600 w-[100px] rounded-2xl py-1 px-2">3,450 Eg</h2>
        </div>
          <div className="w-[50%] p-4 rounded-lg border bg-white">
            <h1 className="text-sm mb-3 text-gray-600 font-semibold">{t("returns_Requested")}</h1>
            <h2 className="text-xl font-semibold bg-gray-100 text-gray-600 w-[60px] rounded-2xl py-1 px-2">3</h2>
        </div>
    </div>
</div>

  )}