"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaTelegram,
  FaYoutube,
} from "react-icons/fa";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import {  MdLocalPhone, MdOutlineMailOutline } from "react-icons/md";
import { getRequest } from "../../../utils/requestsUtils";
import { useLanguage } from "../../../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const { locale } = useLanguage();
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
  const {year , setYear} = useState('')
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
    <div className="bg-white text-black px-3 py-5 flex flex-col  w-full">
      <div className="flex  md:flex-row xs:flex-col  justify-between md:items-center xs:items-start xs:gap-5">
        <div className="flex items-center justify-start w-full">
           <Link href="/user/home">
    <div className="flex  items-start justify-start w-full ">

          <span className=" relative w-[60px] h-[60px]">
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
        <div>
          <h1 className="text-4xl font-semibold ">{t("alfa_group")}</h1>
        </div>
        </div>
         <div className="flex justify-between items-center gap-2">
            <Link
              href={contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-8 h-8 bg-blue-600 text-white  p-[6px] rounded-full block ${contact.facebook === "" ? "hidden" : "block"
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
              className={` w-8 h-8 bg-green-600 text-white rounded-full  p-[6px] ${contact.whatsApp === "" ? "hidden" : "block"
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
              className={` w-8 h-8  bg-blue-600 text-white  p-[6px] rounded-full ${contact.telegram === "" ? "hidden" : "block"
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
              className={` w-8 h-8 bg-pink-600 text-white rounded-full  p-[6px]  ${contact.instagram === "" ? "hidden" : "block"
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
              className={` w-8 h-8 bg-black text-white rounded-full  p-[7px] ${contact.x === "" ? "hidden" : "block"
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
              className={` w-8 h-8 rounded-full bg-red-600 text-white p-[6px] ${contact.youtube === "" ? "hidden" : "block"
                }`}
            >
              <span>
                <FaYoutube className="w-full h-full" />
              </span>
            </Link>
          </div>


      </div>

 <hr className="h-px border-0 bg-gray-200 mt-4"/>   

 <div className="md:flex  xs:grid md:justify-between md:items-start xs:grid-cols-2 xs:gap-4 my-10   w-full">

          <div className="flex flex-col justify-start items-start gap-3 text-gray-500 w-full">
            <h1 className="text-xl font-medium mb-2 text-black">{t("quick_links")} </h1>
            <Link
              href={"/user/home"}
              className="hover:text-gray-800"
            >
              {t("homepage")}
            </Link>
            <Link
              href={"/user/home#FeaturedProducts"}
              className="hover:text-gray-800"
            >
              {t("featured_products")}
            </Link>


            <Link
              href={"/user/home#CategoriesSection"}
              className="hover:text-gray-800"
            >
              {t("categories")}{" "}
            </Link>
            <Link
              href={"/user/about"}
              className="hover:text-gray-800"
            >
              {t("about_us")}
            </Link>
          </div>
          {/* <hr className="xs:w-full md:w-[1px] xs:h-2 md:h-36 bg-gray-50 "></hr> */}
          <div className="flex flex-col justify-start items-start gap-3 text-gray-500 w-full">
            <h1 className="text-xl font-medium mb-2 text-black">{t("customer_service")} </h1>
            <Link
              href={"/user/ordershistory"}
              className="hover:text-gray-800"
            >
              {t("orders")}{" "}
            </Link>
            <Link
              href={"/user/returnorders"}
              className="hover:text-gray-8000"
            >
              {t("returns")}{" "}
            </Link>
            <Link
              href={"/user/about#Guarantee_Policy"}
              className="hover:text-gray-800"
            >
              {t("Guarantee_Policy")}
            </Link>
            <Link
              href={"/user/about#Return_Policy"}
              className="hover:text-gray-800"
            >
              {t("Return_Policy")}
            </Link>
          </div>
          <div className="flex flex-col justify-start items-start gap-3 text-gray-500 w-full">
            <h1 className="text-xl font-medium mb-2 text-black">{t("my_account")} </h1>
            <Link
              href={"/user/profile"}
              className="hover:text-gray-800"
            >
              {t("view_profile")}{" "}
            </Link>
            <Link
              href={"/user/wishlist"}
              className="hover:text-gray-800"
            >
              {" "}
              {t("wishlist")}{" "}
            </Link>
            <Link
              href={"/user/cart"}
              className="hover:text-gray-800"
            >
              {" "}
              {t("shoppingCart")}{" "}
            </Link>
          </div>
          <div className="flex flex-col justify-start items-start gap-3 text-gray-500 w-full">
            <h1 className="text-xl font-medium mb-2 text-black">{t("contact_us")} </h1>
            <div className="flex flex-col items-start justify-start gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={`text-lg text-black ${contact.email === "" ? "hidden" : "block"
                    }`}
                >
                  <MdOutlineMailOutline />
                </span>
                <span className="text-base">{contact.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-lg text-black ${contact.phone === "" ? "hidden" : "block"
                    }`}
                >
                  <MdLocalPhone />
                </span>
                <span className="">{contact.phone}</span>
              </div>
            </div>
          </div>
          </div>
 <hr className="h-px  border-0 bg-gray-200 "/>   
<div className="flex justify-center items-center w-full mt-4">
  <h1> {<div>  Designed & Developed by | <span className="font-semibold">BlueSoft</span> © {new Date().getFullYear()} </div>}   </h1>
</div>
    </div>
  );
}
