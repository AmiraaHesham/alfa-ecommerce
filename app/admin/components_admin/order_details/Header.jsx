"use client";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { MdEditNote } from "react-icons/md";

export default function Orders_Details() {
  const { t } = useLanguage();

  return (
    <div className="w-full flex md:flex-row xs:flex-col md:items-center md:justify-between xs:gap-3 mt-4">
      <div className="">
        <div className="flex items-center gap-3">
          <h1 className="md:text-3xl  xs:text-2xl font-semibold">Order #ORD-7782</h1>
          <h1 className="text-xs bg-blue-100 w-[100px] text-blue-700 font-semibold py-2 px-4 text-center rounded-3xl">
            Processing
          </h1>
        </div>
        <h1 className="text-xs text-gray-600 mt-3">
          Placed on Oct 24, 2023 at 10:34 AM
        </h1>
      </div>
      <div>
        <button className="flex gap-2 items-center bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded-md text-white">
          <span className="text-lg">
            <MdEditNote />
          </span>
          Update Status
        </button>
      </div>
    </div>
  );
}
