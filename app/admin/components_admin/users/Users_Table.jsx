"use client";
import Image from "next/image";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { MdDelete } from "react-icons/md";
import { FaCircle, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { postRequest } from "../../../../utils/requestsUtils.js";
import { FaUserLarge } from "react-icons/fa6";
import { ImBlocked } from "react-icons/im";
import { IoMdSearch } from "react-icons/io";
import { MdFilterList } from "react-icons/md";
import { FaRegCalendar } from "react-icons/fa6";
import { useIdContext } from "../../../../context/idContext.jsx";
export default function UsersPage() {
  const navigate = useRouter();
  const { t } = useLanguage();
  const [users, setUsers] = useState([]);
  
  const searchInput= useRef()
  // const searchInputRef = useRef();
  const { setSelectedId } = useIdContext();

  const getAllUsers = useCallback(async () => {
    try {
      // console.log(searchInputRef.current.value);
      const response = await postRequest("/api/users/search", {
        page: 0,
        size: 10,
        searchText: searchInput.current.value,
      });
      const resUsers = response.data || [];
      setUsers(resUsers);
      // pagination()
      //       console.log("Categories after set:", resProducts);
    } catch (error) {
      console.log(error);
    }
  }, []);
const addBlock = async (userId) => {
    await postRequest(`/api/admin/users/${userId}/block`);
    getAllUsers();
  };
  const removeBlock = async (userId) => {
    await postRequest(`/api/admin/users/${userId}/unblock`);
    getAllUsers();
  };
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);
  return (<div>
 <div className="w-full  bg-white mt-3 rounded-lg border flex md:flex-row xs:flex-col gap-5  items-start  p-4 ">
      <div className="flex items-center justify-center border px-3 rounded-md bg-gray-100 h-9">
        <span className="text-gray-400 text-lg "><IoMdSearch /></span>
        <input ref={searchInput} 
         onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                getAllUsers();
              }
            }}
        type="text" placeholder='Search by user name or email'
         className="bg-none outline-none placeholder:text-sm  h-8   bg-gray-100 p-2 rounded-lg"/>
      </div>
      <div className="flex items-center gap-4">
 <div className="flex items-center justify-center border px-3 rounded-md bg-gray-100 h-9">
        <span className="text-gray-400 text-lg "><MdFilterList /></span>
        <select className="bg-none outline-none text-gray-700  w-[200px] h-9 text-sm font-semibold bg-gray-100 p-2 rounded-lg ">
        <option value="">All Statuses</option>
        <option value="Active">Active</option>
        <option value="Deactive">Deactive</option>
        <option value="Blocked">Blocked</option>
        </select>
       
      </div>
      </div>
   
      </div>
    <div className=" rounded-xl w-full   h-screen border  mt-3 overflow-hidden overflow-x-scroll overflow-y-scroll ">
      <table className="  xs:w-[220%] lg:w-full   ">
        <thead className="bg-[#F9FAFB] text-xs text-justify">
          <tr className=" text-gray-500 h-12  ">
            {/* <th className="w-[5%]"></th> */}
            <th className="w-[1%] px-4">{t("status")}</th>

            <th className="w-[25%] px-10">{t("User")}</th>
            <th className="w-[20%]">{t("email")}</th>
            <th className="w-[15%] ">{t("registered-on")}</th>
            <th className="w-[15%] px-4">{t("orders")}</th>
          </tr>
        </thead>
        <tbody className="bg-white text-md ">
          {users.map((user, index) => {
            return (
              <tr
                key={index}
                className=" text-blue-950 border hover:bg-gray-50 cursor-pointer"
              >
                <td>
                  <div className="flex items-center gap-4  w-[90px]  rounded-full   px-5 py-1 font-semibold  ">
                    <span className={`flex items-center justify-center text-sm ${user.active === true? 'text-green-600' : "text-gray-600"}`}>
                      <FaCircle />
                    </span>
                    <button className= {`flex items-center justify-center text-base ${user.blocked === true? 'text-red-600' : "text-gray-600"}`}
                     onClick={() => {
                          if (user.blocked === false) {
                            addBlock(user.userId);
                          } else {
                            removeBlock(user.userId);
                          }
                        }}
                    >
                      <ImBlocked />
                    </button>
                  </div>
                </td>
                <td   onClick={() => {
                  setSelectedId(user.userId)
                  navigate.push("/admin/UsersPage/UserInfo")}}>
                  <div className="flex items-center gap-3 px-10">
                    <span className="w-[40px] text-gray-600 my-2 h-[40px] bg-gray-50 flex justify-center items-center p-2 rounded-full border ">
                      <FaUserLarge />
                    </span>
                    <div className="">
                      <h1 className="text-sm font-semibold">
                        {user.firstName + " " + user.lastName}
                      </h1>
                      <h1 className="text-xs text-gray-400">{user.username}</h1>
                    </div>
                  </div>
                </td>

                <td   onClick={() => {
                  setSelectedId(user.userId)
                  navigate.push("/admin/UsersPage/UserInfo")}}>
                  <h1 className=" text-gray-500">{user.email}</h1>
                </td>
                <td   onClick={() => {
                  setSelectedId(user.userId)
                  navigate.push("/admin/UsersPage/UserInfo")}}>
                  <div className="text-gray-500 text-sm">
                    <h1>{user.birthDate}</h1>
                    {/* <h2>2023</h2> */}
                  </div>
                </td>
                <td   onClick={() => {
                  setSelectedId(user.userId)
                  navigate.push("/admin/UsersPage/UserInfo")}}>
                  <div className="bg-blue-100 w-[80px] text-center rounded-full text-blue-700  px-2 font-semibold text-xs">
                    <h1>10 </h1>
                    <h2>{t("orders")}</h2>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>  
    </div>

  );
}
