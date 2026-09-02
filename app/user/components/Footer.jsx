"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaTelegram,
  FaYoutube,
} from "react-icons/fa";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { MdLocalPhone, MdOutlineMailOutline } from "react-icons/md";
import { getRequest } from "../../../utils/requestsUtils";
import { useLanguage } from "../../../context/LanguageContext";
import { IoIosArrowDown, IoIosArrowRoundDown } from "react-icons/io";

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
  const [show, setshow] = useState({
    quick_links: false,
    contact_us: false,
    my_account: false,
    customer_service: false,
  })
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
    <div  className="bg-white text-black px-3 py-5 flex flex-col  w-full">
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
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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

      <hr className="h-px border-0 bg-gray-200 mt-4" />

      <div className="flex  xs:flex-col md:justify-between md:items-start md:flex-row gap-10  my-10  w-full">

        <div className="flex flex-col justify-start items-start gap-3 text-gray-500 w-full">
          <div className="xs:flex justify-between items-center cursor-pointer w-full"
            onClick={() => setshow((prev) => ({
              ...prev,
              quick_links: !prev.quick_links,
              contact_us: false,
              my_account: false,
              customer_service: false
            }))}
          >

            <h1 className="text-xl font-medium  text-black">{t("quick_links")} </h1>
            <span className={`text-black md:hidden transition-transform duration-300 ${show.quick_links ? "rotate-180" : ""
              }`}><IoIosArrowDown /></span>
          </div>
          <div className={`flex-col  gap-2 w-full ${show.quick_links ? "flex duration-500 scale-x-100" : "hidden duration-500 "
            } md:flex`}>
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

        </div>
        {/* <hr className="xs:w-full md:w-[1px] xs:h-2 md:h-36 bg-gray-50 "></hr> */}
        <div className="flex flex-col justify-start items-start gap-3 text-gray-500 w-full">
          <div className="xs:flex justify-between items-center cursor-pointer w-full"
            onClick={() => setshow((prev) => ({
              ...prev,
              quick_links: false,
              contact_us: false,
              my_account: false,
              customer_service: !prev.customer_service
            }))}>

            <h1 className="text-xl font-medium  text-black">{t("customer_service")} </h1>
            <span className={`text-black md:hidden transition-transform duration-300 ${show.customer_service ? "rotate-180" : ""
              }`}><IoIosArrowDown /></span>          </div>
          <div className={`flex-col gap-2 w-full ${show.customer_service ? "flex duration-500 scale-x-100" : "hidden duration-500 "
            } md:flex`}>

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
        </div>


        <div className="flex flex-col justify-start items-start gap-3 text-gray-500 w-full">
          <div className="xs:flex justify-between items-center cursor-pointer w-full"
            onClick={() => setshow((prev) => ({
              ...prev,
              quick_links: false,
              contact_us: false,
              my_account: !prev.my_account,
              customer_service: false
            }))}
          >

            <h1 className="text-xl font-medium  text-black">{t("my_account")} </h1>
            <span className={`text-black md:hidden transition-transform duration-300 ${show.my_account ? "rotate-180" : ""
              }`}><IoIosArrowDown /></span>          </div>
          <div className={`flex-col  gap-2 w-full ${show.my_account ? "flex duration-500 scale-x-100" : "hidden duration-500 "
            } md:flex`}>
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
        </div>
        <div className="flex flex-col justify-start items-start gap-3 text-gray-500 w-full">
          <div className="xs:flex justify-between items-center cursor-pointer w-full"
            onClick={() => setshow((prev) => ({
              ...prev,
              quick_links: false,
              contact_us: !prev.contact_us,
              my_account: false,
              customer_service: false
            }))}
          >

            <h1 className="text-xl font-medium  text-black">{t("contact_us")} </h1>
            <span className={`text-black md:hidden transition-transform duration-300 ${show.contact_us ? "rotate-180" : ""
              }`}><IoIosArrowDown /></span>
          </div>
          <div className={`flex-col  gap-2 w-full ${show.contact_us ? "flex duration-500 scale-x-100" : "hidden duration-500 "
            } md:flex`}>
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
      <hr className="h-px  border-0 bg-gray-200 " />
      <div className="flex justify-center items-center w-full mt-4">
        <h1> {<div>  Designed & Developed by | <span className="font-semibold">BlueSoft</span> © {new Date().getFullYear()} </div>}   </h1>
      </div>
    </div>
  );
}
