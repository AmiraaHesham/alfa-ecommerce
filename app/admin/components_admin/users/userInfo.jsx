"use client";
import SideMenu from "../../components_admin/SideMenu";
import Header from "../../components_admin/Header";
import Image from "next/image";
import { IoLocationSharp } from "react-icons/io5";
import { TbPointFilled } from "react-icons/tb";
import { useLanguage } from "../../../../context/LanguageContext.js";
import User_Info from "../../components_admin/order_details/User_Info";
import Orders_Table from "../../components_admin/orders/Orders_Table";
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../../../../utils/requestsUtils";
import { useIdContext } from "../../../../context/idContext";
import { FaUserLarge } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { PiUserListFill } from "react-icons/pi";
import { useParams } from "next/navigation";
import { ImBlocked } from "react-icons/im";
import { VscCircleFilled } from "react-icons/vsc";

export default function UserInfo() {
  const { t } = useLanguage();
  const { selectedUserId } = useIdContext();

  const [userInfo, setUserInfo] = useState({
    username: "",
    blocked: "",
    active: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    birthDate: "",
  });

  const getUserInfo = async () => {
    const res = await getRequest(`/api/users/${selectedUserId}`);
    setUserInfo((prev) => ({
      ...prev,
      username: res.username,
      blocked: res.blocked,
      active: res.active,
      firstName: res.firstName,
      lastName: res.lastName,
      email: res.email,
      phone: res.phone,
      address: res.address,
      birthDate: res.birthDate,
    }));
  };

  const addBlock = async () => {
    await postRequest(`/api/admin/users/${selectedUserId}/block`);
    getUserInfo();
  };
  const removeBlock = async () => {
    await postRequest(`/api/admin/users/${selectedUserId}/unblock`);
    getUserInfo();
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  return ( 
            <div className="">
              <div className="flex items-center gap-4 bg-white rounded-lg border p-5">
                <span className="w-[50px] h-[50px] text-gray-600 my-2  bg-gray-50 flex justify-center items-center p-2 rounded-full border ">
                  <FaUserLarge />
                </span>
                <div>
                  <h1 className="text-lg font-semibold mb-2">
                    {userInfo.firstName + " " + userInfo.lastName}
                  </h1>
                  <div className="flex items-center text-sm gap-3 text-gray-600">
                    <h1 className="flex items-center gap-2">
                      ID: #{selectedUserId}
                      <TbPointFilled className="text-xs text-gray-200" />
                    </h1>
                    <h1 className="flex items-center gap-2">
                      <IoLocationSharp />
                      Egypt <TbPointFilled className="text-xs text-gray-200" />
                    </h1>
                    <div  className={`${
                          userInfo.active === true
                            ? "text-green-600 bg-green-50"
                            : "text-red-600 bg-gray-100"
                        }  flex px-3 gap-2 rounded-2xl items-center justify-center`}>
                      <span
                        className={`flex items-center justify-center ${
                          userInfo.active === true
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        <VscCircleFilled  />
                      </span>
                      <h1>
                        {
                             userInfo.active === true ?'Active':'Deactive'
                        }
                        
                      </h1>
                    </div>

                    <div  className={`${
                          userInfo.blocked === false
                            ? "text-gray-600 bg-gray-100  hover:bg-red-100"
                            : "text-red-600 bg-red-50  hover:bg-gray-100"
                        }  flex px-3 gap-2 rounded-2xl items-center justify-center`}>
                      <span
                        // className={` ${
                        //   userInfo.blocked === false
                        //     ? "text-gray-600"
                        //     : "text-red-600"
                        // }`}
                      >
                        <ImBlocked />
                      </span>
                      <button
                        // className={`${
                        //   userInfo.blocked === false
                        //     ? "text-gray-600 bg-gray-100 "
                        //     : "text-red-600 bg-red-50 "
                        // }   rounded-2xl`}
                        onClick={() => {
                          console.log(userInfo.blocked);
                          if (userInfo.blocked === false) {
                            addBlock();
                          } else {
                            removeBlock();
                          }
                        }}
                      >
                        { userInfo.blocked === false?'Unblocked':'Blocked'}
                        
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-3 xs:grid-cols-2 gap-7 mt-3">
                <div className="bg-white border flex flex-col gap-5 rounded-lg p-5">
                  <div className="flex items-center  gap-2">
                    <span className="text-lg text-blue-600 bg-blue-100 p-1 rounded-md"></span>
                    <h1 className="text-base  text-gray-500 font-semibold">
                      {t("total_orders")}
                    </h1>
                  </div>
                  <h1 className="text-xl font-bold text-gray-700 bg-gray-100  w-[100px] rounded-xl px-2">
                    3,456
                  </h1>
                </div>

                <div className="bg-white border flex flex-col gap-5 rounded-lg p-5">
                  <div className="flex items-center  gap-2">
                    <span className="text-lg text-blue-600 bg-blue-100 p-1 rounded-md"></span>
                    <h1 className="text-base  text-gray-500 font-semibold">
                      {t("delivered_orders")}
                    </h1>
                  </div>
                  <h1 className="text-xl font-bold text-green-700 bg-green-100  w-[100px] rounded-xl px-2">
                    3,456
                  </h1>
                </div>
                <div className="bg-white border flex flex-col gap-5 rounded-lg p-5">
                  <div className="flex items-center  gap-2">
                    <span className="text-lg text-blue-600 bg-blue-100 p-1 rounded-md"></span>
                    <h1 className="text-base text-gray-500 font-semibold">
                      {t("canceled_orders")}
                    </h1>
                  </div>
                  <h1 className="text-xl font-bold text-red-700 bg-red-100  w-[100px] rounded-xl px-2">
                    3,456
                  </h1>
                </div>
              </div>

              <div className="flex  bg-[#F9FAFB] justify-between my-7 gap-5">
                <div className="md:order-1 w-full   xs:order-2">
                  <Orders_Table />
                </div>
                <div className="md:order-2 xs:order-1 xs:w-full h-[400px] md:w-[50%] bg-white">
                  <div className="  bg-white p-7  border rounded-lg">
                    <div className="flex justify-between items-center ">
                      <h1 className="text-lg font-semibold">
                        {t("user_info")}
                      </h1>
                      {/* <button className={`text-blue-700`}>{t("view_profile")}</button> */}
                    </div>
                    <div>
                      <div className="flex gap-5 mt-5 items-center">
                        <span className="text-2xl text-gray-500 bg-gray-100 p-2 rounded-md">
                          <PiUserListFill />
                        </span>

                        <div>
                          <h1 className="font-semibold">{userInfo.username}</h1>
                          <h2 className="text-sm text-gray-500">
                            B.D {userInfo.birthDate}
                          </h2>
                        </div>
                      </div>
                      <div className="flex gap-5 mt-5 items-center">
                        <span className="text-2xl text-gray-500 bg-gray-100 p-2 rounded-md">
                          <MdEmail />
                        </span>
                        <div>
                          <h1 className="font-semibold text-gray-500">
                            {t("Email Address")}
                          </h1>
                          <h2 className="text-sm text-blue-600">
                            {userInfo.email}
                          </h2>
                        </div>
                      </div>
                      <div className="flex gap-5 mt-5 items-center">
                        <span className="text-2xl text-gray-500 bg-gray-100 p-2 rounded-md">
                          <MdLocalPhone />
                        </span>

                        <div>
                          <h1 className="font-semibold text-gray-500">
                            {t("Phone Number")}
                          </h1>
                          <h2 className="text-sm ">01062230344</h2>
                        </div>
                      </div>
                    </div>
                    <hr className="my-10" />
                    <div>
                      <div>
                        <h1 className="font-semibold text-lg">
                          {t("Shipping Address")}
                        </h1>
                        <h2 className="texxt-sm text-gray-500 mt-5">
                          {userInfo.address}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
  );
}
