"use client"
import { useLanguage } from "../../../../context/LanguageContext.js";
import { MdEditNote } from "react-icons/md";

export default function Orders_Details() {
    const { t } = useLanguage();
  
  return (
    <div className="w-full flex items-center justify-between mt-4">
        <div className="w-[400px]">
            <div className="flex items-center gap-3">
                <h1 className="text-3xl font-semibold">Order #ORD-7782</h1>
                <h1 className="text-sm bg-blue-100 w-[100px] text-blue-700 font-semibold py-2 px-4 text-center rounded-3xl">Processing</h1>
            </div>
            <h1 className="text-sm text-gray-600 mt-3">Placed on Oct 24, 2023 at 10:34 AM</h1>
        </div>
        <div>
            <button className="flex gap-2 items-center bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md text-white">
<span className="text-xl"><MdEditNote/></span>
Update Status
            </button>
        </div>
    </div>
  )}