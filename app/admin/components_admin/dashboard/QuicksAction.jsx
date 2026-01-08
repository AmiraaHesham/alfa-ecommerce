"use client"
import { FaPlusSquare } from "react-icons/fa";
import { useLanguage } from "../../../../context/LanguageContext.js";
import Image from "next/image";
import { TbCategoryPlus } from "react-icons/tb";
import { MdLocalShipping } from "react-icons/md";
import Link from "next/link.js";
export default function RecentOrders_table() {
  const { t } = useLanguage();

    return(
<div className=" h-full bg-white  p-5 mt-5 border rounded-lg">
      <h1 className="md:text-lg xs:text-sm font-bold">{t("quick-actions")}</h1>
        <div className="grid md:grid-cols-4 xs:grid-cols-2 gap-5 mt-3 items-center">

<Link href='/admin/Products'>
<div className="  bg-[#F9FAFB] py-3 rounded-md flex flex-col items-center justify-center">
    <span  className="text-xl text-blue-600   bg-blue-100 p-3 rounded-full"><FaPlusSquare /></span>
    <h1 className="text-xs font-semibold mt-2">{t("add_product")}</h1>
</div></Link>
<div className="  bg-[#F9FAFB] py-3 rounded-md  flex flex-col items-center justify-center">
    <span className="text-xl text-purple-600   bg-purple-100 p-3 rounded-full"><TbCategoryPlus /></span>
    <h1 className="text-xs font-semibold mt-2">{t("add_category")}</h1>
</div>
<div className="  bg-[#F9FAFB]  py-3 rounded-md  flex flex-col items-center justify-center">
    <span className="text-xl text-orange-600   bg-orange-100 p-3 rounded-full"><MdLocalShipping /></span>
    <h1 className="text-xs font-semibold mt-2">{t("process_orders")}</h1>
</div>
 
<div className="  bg-[#F9FAFB]  py-3 rounded-md  flex flex-col items-center justify-center">
    <span className="text-xl text-green-600 bg-green-100 p-3 rounded-full"><FaPlusSquare /></span>
    <h1 className="text-xs font-semibold mt-2">{t("add_admin")}</h1>
</div>
        </div>
        </div>

    )}
