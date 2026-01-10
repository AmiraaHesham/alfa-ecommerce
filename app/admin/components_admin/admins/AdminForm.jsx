"use client";
import Image from "next/image";
import { MdCancel } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { postRequest, putRequest } from "../../../../utils/requestsUtils.js";
import { getRequest } from "../../../../utils/requestsUtils.js";
import { useRouter } from "next/navigation";
import { useIdContext } from "../../../../context/idContext";
import { useRefresh } from "../../../../context/refreshContext.jsx";

export default function CategoryForm() {
  const [adminUser, setAdminUser] = useState({
    f_name: "",
    l_name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { t } = useLanguage();
  const router = useRouter();
  const { triggerRefresh } = useRefresh();

  const { selectedAdminId } = useIdContext();

  const addAdminUser = async () => {
    let form = document.querySelector("#add-admin-form");
    form.classList.add("hidden");

    try {
      await postRequest("/api/admin/users", {
        firstName: adminUser.f_name,
        lastName: adminUser.l_name,
        username: adminUser.username,
        password: adminUser.password,
        repeatPassword: adminUser.confirmPassword,
      }, t('message_AddText'));
      triggerRefresh();
    } catch (error) {
      console.log(error);
    }
  };

  const AdminData = useCallback(async () => {
    if (selectedAdminId != null) {
      try {
       const res =  await getRequest(`/api/users/${selectedAdminId}`);
       setAdminUser((prev) => ({
                        ...prev,
                        l_name: res.lastName,
                        f_name:res.firstName,
                        username:res.username,
                        
                      }))
      } catch (error) {
        console.log(error);
      }
    }
  }, [selectedAdminId]);

  const updateAdmin = async () => {
    let form = document.querySelector("#add-admin-form");
    form.classList.add("hidden");
    
    try{
      await putRequest(`/api/admin/users/${selectedId}`, {
        firstName: adminUser.f_name,
        lastName: adminUser.l_name,
        username: adminUser.username,
        password: adminUser.password,
        repeatPassword: adminUser.confirmPassword,
      }, t('message_EditText'));
      triggerRefresh();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AdminData();
  }, [AdminData]);
  return (
    <div
      id="add-admin-form"
      className=" hidden absolute justify-end  w-full h-screen "
    >
      <div className="bg-white shadow-md shadow-slate-400  xs:w-full lg:w-[500px] flex flex-col border rounded-md">
        <div className="m-4 flex justify-between items-center">
          <h1 id="nameForm" className="text-lg font-semibold"></h1>
          <span
            className="text-3xl text-blue-950  hover:text-blue-800"
            onClick={() => {
              let form = document.querySelector("#add-admin-form");
              form.classList.add("hidden");
            }}
          >
            <MdCancel />
          </span>
        </div>
        <hr className="h-1 mb-3"></hr>
        <div className="flex justify-center items-center ">
          <form
            className=" w-[90%] "
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="my-5 ">
              <div className="flex flex-col gap-4 ">
                <div className="flex justify-between items-center gap-3">
<div>
                  <label className="text-sm ">{t("first_name")}</label>
                  <input
                    type="text"
                    value={adminUser.f_name}
                    onChange={(e) =>
                      setAdminUser((prev) => ({
                        ...prev,
                        f_name: e.target.value,
                      }))
                    }
                    required
                    className="w-full bg-[#F9FAFB] outline-none text-blue-900 text-lg  p-1 border rounded-md"
                  />
                </div>
                <div>
                  <label className="text-sm ">{t("last_name")}</label>
                  <input
                    type="text"
                    value={adminUser.l_name}
                    onChange={(e) =>
                      setAdminUser((prev) => ({
                        ...prev,
                        l_name: e.target.value,
                      }))
                    }
                    className="w-full bg-[#F9FAFB] outline-none text-blue-900 text-lg  p-1 border rounded-md"
                  />
                </div>
                </div>
                

                <div>
                  <label className="text-sm">{t("username")}</label>
                  <input
                    type="text"
                    value={adminUser.username}
                    onChange={(e) =>
                      setAdminUser((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                    className="w-full bg-[#F9FAFB] outline-none text-blue-900 text-lg  p-1 border rounded-md"
                  />
                </div>
                <div className="flex gap-3">
                  <div>
                    <label className="text-sm ">{t("password")}</label>
                    <input
                      type="password"
                      value={adminUser.password}
                      onChange={(e) =>
                        setAdminUser((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      className="w-full bg-[#F9FAFB] outline-none text-blue-900 text-lg  p-1 border rounded-md"
                    />
                  </div>
                  <div>
                    {" "}
                    <label className="text-sm ">{t("confirm_password")}</label>
                    <input
                      type="password"
                      value={adminUser.confirmPassword}
                      onChange={(e) =>
                        setAdminUser((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
                      className="w-full bg-[#F9FAFB] outline-none text-blue-900 text-lg  p-1 border rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex bg-[#F9FAFB] px-4 h-20 my-10 rounded-md justify-center items-center ">
              <div className="flex justify-between w-full gap-3 items-center ">
                <div className="flex  w-full items-center">
                  <button
                    type="submit"
                    id="btn-save"
                    className="bg-blue-600 h-8  px-3 text-white w-full hover:bg-blue-800 rounded-lg"
                    onClick={() => {
                      addAdminUser();
                    }}
                  >
                    {t("save")}
                  </button>
                  <button
                    type="submit"
                    id="btn-edit"
                    className="bg-blue-600 h-8  px-3 text-white w-full  hover:bg-blue-800 rounded-lg"
                    onClick={() => {
                      updateAdmin();
                    }}
                  >
                    {t("save-changes")}
                  </button>
                </div>
                <button
                  type="submit"
                  className="bg-white w-full  border h-8  px-3 text-gray-700ss   hover:bg-blue-800 hover:text-white rounded-lg"
                  onClick={() => {
                    let form = document.querySelector("#add-admin-form");
                    form.classList.add("hidden");
                  }}
                >
                  {t("cancel")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
