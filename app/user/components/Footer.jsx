"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTelegram,
  FaYoutube,
} from "react-icons/fa";
import { FaSquarePhone, FaSquareWhatsapp, FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { getRequest } from "../../../utils/requestsUtils";
import { useLanguage } from "../../../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const [contact, setContact] = useState({
    phone: "",
    email: "",
    facebook: "",
    instagram: "",
    x: "",
    whatsApp: "",
    telegram: "",
    youtube: "",
  });
  const getContact = async () => {
    const response = await getRequest(`/api/public/contact`);
    console.log(response);
    const resData = response.data;
    setContact((prev) => ({
      ...prev,
      phone: resData.phone || "",
      email: resData.email || "",
      facebook: resData.facebookURL || "",
      instagram: resData.instagramURL || "",
      x: resData.xurl || "",
      whatsApp: resData.whatsappURL || "",
      telegram: resData.telegramURL || "",
      youtube: resData.youtubeURL || "",
    }));
    // console.log(resData.facebookURL);
  };
  useEffect(() => {
    getContact();
  }, []);
  return (
    <div className="flex md:flex-row xs:flex-col px-3 py-5 gap-7 items-center w-full">
      <div className="flex md:flex-row xs:flex-col items-center gap-2">
        <Link href="/user/home">
          <div className="flex  items-center xs:justify-center md:justify-start ">
            <span className=" relative w-[120px] h-[120px]">
              <Image
                src="/Images/logo.png"
                alt="logo"
                fill
                priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
              />
            </span>
          </div>
        </Link>
        <hr className="xs:w-full md:w-[2px] xs:h-2 md:h-36 bg-red-600 "></hr>
      </div>
      <div className="flex md:flex-row xs:flex-col gap-10 md:justify-between xs:justify-center items-center w-full ">
        <div className="flex flex-col  gap-5  justify-center items-start  ">
          <div className="flex  justify-between gap-5">
            <Link
              href={contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-8 h-8 text-blue-600 ${
                contact.facebook === "" ? "hidden" : "block"
              }`}
            >
              <span>
                <FaFacebookSquare className="w-full h-full" />
              </span>
            </Link>
            <Link
              href={contact.whatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className={` w-8 h-8 text-green-600 ${
                contact.whatsApp === "" ? "hidden" : "block"
              } `}
            >
              <span>
                <FaSquareWhatsapp className="w-full h-full" />
              </span>
            </Link>
            <Link
              href={contact.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className={` w-8 h-8  text-blue-600 ${
                contact.telegram === "" ? "hidden" : "block"
              }`}
            >
              <span>
                <FaTelegram className="w-full h-full" />
              </span>
            </Link>

            <Link
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={` w-8 h-8 text-pink-600 ${
                contact.instagram === "" ? "hidden" : "block"
              }`}
            >
              <span>
                <FaInstagramSquare className="w-full h-full" />
              </span>
            </Link>

            <Link
              href={contact.x}
              target="_blank"
              rel="noopener noreferrer"
              className={` w-8 h-8 text-black ${
                contact.x === "" ? "hidden" : "block"
              }`}
            >
              <span>
                <FaXTwitter className="w-full h-full" />
              </span>
            </Link>
            <Link
              href={contact.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className={` w-8 h-8 text-red-600 ${
                contact.youtube === "" ? "hidden" : "block"
              }`}
            >
              <span>
                <FaYoutube className="w-full h-full" />
              </span>
            </Link>
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <div className="flex items-center gap-2">
              <span
                className={`text-2xl text-gray-700 ${
                  contact.email === "" ? "hidden" : "block"
                }`}
              >
                <MdEmail />
              </span>
              <span className="text-base">{contact.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-2xl text-gray-700 ${
                  contact.phone === "" ? "hidden" : "block"
                }`}
              >
                <FaSquarePhone />
              </span>
              <span className="text-base">{contact.phone}</span>
            </div>
          </div>
        </div>
        <div className="flex xs:justify-center md:justify-end md:items-start xs:items-center xs:text-center md:text-start  w-full">
          <div className="lg:w-[60%] xs:w-full  grid grid-cols-3   sm:gap-x-6 xs:gap-x-4 gap-y-2 sm:text-sm  xs:text-xs  text-gray-600 font-semibold">
          <Link
            href={"/user/home"}
            className="hover:[text-shadow:2px_2px_5px_rgba(0,0,0,0.25)]"
          >
            {t("homepage")}
          </Link>

          <Link
            href={"/user/home#FeaturedProducts"}
            className="hover:[text-shadow:2px_2px_5px_rgba(0,0,0,0.25)]"
          >
            {t("featured_products")}
          </Link>
          <Link
            href={"/user/cart"}
            className="hover:[text-shadow:2px_2px_5px_rgba(0,0,0,0.25)]"
          >
            {" "}
            {t("shoppingCart")}{" "}
          </Link>

          <Link
            href={"/user/wishlist"}
            className="hover:[text-shadow:2px_2px_5px_rgba(0,0,0,0.25)]"
          >
            {" "}
            {t("wishlist")}{" "}
          </Link>
          <Link
            href={"/user/pages/profile"}
            className="hover:[text-shadow:2px_2px_5px_rgba(0,0,0,0.25)]"
          >
            {t("view_profile")}{" "}
          </Link>
          <Link
            href={"/user/returnorders"}
            className="hover:[text-shadow:2px_2px_5px_rgba(0,0,0,0.25)]"
          >
            {t("returns")}{" "}
          </Link>

          <Link
            href={"/user/home#CategoriesSection"}
            className="hover:[text-shadow:2px_2px_5px_rgba(0,0,0,0.25)]"
          >
            {t("categories")}{" "}
          </Link>
          <Link
            href={"/user/ordershistory"}
            className="hover:[text-shadow:2px_2px_5px_rgba(0,0,0,0.25)]"
          >
            {" "}
            {t("orders")}{" "}
          </Link>
          <Link
            href={"/user/about#Return_Policy"}
            className="hover:[text-shadow:2px_2px_5px_rgba(0,0,0,0.25)]"
          >
            {t("Return_Policy")}
          </Link>
          <Link
            href={"/user/about#Guarantee_Policy"}
            className="hover:[text-shadow:2px_2px_5px_rgba(0,0,0,0.25)]"
          >
            {t("Guarantee_Policy")}
          </Link>
          <Link
            href={"/user/about"}
            className="hover:[text-shadow:2px_2px_5px_rgba(0,0,0,0.25)]"
          >
            {t("about_us")}
          </Link>
        </div>
        </div>
        
      </div>
    </div>
  );
}
