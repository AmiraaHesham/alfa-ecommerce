"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTelegram,
} from "react-icons/fa";
import { FaSquarePhone, FaSquareWhatsapp, FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { getRequest } from "../../../utils/requestsUtils";

export default function Footer() {
  const [contact, setContact] = useState({
    phone: "",
    email: "",
    facebook: "",
    instagram: "",
    x: "",
    whatsApp: "",
    telegram: "",
  });
  const getContact = async () => {
    const response = await getRequest(`/api/public/contact`);
    console.log(response);
    setContact((prev) => ({
      ...prev,
      phone: response.phone || "",
      email: response.email || "",
      facebook: response.facebookURL || "",
      instagram: response.instagramURL || "",
      x: response.xURL || "",
      whatsApp: response.whatsappURL || "",
      telegram: response.telegramURL || "",
    }));
    console.log(response.facebookURL);
  };
  useEffect(() => {
    getContact();
  }, []);
  return (
    <div className="flex justify-center gap-10 items-center w-full">
      <Link href="/">
        <div className="flex  items-center xs:justify-center md:justify-start ">
          <span className="  ">
            <Image
              src="/Images/logo.png"
              alt="logo"
              width={100}
              height={100}
              priority
            />
          </span>
        </div>
      </Link>
      <hr className="w-[2px]  h-32 bg-red-600 "></hr>

      <div className="flex flex-col  gap-5  justify-center items-start  ">
        <div className="flex  justify-between gap-5">
          <Link
            href={contact.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span
              className={`w-8 h-8 text-blue-600 ${
                contact.facebook === "" ? "hidden" : "block"
              }`}
            >
              <FaFacebookSquare className="w-full h-full" />
            </span>
          </Link>

          <span
            className={` w-8 h-8 text-green-600 ${
              contact.whatsApp === "" ? "hidden" : "block"
            } `}
          >
            <FaSquareWhatsapp className="w-full h-full" />
          </span>
          <span
            className={` w-8 h-8  text-blue-600 ${
              contact.telegram === "" ? "hidden" : "block"
            }`}
          >
            <FaTelegram className="w-full h-full" />
          </span>

          <span
            className={` w-8 h-8 text-pink-600 ${
              contact.instagram === "" ? "hidden" : "block"
            }`}
          >
            <FaInstagramSquare className="w-full h-full" />
          </span>
          <span
            className={` w-8 h-8 text-black ${
              contact.x === "" ? "hidden" : "block"
            }`}
          >
            <FaXTwitter className="w-full h-full" />
          </span>
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
            <span className="text-lg">{contact.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-2xl text-gray-700 ${
                contact.phone === "" ? "hidden" : "block"
              }`}
            >
              <FaSquarePhone />
            </span>
            <span className="text-lg">{contact.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
