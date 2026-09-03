"use client";
import { useLanguage } from "../../../context/LanguageContext";
import { IoMdSearch } from "react-icons/io";
import {
  MdCancel,
  MdLanguage,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getRequest, postRequest } from "../../../utils/requestsUtils";
import { useRefresh } from "../../../context/refreshContext";
import { FiHeart } from "react-icons/fi";
import { PiListBold, PiUser } from "react-icons/pi";
import SignIn_Form from "../../components/SignIn_Form";
import SignUp_Form from "../../components/SignUp_Form";

export default function Header() {
  const { t } = useLanguage();
  const navigate = useRouter();
  const [netTotal, setNetTotal] = useState(0);
  const [searchInput, setSearchInput] = useState();
  const { locale, setLocale } = useLanguage();
  const [username, setUsername] = useState();
  const [itemNum, setItemNum] = useState(0);
  const { refreshKey } = useRefresh();
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignin, setShowSignIn] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const userId =
    typeof window !== "undefined" ? localStorage.getItem("id") : "";
  const changeLanguage = async (newLang) => {
    const validLangs = ["ar", "en"];

    if (!validLangs.includes(newLang)) return;
    setLocale(newLang);
    try {
      await postRequest(`/api/users/langauge/${newLang}`, "", "");
      setLocale(newLang);

      localStorage.setItem("lang", newLang);
    } catch (err) {
      console.error("Failed to update language", err);
    }
  };
  const getProductInCart = async () => {
    try {
      if (userId) {
        const res = await getRequest(`/api/shopCarts`);
        const rseData = res.data;
setNetTotal(rseData.netTotal)
        setItemNum(rseData.itemLines.length);
      } else {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        setItemNum(cart.length);
      }
    } catch (err) {
      console.error("Failed to get product in cart", err);
    }
  };
  useEffect(() => {
    getProductInCart();
  }, [refreshKey]);
  useEffect(() => {
  
    const firstName =
      typeof window !== "undefined" ? localStorage.getItem("firstName") : "";
    const lastName =
      typeof window !== "undefined" ? localStorage.getItem("lastName") : "";
    setUsername(firstName + " " + lastName);

    // const userInfo = async()=>{
    //  const res = await getUserInfo()
    //  console.lo(res)
    // } 
    // userInfo()
  }, []);

  return (
    <header className="bg-[#0d0625] ">
      <div className="flex gap-2 items-center text-white p-2 text-xs w-full justify-between">
        <div className="flex justify-start items-center gap-2">
          <Link
            href={"/user/about"}
            className="hover:text-gray-100"
          >
            {t("about_us")}
          </Link>
          <hr
            className="w-[1px] h-4 border-0  bg-gray-300"
          />
          <Link
            href={"/user/home/#footer"}
            className="hover:text-gray-100"
          >
            {t("contact_us")}
          </Link>
          <hr
            className="w-[1px] h-4 border-0  bg-gray-300"
          />
          <Link
            href={"/user/ordershistory"}
            className="hover:text-gray-100"
          >
            {t("orders")}{" "}
          </Link>
        </div>
        <div className="flex justify-start items-center gap-2">
          <Link
            href={"/user/returnorders"}
            className="hover:text-gray-1000"
          >
            {t("returns")}{" "}
          </Link><hr
            className="w-[1px] h-4 border-0  bg-gray-300"
          />
          <Link
            href={"/user/about#Guarantee_Policy"}
            className="hover:text-gray-100"
          >
            {t("Guarantee_Policy")}
          </Link><hr
            className="w-[1px] h-4 border-0  bg-gray-300"
          />
          <Link
            href={"/user/about#Return_Policy"}
            className="hover:text-gray-100"
          >
            {t("Return_Policy")}
          </Link>
        </div>

      </div>
      <hr
        className="h-px border-0 bg-gray-600"
      />
      <div className="w-full  flex items-center  p-5  justify-between ">
        <button className="text-white text-3xl xs:block lg:hidden">
          <PiListBold />

        </button>
        <div className="flex justify-center items-center">
          <Link href="/user/home" className="flex justify-center items-center ">

            <span className="relative w-12 h-12 ">
              <Image
                src="/Images/logo.png"
                alt="logo"
                fill
                sizes="200px"
                priority
                className="object-fill"
              />
            </span>
            <div className="cursor-pointer">
              <h1 className="text-3xl  text-white font-bold ">
                {t("alfa_group")}<span className="text-red-600">.</span>
              </h1>
            </div>

          </Link>
        </div>

        <div
          className="lg:flex xs:hidden items-center bg-white justify-start border-2 w-[50%] bg-none h-10  rounded-full"

        >
          <button
            className="text-white h-full border-2 rounded-full text-2xl bg-[#CD4354] p-1 "
            onClick={() => {
              searchInput
                ? navigate.push("/user/search/" + searchInput)
                : navigate.push("/user/home");
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
                searchInput
                  ? navigate.push("/user/search/" + searchInput)
                  : navigate.push("/user/home");
              }
            }}
            placeholder={t("search") + "..."}
            type="search"
            enterKeyHint="search"
            className="w-full h-full text-base bg-none font-semibold outline-none rounded-e-full placeholder:text-sm  flex items-center p-1 "
          />
        </div>

        <div className="flex items-center lg:gap-5 xs:gap-1 ">
          <div className="flex items-center   cursor-pointer ">

          </div>

          <div className="flex items-center xs:gap-2 lg:gap-5 text-white">
            <button
              onClick={() => {
                const newLocale = locale === "ar" ? "en" : "ar";
                setLocale(newLocale);
                changeLanguage(newLocale);
              }}
            >
              <MdLanguage className="w-7 h-7 text-white" />
            </button>
            <div className=" items-center justify-center gap-2 xs:hidden lg:flex">
               <Link href="/user/cart" className="relative  ">
             
              <MdOutlineShoppingCart className="w-9 h-9" />
            </Link>
            <hr
              className="w-[1px] h-7 border-0  bg-gray-500"
            />
            <div className="flex flex-col text-sm">
              <span className="text-[#CD4354]">
                { netTotal.toLocaleString("en-US") + " " + t("currency")}
              </span>
               <span className=" text-xs">
                {itemNum }{" "}{t("Items")}
              </span>
            </div>
            </div>
           

            <div className="xs:flex lg:hidden items-center gap-1 cursor-pointer ">
              <span className="w-8 h-8">
                <PiUser className="w-full h-full " />
              </span>
              <span className=" font-semibold text-center xs:hidden lg:block">
                {username ? username : (t("login") + " / " + t("register"))}
              </span>
            </div>

          </div>
        </div>
      </div>
      <div className="w-full px-3 bg-[#CD4354]  p-2">
        <div className="xs:hidden lg:flex text-white">
          <div className="w-full flex justify-between ">
            <div className="w-full flex"></div>
            <div className="w-full flex justify-end items-center gap-5">
              <div className="flex items-center gap-2">
                <Link href="/user/wishlist" className="xs:hidden lg:block">
                  <FiHeart className="w-6 h-6 " />
                </Link>
                <span>{t("wishlist")} </span>

              </div>
              <hr className="w-px h-5 bg-gray-50 "></hr>
              <div className=" items-center gap-1 cursor-pointer flex  "
                onClick={() => {
                  if (userId) {
                    navigate.push("/user/profile");
                  } else {
                    setShowSignIn(true);
                    setOpenForm(true);

                  }
                }}
              >
                <span className="w-8 h-8">
                  <PiUser className="w-full h-full " />
                </span>
                <span className=" font-semibold text-center xs:hidden lg:block">
                  {username ? username : (t("login") + " / " + t("register"))}
                </span>
              </div>
            </div>
          </div>


        </div>

        <div
          className="xs:flex lg:hidden items-center bg-white justify-start border-2 w-full bg-none h-10   rounded-full"

        >
          <button
            className="text-white h-full border-2 rounded-full text-2xl bg-[#CD4354] p-1 "
            onClick={() => {
              searchInput
                ? navigate.push("/user/search/" + searchInput)
                : navigate.push("/user/home");
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
                searchInput
                  ? navigate.push("/user/search/" + searchInput)
                  : navigate.push("/user/home");
              }
            }}
            placeholder={t("search") + "..."}
            type="search"
            enterKeyHint="search"
            className="w-full h-full text-base bg-none font-semibold outline-none rounded-e-full placeholder:text-sm  flex items-center p-1 "
          />
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black/40 flex items-center justify-center z-50 ${openForm ? "block" : "hidden"}`}
      >
        <div className=" bg-white rounded-md relative">
          <MdCancel
            className="w-6 h-6 cursor-pointer hover:text-red-600 absolute top-2 right-2 "
            onClick={() => {
              setOpenForm(false);
            }}
          />
          {showSignin ? (
            <SignIn_Form popUp={true} setShowSignUp={setShowSignUp} setShowSignIn={setShowSignIn} setOpenForm={setOpenForm} />
          ) : showSignUp ? (
            <SignUp_Form popUp={true} setShowSignIn={setShowSignIn} setShowSignUp={setShowSignUp} setOpenForm={setOpenForm} />
          ) : ""}
        </div>
      </div>
    </header>
  );
}
