"use client";
import { useEffect, useState } from "react";
import { useLanguage } from "../../../../../context/LanguageContext.js";
import { MdEmail, MdLocationCity, MdLocationPin, MdMyLocation } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { PiUserListFill } from "react-icons/pi";
import { getRequest } from "../../../../../utils/requestsUtils.js";

export default function Orders_Details({ orderId , orderType }) {
  const { t } = useLanguage();
  const [orderUser, setOrderUser] = useState([]);
  const [paymentMethod , setPaymentMethod] = useState()
  const [orderAddress, setOrderAddress] = useState()
  const orderItem = async () => {
   const res= await getRequest(`/api/${orderType}/${orderId}`)
    const resData = res.data
    setOrderUser(resData.user);
    setPaymentMethod(resData.paymentMethod)
    setOrderAddress(resData.address)
  };
  useEffect(() => {
    orderItem();
  }, []);
  return (
    <div className="md:order-2 xs:order-1 xs:w-full md:w-[50%] bg-white">
      <div className="  bg-white p-7  border rounded-lg">
        <div className="flex justify-between items-center ">
          <h1 className="text-lg font-semibold">{t("user_info")}</h1>
          {/* <button className={`text-red-700`}>{t("view_profile")}</button> */}
        </div>
        <div>
          <div className="flex gap-5 mt-5 items-center">
            <span className="text-2xl text-red-500 bg-gray-100 p-2 rounded-md">
              <PiUserListFill />
            </span>

            <div>
              <h1 className="font-semibold">
                {orderUser.firstName + " " + orderUser.lastName}
              </h1>
              {/* <h2 className="text-sm text-gray-500">B.D birthDate</h2> */}
            </div>
          </div>
          <div className="flex gap-5 mt-3 items-center">
            <span className="text-2xl text-red-500 bg-gray-100 p-2 rounded-md">
              <MdEmail />
            </span>
            <div>
              {/* <h1 className="font-semibold text-gray-500">
                {t("Email Address")}
              </h1> */}
              <h2 className=" font-semibold">{orderUser.email}</h2>
            </div>
          </div>
          <div className="flex gap-5 mt-3 items-center">
            <span className="text-2xl text-red-500 bg-gray-100 p-2 rounded-md">
              <MdLocalPhone />
            </span>

            <div>
              {/* <h1 className="font-semibold text-gray-500">
                {t("Phone Number")}
              </h1> */}
              <h2 className="font-semibold">{orderUser.phone}</h2>
            </div>
          </div>
           <div className="flex gap-5 mt-3 items-center">
            <span className="text-2xl text-red-500 bg-gray-100 p-2 rounded-md">
              <MdLocationPin />
            </span>

            <div>
         
              <h2 className="font-semibold">{orderUser.governorate?.nameAr}</h2>
            </div>
          </div>
        </div>
        <hr className="my-10" />
        
        <div>
          <div className="" >
            <h1 className="font-semibold text-sm text-gray-500 ">{t("payment_method")}</h1>
            <h2 className="text-lg mt-2 font-semibold">{t(paymentMethod)}</h2>
          </div>
          <div>
            <h1 className="font-semibold text-sm text-gray-500 mt-5">{t("Shipping Address")}</h1>
            <h2 className="text-lg mt-2 font-semibold">{orderAddress}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
