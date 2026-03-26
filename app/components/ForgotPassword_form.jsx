"use client";
import { MdEmail, MdLanguage } from "react-icons/md";
import { FaEyeSlash, FaUserLarge } from "react-icons/fa6";
import { useState, useRef, useEffect } from "react";
// import { loginUser } from '../../utils/auth';

import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useLanguage } from "../../context/LanguageContext";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { postRequest } from "../../utils/requestsUtils";

export default function ForgotPassword() {
  const navigate = useRouter();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { locale, setLocale } = useLanguage();
  const { t } = useLanguage();
  const input_passwordRef = useRef();

  return (
    <div className="h-full w-full p-10  md:order-1 xs:order-2">
      <div className="flex justify-between">
        <div className="">
          <h3 className="text-3xl my-3 font-semibold font-serif">
            إعادة تعيين كلمة المرور
          </h3>
          {/* <h4 className="text-sm text-gray-500 font-serif">
            {t("welcomeMessage")}
          </h4> */}
        </div>
        <div className="flex items-center gap-1 mx-5  ">
          <span className="text-red-600 text-2xl ">
            <MdLanguage />
          </span>

          <select
            className="w-[80px] rounded text-white bg-red-700  py-1  px-1"
            value={locale} // افترض أن عندك متغير اسمه lang (مثل 'AR' أو 'EN')
            onChange={(e) => {
              const newLang = e.target.value;
              setLocale(newLang);
            }}
          >
            <option value="ar" className="bg-white text-red-500">
              العربية
            </option>
            <option value="en" className="bg-white text-red-500">
              English
            </option>
          </select>
        </div>
      </div>
      <div className="flex justify-center items-center  mt-20">
        <div className="flex flex-col gap-7 w-[80%]">
          <form className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <div className=" w-full px-2 rounded-md h-10  border items-center ">
                <input
                  ref={input_passwordRef}
                  className=" w-full h-full px-3 outline-none"
                  placeholder={t("newPassword")}
                  type="password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <div className=" w-full px-2 rounded-md h-10 border items-center gap-3">
                  <input
                    ref={input_passwordRef}
                    className=" w-full h-full px-3 outline-none"
                    placeholder={t("confirmPassword")}
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-red-600 text-white rounded-md w-full h-10 my-10 hover:bg-red-700"
                >
                  {loading ? t("save") : t("save")}
                </button>
              </div>
            </div>
            {/* <div className="flex w-full px-2 rounded-md h-10 border items-center gap-3"> */}
            {/* <label className="text-gray-500">Email Address</label>    */}
            {/* <input
                ref={input_passwordRef}
                className=" w-full px-3 outline-none"
                placeholder={t("password")}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              /> */}
            {/* <span className="text-xl text-gray-700">
                <FaEyeSlash
                  id="eyeSlash" */}
            {/* className={input_passwordRef.current.type === "text"? "hidden" : "block"
                   }
                  onClick={() => {
                    input_passwordRef.current.type = "text";
                    const eyeSlash = document.querySelector("#eyeSlash");
                    eyeSlash.classList.add("hidden");
                    const eye = document.querySelector("#eye");
                    eye.classList.remove("hidden");
                  }}
                />
                <FaEye
                  id="eye"
                  className="hidden" */}
            {/* input_passwordRef.current.type === "password"
                      ? "hidden"
                      : "block"
                   } */}
            {/* //       onClick={() => {
            //         input_passwordRef.current.type = "password";
            //         const eyeSlash = document.querySelector("#eyeSlash");
            //         eyeSlash.classList.remove("hidden");
            //         const eye = document.querySelector("#eye");
            //         eye.classList.add("hidden");
            //       }}
            //     />{" "}
            //   </span>
            // </div> */}
            {/* <h1 className="text-red-500 text-sm">{t("forgotPassword")} </h1>
            <hr className="h-1"></hr> */}

            {/* <Link href="/signup"> */}
            {/* <span className="flex justify-center items-center text-sm text-gray-500 font-serif">
                {t("createNewAccount")}
              </span> */}
            {/* </Link> */}
          </form>
        </div>
      </div>
    </div>
  );
}
