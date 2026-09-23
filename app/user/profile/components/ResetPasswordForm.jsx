"use client";
import { FaEyeSlash, FaTimes, FaTimesCircle } from "react-icons/fa";
import { useLanguage } from "../../../../context/LanguageContext";
import { postRequest, putRequest } from "../../../../utils/requestsUtils";
import { useState } from "react";
import Image from "next/image";

export default function ResetPasswordForm({ isFormOpen, setIsFormOpen }) {
  const { t } = useLanguage();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState();

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      await putRequest(
        "/api/users/reset-password",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
          repeatPassword: repeatPassword,
        },
        "",
      );
      const resetpasswordform = document.querySelector("#resetpasswordform");
      resetpasswordform.classList.add("hidden");
      resetpasswordform.classList.remove("flex");
      setNewPassword("");
      setOldPassword("");
      setRepeatPassword("");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      id="add-product-form"
      className={` fixed inset-0 bg-black/40 flex items-center justify-end z-50 p-5  ${isFormOpen ? "flex" : "hidden"}`}
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
      <div className="w-full flex justify-center items-center " >

        <form autoComplete="off" className=" w-[500px] py-10 flex flex-col justify-center items-center
         gap-3 my-5 bg-white shadow-md shadow-slate-400 rounded-lg 
           px-7 pb-10 border overflow-hidden xs:overflow-y-scroll h-full">

          <div className="w-full  flex justify-between items-center ">
            <h1 className="text-lg w-full font-semibold ">
              {t("updatePassword")}
            </h1>
            <button
              onClick={() => {
                setIsFormOpen(false)
                setNewPassword("");
                setOldPassword("");
                setRepeatPassword("");
              }}
              className="text-xl text-gray-600 hover:text-red-600"
            >
              <FaTimesCircle />
            </button>
          </div>
          <hr className="bg-gray-200 w-full h-px" />
          <div className="flex flex-col w-full ">
            <label className="text-xs font-semibold">{t("oldPassword")} </label>
            <div className=" flex w-full px-2 rounded-md mt-2 bg-white  border h-10 items-center gap-3">
              <input
                type="password"
                className="w-full h-full bg-none outline-none  p-2"
                // value={oldPassword}
                autoComplete="off"
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <span className="text-base text-gray-600">
                <FaEyeSlash />
              </span>
            </div>
          </div>
          <div className="flex flex-col w-full ">
            <label className="text-xs font-semibold">{t("newPassword")} </label>
            <div className=" flex w-full px-2 rounded-md mt-2  bg-white border h-10 items-center gap-3">
              <input
                type="password"
                className="w-full h-full bg-none outline-none  p-2"
                //  value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                name="newPassword"
                autoComplete="new-password" />
              <span className="text-base text-gray-600">
                <FaEyeSlash />
              </span>
            </div>
          </div>
          <div className="flex flex-col w-full ">
            <label className="text-xs font-semibold">
              {t("confirmPassword")}{" "}
            </label>
            <div className=" flex w-full px-2 rounded-md mt-2 bg-white  border h-10 items-center gap-3">
              <input
                type="password"
                name="confirmPassField"
                autoComplete="new-password"
                className="w-full h-full bg-none outline-none  p-2"
                value={repeatPassword}

                onChange={(e) => setRepeatPassword(e.target.value)}
              />
              <span className="text-base text-gray-600">
                <FaEyeSlash />
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 p-2 rounded-md mt-5 text-white"
            onClick={resetPassword}
          >
            {t("save")}
          </button>
        </form>
      </div>
    </div>
  );
}
