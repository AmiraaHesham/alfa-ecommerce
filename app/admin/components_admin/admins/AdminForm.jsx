"use client";
import Image from "next/image";
import { MdCancel } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { postRequest, putRequest } from "../../../../utils/requestsUtils.js";
import { getRequest } from "../../../../utils/requestsUtils.js";
import { useIdContext } from "../../../../context/idContext";
import { useRefresh } from "../../../../context/refreshContext.jsx";

export default function AdminForm({ isFormOpen, setIsFormOpen }) {
  const [adminUser, setAdminUser] = useState({
    f_name: "",
    l_name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState();
  const { t } = useLanguage();
  const { triggerRefresh } = useRefresh();
  const { selectedAdminId, setSelectedAdminId } = useIdContext();
  const isEditMode = selectedAdminId !== null;

  const addAdminUser = async () => {
    try {
      setLoading(true);

      await postRequest(
        "/api/admin/users",
        {
          firstName: adminUser.f_name,
          lastName: adminUser.l_name,
          username: adminUser.username,
          password: adminUser.password,
          repeatPassword: adminUser.confirmPassword,
        },
        t("message"),
      );
      triggerRefresh();
      setSelectedAdminId(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const AdminData = async () => {
    try {
      if (selectedAdminId !== null) {
        setLoading(true);

        const res = await getRequest(`/api/users/${selectedAdminId}`);
        const resData = res.data;
        setAdminUser((prev) => ({
          ...prev,
          l_name: resData.lastName,
          f_name: resData.firstName,
          username: resData.username,
        }));
      } else {
        setAdminUser({
          f_name: "",
          l_name: "",
          username: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateAdmin = async () => {
    try {
      setLoading(true);
      setIsFormOpen(false);
      await putRequest(
        `/api/admin/users/${selectedAdminId}`,
        {
          firstName: adminUser.f_name,
          lastName: adminUser.l_name,
          username: adminUser.username,
          password: adminUser.password,
          repeatPassword: adminUser.confirmPassword,
        },
        t("message"),
      );
      triggerRefresh();
      setSelectedAdminId(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AdminData();
  }, [selectedAdminId]);
  return (
    <div
      id="add-admin-form"
      className={`fixed inset-0 bg-black/40 flex items-center justify-center z-50 ${isFormOpen ? "flex" : "hidden"}`}
    >
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <Image
            src="/Images/logo.png"
            alt=""
            className="w-[100px] h-[100px]  border-t-transparent rounded-full animate-pulse"
            width={100}
            height={100}
            priority
          />
        </div>
      )}
      <div className="bg-white shadow-md shadow-slate-400  xs:w-full lg:w-[500px] flex flex-col border rounded-md">
        <div className="m-4 flex justify-between items-center">
          <h1 id="nameForm" className="text-lg font-semibold">
            {isEditMode ? t("edit_admin") : t("add_admin")}
          </h1>
          <button
            className="text-2xl   hover:text-red-800"
            onClick={() => {
              setIsFormOpen(false);
              setSelectedAdminId(null);
            }}
          >
            <MdCancel />
          </button>
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
                      className="w-full bg-[#F9FAFB] outline-none  text-lg  p-1 border rounded-md"
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
                      className="w-full bg-[#F9FAFB] outline-none  text-lg  p-1 border rounded-md"
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
                    className="w-full bg-[#F9FAFB] outline-none  text-lg  p-1 border rounded-md"
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
                      className="w-full bg-[#F9FAFB] outline-none text-lg  p-1 border rounded-md"
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
                      className="w-full bg-[#F9FAFB] outline-none  text-lg  p-1 border rounded-md"
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
                    className={`bg-red-600 h-8  px-3 text-white w-full hover:bg-red-800 rounded-lg ${isEditMode ? "hidden" : ""}`}
                    onClick={() => {
                      addAdminUser();
                    }}
                  >
                    {t("save")}
                  </button>
                  <button
                    type="submit"
                    id="btn-edit"
                    className={`bg-red-600 h-8  px-3 text-white w-full  hover:bg-red-800 rounded-lg ${isEditMode ? "" : "hidden"}`}
                    onClick={() => {
                      updateAdmin();
                    }}
                  >
                    {t("save-changes")}
                  </button>
                </div>
                <button
                  type="submit"
                  className="bg-white w-full  border h-8  px-3 text-gray-700ss   hover:bg-red-800 hover:text-white rounded-lg"
                  onClick={() => {
                    setIsFormOpen(false);
                    setSelectedAdminId(null);
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
