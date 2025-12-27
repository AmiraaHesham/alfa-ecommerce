import { FaHourglassStart } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";

import { AiOutlineUsergroupAdd } from "react-icons/ai";   
import { IoFileTray } from "react-icons/io5";
import { useLanguage } from "../../../../context/LanguageContext.js";

export default function Dashboard_Details() {
    const { t } = useLanguage();
    return (
          <div className="w-full grid lg:grid-cols-4 xs:grid-cols-2 lg:gap-10 xs:gap-2 "> 
                <div className="bg-white border flex flex-col gap-5 rounded-lg p-3">
                  <div className="flex items-center  gap-2">
                    <span className="md:text-2xl xs:text-lg text-blue-600 bg-blue-100 p-1 rounded-md"><IoMdCart /></span>
                    <h1 className="md:text-lg xs:text-sm  text-gray-500 font-semibold">{t("total_orders")}</h1>
                  </div>
                  <h1 className="md:text-2xl xs:text-lg  font-bold">3,456</h1>
                </div>

                  <div className="bg-white border border-orange-300 flex flex-col gap-5 rounded-lg p-3">
                  <div className="flex items-center  gap-2">
                    <span className="md:text-2xl xs:text-lg text-orange-600 bg-orange-100 p-1 rounded-md"><FaHourglassStart /></span>
                    <h1 className="md:text-lg xs:text-sm  text-gray-500 font-semibold">{t("pending_orders")}</h1>
                  </div>
                  <h1 className="md:text-2xl xs:text-lg font-bold">56</h1>

                </div>

                  <div className="bg-white border flex flex-col gap-5 rounded-lg p-3">
                  <div className="flex items-center  gap-2">
                    <span className="md:text-2xl xs:text-lg text-purple-600 bg-purple-100 p-1 rounded-md"><IoFileTray /></span>
                    <h1 className="md:text-lg xs:text-sm  text-gray-500 font-semibold">{t("active_products")}</h1>
                  </div>
                  <h1 className="md:text-2xl xs:text-lg font-bold">3,456</h1>

                </div>
                  <div className="bg-white border flex flex-col gap-5 rounded-lg p-3">
                  <div className="flex items-center  gap-2">
                    <span className="md:text-2xl xs:text-lg text-pink-600 bg-pink-100 p-1 rounded-md"><AiOutlineUsergroupAdd /></span>
                    <h1 className="md:text-lg xs:text-sm   text-gray-500 font-semibold">{t("new_users")}</h1>
                  </div>
                  <h1 className="md:text-2xl xs:text-lg font-bold">+456</h1>

                </div>
                {/* <div >
                  <div>
                    <span><FaHourglassStart /></span>

                  </div>
                </div> */}
              </div>
    )}