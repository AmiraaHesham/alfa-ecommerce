"use client"
import Image from "next/image";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { MdDelete } from "react-icons/md";
import { FaCircle, FaTimes } from "react-icons/fa";
import { useRouter } from 'next/navigation'; 
export default function UsersPage() {
    const navigate = useRouter(); 
  const { t } = useLanguage();
  return (
      <div className=" rounded-xl w-full   h-screen border  mt-3 overflow-hidden overflow-x-scroll overflow-y-scroll ">
        <table className="  xs:w-[200%] lg:w-full   ">
        <thead className="bg-[#F9FAFB] text-xs text-justify">
          <tr className=" text-gray-500 h-12  ">
            <th className="w-[5%]"></th>
            <th className="w-[25%]">{t("User")}</th>
            <th className="w-[25%]">{t("email")}</th>
            <th className="w-[20%] mx-5">{t("registered-on")}</th>
            <th className="w-[15%] mx-20">{t("orders")}</th>
            <th className="w-[10%] mx-5">{t("status")}</th>
          </tr>
        </thead>
        <tbody className="bg-white text-md w-full ">
        

          <tr className=" text-blue-950 border hover:bg-gray-50 "
            onClick={() => navigate.push('/admin/UsersPage/UserInfo')}>
            <td></td>
            <td>
              <div className="flex items-center gap-3">
                <Image
                  alt=""
                  src="/img.jpg"
                  width={45}
                  height={45}
                  className="rounded-full border my-2 p-1"
                />
                <h1 className="text-base font-semibold">John Doe</h1>
              </div>
            </td>

            <td>
              <h1 className=" text-gray-500">John@exampl.com</h1>
            </td>
            <td>
                <div className="text-gray-500 text-sm" >
                 <h1>Oct 10,</h1>
                <h2>2023</h2>
                </div>
            </td>
            <td>
              <div className="bg-blue-100 w-[80px] text-center rounded-full text-blue-700  px-2 font-semibold text-xs">
                <h1>10 </h1>
                <h2>{t("orders")}</h2>
              </div>
            </td>

            <td>
              <div className="flex items-center gap-2 bg-green-100 w-[80px]  rounded-full text-green-600  px-2 py-1 font-semibold text-sm">
<span className="text-green-600 flex items-center justify-center text-[9px]"><FaCircle/></span>   
<h1>{t("active")}</h1>
           </div>
            </td>
          </tr>
             <tr className=" text-blue-950 border hover:bg-gray-50 ">
            <td></td>
            <td>
              <div className="flex items-center gap-3">
                <Image
                  alt=""
                  src="/img.jpg"
                  width={45}
                  height={45}
                  className="rounded-full border my-2 p-1"
                />
                <h1 className="text-md font-semibold">John Doe</h1>
              </div>
            </td>

            <td>
              <h1 className=" text-gray-500">John@exampl.com</h1>
            </td>
            <td>
                <div className="text-gray-500 text-sm" >
                 <h1>Oct 10,</h1>
                <h2>2023</h2>
                </div>
            </td>
            <td>
              <div className="bg-blue-100 w-[80px] text-center rounded-full text-blue-700  px-2 font-semibold text-xs">
                <h1>10 </h1>
                <h2>{t("orders")}</h2>
              </div>
            </td>

            <td>
              <div className="flex items-center gap-2 bg-green-100 w-[80px]  rounded-full text-green-600  px-2 py-1 font-semibold text-sm">
<span className="text-green-600 flex items-center justify-center text-[9px]"><FaCircle/></span>   
<h1>{t("active")}</h1>
           </div>
            </td>
          </tr>
             <tr className=" text-blue-950 border hover:bg-gray-50 ">
            <td></td>
            <td>
              <div className="flex items-center gap-3">
                <Image
                  alt=""
                  src="/img.jpg"
                  width={45}
                  height={45}
                  className="rounded-full border my-2 p-1"
                />
                <h1 className="text-md font-semibold">John Doe</h1>
              </div>
            </td>

            <td>
              <h1 className=" text-gray-500">John@exampl.com</h1>
            </td>
            <td>
                <div className="text-gray-500 text-sm" >
                 <h1>Oct 10,</h1>
                <h2>2023</h2>
                </div>
            </td>
            <td>
              <div className="bg-blue-100 w-[80px] text-center rounded-full text-blue-700  px-2 font-semibold text-xs">
                <h1>10 </h1>
                <h2>{t("orders")}</h2>
              </div>
            </td>

            <td>
              <div className="flex items-center gap-2 bg-green-100 w-[80px]  rounded-full text-green-600  px-2 py-1 font-semibold text-sm">
<span className="text-green-600 flex items-center justify-center text-[9px]"><FaCircle/></span>   
<h1>{t("active")}</h1>
           </div>
            </td>
          </tr>
             <tr className=" text-blue-950 border hover:bg-gray-50 ">
            <td></td>
            <td>
              <div className="flex items-center gap-3">
                <Image
                  alt=""
                  src="/img.jpg"
                  width={45}
                  height={45}
                  className="rounded-full border my-2 p-1"
                />
                <h1 className="text-md font-semibold">John Doe</h1>
              </div>
            </td>

            <td>
              <h1 className=" text-gray-500">John@exampl.com</h1>
            </td>
            <td>
                <div className="text-gray-500 text-sm" >
                 <h1>Oct 10,</h1>
                <h2>2023</h2>
                </div>
            </td>
            <td>
              <div className="bg-blue-100 w-[80px] text-center rounded-full text-blue-700  px-2 font-semibold text-xs">
                <h1>10 </h1>
                <h2>{t("orders")}</h2>
              </div>
            </td>

            <td>
              <div className="flex items-center gap-2 bg-green-100 w-[80px]  rounded-full text-green-600  px-2 py-1 font-semibold text-sm">
<span className="text-green-600 flex items-center justify-center text-[9px]"><FaCircle/></span>   
<h1>{t("active")}</h1>
           </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
