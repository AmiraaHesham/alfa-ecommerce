"use client";
import { FiEdit } from "react-icons/fi";
import Image from "next/image";
import SideMenu from "../components/SideMenu";
import Header from "../components/Header";
import { useLanguage } from "../../../context/LanguageContext.js";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import React, { useRef, useState } from "react";
import FormProduct from "../components/FormProduct";

import { MdDelete } from "react-icons/md";
import { FaCircle } from "react-icons/fa";


export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="h-full bg-[#F9FAFB]">
      <main className=" flex border  ">
        <SideMenu tabId={"Categorys"} />
        <div className="w-full">
          <Header page_title={t("products_management")} />

          <div className="mx-10 mt-5 relative">
                                  <FormProduct />

            <div className="bg-white h-[50px] border rounded-lg border-1  w-full mt-5 flex justify-end p-5 items-center">
              <button
                className="p-2 text-white text-sm rounded-md bg-blue-500 text-center flex items-center justify-center gap-2"
                // onClick={() => {
                //   let form = document.querySelector("#add-category-form");
                //   form.classList.remove("hidden");
                //   form.classList.add("flex");
                // }}
              >
                <span>
                  
                  <FaPlus />
                </span>
                <h1>{t("add_new_product")}</h1>
              </button>
            </div>
            
            <div className=" rounded-xl w-full h-[530px] border  mt-3 overflow-hidden overflow-y-scroll ">
              <table className=" w-full  rounded-lg  ">
                <thead className="bg-[#F9FAFB] text-sm  text-justify">
                  <tr className=" text-gray-500 h-12  ">
                    <th className="w-[7%]"></th>
                    <th className="w-[33%]">{t("product_name")}</th>
                    <th className="w-[25%]">{t("product_category")}</th>
                    <th className="w-[20%]">{t("price")}</th>
                          <th></th>

                    <th className="w-[20%]"></th>
                  </tr>
                </thead>
                <tbody className="bg-white text-black text-lg w-full ">
                  {/* (
                                          {
                                            (allCateg.map = (category, index) => {
                                              <tr
                                                key={index}
                                                className="text-center text-blue-950 border "
                                              >
                                                <td className="py-5">{index}</td>
                                                <td>{category.imageURL}</td>
                                                <td>{category.name}</td>
                                                <td>{category.product_count}</td>
                                                <td className="text-2xl">
                                                  <span className="text-blue-800"><FiEdit /></span> 
                                                <span className="text-red-800"><MdDelete/></span>
                                                </td>
                                              </tr>;
                                            })
                                          }
                                          ) */}

                  <tr className=" border hover:bg-gray-100  ">
                    <td><span className="text-green-600 flex items-center justify-center text-sm"><FaCircle/></span></td>
                    <td className="flex items-center gap-4">
                      <Image
                        alt=""
                        src="/img.jpg"
                        width={50}
                        height={50}
                        className="rounded-xl border my-2 p-1"
                      />
                      <div>
                        <h1 className="text-[17px] font-semibold">
                          SmartPhons
                        </h1>
                        <h1 className="text-xs text-gray-500">
                          {t("code")} : MON-4k-001
                        </h1>
                      </div>
                    </td>

                    <td>
                      <div className="  text-[17px] mx-1">
                        <h1>Screens</h1>
                      </div>
                    </td>
                    <td>
                      <span >120 EG</span>
                    </td>
                                       <td></td>

                    <td>
                      <button className="text-red-800 text-sm flex items-center gap-1 bg-red-300 px-2 py-1 font-semibold rounded-md hover:bg-red-400">
                      <MdDelete /> {t("delete")}
                      </button>
                    </td>
                  </tr>
                 <tr className=" border hover:bg-gray-100  ">
                    <td><span className="text-green-600 flex items-center justify-center text-sm"><FaCircle/></span></td>
                    <td className="flex items-center gap-4">
                      <Image
                        alt=""
                        src="/img.jpg"
                        width={50}
                        height={50}
                        className="rounded-xl border my-2 p-1"
                      />
                      <div>
                        <h1 className="text-[17px] font-semibold">
                          SmartPhons
                        </h1>
                        <h1 className="text-xs text-gray-500">
                          {t("code")} : MON-4k-001
                        </h1>
                      </div>
                    </td>

                    <td>
                      <div className="  text-[17px] mx-1">
                        <h1>Screens</h1>
                      </div>
                    </td>
                    <td>
                      <span >120 EG</span>
                    </td>
                                       <td></td>

                    <td>
                      <button className="text-red-800 text-sm flex items-center gap-1 bg-red-300 px-2 py-1 font-semibold rounded-md hover:bg-red-400">
                      <MdDelete /> {t("delete")}
                      </button>
                    </td>
                  </tr>
                 <tr className=" border hover:bg-gray-100  ">
                    <td><span className="text-green-600 flex items-center justify-center text-sm"><FaCircle/></span></td>
                    <td className="flex items-center gap-4">
                      <Image
                        alt=""
                        src="/img.jpg"
                        width={50}
                        height={50}
                        className="rounded-xl border my-2 p-1"
                      />
                      <div>
                        <h1 className="text-[17px] font-semibold">
                          SmartPhons
                        </h1>
                        <h1 className="text-xs text-gray-500">
                          {t("code")} : MON-4k-001
                        </h1>
                      </div>
                    </td>

                    <td>
                      <div className="  text-[17px] mx-1">
                        <h1>Screens</h1>
                      </div>
                    </td>
                    <td>
                      <span >120 EG</span>
                    </td>
                                       <td></td>

                    <td>
                      <button className="text-red-800 text-sm flex items-center gap-1 bg-red-300 px-2 py-1 font-semibold rounded-md hover:bg-red-400">
                      <MdDelete /> {t("delete")}
                      </button>
                    </td>
                  </tr>
                  <tr className=" border ">
                    <td><span className="text-green-600 flex items-center justify-center text-sm"><FaCircle/></span></td>
                    <td className="flex items-center gap-4">
                      <Image
                        alt=""
                        src="/img.jpg"
                        width={50}
                        height={50}
                        className="rounded-xl border my-2 p-1"
                      />
                      <div>
                        <h1 className="text-[17px] font-semibold">
                          SmartPhons
                        </h1>
                         <h1 className="text-xs text-gray-500">{t("code")} : MON-4k-001</h1>
                      </div>
                    </td>

                    <td>
                      <div className="  text-[17px] mx-1">
                        <h1>Screens</h1>
                      </div>
                    </td>
                    <td>
                      <span >120 EG</span>
                    </td>

                   <td></td>
                    <td>
                      <button className="text-red-800 text-sm flex items-center gap-1 bg-red-300 px-2 py-1 font-semibold rounded-md hover:bg-red-400">
                      <MdDelete /> {t("delete")}
                      </button>
                    </td>
                  </tr>
                 <tr className=" border hover:bg-gray-100  ">
                    <td><span className="text-green-600 flex items-center justify-center text-sm"><FaCircle/></span></td>
                    <td className="flex items-center gap-4">
                      <Image
                        alt=""
                        src="/img.jpg"
                        width={50}
                        height={50}
                        className="rounded-xl border my-2 p-1"
                      />
                      <div>
                        <h1 className="text-[17px] font-semibold">
                          SmartPhons
                        </h1>
                        <h1 className="text-xs text-gray-500">
                          {t("code")} : MON-4k-001
                        </h1>
                      </div>
                    </td>

                    <td>
                      <div className="  text-[17px] mx-1">
                        <h1>Screens</h1>
                      </div>
                    </td>
                    <td>
                      <span >120 EG</span>
                    </td>
                                       <td></td>

                    <td>
                      <button className="text-red-800 text-sm flex items-center gap-1 bg-red-300 px-2 py-1 font-semibold rounded-md hover:bg-red-400">
                      <MdDelete /> {t("delete")}
                      </button>
                    </td>
                  </tr>
                 <tr className=" border hover:bg-gray-100  ">
                    <td><span className="text-green-600 flex items-center justify-center text-sm"><FaCircle/></span></td>
                    <td className="flex items-center gap-4">
                      <Image
                        alt=""
                        src="/img.jpg"
                        width={50}
                        height={50}
                        className="rounded-xl border my-2 p-1"
                      />
                      <div>
                        <h1 className="text-[17px] font-semibold">
                          SmartPhons
                        </h1>
                        <h1 className="text-xs text-gray-500">
                          {t("code")} : MON-4k-001
                        </h1>
                      </div>
                    </td>

                    <td>
                      <div className="  text-[17px] mx-1">
                        <h1>Screens</h1>
                      </div>
                    </td>
                    <td>
                      <span >120 EG</span>
                    </td>
                                       <td></td>

                    <td>
                      <button className="text-red-800 text-sm flex items-center gap-1 bg-red-300 px-2 py-1 font-semibold rounded-md hover:bg-red-400">
                      <MdDelete /> {t("delete")}
                      </button>
                    </td>
                  </tr>
                 <tr className=" border hover:bg-gray-100  ">
                    <td><span className="text-green-600 flex items-center justify-center text-sm"><FaCircle/></span></td>
                    <td className="flex items-center gap-4">
                      <Image
                        alt=""
                        src="/img.jpg"
                        width={50}
                        height={50}
                        className="rounded-xl border my-2 p-1"
                      />
                      <div>
                        <h1 className="text-[17px] font-semibold">
                          SmartPhons
                        </h1>
                        <h1 className="text-xs text-gray-500">
                          {t("code")} : MON-4k-001
                        </h1>
                      </div>
                    </td>

                    <td>
                      <div className="  text-[17px] mx-1">
                        <h1>Screens</h1>
                      </div>
                    </td>
                    <td>
                      <span >120 EG</span>
                    </td>
                                       <td></td>

                    <td>
                      <button className="text-red-800 text-sm flex items-center gap-1 bg-red-300 px-2 py-1 font-semibold rounded-md hover:bg-red-400">
                      <MdDelete /> {t("delete")}
                      </button>
                    </td>
                  </tr>
                 <tr className=" border hover:bg-gray-100  ">
                    <td><span className="text-green-600 flex items-center justify-center text-sm"><FaCircle/></span></td>
                    <td className="flex items-center gap-4">
                      <Image
                        alt=""
                        src="/img.jpg"
                        width={50}
                        height={50}
                        className="rounded-xl border my-2 p-1"
                      />
                      <div>
                        <h1 className="text-[17px] font-semibold">
                          SmartPhons
                        </h1>
                        <h1 className="text-xs text-gray-500">
                          {t("code")} : MON-4k-001
                        </h1>
                      </div>
                    </td>

                    <td>
                      <div className="  text-[17px] mx-1">
                        <h1>Screens</h1>
                      </div>
                    </td>
                    <td>
                      <span >120 EG</span>
                    </td>
                                       <td></td>

                    <td>
                      <button className="text-red-800 text-sm flex items-center gap-1 bg-red-300 px-2 py-1 font-semibold rounded-md hover:bg-red-400">
                      <MdDelete /> {t("delete")}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
