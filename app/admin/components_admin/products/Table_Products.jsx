"use client";
import { MdDelete, MdStar } from "react-icons/md";
import { FaCircle } from "react-icons/fa";
import React, { useRef, useState } from "react";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { FaPlus } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import Image from "next/image";
import axios from "axios";
import { GoStarFill } from "react-icons/go";

export default function TableProducts({ name_categ, img, state }) {
  const { t } = useLanguage();

  return (
    <div>
      <div className="bg-white h-[50px] border rounded-lg border-1  w-full mt-5 flex justify-end p-5 items-center">
        <button
          className="p-2 text-white xs:text-xs md:text-sm rounded-md bg-blue-500 text-center flex items-center justify-center gap-2"
          onClick={() => {
            let form = document.querySelector("#add-product-form");
            form.classList.remove("hidden");
            form.classList.add("flex");
          }}
        >
          <span>
            <FaPlus />
          </span>
          <h1>{t("add_new_product")}</h1>
        </button>
      </div>

      <div className=" rounded-xl w-full h-[530px] border  mt-3 overflow-hidden overflow-x-scroll overflow-y-scroll ">
        <table className=" xs:w-[220%] lg:w-full    ">
          <thead className="bg-[#F9FAFB] text-xs  text-justify">
            <tr className=" text-gray-500 h-12  ">
              <th className="w-[20%]"></th>
              <th className="w-[40%]">{t("PRODUCT_NAME")}</th>
              <th className="w-[30%]">{t("product_category")}</th>
              <th className="w-[30%]">{t("price")}</th>
              {/* <th></th> */}

              <th className="w-[40%]"></th>
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
              <td>
                <div className="flex items-center justify-center gap-3">
                  <button className="text-green-600 flex items-center justify-center text-sm">
                    <FaCircle />
                  </button>
                  <button className="text-yellow-500 flex items-center justify-center">
                    <GoStarFill />
                  </button>
                </div>
              </td>
              <td className="flex items-center gap-4">
                <Image
                  alt=""
                  src="/img.jpg"
                  width={45}
                  height={45}
                  className="rounded-xl border my-1 p-1"
                />
                <div>
                  <h1 className="text-sm font-semibold">
                    SmartPhons
                  </h1>
                  <h1 className="text-xs text-gray-500">
                    {t("code")} : MON-4k-001
                  </h1>
                </div>
              </td>

              <td>
                <div className="  text-sm text-gray-500 font-semibold mx-1">
                  <h1>Screens</h1>
                </div>
              </td>
              <td className="text-sm font-bold">120 EG</td>

              <td>
                <button className="text-red-800 text-sm flex items-center gap-1 bg-red-300 px-2 py-1 font-semibold rounded-md hover:bg-red-400">
                  <MdDelete /> 
                {t("delete")}
                </button>
              </td>
            </tr>
            <tr className=" border hover:bg-gray-100  ">
              <td>
                <span className="text-green-600 flex items-center justify-center text-xs">
                  <FaCircle />
                </span>
              </td>
              <td className="flex items-center gap-4">
                <Image
                  alt=""
                  src="/img.jpg"
                  width={45}
                  height={45}
                  className="rounded-xl border my-1 p-1"
                />
                <div>
                  <h1 className="text-[17px] text-sm font-semibold">
                    SmartPhons
                  </h1>
                  <h1 className="text-xs text-gray-500">
                    {t("code")} : MON-4k-001
                  </h1>
                </div>
              </td>

              <td>
                <div className="  text-sm text-gray-500 font-semibold mx-1">
                  <h1>Screens</h1>
                </div>
              </td>
              <td className="">120 EG</td>
              <td></td>

              <td>
                <button className="text-red-800 text-sm flex items-center gap-1 bg-red-300 px-2 py-1 font-semibold rounded-md hover:bg-red-400">
                  <MdDelete /> {t("delete")}
                </button>
              </td>
            </tr>
            <tr className=" border hover:bg-gray-100  ">
              <td>
                <span className="text-green-600 flex items-center justify-center text-xs">
                  <FaCircle />
                </span>
              </td>
              <td className="flex items-center gap-4">
                <Image
                  alt=""
                  src="/img.jpg"
                  width={45}
                  height={45}
                  className="rounded-xl border my-1 p-1"
                />
                <div>
                  <h1 className="text-[17px] text-sm font-semibold">
                    SmartPhons
                  </h1>
                  <h1 className="text-xs text-gray-500">
                    {t("code")} : MON-4k-001
                  </h1>
                </div>
              </td>

              <td>
                <div className="  text-sm text-gray-500 font-semibold mx-1">
                  <h1>Screens</h1>
                </div>
              </td>
              <td className="">120 EG</td>
              <td></td>

              <td>
                <button className="text-red-800 text-sm flex items-center gap-1 bg-red-300 px-2 py-1 font-semibold rounded-md hover:bg-red-400">
                  <MdDelete /> {t("delete")}
                </button>
              </td>
            </tr>
            <tr className=" border hover:bg-gray-100  ">
              <td>
                <span className="text-green-600 flex items-center justify-center text-xs">
                  <FaCircle />
                </span>
              </td>
              <td className="flex items-center gap-4">
                <Image
                  alt=""
                  src="/img.jpg"
                  width={45}
                  height={45}
                  className="rounded-xl border my-1 p-1"
                />
                <div>
                  <h1 className="text-[17px] text-sm font-semibold">
                    SmartPhons
                  </h1>
                  <h1 className="text-xs text-gray-500">
                    {t("code")} : MON-4k-001
                  </h1>
                </div>
              </td>

              <td>
                <div className="  text-sm text-gray-500 font-semibold mx-1">
                  <h1>Screens</h1>
                </div>
              </td>
              <td className="">120 EG</td>
              <td></td>

              <td>
                <button className="text-red-800 text-sm flex items-center gap-1 bg-red-300 px-2 py-1 font-semibold rounded-md hover:bg-red-400">
                  <MdDelete /> {t("delete")}
                </button>
              </td>
            </tr>
            <tr className=" border hover:bg-gray-100  ">
              <td>
                <span className="text-green-600 flex items-center justify-center text-xs">
                  <FaCircle />
                </span>
              </td>
              <td className="flex items-center gap-4">
                <Image
                  alt=""
                  src="/img.jpg"
                  width={45}
                  height={45}
                  className="rounded-xl border my-1 p-1"
                />
                <div>
                  <h1 className="text-[17px] text-sm font-semibold">
                    SmartPhons
                  </h1>
                  <h1 className="text-xs text-gray-500">
                    {t("code")} : MON-4k-001
                  </h1>
                </div>
              </td>

              <td>
                <div className="  text-sm text-gray-500 font-semibold mx-1">
                  <h1>Screens</h1>
                </div>
              </td>
              <td className="">120 EG</td>
              <td></td>

              <td>
                <button className="text-red-800 text-sm flex items-center gap-1 bg-red-300 px-2 py-1 font-semibold rounded-md hover:bg-red-400">
                  <MdDelete /> {t("delete")}
                </button>
              </td>
            </tr>
            <tr className=" border hover:bg-gray-100  ">
              <td>
                <span className="text-green-600 flex items-center justify-center text-xs">
                  <FaCircle />
                </span>
              </td>
              <td className="flex items-center gap-4">
                <Image
                  alt=""
                  src="/img.jpg"
                  width={45}
                  height={45}
                  className="rounded-xl border my-1 p-1"
                />
                <div>
                  <h1 className="text-[17px] text-sm font-semibold">
                    SmartPhons
                  </h1>
                  <h1 className="text-xs text-gray-500">
                    {t("code")} : MON-4k-001
                  </h1>
                </div>
              </td>

              <td>
                <div className="  text-sm text-gray-500 font-semibold mx-1">
                  <h1>Screens</h1>
                </div>
              </td>
              <td className="">120 EG</td>
              <td></td>

              <td>
                <button className="text-red-800 text-sm flex items-center gap-1 bg-red-300 px-2 py-1 font-semibold rounded-md hover:bg-red-400">
                  <MdDelete /> {t("delete")}
                </button>
              </td>
            </tr>
            <tr className=" border hover:bg-gray-100  ">
              <td>
                <span className="text-green-600 flex items-center justify-center text-xs">
                  <FaCircle />
                </span>
              </td>
              <td className="flex items-center gap-4">
                <Image
                  alt=""
                  src="/img.jpg"
                  width={45}
                  height={45}
                  className="rounded-xl border my-1 p-1"
                />
                <div>
                  <h1 className="text-[17px] text-sm font-semibold">
                    SmartPhons
                  </h1>
                  <h1 className="text-xs text-gray-500">
                    {t("code")} : MON-4k-001
                  </h1>
                </div>
              </td>

              <td>
                <div className="  text-sm text-gray-500 font-semibold mx-1">
                  <h1>Screens</h1>
                </div>
              </td>
              <td className="">120 EG</td>
              <td></td>

              <td>
                <button className="text-red-800 text-sm flex items-center gap-1 bg-red-300 px-2 py-1 font-semibold rounded-md hover:bg-red-400">
                  <MdDelete /> {t("delete")}
                </button>
              </td>
            </tr>
            <tr className=" border hover:bg-gray-100  ">
              <td>
                <span className="text-green-600 flex items-center justify-center text-xs">
                  <FaCircle />
                </span>
              </td>
              <td className="flex items-center gap-4">
                <Image
                  alt=""
                  src="/img.jpg"
                  width={45}
                  height={45}
                  className="rounded-xl border my-1 p-1"
                />
                <div>
                  <h1 className="text-[17px] text-sm font-semibold">
                    SmartPhons
                  </h1>
                  <h1 className="text-xs text-gray-500">
                    {t("code")} : MON-4k-001
                  </h1>
                </div>
              </td>

              <td>
                <div className="  text-sm text-gray-500 font-semibold mx-1">
                  <h1>Screens</h1>
                </div>
              </td>
              <td className="">120 EG</td>
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
  );
}
