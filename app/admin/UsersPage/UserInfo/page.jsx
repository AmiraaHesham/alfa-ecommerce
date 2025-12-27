"use client"
import SideMenu from "../../components_admin/SideMenu";
import Header from "../../components_admin/Header";
import Image from "next/image";
import { IoLocationSharp } from "react-icons/io5";
import { TbPointFilled } from "react-icons/tb";
import { useLanguage } from "../../../../context/LanguageContext.js";
import User_Info from "../../components_admin/order_details/User_Info";
import Orders_Table from "../../components_admin/orders/Orders_Table";

export default function UserInfo() {
        const { t } = useLanguage();
    
  return (
    <div className="bg-[#F9FAFB]">
      <main className="flex  h-screen ">
        <SideMenu users={"bg-[#e0e7ff6e] text-[#6158ff]"} />
        <div className="w-full  ">
          <Header page_title={""} />
   <div className="mx-10 mt-3 relative  bg-[#F9FAFB] ">           
  
                <div className="flex items-center gap-4 bg-white rounded-lg border p-7">
                    <div>
                        <Image src='/img.jpg' alt="" width={80} height={80} className="rounded-full border"/>
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold mb-2">Jena Cooper</h1>
                        <div className="flex items-center gap-3 text-gray-600">
                            <h1  className="flex items-center gap-2">Id:#34534 <TbPointFilled className="text-xs text-gray-200"/></h1>
                            <h1 className="flex items-center gap-2"><IoLocationSharp/>Egypt <TbPointFilled className="text-xs text-gray-200"/></h1>
                            <h1 className="text-green-600 bg-green-50 px-5 rounded-2xl">Active</h1>
                      
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-7 h-[100px] mt-3">
                <div className="bg-white border flex flex-col gap-3 rounded-lg p-5">
                                 <div className="flex items-center  gap-2">
                                   <span className="text-2xl text-blue-600 bg-blue-100 p-1 rounded-md"></span>
                                   <h1 className="text-lg  text-gray-500 font-semibold">{t("total_orders")}</h1>
                                 </div>
                                 <h1 className="text-2xl font-bold text-gray-700 bg-gray-100  w-[100px] rounded-xl px-2">3,456</h1>
                               </div>
                              
                               <div className="bg-white border flex flex-col gap-5 rounded-lg p-5">
                                 <div className="flex items-center  gap-2">
                                   <span className="text-2xl text-blue-600 bg-blue-100 p-1 rounded-md"></span>
                                   <h1 className="text-lg  text-gray-500 font-semibold">{t("delivered_orders")}</h1>
                                 </div>
                                 <h1 className="text-2xl font-bold text-green-700 bg-green-100  w-[100px] rounded-xl px-2">3,456</h1>
                               </div>
                                <div className="bg-white border flex flex-col gap-5 rounded-lg p-5">
                                 <div className="flex items-center  gap-2">
                                   <span className="text-2xl text-blue-600 bg-blue-100 p-1 rounded-md"></span>
                                   <h1 className="text-lg  text-gray-500 font-semibold">{t("canceled_orders")}</h1>
                                 </div>
                                 <h1 className="text-2xl font-bold text-red-700 bg-red-100  w-[100px] rounded-xl px-2">3,456</h1>
                               </div>
            </div>         
            
                     

          </div>
          <div className="flex bg-[#F9FAFB] justify-between mt-10 px-10 relative gap-5">

           <div className="  w-full ">

               {/* < div className="flex  justify-between mt-5"> */}
                           <Orders_Table />
              
                                      

            {/* </div> */}
                      
            </div>
                   <User_Info /> 
                   </div>

        </div>
      </main>
    </div>
  );
}
