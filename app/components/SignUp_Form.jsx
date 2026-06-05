"use client";
import { MdEmail, MdLanguage } from "react-icons/md";
import { FaEyeSlash, FaLocationDot, FaUserLarge } from "react-icons/fa6";
import { useState, useRef, useEffect } from "react";
// import { loginUser } from '../../utils/auth';

import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useLanguage } from "../../context/LanguageContext";
import { IoLocationOutline } from "react-icons/io5";
import { FaEye, FaPhone } from "react-icons/fa";
import Link from "next/link";
import { postRequest } from "../../utils/requestsUtils";

export default function SignUp() {
  const navigate = useRouter();
  const { t } = useLanguage();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { locale, setLocale } = useLanguage("ar");
  const input_passwordRef = useRef();
  const input_confirmPasswordRef = useRef();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
          setLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/signup`,
        {
          username: username,
          password: password,
          email: email,
          firstName: firstName,
          lastName: lastName,
          repeatPassword: confirmPassword,
          address: address,
          phone: phoneNumber,
          language: locale,
        },
        ""
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      console.log("accessToken", response.data.accessToken);
      console.log(response);
      navigate.push("/signin");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className=w-full h-full flex justify-center items-center">
    <div className=" h-full w-full p-10  md:order-1 xs:order-2">
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
      <div className="flex justify-between">
        <div className="">
          <h3 className="text-4xl my-3 font-bold">
            {t("create_account")}{" "}
          </h3>
          <h4 className="text-sm  text-gray-500">
            {t("signupWelcomeMessage")}
          </h4>
        </div>
        <div className="flex items-center gap-1 mx-5  ">
          <span className="text-red-600 text-2xl ">
            <MdLanguage />
          </span>

          <select
            className=" rounded-md text-white outline-none bg-red-700  py-1  px-2"
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

      <div className="flex justify-center items-center  mt-5">
        <div className="flex flex-col gap-3 w-full justify-center items-center">
          <form
            className="flex flex-col  gap-2 w-[90%]"
            onSubmit={handleSignUp}
          >
            <div className=" flex items-center  gap-5">
              <div className="flex flex-col gap-2  w-full">
                <label className="text-gray-500 text-sm ">
                  {t("firstName")}
                </label>
                <div className=" flex w-full px-2 rounded-md  border h-10 items-center gap-3 shadow-md">
                  <input
                    className=" w-full px-3 outline-none"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <span className="text-sm text-gray-600">
                    <FaUserLarge />
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full ">
                <label className="text-gray-500 text-sm">{t("lastName")}</label>
                <div className=" flex w-full px-2 rounded-md  border h-10 items-center gap-3 shadow-md">
                  <input
                    className=" w-full px-3 outline-none"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                  <span className="text-sm text-gray-600">
                    <FaUserLarge />
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-500 text-sm">{t("email")}</label>
              <div className=" flex w-full px-2 rounded-md  border h-10 items-center gap-3  shadow-md">
                <input
                  className=" w-full px-3 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
                />
                <span className="text-base  text-gray-600">
                  <MdEmail />
                </span>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col gap-2 w-full">
                <label className="text-gray-500 text-sm">{t("username")}</label>
                <div className=" flex w-full px-2 rounded-md  border h-10 items-center gap-3 shadow-md">
                  <input
                    className=" w-full px-3 outline-none"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <span className="text-sm text-gray-600">
                    <FaUserLarge />
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="text-gray-500 text-sm">
                  {" "}
                  {t("phoneNumber")}
                </label>
                <div className=" flex w-full px-2 rounded-md  border h-10 items-center gap-3 shadow-md">
                  <input
                    className=" w-full px-3 outline-none"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    placeholder="01000000000"
                  />
                  <span className="text-sm text-gray-600">
                    <FaPhone />
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-500 text-sm"> {t("address")} </label>
              <div className=" flex w-full px-2 rounded-md  border h-10 items-center gap-3 shadow-md">
                <input
                  className=" w-full px-3 outline-none"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  type="text"
                />
                <span className="text-base  text-gray-600">
                  <FaLocationDot />
                </span>
              </div>
            </div>
            <div className=" flex items-center gap-5">
              <div className="flex flex-col gap-2 w-full">
                <label className="text-gray-500 text-sm">{t("password")}</label>
                <div className=" flex w-full px-2 rounded-md  border h-10 items-center gap-3 shadow-md">
                  <input
                    ref={input_passwordRef}
                    className=" w-full px-3 outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    type="password"
                  />
                  <span className="text-base text-gray-600">
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
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="text-gray-500 text-sm">
                  {t("confirmPassword")}
                </label>
                <div className=" flex w-full px-2 rounded-md  border h-10 items-center gap-3 shadow-md">
                  <input
                    ref={input_confirmPasswordRef}
                    className=" w-full px-3 outline-none"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    type="password"
                  />
                  <span className=" text-gray-600">
                    <FaEyeSlash
                      id="eyeSlash_confPass"
                      // className={
                      //   input_confirmPasswordRef.current.type === "text"
                      //     ? "hidden"
                      //     : "block"
                      // }
                      onClick={() => {
                        input_confirmPasswordRef.current.type = "text";
                        const eyeSlash =
                          document.querySelector("#eyeSlash_confPass");
                        eyeSlash.classList.add("hidden");
                        const eye = document.querySelector("#eye_confPass");
                        eye.classList.remove("hidden");
                      }}
                    />
                    <FaEye
                      id="eye_confPass"
                      className="hidden"
                      //   input_confirmPasswordRef.current.type === "password"
                      //     ? "hidden"
                      //     : "block"
                      // }
                      onClick={() => {
                        input_confirmPasswordRef.current.type = "password";
                        const eyeSlash =
                          document.querySelector("#eyeSlash_confPass");
                        eyeSlash.classList.remove("hidden");
                        const eye = document.querySelector("#eye_confPass");
                        eye.classList.add("hidden");
                      }}
                    />
                  </span>
                </div>
              </div>
            </div>
            <hr className="h-1 my-5"></hr>
            <button
              type="submit"
              className="bg-red-600 text-white rounded-md h-10 "
            >
              {loading ? t("loggingIn") : t("create_account")}
            </button>
          </form>
          <Link href="/signin">
            <span className="flex justify-center items-center text-sm text-gray-500 ">
              {t("login")}
            </span>
          </Link>
        </div>
      </div>
    </div>

    // </div>
  );
}
