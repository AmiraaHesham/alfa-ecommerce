"use client";
import { MdDelete } from "react-icons/md";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { useLanguage } from "../../../../context/LanguageContext.js";
import Link from "next/link.js";
import { useRouter } from 'next/navigation'; 
import { useCallback, useEffect } from "react";
import { postRequest } from "../../../../utils/requestsUtils.js";
export default function Orders_Table() {
  const { t } = useLanguage();
  const navigate = useRouter(); 

 const getAllOrders = useCallback(async () => {
    try {
      const response = await postRequest("/api/orders/search", {
        page: 0,
        size: 20,
      });
      const resProducts = response.data || [];
      setProducts(resProducts);
      // pagination()
      //       console.log("Categories after set:", resProducts);
    } catch (error) {
      console.log(error);
    }
  }, []);
useEffect(() => {
    getAllOrders();
  }, []);
    return (
      <div className=" rounded-xl w-full   h-screen border  mt-3 overflow-hidden overflow-x-scroll overflow-y-scroll ">
        <table className="  xs:w-[200%] lg:w-full   ">
          <thead className="bg-[#F9FAFB] text-xs text-gray-500  text-justify">
            <tr className=" text-gray-500 h-12  ">
              <th className="w-[2%] "></th>
              <th className="w-[15%]">{t("order_id")}</th>
              <th className="w-[15%]">{t("date")}</th>
              <th className="w-[25%] ">{t("user")}</th>
              <th className="w-[20%] ">{t("items")}</th>
              <th className="w-[15%] ">{t("total")}</th>
              <th className="w-[25%] ">{t("state_order")}</th>
            </tr>
          </thead>
          <tbody className="bg-white text-md w-full ">
            {/* (
                  {
                    (allCateg.map = (category, index) => {
                      <tr
                        key={index}
                        className="text-center text-blue-950 border  hover:bg-gray-50 "
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

        
        <tr className=" text-blue-950 border w-full hover:bg-gray-50"
            onClick={() => navigate.push('/admin/orders_page/OrderDetailsPage')}
            >
              <td></td>

              <td className="font-semibold text-blue-500">#ORD-7782</td>
              <td className="text-sm">Oct 24, 2023</td>

              <td>
              
                    <div className="flex items-center gap-3">
                    <Image
                      alt=""
                      src="/img.jpg"
                      width={45}
                      height={45}
                      className="rounded-full border my-1 p-1"
                    />
                  
                  <div>
                    <h1 className="font-semibold text-sm">Jane Cooper</h1>
                    <h1 className="text-xs  text-gray-500">Jane@example.com</h1>
                  </div>
                   </div>
                  </td>
               
             
              <td className="text-sm">iphone15 pro, ...</td>
              <td className="text-sm font-semibold">EG 1,200.00</td>
              <td className="text-sm font-semibold">Pending</td>
            </tr>
           
          </tbody>
        </table>
      </div>
  );
}
