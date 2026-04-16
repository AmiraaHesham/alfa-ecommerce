"use client";
import { useLanguage } from "../../../context/LanguageContext";
import { FaRegCircleUser } from "react-icons/fa6";

import { IoMdCart, IoMdSearch } from "react-icons/io";
import { MdElectricBolt, MdLanguage } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useSearshInputContext } from "../../../context/searshInputContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { postRequest } from "../../../utils/requestsUtils";

export default function Header() {
  const { t } = useLanguage();
  const navigate = useRouter();
  const id = typeof window !== "undefined" ? localStorage.getItem("id") : "";

  const [isFocused, setIsFocused] = useState(false);
  const divRef = useRef(null);
  const { setSelectedSearchInput } = useSearshInputContext();
  const [searchInput, setSearchInput] = useState();
  const { locale, setLocale } = useLanguage();
  const [username, setUsername] = useState();
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("id") : "";
  const changeLanguage = async () => {
    await postRequest(`/api/users/${userId}/langauge/${locale}`, "", "");
  };
  useEffect(() => {
    const username =
      typeof window !== "undefined" ? localStorage.getItem("firstName") : "";
    setUsername(username);
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setIsFocused(false);
      }

      //      document.dir = lang === 'AR' ? 'rtl' : 'ltr';
      //  setLocale(lang)
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header>
      <div className="w-full h-[60px] lg:px-10 xs:px-0 flex items-center border-b  justify-between bg-red-700">
        <Link href="/user/home">
          <div className="flex  items-center  ">
            <span className="w-12 h-12 ">
              <Image
                src="/Images/logo.png"
                alt="logo"
                width={50}
                height={50}
                priority
                className="w-full h-full"
              />
            </span>
            <div className="cursor-default">
              <h1 className="lg:text-xl  xs:text-lg w-[120px] text-white font-bold font-sans">
                {t("alfa_group")}
              </h1>
            </div>
          </div>
        </Link>
        <div
          ref={divRef}
          className={`md:flex xs:hidden items-center bg-white justify-start border w-[50%] bg-none h-10  rounded-md 
        ${isFocused ? "border-[3px] border-red-400 " : ""}`}
          onClick={() => setIsFocused(true)}
          tabIndex={0}
        >
          <span className="text-white h-full  rounded-s-md text-2xl bg-red-600 p-2 ">
            <IoMdSearch />
          </span>
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setSelectedSearchInput(searchInput);
                navigate.push("/user/search/");
              }
            }}
            placeholder={t("search") + "..."}
            type="text"
            className="w-full h-full text-base bg-none font-semibold outline-none rounded-e-md placeholder:text-sm  flex items-center p-2 "
          />
        </div>

        <div className="flex items-center   md:gap-5 xs:gap-3 mx-2">
          <div className="flex items-center   cursor-pointer ">
            <select
              className=" rounded text-white xs:text-sm md:text-base outline-none bg-red-700 px-1 py-0.5 text-center cursor-pointer"
              value={locale}
              onChange={(e) => {
                const newLang = e.target.value;
                setLocale(newLang);
                changeLanguage();
              }}
            >
              <option
                value="ar"
                className="bg-white text-red-500 text-lg font-semibold "
              >
                العربية{" "}
                <span className="text-white md:text-2xl xs:text-lg">
                  <MdLanguage />
                </span>
              </option>
              <option
                value="en"
                className="bg-white text-red-500 text-lg font-semibold"
              >
                English
              </option>
            </select>
          </div>

          <div className="flex items-center xs:gap-3 md:gap-5 text-white">
            <Link href="/user/ordershistory">
              <RiShoppingBag4Fill className="w-7 h-7" />
            </Link>
            <Link href="/user/wishlist">
              <FaHeart className="w-6 h-6" />
            </Link>
            <Link href="/user/cart">
              <IoMdCart className="w-7 h-7" />
            </Link>
            <hr className="w- h-10 bg-white"></hr>
            <Link href={id ? "/user/pages/profile" : "/signin"}>
              <div className="flex items-center gap-1  ">
                <span className="w-9 h-9">
                  <FaRegCircleUser className="w-full h-full" />
                </span>
                <span className="md:text-sm xs:text-xs font-semibold text-center ">
                  {username ? t("hello") + ", " + username : t("login")}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div
        ref={divRef}
        className={`xs:flex md:hidden items-center justify-start border w-full bg-none h-10 my-2  rounded-md 
 ${isFocused ? "border-[3px] border-red-400 " : ""}`}
        onClick={() => setIsFocused(true)}
        tabIndex={0}
      >
        <span className="text-white h-full  rounded-s-md text-2xl bg-red-600 p-2 ">
          <IoMdSearch />
        </span>
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setSelectedSearchInput(searchInput);
              navigate.push("/user/search");
            }
          }}
          placeholder={t("search") + "..."}
          type="text"
          className="w-full h-full text-base bg-white font-semibold outline-none rounded-e-md placeholder:text-sm  flex items-center p-2 "
        />
      </div>
    </header>
  );
}
