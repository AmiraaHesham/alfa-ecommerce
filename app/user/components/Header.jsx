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
import { PiListBold, PiUserLight } from "react-icons/pi";
import SignIn_Form from "../../components/SignIn_Form";
import SignUp_Form from "../../components/SignUp_Form";
import { getUserInfo } from "../../../utils/functions";
export default function Header() {
  const { t } = useLanguage();
  const navigate = useRouter();
  const [mounted, setMounted] = useState(false);
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
      await postRequest(`/api/users/${userId}/langauge/${newLang}`, "", "");
      setLocale(newLang);

      localStorage.setItem("lang", newLang);
    } catch (err) {
      console.error("Failed to update language", err);
    }
  };
  const getProductInCart = async () => {
    try {
      if (userId) {
        const res = await getRequest(`/api/shopCarts/`);
        const rseData = res.data;

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
    setMounted(true);
    const username =
      typeof window !== "undefined" ? localStorage.getItem("firstName") : "";
    setUsername(username);

  // const userInfo = async()=>{
  //  const res = await getUserInfo()
  //  console.lo(res)
  // } 
// userInfo()
  }, []);

  return (
    <header className="bg-[#0d0625] xs:pb-2 md:pb-0">
      <div className="flex gap-2 items-center text-white p-2 text-xs">

        <span>
          {t("about_us")}
        </span>
        <hr
          className="w-[1px] h-4 border-0  bg-gray-300"
        />
        <span>
          {t("contact_us")}
        </span>
        <hr
          className="w-[1px] h-4 border-0  bg-gray-300"
        />
        <button
          onClick={() => {
            const newLocale = locale === "ar" ? "en" : "ar";
            setLocale(newLocale);
            changeLanguage(newLocale);
          }}
        >
          <MdLanguage className="w-6 h-6 text-white" />
        </button>

      </div>
      <hr
        className="h-px border-0 bg-gray-600"
      />
      <div className="w-full  flex items-center  p-5  justify-between ">
        <button className="text-white text-3xl xs:block md:hidden">
          <PiListBold />

        </button>
        <div className="flex justify-center items-center">
          <Link href="/user/home" className="flex justify-center items-center ">

            <span className="relative w-12 h-12 ">
              <Image
                src="/Images/logo.png"
                alt="logo"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                className="object-fill"
              />
            </span>
            <div className="cursor-pointer">
              <h1 className="text-xl  text-white font-semibold ">
                {t("alfa_group")}
              </h1>
            </div>

          </Link>
        </div>

        <div
          className="md:flex xs:hidden items-center bg-white justify-start border-2 w-[50%] bg-none h-10  rounded-full"

        >
          <button
            className="text-white h-full border-2 rounded-full text-2xl bg-red-600 p-1 "
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

        <div className="flex items-center md:gap-5 xs:gap-1 ">
          <div className="flex items-center   cursor-pointer ">

          </div>

          <div className="flex items-center xs:gap-2 md:gap-5 text-white">

            <Link href="/user/cart" className="relative xs:hidden md:block ">
              <span className="absolute  text-red-800 text-center [-webkit-text-stroke:1px_white] md:text-lg xs:text-sm font-extrabold   right-0 xs:top-[-8px] md:top-[-9px] left-0 bottom-0">
                {itemNum}{" "}
              </span>
              <MdOutlineShoppingCart className="w-9 h-9" />
            </Link>
            <Link href="/user/wishlist" className="xs:hidden md:block">
              <FiHeart className="w-7 h-7 " />
            </Link>

            <hr
              className="w-[1px] h-10 border-0 xs:hidden md:block bg-gray-300"
            />
            <div  onClick={() => {
    if (userId) {
      navigate.push("/user/profile");
    } else {
      setShowSignIn(true);
      setOpenForm(true);

    }
  }}>
              <div className="flex items-center gap-1 cursor-pointer ">
                <span className="w-8 h-8">
                  <PiUserLight className="w-full h-full " />
                </span>
                <span className=" font-semibold text-center xs:hidden md:block">
                  {username ?  username : (t("login")+ " / " +t("register"))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-3">
        <div
          className="xs:flex md:hidden items-center bg-white justify-start border-2 w-full bg-none h-10   rounded-full"

        >
          <button
            className="text-white h-full border-2 rounded-full text-2xl bg-red-600 p-1 "
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
          ) : showSignUp? (
            <SignUp_Form popUp={true} setShowSignIn={setShowSignIn} setShowSignUp={setShowSignUp} setOpenForm={setOpenForm}/>     
                 ):""}
        </div>
      </div>
    </header>
  );
}
