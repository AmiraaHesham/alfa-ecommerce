"use client"
import { useLanguage } from "../../../../context/LanguageContext";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaUserLarge } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { MdFilterList, MdOutlineDownloading } from "react-icons/md";
import Select from "react-select";
import { postRequest } from "../../../../utils/requestsUtils";

export default function ReturnTable() {
      const { t } = useLanguage();
      const navigate = useRouter();
      const [state, setState] = useState("");
      const [returnOrders, setreturnOrders] = useState([]);
      const [loading, setLoading] = useState(true);
      const pageNum = useRef(0);
      const searchInputRef = useRef(null);
      const getAllOrders = async () => {
        try {
          const response = await postRequest(
            "/api/return-orders/search",
            {
              page: pageNum.current,
              size: 15,
              searchText: searchInputRef.current.value,
              orderState: state,
            },
            ""
          );
          const resOrders = response.data || [];
          if (pageNum.current === 0) {
            setreturnOrders(resOrders);
          } else setreturnOrders((prev) => [...prev, ...resOrders]);
        } catch (error) {
        } finally {
          setLoading(false);
        }  
        }  
    
      useEffect(() => {
        getAllOrders();
      }, [state]);
return(
    <div>
         <div className="w-full  bg-white  rounded-lg border flex md:flex-row xs:flex-col gap-5  items-start  p-4 ">
           <div className="flex items-center justify-between border px-1 rounded-md w-[300px] bg-gray-100">
             <input
               type="text"
               ref={searchInputRef}
               placeholder={t("search")}
               onKeyDown={(e) => {
                 if (e.key === "Enter") {
                   e.preventDefault();
                   getAllOrders();
                 }
               }}
               className="bg-none outline-none placeholder:text-xs h-8   bg-gray-100 p-3 rounded-lg"
             />
             <button
               className="text-lg bg-red-300 hover:bg-red-500 p-1 text-white  rounded-md"
               onClick={getAllOrders}
             >
               <IoMdSearch />
             </button>
           </div>
           <div className="flex items-center gap-4">
             <div className="flex items-center justify-center border px-3 rounded-md bg-gray-100 h-9">
               <span className="text-gray-400 text-lg ">
                 <MdFilterList />
               </span>
               <Select
                 value={
                   state
                     ? {
                         value: state,
                         label: t(state),
                       }
                     : null
                 }
                 onChange={(option) => {
                   setState(option ? option.value : "");
                 }}
                 options={[
                   { value: "", label: t("all_statuses") },
                   { value: "PENDING", label: t("PENDING") },
                   { value: "APPROVED", label: t("APPROVED") },
                   { value: "REFUNDED", label: t("REFUNDED") },
                 ]}
                 placeholder={t("all_statuses")}
                 isClearable
                   isSearchable={false}

                 className="w-[200px] text-sm font-semibold"
                 styles={{
                   control: (base) => ({
                     ...base,
                     backgroundColor: "#f3f4f6",
                     border: "none",
                     borderRadius: "0.375rem",
                     minHeight: "36px",
                     cursor: "pointer",
                     boxShadow: "none",
                     "&:hover": {
                       borderColor: "#dc2626",
                     },
                     "&:focus": {
                       borderColor: "#b91c1c",
                       boxShadow: "0 0 0 3px rgba(185, 28, 28, 0.2)",
                       // outline: "none",
                     },
                   }),
                   option: (base, state) => ({
                     ...base,
                     backgroundColor: state.isSelected
                       ? "#dc2626"
                       : state.isFocused
                       ? "#fee2e2"
                       : "#ffffff",
                     color: state.isSelected ? "#ffffff" : "#374151",
                     cursor: "pointer",
                     // padding: "8px 12px",
                     fontSize: "14px",
                     "&:hover": {
                       backgroundColor: state.isSelected ? "#dc2626" : "#fee2e2",
                     },
                   }),
                   menu: (base) => ({
                     ...base,
                     backgroundColor: "#ffffff",
                     borderRadius: "0.375rem",
                     boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                     zIndex: 9999,
                   }),
                   placeholder: (base) => ({
                     ...base,
                     color: "#374151",
                     fontSize: "14px",
                     fontWeight: "600",
                   }),
                   singleValue: (base) => ({
                     ...base,
                     color: "#374151",
                     fontSize: "14px",
                     fontWeight: "600",
                   }),
                   input: (base) => ({
                     ...base,
                     color: "#374151",
                   }),
                 }}
               />
             </div>
           </div>
         </div>
         <div className=" rounded-xl w-full  h-[500px] mt-5  border  overflow-hidden overflow-x-scroll overflow-y-scroll ">
           <table className="xs:w-[200%] lg:w-full   ">
             <thead className="bg-[#F9FAFB] text-xs text-gray-500  text-justify sticky top-0  z-10">
               <tr className=" text-gray-500 h-12">
                 {/* <th className="w-[2%] "></th> */}
                 <th className="w-[20%] px-5 ">{t("order_id")}</th>
                 <th className="w-[15%] ">{t("date")}</th>
                 <th className="w-[25%] ">{t("user")}</th>
                 <th className="w-[15%] ">{t("price")}</th>
                 <th className="w-[15%] ">{t("Reason_for_return")}</th>
                 <th className="w-[20%] ">{t("state_order")}</th>
               </tr>
             </thead>
             <tbody className="bg-white text-md w-full ">
               {loading
                 ? // Skeleton rows
                   [...Array(7)].map((_, index) => (
                     <tr key={`skeleton-${index}`} className="border-b h-12">
                       <td className="px-4 py-2">
                         <div className="h-4 bg-gray-200 rounded animate-pulse w-36"></div>
                       </td>
                       <td className=" py-2">
                         <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                       </td>
                       <td className=" py-2">
                         <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
                       </td>
                       <td className=" py-2">
                         <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
                       </td>
                       <td className=" py-2">
                         <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                       </td>
                       <td className=" py-2">
                         <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                       </td>
                     </tr>
                   ))
                 : returnOrders.map((order, index) => {
                     const date = new Date(order.createdDate);
                     const dateOnly = date.toLocaleDateString("en-GB");
                     return (
                       <tr
                         key={index}
                         className=" text-red-950 border w-full hover:bg-gray-50 cursor-pointer"
                         onClick={() =>
                           navigate.push(
                             `/admin/returnorderdetails/${order.returnOrderId}`
                           )
                         }
                       >
                         <td className="font-semibold text-red-500 px-5">
                           {order.code}
                         </td>
                         <td
                          className="text-sm">
                            {dateOnly}
                          </td>
                         <td>
                           <div className="flex items-center gap-3">
                             <span className="w-[40px] h-[40px] text-gray-600 my-2  bg-gray-50 flex justify-center items-center p-2 rounded-full border ">
                               <FaUserLarge />
                             </span>
                             <div>
                               <h1 className="font-semibold text-sm">
                                 {order.user?.firstName + " " + order.user?.lastName}
                               </h1>
                               <h1 className="text-xs  text-gray-500">
                                 {order.user?.email}
                               </h1>
                             </div>
                           </div>
                         </td>
   
                         <td className="text-sm ">
                           <span className=" font-semibold  ">
                             {order.unitPrice.toLocaleString("en-US") + " " + t("currency")}
                           </span>
                         </td>
                         <td className="text-xs px-5 font-semibold">
                           {t(order.reason).length <= 30?
                           t(order.reason): t(order.reason).slice(0, 30) + " ..."
                          }
                         </td>
                         <td
                           className={`text-xs font-semibold ${
                             order.state === "PROCESSING"
                               ? "text-blue-500"
                               : order.state === "SHIPPED"
                               ? "text-yellow-500"
                               : order.state === "PENDING"
                               ? "text-orange-700":
                                 order.state === "CANCELLED" ? 
                                 "text-red-500"
                               : "text-green-500"
                           }`}
                         >
                           {t(order.state)}
                         </td>
                       </tr>
                     );
                   })}
               {/* {orders.length <= 5 ? (
                 " "
               ) : ( */}
               <tr className="h-5 text-center">
                 <td colSpan="6">
                   <button
                     className=" text-red-600 w-[100px] py-1 text-center  my-3 rounded-lg"
                     onClick={() => {
                       pageNum.current += 1;
                       getAllOrders();
                     }}
                   >
                     <MdOutlineDownloading className="text-4xl" />
                   </button>
                 </td>
               </tr>
               {/* )} */}
             </tbody>
           </table>
         </div>
       </div>
)}
