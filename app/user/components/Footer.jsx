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
import { FaFacebookF, FaInstagram, FaPhone, FaSquarePhone, FaSquareWhatsapp, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { MdEmail, MdLocalPhone, MdOutlineMailOutline } from "react-icons/md";
import { getRequest } from "../../../utils/requestsUtils";
import { useLanguage } from "../../../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
const {locale}= useLanguage();
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
    <div className={`${locale === "ar" ? "bg-gradient-to-l" :"bg-gradient-to-r"} from-black via-red-950 to-red-900 text-white flex lg:flex-row xs:flex-col px-3 py-5 gap-7 items-center w-full`}>
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
                className="object-fill"
              />
            </span>
          </div>
        </Link>

      </div>
      <div className="flex md:flex-row xs:flex-col gap-10 md:justify-between xs:justify-center items-center w-full ">
        <div className="flex flex-col gap-5 justify-center items-center  ">
          <div>
            <h1 className="text-3xl font-bold">{t("alfa_group")}</h1>
          </div>
          <div className="flex justify-between gap-5">
            <Link
              href={contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-7 h-7 bg-blue-600 text-white p-1 rounded-full ${contact.facebook === "" ? "hidden" : "block"
                }`}
            >
              <span>
                <FaFacebookF className="w-full h-full" />
              </span>
            </Link>
            <Link
              href={contact.whatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className={` w-7 h-7 bg-green-600 text-white rounded-full p-1 ${contact.whatsApp === "" ? "hidden" : "block"
                } `}
            >
              <span>
                <FaWhatsapp className="w-full h-full" />
              </span>
            </Link>
            <Link
              href={contact.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className={` w-7 h-7  bg-blue-600 text-white p-1 rounded-full ${contact.telegram === "" ? "hidden" : "block"
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
              className={` w-7 h-7 bg-pink-600 text-white rounded-full p-1  ${contact.instagram === "" ? "hidden" : "block"
                }`}
            >
              <span>
                <FaInstagram className="w-full h-full" />
              </span>
            </Link>

            <Link
              href={contact.x}
              target="_blank"
              rel="noopener noreferrer"
              className={` w-7 h-7 text-white ${contact.x === "" ? "hidden" : "block"
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
              className={` w-7 h-7 rounded-full bg-red-600 text-white p-1 ${contact.youtube === "" ? "hidden" : "block"
                }`}
            >
              <span>
                <FaYoutube className="w-full h-full" />
              </span>
            </Link>
          </div>

       
        </div>
        <hr className="xs:w-full md:w-[2px] xs:h-1 md:h-36 md:bg-gradient-to-b xs:bg-gradient-to-l from-red-400 via-red-600 to-red-800 "></hr>

        <div className="md:flex  xs:grid md:justify-between md:items-start xs:grid-cols-2 xs:gap-4   w-full">

          <div className="flex flex-col justify-start items-start text-sm text-gray-300 w-full">
            <h1 className="text-lg font-bold mb-2 text-white">{t("quick_links")} </h1>
            <Link
              href={"/user/home"}
              className="hover:text-gray-50"
            >
              {t("homepage")}
            </Link>
            <Link
              href={"/user/home#FeaturedProducts"}
              className="hover:text-gray-50"
            >
              {t("featured_products")}
            </Link>


            <Link
              href={"/user/home#CategoriesSection"}
              className="hover:text-gray-50"
            >
              {t("categories")}{" "}
            </Link>
            <Link
              href={"/user/about"}
              className="hover:text-gray-50"
            >
              {t("about_us")}
            </Link> 
          </div>
          {/* <hr className="xs:w-full md:w-[1px] xs:h-2 md:h-36 bg-gray-50 "></hr> */}
          <div className="flex flex-col justify-start items-start text-sm text-gray-300 w-full">
            <h1 className="text-lg font-bold mb-2 text-white">{t("customer_service")} </h1>
            <Link
              href={"/user/ordershistory"}
              className="hover:text-gray-50"
            >
              {t("orders")}{" "}
            </Link>
            <Link
              href={"/user/returnorders"}
              className="hover:text-gray-50"
            >
              {t("returns")}{" "}
            </Link>
            <Link
              href={"/user/about#Guarantee_Policy"}
              className="hover:text-gray-50"
            >
              {t("Guarantee_Policy")}
            </Link>
            <Link
              href={"/user/about#Return_Policy"}
              className="hover:text-gray-50"
            >
              {t("Return_Policy")}
            </Link>
          </div>
          <div className="flex flex-col justify-start items-start text-sm text-gray-300 w-full">
            <h1 className="text-lg font-bold mb-2 text-white">{t("my_account")} </h1>
            <Link
              href={"/user/profile"}
              className="hover:text-gray-50"
            >
              {t("view_profile")}{" "}
            </Link>
            <Link
              href={"/user/wishlist"}
              className="hover:text-gray-50"
            >
              {" "}
              {t("wishlist")}{" "}
            </Link>
            <Link
              href={"/user/cart"}
              className="hover:text-gray-50"
            >
              {" "}
              {t("shoppingCart")}{" "}
            </Link>
          </div>
           <div className="flex flex-col justify-start items-start text-sm text-gray-300 w-full">
            <h1 className="text-lg font-bold mb-2 text-white">{t("contact_us")} </h1>
               <div className="flex flex-col items-start justify-start gap-2">
            <div className="flex items-center gap-2">
              <span
                className={`text-lg text-white ${
                  contact.email === "" ? "hidden" : "block"
                }`}
              >
                <MdOutlineMailOutline  />
              </span>
              <span className="text-base">{contact.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-lg text-white ${
                  contact.phone === "" ? "hidden" : "block"
                }`}
              >
                <MdLocalPhone  />
              </span>
              <span className="">{contact.phone}</span>
            </div>
          </div>
            </div>
         
        </div>
      </div>
    </div>
  );
}
