"use client";
import Image from "next/image";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { MdDelete, MdOutlineDownloading } from "react-icons/md";
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
  const pageNum = useRef(0);

  const searchInput = useRef();
  // const searchInputRef = useRef();
  const { setSelectedUserId } = useIdContext();

  const getAllUsers = async () => {
    try {
      // console.log(searchInputRef.current.value);
      const response = await postRequest(
        "/api/users/search",
        {
          page: pageNum.current,
          size: 15,
          searchText: searchInput.current.value,
        },
        ""
      );
      const resUsers = response.data || [];
      if (pageNum.current === 0) {
        setUsers(resUsers);
      } else setUsers((prev) => [...prev, ...resUsers]);

      // pagination()
      //       console.log("Categories after set:", resProducts);
    } catch (error) {
      console.log(error);
    }
  };
  const addBlock = async (userId) => {
    await postRequest(
      `/api/admin/users/${userId}/block`,
      "",
      t("message")
    );
    getAllUsers();
  };
  const removeBlock = async (userId) => {
    await postRequest(
      `/api/admin/users/${userId}/unblock`,
      "",
      t("message")
    );
    getAllUsers();
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div>
      <div className="w-full h-full bg-white mt-3 rounded-lg border flex md:flex-row xs:flex-col gap-5  items-start  p-4 ">
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
            className="bg-none outline-none placeholder:text-xs  h-8   bg-gray-100 p-2 rounded-lg"
          />
          <button
            className="text-lg bg-red-300 hover:bg-red-500 p-1 text-white  rounded-md"
            onClick={getAllUsers}
          >
            <IoMdSearch />
          </button>
        </div>
        {/* <div className="flex items-center gap-4 border rounded-md">
          <div className="flex items-center justify-center  px-3   bg-gray-100 h-9">
            <span className="text-gray-400 text-lg ">
              <MdFilterList />
            </span>
            <select className="bg-none outline-none text-gray-700  w-[200px] h-9 text-sm font-semibold bg-gray-100 p-2 rounded-lg ">
              <option value=""> {t("all_statuses")} </option>
              <option value="Active">Active</option>
              <option value="Deactive">Deactive</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>
        </div> */}
      </div>
      <div className=" rounded-xl w-full h-screen   border  mt-3 overflow-hidden overflow-x-scroll overflow-y-scroll ">
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
              const date = new Date(user.registrationDate);
              const dateOnly = date.toLocaleDateString("en-GB");
              return (
                <tr
                  key={index}
                  className=" text-red-950 border hover:bg-gray-50 cursor-pointer"
                >
                  <td>
                    <div className="flex items-center gap-4  w-[90px]  rounded-full   px-5 py-1 font-semibold  ">
                      <span
                        className={`flex items-center justify-center text-sm ${
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
                      setSelectedUserId();
                      navigate.push(`/admin/UsersPage/UserInfo/${user.userId}`);
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
                          {user.username}
                        </h1>
                      </div>
                    </div>
                  </td>

                  <td
                    onClick={() => {
                      navigate.push(`/admin/UsersPage/UserInfo/${user.userId}`);
                    }}
                  >
                    <h1 className=" text-gray-500">{user.email}</h1>
                  </td>
                  <td
                    onClick={() => {
                      setSelectedUserId(user.userId);
                      navigate.push(`/admin/UsersPage/UserInfo/${user.userId}`);
                    }}
                  >
                    <div className="text-gray-500 text-sm">
                      <h1>{dateOnly}</h1>
                    </div>
                  </td>
                  <td
                    onClick={() => {
                      setSelectedUserId(user.userId);
                      navigate.push(`/admin/UsersPage/UserInfo/${user.userId}`);
                    }}
                  >
                    <div className="bg-red-100 w-[80px] text-center rounded-full text-red-700  px-2 font-semibold text-xs">
                      <h1>{user.ordersCount}</h1>
                      <h2>{t("orders")}</h2>
                    </div>
                  </td>
                </tr>
              );
            })}
            <tr className="h-5 text-center">
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
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
