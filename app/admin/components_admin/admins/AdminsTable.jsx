"use client";
import Image from "next/image";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { MdDelete } from "react-icons/md";
import { FaCircle, FaPlus, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { postRequest } from "../../../../utils/requestsUtils.js";
import { FaUserLarge } from "react-icons/fa6";
import { ImBlocked } from "react-icons/im";
import { IoMdSearch } from "react-icons/io";
import { MdFilterList } from "react-icons/md";
import { FaRegCalendar } from "react-icons/fa6";
import { useIdContext } from "../../../../context/idContext.jsx";
export default function AdminsTable() {
  const navigate = useRouter();
  const { t } = useLanguage();
  const [users, setUsers] = useState([]);

  const searchInput = useRef();
  // const searchInputRef = useRef();
  const { setSelectedId } = useIdContext();

  const getAllUsers = useCallback(async () => {
    try {
      // console.log(searchInputRef.current.value);
      const response = await postRequest("/api/users/search", {
        page: 0,
        size: 100,
        searchText: searchInput.current.value,
          hasAdminRole: true,

      },'');
      const resUsers = response.data || [];
      setUsers(resUsers);
      // pagination()
      //       console.log("Categories after set:", resProducts);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const selectAdminId = (adminId) => {
    let form = document.querySelector("#add-admin-form");
    let nameForm = document.querySelector("#nameForm");
    let btn_save = document.querySelector("#btn-save");
    let btn_edit = document.querySelector("#btn-edit");
    btn_edit.classList.remove("hidden");
    btn_save.classList.add("hidden");
    nameForm.innerHTML = t("edit")+(' ')+t('admin')
    form.classList.remove("hidden");
    form.classList.add("flex");
    setSelectedId(adminId);
   
  };


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
  return (
    <div>
      <div className="w-full  bg-white mt-3 rounded-lg border flex flex-row  gap-5 justify-between  items-start  p-4 ">
        <div className="flex items-center justify-center border px-3 rounded-md bg-gray-100 h-9">
          <span className="text-gray-400 text-lg ">
            <IoMdSearch />
          </span>
          <input
            ref={searchInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                getAllUsers();
              }
            }}
            type="text"
            placeholder="Search by user name or email"
            className="bg-none outline-none placeholder:text-sm  h-8   bg-gray-100 p-2 rounded-lg"
          />
        </div>
        <div className="flex items-center gap-4">
          <button
            className="p-2 text-white xs:text-xs md:text-sm rounded-md bg-blue-500 text-center flex items-center justify-center gap-2"
            onClick={() => {
              let form = document.querySelector("#add-admin-form");
              form.classList.remove("hidden");
              form.classList.add("flex");
              let nameForm = document.querySelector("#nameForm");
              let btn_save = document.querySelector("#btn-save");
              let btn_edit = document.querySelector("#btn-edit");
              btn_edit.classList.add("hidden");
              // btn_saveProduct.classList.remove("hidden");
              nameForm.innerHTML = "Add New Admin";
        
            }}
          >
            <span className="text-base">
              <FaPlus />
            </span>
            <h1 className="xs:hidden md:block">{t("add_new_admin")}</h1>
          </button>
        </div>
      </div>
      <div className=" rounded-xl w-full   h-screen border  mt-3 overflow-hidden overflow-x-scroll overflow-y-scroll ">
        <table className="  xs:w-[220%] lg:w-full   ">
          <thead className="bg-[#F9FAFB] text-xs text-justify">
            <tr className=" text-gray-500 h-12  ">
              {/* <th className="w-[5%]"></th> */}
              <th className="w-[1%] px-4">{t("status")}</th>
              <th className="w-[30%] px-10">{t("Admin")}</th>
              <th className="w-[25%]">{t("Username")}</th>
              <th className="w-[25%] ">{t("Last Login")}</th>
            </tr>
          </thead>
          <tbody className="bg-white text-md ">
            {users.map((user, index) => {
              return (
                <tr
                  key={index}
                  className=" text-blue-950 border hover:bg-gray-50 cursor-pointer">
                  <td>
                    <div className="flex items-center gap-4  w-[90px]  rounded-full   px-5 py-1 font-semibold  ">
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
                          {user.username}
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
                    <h1 className=" text-gray-500">{user.email}</h1>
                  </td>
                  <td
                    onClick={() => {
                      selectAdminId(user.userId);
                      // navigate.push("/admin/UsersPage/UserInfo");
                    }}
                  >
                    <div className="text-gray-500 text-sm">
                      <h1>{user.birthDate}</h1>
                      {/* <h2>2023</h2> */}
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
