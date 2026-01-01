"use client";
import { MdDashboard } from "react-icons/md";
import { IoFileTray } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { ImUsers } from "react-icons/im";
import { MdContactSupport } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import { RiPagesFill } from "react-icons/ri";
import { MdElectricBolt } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import Link from "next/link";
import React, { useState, useEffect} from "react";
import { useLanguage } from "../../../context/LanguageContext.js";
export default function SideMenu({
  dashbord,
  homepage,
  categorys,
  products,
  orders,
  users,
  admins,
  contact,
}) {

  const { t } = useLanguage();

  return (
    <div className="  xs:w-[60px] md:w-[300px]  bg-[#ffffff]">
      <div className=" h-screen   ">
        <div className="flex  items-center justify-center gap-4 my-5">
          <span className="text-2xl bg-blue-500 p-2 text-white rounded-md">
            <MdElectricBolt />
          </span>
          <div className="cursor-default md:block xs:hidden">
            <h1 className="text-md  text-blue-950 font-semibold font-sans">
              AlfaAdmin
            </h1>
            <h1 className="text-xs text-blue-950">{t("super_admin")}</h1>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-1">
          <Link href="/admin/Dashboard">
            <div
              className={`flex gap-4 mx-3 xs:justify-center md:justify-start  items-center p-3 rounded-md cursor-pointer hover:bg-[#e0e7ff6e] hover:text-[#6158ff] ${dashbord}`}
            >
              <span className="text-2xl text-gray-600">
                <MdDashboard />
              </span>
              <h1 className="text-md xs:hidden md:block ">{t("dashboard")}</h1>
            </div>
          </Link>

        <Link href="/admin/HomePage">
          <div
            className={`flex gap-4 mx-3 xs:justify-center md:justify-start  items-center p-3 rounded-md  cursor-pointer hover:bg-[#e0e7ff6e] hover:text-[#6158ff]
        ${homepage}`}
          >
            <span className="text-2xl text-gray-600">
              <RiPagesFill />
            </span>
            <h1 className="text-md xs:hidden md:block ">{t("homepage")}</h1>
          </div>
        </Link>

          <Link href="/admin/Categorys">
            <div
              className={`flex gap-4 mx-3 xs:justify-center md:justify-start  items-center p-3 rounded-md cursor-pointer hover:bg-[#e0e7ff6e] hover:text-[#6158ff]
         ${categorys} `}
            >
              <span className="text-2xl text-gray-600">
                <MdCategory />
              </span>
              <h1 className="text-md xs:hidden md:block">{t("categories")}</h1>
            </div>
          </Link>

          <Link href="/admin/Products">
            <div
              className={`flex gap-4 mx-3 xs:justify-center md:justify-start items-center p-3 rounded-md cursor-pointer  hover:bg-[#e0e7ff6e] hover:text-[#6158ff]
                 ${products}`}
            >
              <span className="text-2xl text-gray-600">
                <IoFileTray />
              </span>
              <h1 className="text-md xs:hidden md:block">{t("products")}</h1>
            </div>
          </Link>

          <Link href="/admin/orders_page/Orders">
            <div
              className={`flex gap-4 mx-3 xs:justify-center md:justify-start items-center p-3 rounded-md  cursor-pointer hover:bg-[#e0e7ff6e] hover:text-[#6158ff]
                ${orders} `}
            >
              <span className="text-2xl text-gray-600">
                <MdOutlineShoppingCart />
              </span>
              <h1 className="text-md xs:hidden md:block">{t("orders")}</h1>
            </div>
          </Link>

          <Link href="/admin/UsersPage/Users">
            <div
              className={`flex gap-4 mx-3 xs:justify-center md:justify-start  items-center p-3 rounded-md cursor-pointer hover:bg-[#e0e7ff6e] hover:text-[#6158ff]
             ${users}`}
            >
              <span className="text-2xl text-gray-600">
                <ImUsers />
              </span>
              <h1 className="text-md xs:hidden md:block">{t("users")}</h1>
            </div>
          </Link>

          {/* <Link href='/admin/AdminUsers'>  <div onClick={()=>handleTabClick('Admins')}
          className={`flex gap-4 mx-5 justify-start  items-center p-3 rounded-md cursor-pointer 
          ${              activeTab === 'Admins'
                ? 'bg-[#e0e7ff6e] text-[#6158ff]'
                : 'text-[#5c6370] hover:bg-[#e0e7ff6e] hover:text-[#6158ff]'
            }`}>
            <span className="text-2xl"><MdAdminPanelSettings /></span>
            <h1 className="text-md ">{t('admins')}</h1>
        </div></Link> */}

          <Link href="/admin/Contact">
            <div
              className={`flex gap-4 mx-3 xs:justify-center md:justify-start items-center p-3 rounded-md cursor-pointer hover:bg-[#e0e7ff6e] hover:text-[#6158ff] ${contact}`}
            >
              <span className="text-2xl text-gray-600">
                <MdContactSupport />
              </span>
              <h1 className="text-md xs:hidden md:block">{t("contact")}</h1>
            </div>
          </Link>
        </div>
        {/* <div className="flex justify-center ">
        <button>Logout</button>
       </div> */}
      </div>
    </div>
  );
}
