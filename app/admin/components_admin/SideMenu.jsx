 "use client"
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
import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext.js';

export default function SideMenu({tabId}) {
      const [activeTab, setActiveTab] = useState('dashboard'); 
      const handleTabClick = () => {
    setActiveTab(tabId);
  };
      const { t } = useLanguage();

  return (
<div className="h-screen md:w-[300px]  bg-[#ffffff]">
      <div className="h-full">
        <div className="flex items-center mx-5 gap-4 my-5">
            <span className="text-2xl bg-blue-500 p-2 text-white rounded-md"><MdElectricBolt/></span>
            <div className="cursor-default">
                <h1  className="text-md text-blue-950 font-semibold font-sans">AlfaAdmin</h1>
                <h1 className="text-xs text-blue-950">{t('super_admin')}</h1>
            </div>
        </div>

        <div className="mt-9">
 <Link href='/admin/Dashboard'>
  <div onClick={()=>handleTabClick({tabId})} className={`flex gap-4 mx-5 justify-start  items-center p-3 rounded-md cursor-pointer 
 ${              activeTab === 'Dashboard'
                ? 'bg-[#e0e7ff6e] text-[#6158ff]'
                : 'text-[#5c6370] hover:bg-[#e0e7ff6e] hover:text-[#6158ff]'
            }`}>
                
            <span className="text-2xl"><MdDashboard /></span>
            <h1 className="text-md ">{t('dashboard')}</h1>
        </div></Link>

      <div onClick={()=>handleTabClick({tabId})} className={`flex gap-4 mx-5 justify-start  items-center p-3 rounded-md  cursor-pointer
        ${              activeTab === 'HomePage'
                ? 'bg-[#e0e7ff6e] text-[#6158ff]'
                : 'text-[#5c6370] hover:bg-[#e0e7ff6e] hover:text-[#6158ff]'
            }`}>
            <span className="text-2xl"><RiPagesFill /></span>
            <h1 className="text-md ">{t('homepage')}</h1>
        </div>

        <Link href='/admin/Categorys'>  
         <div onClick={()=>handleTabClick({tabId})} 
         className={`flex gap-4 mx-5 justify-start  items-center p-3 rounded-md cursor-pointer
         ${              activeTab === 'Categorys'
                ? 'bg-[#e0e7ff6e] text-[#6158ff]'
                : 'text-[#5c6370] hover:bg-[#e0e7ff6e] hover:text-[#6158ff]'
            } `}>
            <span className="text-2xl"><MdCategory /></span>
            <h1 className="text-md ">{t('categories')}</h1>
        </div></Link>

 <Link href='/admin/Products'>
                <div onClick={()=>handleTabClick('Products')}
                 className={`flex gap-4 mx-5 justify-star  items-center p-3 rounded-md cursor-pointer 
                 ${           activeTab === 'Products'
                ? 'bg-[#e0e7ff6e] text-[#6158ff]'
                : 'text-[#5c6370] hover:bg-[#e0e7ff6e] hover:text-[#6158ff]'
            }`}>
            <span className="text-2xl"><IoFileTray /></span>
            <h1 className="text-md ">{t('products')}</h1>
        </div></Link>

             <Link href='/admin/orders_page/Orders'>
              <div  className={`flex gap-4 mx-5 justify-start items-center p-3 rounded-md  cursor-pointer \
                ${              activeTab === 'Orders'
                ? 'bg-[#e0e7ff6e] text-[#6158ff]'
                : 'text-[#5c6370] hover:bg-[#e0e7ff6e] hover:text-[#6158ff]'
            } `}>
            <span className="text-2xl"><MdOutlineShoppingCart /></span>
            <h1 className="text-md ">{t('orders')}</h1>
        </div>
        </Link>

          <Link href='/admin/Users'>  <div onClick={()=>handleTabClick('Users')}
             className={`flex gap-4 mx-5 justify-start  items-center p-3 rounded-md cursor-pointer 
             ${              activeTab === 'Users'
                ? 'bg-[#e0e7ff6e] text-[#6158ff]'
                : 'text-[#5c6370] hover:bg-[#e0e7ff6e] hover:text-[#6158ff]'
            }`}>
            <span className="text-2xl"><ImUsers /></span>
            <h1 className="text-md ">{t('users')}</h1>
        </div></Link> 

        {/* <Link href='/admin/AdminUsers'>  <div onClick={()=>handleTabClick('Admins')}
          className={`flex gap-4 mx-5 justify-start  items-center p-3 rounded-md cursor-pointer 
          ${              activeTab === 'Admins'
                ? 'bg-[#e0e7ff6e] text-[#6158ff]'
                : 'text-[#5c6370] hover:bg-[#e0e7ff6e] hover:text-[#6158ff]'
            }`}>
            <span className="text-2xl"><MdAdminPanelSettings /></span>
            <h1 className="text-md ">{t('admins')}</h1>
        </div></Link> */}

                <div onClick={()=>handleTabClick('Contact')} 
                className={`flex gap-4 mx-5 justify-start  items-center p-3 rounded-md cursor-pointer
                ${              activeTab === 'Contact'
                ? 'bg-[#e0e7ff6e] text-[#6158ff]'
                : 'text-[#5c6370] hover:bg-[#e0e7ff6e] hover:text-[#6158ff]'
            }`}>
            <span className="text-2xl"><MdContactSupport /></span>
            <h1 className="text-md ">{t('contact')}</h1>
        </div>
        </div>
       {/* <div className="flex justify-center ">
        <button>Logout</button>
       </div> */}
      </div>
    </div>

  );
}