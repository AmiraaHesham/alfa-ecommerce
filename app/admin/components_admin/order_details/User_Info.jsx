"use client"
import { useLanguage } from "../../../../context/LanguageContext.js";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { PiUserListFill } from "react-icons/pi";


export default function Orders_Details() {
  const { t } = useLanguage();

  return (
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
                              <h1 className="font-semibold">username</h1>
                              <h2 className="text-sm text-gray-500">
                                B.D birthDate
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
                                email
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
                              address
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
  );
}
