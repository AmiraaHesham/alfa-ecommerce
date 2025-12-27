"use client"
import { useLanguage } from "../../../../context/LanguageContext.js";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";


export default function Orders_Details() {
  const { t } = useLanguage();

  return (
    <div className="w-[35%] bg-white mt-3 p-7  border rounded-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">{t("user_info")}</h1>
        <button className=" text-blue-700">{t("view_profile")}</button>
      </div>
      <div>
        <div className="flex gap-5 mt-5 items-center">
          <Image
            alt=""
            src="/img.jpg"
            width={55}
            height={55}
            className="rounded-full border my-1 p-1"
          />
          <div>
            <h1 className="font-semibold">Jane Cooper</h1>
            <h2 className="text-sm text-gray-500">Previously ordered 5 itmes</h2>
          </div>
          
        </div>
         <div className="flex gap-5 mt-5 items-center">
      <span className="text-2xl text-gray-500 bg-gray-100 p-2 rounded-md"><MdEmail/></span>
          <div>
            <h1 className="font-semibold text-gray-500">{t("Email Address")}</h1>
            <h2 className="text-sm text-blue-600">jane@example.com</h2>
          </div>
          
        </div>
         <div className="flex gap-5 mt-5 items-center">
                <span className="text-2xl text-gray-500 bg-gray-100 p-2 rounded-md"><MdLocalPhone/></span>

          <div>
            <h1 className="font-semibold text-gray-500">{t("Phone Number")}</h1>
            <h2 className="text-sm ">01062230344</h2>
          </div>
          
        </div>
        
      </div>
      <hr className="my-10" />
      <div> 
        <div>
          <h1 className="font-semibold text-lg">{t("Shipping Address")}</h1>
          <h2 className="texxt-sm text-gray-500 mt-5">2972 westhemit Rd, santaana</h2>
        </div>
      </div>
    </div>
  );
}
