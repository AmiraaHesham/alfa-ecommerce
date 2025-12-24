import { FaHourglassStart } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";

import { AiOutlineUsergroupAdd } from "react-icons/ai";   
import { IoFileTray } from "react-icons/io5";
import { useLanguage } from "../../../../context/LanguageContext.js";

export default function Dashboard_Details() {
    const { t } = useLanguage();
    return (
          <div className="w-full grid grid-cols-4 gap-10 h-[140px]"> 
                <div className="bg-white border flex flex-col gap-5 rounded-lg p-5">
                  <div className="flex items-center  gap-2">
                    <span className="text-2xl text-blue-600 bg-blue-100 p-1 rounded-md"><IoMdCart /></span>
                    <h1 className="text-lg  text-gray-500 font-semibold">{t("total_orders")}</h1>
                  </div>
                  <h1 className="text-2xl font-bold">3,456</h1>
                </div>

                  <div className="bg-white border border-orange-300 flex flex-col gap-5 rounded-lg p-5">
                  <div className="flex items-center  gap-2">
                    <span className="text-xl text-orange-600 bg-orange-100 p-1 rounded-md"><FaHourglassStart /></span>
                    <h1 className="text-lg  text-gray-500 font-semibold">{t("pending_orders")}</h1>
                  </div>
                  <h1 className="text-2xl font-bold">56</h1>

                </div>

                  <div className="bg-white border flex flex-col gap-5 rounded-lg p-5">
                  <div className="flex items-center  gap-2">
                    <span className="text-2xl text-purple-600 bg-purple-100 p-1 rounded-md"><IoFileTray /></span>
                    <h1 className="text-lg  text-gray-500 font-semibold">{t("active_products")}</h1>
                  </div>
                  <h1 className="text-2xl font-bold">3,456</h1>

                </div>
                  <div className="bg-white border flex flex-col gap-5 rounded-lg p-5">
                  <div className="flex items-center  gap-2">
                    <span className="text-2xl text-pink-600 bg-pink-100 p-1 rounded-md"><AiOutlineUsergroupAdd /></span>
                    <h1 className="text-lg  text-gray-500 font-semibold">{t("new_users")}</h1>
                  </div>
                  <h1 className="text-2xl font-bold">+456</h1>

                </div>
                {/* <div >
                  <div>
                    <span><FaHourglassStart /></span>

                  </div>
                </div> */}
              </div>
    )}