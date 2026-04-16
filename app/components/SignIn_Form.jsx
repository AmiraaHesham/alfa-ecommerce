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
import { toast } from "react-toastify";

export default function SignIn() {
  const navigate = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { locale, setLocale } = useLanguage();
  const { t } = useLanguage();
  const input_passwordRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
        {
          username: username,
          password: password,
        },
        ""
      );
      // console.log(response.data);
      toast.success(response.data.message);

      console.log(response.data);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("id", response.data.userDetails.userId);
      localStorage.setItem("firstName", response.data.userDetails.firstName);
      localStorage.setItem("lastName", response.data.userDetails.lastName);
      localStorage.setItem("address", response.data.userDetails.address);
      localStorage.setItem("phone", response.data.userDetails.phone);
      localStorage.setItem("email", response.data.userDetails.email);
      localStorage.setItem("username", response.data.userDetails.username);
      localStorage.setItem("lang", response.data.userDetails.language);
      localStorage.setItem("role", response.data.userDetails.role);
      if (response.data.userDetails.role === "ADMIN") {
        navigate.push("/admin/pages/Dashboard");
      } else navigate.push("/user/home");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleSendForgotPasswordEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/forgot-password/?email=${email}`
      );

      console.log(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full p-10  md:order-1 xs:order-2">
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <Image
            src="/Images/logo.png"
            alt=""
            className="w-[100px] h-[100px]  border-t-transparent rounded-full animate-pulse"
            width={100}
            height={100}
          />
        </div>
      )}
      <div className="flex justify-between">
        <div id="welcome_section" className="">
          <h3 className="text-3xl my-3 font-semibold font-serif">
            {t("welcomeBack")}
          </h3>
          <h4 className="text-sm text-gray-500 font-serif">
            {t("welcomeMessage")}
          </h4>
        </div>
        <div id="forgot_password_section" className="hidden">
          <h3 className="text-3xl my-3 font-semibold font-serif">
            {t("إعادة تعين كلمة المرور")}
          </h3>
          <h4 className="text-xl text-gray-500 font-serif">
            {t(
              "سيتم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني إذا كان مسجلاً لدينا"
            )}
          </h4>
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
          <form
            id="form_login"
            className="flex flex-col gap-6"
            onSubmit={handleLogin}
          >
            <div className="flex w-full px-2 rounded-md h-10 border items-center gap-3">
              {/* <label className="text-gray-500">Email Address</label>    */}
              <input
                className=" w-full px-3 outline-none"
                placeholder={t("username")}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <span className="text-xl text-gray-700">
                <FaUserLarge />
              </span>
            </div>

            <div className="flex w-full px-2 rounded-md h-10 border items-center gap-3">
              {/* <label className="text-gray-500">Email Address</label>    */}
              <input
                ref={input_passwordRef}
                className=" w-full px-3 outline-none"
                placeholder={t("password")}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="text-xl text-gray-700">
                <FaEyeSlash
                  id="eyeSlash"
                  // className={input_passwordRef.current.type === "text"? "hidden" : "block"
                  // }
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
                  className="hidden"
                  //   input_passwordRef.current.type === "password"
                  //     ? "hidden"
                  //     : "block"
                  // }
                  onClick={() => {
                    input_passwordRef.current.type = "password";
                    const eyeSlash = document.querySelector("#eyeSlash");
                    eyeSlash.classList.remove("hidden");
                    const eye = document.querySelector("#eye");
                    eye.classList.add("hidden");
                  }}
                />
              </span>
            </div>
            <span
              className="text-red-500 text-sm flex justify-start items-start "
              onClick={() => {
                const welcome_section =
                  document.querySelector("#welcome_section");
                const forgot_password_section = document.querySelector(
                  "#forgot_password_section"
                );
                const form_email = document.querySelector("#form_email");
                const form_login = document.querySelector("#form_login");
                form_email.classList.remove("hidden");
                form_login.classList.add("hidden");
                welcome_section.classList.add("hidden");
                forgot_password_section.classList.remove("hidden");
              }}
            >
              {t("forgotPassword")}
            </span>
            <hr className="h-1"></hr>
            <button
              type="submit"
              className="bg-red-600 text-white rounded-md h-10 "
            >
              {loading ? t("loggingIn") : t("login")}
            </button>
            <Link href="/signup">
              <span className="flex justify-center items-center text-sm text-gray-500 font-serif">
                {t("createNewAccount")}
              </span>
            </Link>
          </form>
          <form
            id="form_email"
            className="hidden w-full "
            onSubmit={handleSendForgotPasswordEmail}
          >
            <div className="flex w-full px-2 rounded-md h-10 border items-center gap-3">
              <input
                className=" w-full px-3 outline-none"
                placeholder={t("email")}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className="text-xl text-gray-700">
                <MdEmail />
              </span>
            </div>
            <div className="my-10 flex gap-5">
              <button
                type="submit"
                className="bg-red-600 text-white rounded-md w-full h-10 shadow hover:bg-red-700"
              >
                {loading ? t("send") : t("sending")}
              </button>
              <button
                type="submit"
                className="bg-white text-red-600 border-red-600 border rounded-md w-full h-10  hover:bg-red-600 shadow hover:text-white"
                onClick={() => {
                  const welcome_section =
                    document.querySelector("#welcome_section");
                  const forgot_password_section = document.querySelector(
                    "#forgot_password_section"
                  );
                  const form_email = document.querySelector("#form_email");
                  const form_login = document.querySelector("#form_login");
                  form_email.classList.add("hidden");
                  form_login.classList.remove("hidden");
                  welcome_section.classList.remove("hidden");
                  forgot_password_section.classList.add("hidden");
                }}
              >
                {t("cancel")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
