"use client";
import { FiEdit } from "react-icons/fi";
import Image from "next/image";
import SideMenu from "../components/SideMenu";
import Header from "../components/Header";
import { useLanguage } from "../../../context/LanguageContext.js";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import React, {  useRef, useState } from "react";
import FormCategory from "../components/FormCategory";
import { MdDelete } from "react-icons/md";


export default function Categorys() {
  const { allCateg, setAllCateg } = useState([]);
  // useEffect = () => {
  //   // getAllCategory, []
  // };

  const { t } = useLanguage();

  const getAllCategory = async () => {
    try {
      const res = await axios.get("http://10.202.96.1/api/itemCategory/admin");

      console.log(res.data);
      setAllCateg(res.data);
    } catch (error){
      console.log(error)
    }
  };

  return (
    <div className="bg-[#F9FAFB] h-full ">
      <main className=" flex border ">
        <SideMenu tabId={'Categorys'}/>
        <div className="w-full">
          <Header page_title= {t("categories_management")} />

          <div className="mx-10 mt-5 ">
          
            <FormCategory />

            <div className="bg-white h-[50px] border rounded-lg border-1  w-full mt-2 flex justify-end p-5 items-center">
              <button
                className="p-2 text-white text-sm rounded-md bg-blue-500 text-center flex items-center justify-center gap-2"
                onClick={() => {
                  let form = document.querySelector("#add-category-form");
                  form.classList.remove("hidden");
                  form.classList.add("flex");
                }}
              >
              <span>  <FaPlus /></span>
              <h1>{t("add_new_category")}</h1>  
              </button>
            </div>
            <div className=" rounded-xl w-full h-[530px] border  mt-3 overflow-hidden overflow-y-scroll ">
              <table className=" w-full     rounded-lg  ">
                <thead className="bg-[#F9FAFB] text-sm  text-justify">
                  <tr className=" text-blue-800 h-12  ">
                    <th className="w-[5%]"></th>
                    <th className="w-[15%]">{t("image")}</th>
                    <th className="w-[25%]">{t("category_name")}</th> 
                    <th className="w-[25%] mx-5">{t("products_count")}</th>
                    <th classN ame="w-[5%]"></th>
                  </tr>
                </thead>
                <tbody className="bg-white text-md w-full ">
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
                 
                     <tr
                        className=" text-blue-950 border " >
                          <td></td>
                       <td><Image alt='' src='/img.jpg' width={50} height={50} className="rounded-xl border my-1 p-1"/></td>

                        <td><div>
                          <h1 className="text-md font-semibold">SmartPhons</h1>
                          <h1 className="text-xs"></h1>
                          </div>
                          </td>
                        <td> <div className="bg-blue-100 w-[80px] text-center rounded-full text-blue-600  px-2 font-semibold text-xs">
                          <h1>120</h1>
                          <h2>{t('products_category')}</h2>
                          </div></td>
                        
                        <td>
                                              <button className="text-red-800 text-sm flex items-center gap-1 bg-red-300 px-2 py-1 font-semibold rounded-md hover:bg-red-400">
                                              <MdDelete /> {t("delete")}
                                              </button>
                                            </td>
                      </tr>
                       <tr
                        className=" text-blue-950 border " >
                          <td></td>
                       <td><Image alt='' src='/img.jpg' width={50} height={50} className="rounded-xl border my-1 p-1"/></td>

                        <td><div>
                          <h1 className="text-md font-semibold">SmartPhons</h1>
                          <h1 className="text-xs">{t('main_category')}</h1>
                          </div>
                          </td>
                        <td> <div className="bg-blue-100 w-[80px]  text-center rounded-full text-blue-600  px-2 font-semibold text-xs">
                          <h1>120</h1>
                          <h2>{t('products_category')}</h2>
                          </div></td>
                        <td>
                      <button className="text-red-800 text-sm flex items-center gap-1 bg-red-300 px-2 py-1 font-semibold rounded-md hover:bg-red-400">
                      <MdDelete /> {t("delete")}
                      </button>
                    </td>
                      </tr>
                       <tr
                        className=" text-blue-950 border " >
                          <td></td>
                       <td><Image alt='' src='/img.jpg' width={50} height={50} className="rounded-xl border my-1 p-1"/></td>

                        <td><div>
                          <h1 className="text-md font-semibold">SmartPhons</h1>
                          <h1 className="text-xs">{t('main_category')}</h1>
                          </div>
                          </td>
                        <td> <div className="bg-blue-100 w-[80px]  text-center rounded-full text-blue-600  px-2 font-semibold text-xs">
                          <h1>120</h1>
                          <h2>{t('products_category')}</h2>
                          </div></td>
                        <td>
                      <button className="text-red-800 text-sm flex items-center gap-1 bg-red-300 px-2 py-1 font-semibold rounded-md hover:bg-red-400">
                      <MdDelete /> {t("delete")}
                      </button>
                    </td>
                      </tr>
                      <tr
                        className=" text-blue-950 border " >
                          <td></td>
                       <td><Image alt='' src='/img.jpg' width={50} height={50} className="rounded-xl border my-1 p-1"/></td>

                        <td><div>
                          <h1 className="text-md font-semibold">SmartPhons</h1>
                          <h1 className="text-xs">{t('main_category')}</h1>
                          </div>
                          </td>
                        <td> <div className="bg-blue-100 w-[80px]  text-center rounded-full text-blue-600  px-2 font-semibold text-xs">
                          <h1>120</h1>
                          <h2>{t('products_category')}</h2>
                          </div></td>
                        <td>
                      <button className="text-red-800 text-sm flex items-center gap-1 bg-red-300 px-2 py-1 font-semibold rounded-md hover:bg-red-400">
                      <MdDelete /> {t("delete")}
                      </button>
                    </td>
                      </tr>
                      <tr
                        className=" text-blue-950 border " >
                          <td></td>
                       <td><Image alt='' src='/img.jpg' width={50} height={50} className="rounded-xl border my-1 p-1"/></td>

                        <td><div>
                          <h1 className="text-md font-semibold">SmartPhons</h1>
                          <h1 className="text-xs">{t('main_category')}</h1>
                          </div>
                          </td>
                        <td> <div className="bg-blue-100 w-[80px]  text-center rounded-full text-blue-600  px-2 font-semibold text-xs">
                          <h1>120</h1>
                          <h2>{t('products_category')}</h2>
                          </div></td>
                        <td>
                      <button className="text-red-800 text-sm flex items-center gap-1 bg-red-300 px-2 py-1 font-semibold rounded-md hover:bg-red-400">
                      <MdDelete /> {t("delete")}
                      </button>
                    </td>
                      </tr>
                      <tr
                        className=" text-blue-950 border " >
                          <td></td>
                       <td><Image alt='' src='/img.jpg' width={50} height={50} className="rounded-xl border my-1 p-1"/></td>

                        <td><div>
                          <h1 className="text-md font-semibold">SmartPhons</h1>
                          <h1 className="text-xs">{t('main_category')}</h1>
                          </div>
                          </td>
                        <td> <div className="bg-blue-100 w-[80px]  text-center rounded-full text-blue-600  px-2 font-semibold text-xs">
                          <h1>120</h1>
                          <h2>{t('products_category')}</h2>
                          </div></td>
                        <td>
                      <button className="text-red-800 text-sm flex items-center gap-1 bg-red-300 px-2 py-1 font-semibold rounded-md hover:bg-red-400">
                      <MdDelete /> {t("delete")}
                      </button>
                    </td>
                      </tr>
                      <tr
                        className=" text-blue-950 border " >
                          <td></td>
                       <td><Image alt='' src='/img.jpg' width={50} height={50} className="rounded-xl border my-1 p-1"/></td>

                        <td><div>
                          <h1 className="text-md font-semibold">SmartPhons</h1>
                          <h1 className="text-xs">{t('main_category')}</h1>
                          </div>
                          </td>
                        <td> <div className="bg-blue-100 w-[80px]  text-center rounded-full text-blue-600  px-2 font-semibold text-xs">
                          <h1>120</h1>
                          <h2>{t('products_category')}</h2>
                          </div></td>
                        <td>
                      <button className="text-red-800 text-sm flex items-center gap-1 bg-red-300 px-2 py-1 font-semibold rounded-md hover:bg-red-400">
                      <MdDelete /> {t("delete")}
                      </button>
                    </td>
                      </tr>
                      <tr
                        className=" text-blue-950 border " >
                          <td></td>
                       <td><Image alt='' src='/img.jpg' width={50} height={50} className="rounded-xl border my-1 p-1"/></td>

                        <td><div>
                          <h1 className="text-md font-semibold">SmartPhons</h1>
                          <h1 className="text-xs">{t('main_category')}</h1>
                          </div>
                          </td>
                        <td> <div className="bg-blue-100 w-[80px]  text-center rounded-full text-blue-600  px-2 font-semibold text-xs">
                          <h1>120</h1>
                          <h2>{t('products_category')}</h2>
                          </div></td>
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
