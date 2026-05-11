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
  const [mounted, setMounted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const divRef = useRef(null);
  const { setSelectedSearchInput } = useSearshInputContext();
  const [searchInput, setSearchInput] = useState();
  const { locale, setLocale } = useLanguage();
  const [username, setUsername] = useState();
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("id") : "";
  const changeLanguage = async (newLang) => {
    const validLangs = ["ar", "en"];

    if (!validLangs.includes(newLang)) return;
    setLocale(newLang);
    try {
      await postRequest(`/api/users/${userId}/langauge/${newLang}`, "", "");

      localStorage.setItem("lang", newLang);
    } catch (err) {
      console.error("Failed to update language", err);
    }
  };
  useEffect(() => {
    setMounted(true);
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
  if (!mounted) return null;

  return (
    <header>
      <div className="w-full h-[60px] xl:px-10 xs:px-0 flex items-center border-b  justify-between bg-red-700">
        <Link href="/user/home">
          <div className="flex  items-center  ">
            <span className="relative xs:w-9 xs:h-9 md:w-12 md:h-12 ">
              <Image
                src="/Images/logo.png"
                alt="logo"
                
                fill
                priority
                className="object-contain"
              />
            </span>
            <div className="cursor-pointer">
              <h1 className="lg:text-xl  xs:text-sm  text-white font-bold ">
                {t("alfa_group")}
              </h1>
            </div>
          </div>
        </Link>
        <div
          ref={divRef}
          className={`md:flex xs:hidden items-center bg-white justify-start border-2 w-[50%] bg-none h-10  rounded-lg
        ${isFocused ? "border-[3px] border-red-400 rounded-lg " : ""}`}
          onClick={() => setIsFocused(true)}
          tabIndex={0}
        >
          <button
            className="text-white h-full border-2 rounded-s-lg text-2xl bg-red-600 p-1 "
            onClick={() => {
              setSelectedSearchInput(searchInput);
              searchInput
                ? navigate.push("/user/search/")
                : navigate.push("/user/home") + setSelectedSearchInput("");
            }}
          >
            <IoMdSearch />
          </button>
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setSelectedSearchInput(searchInput);
                searchInput
                  ? navigate.push("/user/search/")
                  : navigate.push("/user/home") + setSelectedSearchInput("");
              }
            }}
            placeholder={t("search") + "..."}
            type="search"
            enterKeyHint="search"
            className="w-full h-full text-base bg-none font-semibold outline-none rounded-e-xl placeholder:text-sm  flex items-center p-1 "
          />
        </div>

        <div className="flex items-center md:gap-5 xs:gap-1 ">
          <div className="flex items-center   cursor-pointer ">
            <select
              className=" rounded text-white xs:text-xs md:text-base outline-none bg-red-700 px-1 py-0.5 text-center cursor-pointer"
              value={locale}
              onChange={(e) => {
                const newLang = e.target.value;

                changeLanguage(newLang);
              }}
            >
              <option
                value="ar"
                className="bg-white text-red-500 text-lg font-semibold "
              >
                العربية
              </option>
              <option
                value="en"
                className="bg-white text-red-500 text-lg font-semibold"
              >
                English
              </option>
            </select>
          </div>

          <div className="flex items-center xs:gap-2 md:gap-5 text-white">
            <Link href="/user/ordershistory">
              <RiShoppingBag4Fill className="xs:w-5 xs:h-5 md:w-7 md:h-7" />
            </Link>
            <Link href="/user/wishlist">
              <FaHeart className="xs:w-4 xs:h-4 md:w-6 md:h-6" />
            </Link>
            <Link href="/user/cart">
              <IoMdCart className="xs:w-5 xs:h-5 md:w-7 md:h-7" />
            </Link>
            <Link href={id ? "/user/pages/profile" : "/signin"}>
              <div className="flex items-center gap-1  ">
                <span className="w-6 h-6">
                  <FaRegCircleUser className="w-full h-full" />
                </span>
                <span className="md:text-sm xs:text-xs font-semibold text-center ">
                  {username ?  username : t("login")}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div
        ref={divRef}
        className={`xs:flex md:hidden bg-[#F9FAFBs] items-center justify-start border-2 w-full bg-none  rounded-lg
 ${isFocused ? "border-[3px] border-red-400 rounded-lg " : ""}`}
        onClick={() => setIsFocused(true)}
        tabIndex={0}
      >
        <button
          className="text-white h-full borde rounded-s-lg text-2xl bg-red-600 p-1 "
          onClick={() => {
            setSelectedSearchInput(searchInput);
            searchInput
              ? navigate.push("/user/search/")
              : navigate.push("/user/home") + setSelectedSearchInput("");
          }}
        >
          {" "}
          <IoMdSearch />
        </button>
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
          type="search"
          enterKeyHint="search"
          className="w-full h-full text-base  font-semibold outline-none rounded-e-lg placeholder:text-sm  flex items-center p-1"
        />
      </div>
    </header>
  );
}
