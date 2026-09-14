"use client";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { FaCircle, FaPlus } from "react-icons/fa";
import {  useEffect, useRef, useState } from "react";
import { postRequest } from "../../../../utils/requestsUtils.js";
import { FaUserLarge } from "react-icons/fa6";
import { ImBlocked } from "react-icons/im";
import { IoMdSearch } from "react-icons/io";
import { useIdContext } from "../../../../context/idContext.jsx";
import { MdOutlineDownloading } from "react-icons/md";

export default function AdminsTable({ setIsFormOpen }) {
  const { t } = useLanguage();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageNum = useRef(0);

  const searchInput = useRef();
  const { setSelectedAdminId } = useIdContext();

  const getAllUsers = async () => {
    try {
      const response = await postRequest(
        "/api/users/search",
        {
          page: pageNum.current,
          size: 15,
          searchText: searchInput.current.value,
          hasAdminRole: true,
        },
        ""
      );
      const resUsers = response.data.content || [];
      if (pageNum.current === 0) {
        setUsers(resUsers);
      } else setUsers((prev) => [...prev, ...resUsers]);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const selectAdminId = (adminId) => {
   setIsFormOpen(true)
    setSelectedAdminId(adminId);
  };

  const addBlock = async (userId) => {
    await postRequest(`/api/admin/users/${userId}/block`,"",t("message"));
    getAllUsers();
  };

  const removeBlock = async (userId) => {
    await postRequest(`/api/admin/users/${userId}/unblock`,"",t("message"));
    getAllUsers();
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div className="w-full h-full ">
     
      <div className="w-full  bg-white mt-3 rounded-lg border flex flex-row  gap-5 justify-between  items-start  p-4 ">
        <div className="flex items-center justify-between border px-1 rounded-md w-[300px] bg-gray-100">
          <input
            ref={searchInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                getAllUsers();
              }
            }}
            type="text"
            placeholder={t("search")}
            className="bg-none outline-none placeholder:text-xs  h-8   bg-gray-100 p-3 rounded-lg"
          />
          <button
            className="text-lg bg-red-300 hover:bg-red-500 p-1 text-white  rounded-md"
            onClick={getAllUsers}
          >
            <IoMdSearch />
          </button>
        </div>
        <div className="">
          <button
            className="p-2 text-white xs:text-xs md:text-sm rounded-md bg-red-500 text-center flex items-center justify-center gap-2"
            onClick={() => {
            setIsFormOpen(true)
            setSelectedAdminId(null)
            }}
          >
            <span className="text-xs">
              <FaPlus />
            </span>
            <h1 className="">{t("add_admin")}</h1>
          </button>
        </div>
      </div>
    
        {/* XS mobile card layout */}
        <div className="lg:hidden rounded-xl w-full h-[520px]  border  mt-3 overflow-hidden overflow-y-scroll">
          {loading
            ? // Skeleton cards
            [...Array(6)].map((_, index) => (
              <div
                key={`mobile-skeleton-${index}`}
                className="bg-white border-b rounded-xl p-3 my-3 mx-2"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 bg-gray-200 rounded-full animate-pulse shrink-0"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-28"></div>
                    <div className="h-2 bg-gray-200 rounded animate-pulse w-20"></div>
                  </div>
                </div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-24 mt-3"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-16 mt-3"></div>
              </div>
            ))
            : users.map((user, index) => {
              const date = new Date(user.lastLoginDate);
              const fullDateTime = date.toLocaleDateString("en-GB");
              return (
                <div
                  key={`mobile-${index}`}
                  className="bg-white border-b rounded-xl p-3 my-3 mx-2 hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    selectAdminId(user.userId);
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h1 className="text-sm font-semibold truncate">
                        {user.firstName + " " + user.lastName}
                      </h1>
                      <h1 className="text-xs text-gray-400 truncate">
                        {user.email}
                      </h1>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span
                        className={`flex items-center justify-center cursor-default text-sm ${
                          user.active === true
                            ? "text-green-600"
                            : "text-gray-600"
                        }`}
                      >
                        <FaCircle />
                      </span>
                      <button
                        className={`flex items-center justify-center text-base ${
                          user.blocked === true
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
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
                  </div>
                  <div className="text-xs text-gray-500 mt-3 pt-3 border-t truncate">
                    {t("username")} : {user.username}
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {t("last_login")} : {fullDateTime}
                  </div>
                </div>
              );
            })}
          <div className="flex justify-center py-3">
            <button
              className=" text-red-600 px-5 py-1 rounded-lg"
              onClick={() => {
                pageNum.current += 1;
                getAllUsers();
              }}
            >
              <MdOutlineDownloading className="text-4xl" />
            </button>
          </div>
        </div>
      <div className="hidden lg:block h-[570px] mt-3 w-full  overflow-y-scroll">

        <table className="h-auto w-full">
          <thead className="bg-[#f0eff0] text-xs   text-justify sticky top-0  z-10">
            <tr className="  h-12 ">
              {/* <th className="w-[5%]"></th> */}
              <th className=" px-4">{t("status")}</th>
              <th className=" px-10">{t("admin")}</th>
              <th className="">{t("username")}</th>
              <th className=" ">{t("last_login")}</th>
            </tr>
          </thead>
          <tbody className="bg-white text-md ">
            {loading
              ? // Skeleton rows
                [...Array(7)].map((_, index) => (
                  <tr key={`skeleton-${index}`} className="border-b">
                    <td className="px-4 py-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                    </td>

                    <td className="px-4 py-2 flex items-center gap-2">
                      <div className="h-12 bg-gray-200 rounded-full animate-pulse w-12"></div>
                      <div className="flex flex-col gap-2">
                        <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-28"></div>
                        <div className="h-2 bg-gray-200 rounded-md animate-pulse w-20"></div>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                    </td>
                  </tr>
                ))
              : users.map((user, index) => {
                  const date = new Date(user.lastLoginDate);
                  const fullDateTime = date.toLocaleDateString("en-GB");

                  return (
                    <>
                    <tr
                      key={index}
                      className=" text-red-950 border hover:bg-gray-50 cursor-pointer"
                    >
                      <td>
                        <div className="flex items-center gap-4   rounded-full   px-5 py-1 font-semibold  ">
                          <span
                            className={`flex items-center justify-center cursor-default text-sm ${
                              user.active === true
                                ? "text-green-600"
                                : "text-gray-600"
                            }`}
                          >
                            <FaCircle />
                          </span>
                          <button
                            className={`flex items-center justify-center text-base ${
                              user.blocked === true
                                ? "text-red-600"
                                : "text-gray-600"
                            }`}
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
                      <td
                        onClick={() => {
                          selectAdminId(user.userId);
                          //   navigate.push("/admin/UsersPage/UserInfo");
                        }}
                      >
                        <div className="flex items-center gap-3 px-10">
                          <span className="w-[40px] text-gray-600 my-2 h-[40px] bg-gray-50 flex justify-center items-center p-2 rounded-full border ">
                            <FaUserLarge />
                          </span>
                          <div className="">
                            <h1 className="text-sm font-semibold">
                              {user.firstName + " " + user.lastName}
                            </h1>
                            <h1 className="text-xs text-gray-400">
                              {user.email}
                            </h1>
                          </div>
                        </div>
                      </td>

                      <td
                        onClick={() => {
                          selectAdminId(user.userId);
                          //   navigate.push("/admin/UsersPage/UserInfo");
                        }}
                      >
                        <h1 className=" text-gray-500">{user.username}</h1>
                      </td>
                      <td
                        onClick={() => {
                          selectAdminId(user.userId);
                          // navigate.push("/admin/UsersPage/UserInfo");
                        }}
                      >
                        <div className="text-gray-500 text-sm">
                          <h1>{fullDateTime}</h1>
                          {/* <h2>2023</h2> */}
                        </div>
                      </td>
                    </tr>
                  
                    
                    </>
                  );
                })}
            {/* <tr className="h-5 text-center">
              <td colSpan="6">
                <button
                  className=" text-red-600 px-5 py-1   my-3 rounded-lg"
                  onClick={() => {
                    pageNum.current += 1;
                    getAllUsers();
                  }}
                >
                  <MdOutlineDownloading className="text-4xl" />
                </button>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
