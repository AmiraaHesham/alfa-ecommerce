"use client"
import { FaPlusSquare } from "react-icons/fa";
import { useLanguage } from "../../../../context/LanguageContext.js";
import Image from "next/image";
import { TbCategoryPlus } from "react-icons/tb";
import { MdLocalShipping } from "react-icons/md";

export default function RecentOrders_table() {
  const { t } = useLanguage();

    return(
<div className="w-[40%] h-[450px] bg-white  p-7  border rounded-lg">
      <h1 className="text-lg font-bold">Quick Actions</h1>
        <div className="grid grid-cols-2 gap-5 mt-5 items-center">

<div className="w-[130px] h-[150px]  bg-[#F9FAFB]  rounded-md flex flex-col items-center justify-center">
    <span  className="text-xl text-blue-600   bg-blue-100 p-3 rounded-full"><FaPlusSquare /></span>
    <h1 className="text-xs font-semibold mt-2">{t("add_product")}</h1>
</div>
<div className="w-[130px] h-[150px]  bg-[#F9FAFB] rounded-md  flex flex-col items-center justify-center">
    <span className="text-xl text-purple-600   bg-purple-100 p-3 rounded-full"><TbCategoryPlus /></span>
    <h1 className="text-xs font-semibold mt-2">{t("add_category")}</h1>
</div>
<div className="w-[130px] h-[150px]  bg-[#F9FAFB] rounded-md  flex flex-col items-center justify-center">
    <span className="text-xl text-orange-600   bg-orange-100 p-3 rounded-full"><MdLocalShipping /></span>
    <h1 className="text-xs font-semibold mt-2">{t("process_orders")}</h1>
</div>


 
<div className="w-[130px] h-[150px]  bg-[#F9FAFB] rounded-md  flex flex-col items-center justify-center">
    <span className="text-xl text-green-600 bg-green-100 p-3 rounded-full"><FaPlusSquare /></span>
    <h1 className="text-xs font-semibold mt-2">{t("add_admin")}</h1>
</div>





        </div>
        </div>

    )}
