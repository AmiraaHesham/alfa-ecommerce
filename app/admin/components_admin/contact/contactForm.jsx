"use client";
import { MdContactPage, MdEmail } from "react-icons/md";
import { FaSquarePhone, FaSquareWhatsapp, FaXTwitter } from "react-icons/fa6";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTelegram,
  FaTimes,
} from "react-icons/fa";
import { IoMdSave, IoMdShare } from "react-icons/io";
import { useEffect, useState } from "react";
import { getRequest, putRequest } from "../../../../utils/requestsUtils";
import { useLanguage } from "../../../../context/LanguageContext";

export default function ContactForm() {
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
    facebock: "",
    whatsApp: "",
    instagram: "",
    x: "",
    telegram: "",
  });
  const { t } = useLanguage();

  const addContactInfo = async () => {
    await putRequest("/api/admin/contact", {
      phone: contactInfo.phone,
      email: contactInfo.email,
      facebookURL: contactInfo.facebock,
      whatsappURL: contactInfo.whatsApp,
      telegramURL: contactInfo.telegram,
      instagramURL: contactInfo.instagram,
      xURL: contactInfo.x,
    },t("message_EditText"));
    getcontactInfo();
  };

  const getcontactInfo = async () => {
    const res = await getRequest("/api/admin/contact");
    setContactInfo((prev) => ({
      ...prev,
      phone: res.phone,
      email: res.email,
      facebock: res.facebookURL,
      whatsApp: res.whatsappURL,
      instagram: res.instagramURL,
      x: res.xURL,
      telegram: res.telegramURL,
    }));
  };
  useEffect(() => {
    getcontactInfo();
  }, []);
  useEffect(() => {
    console.log(contactInfo);
  }, []);
  return (
    <div className="bg-white border rounded-md px-5 h-[100%]">
      <form
        className="h-full"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex justify-between items-center ">
          <div className="flex items-center gap-3 p-4">
            <span className="text-2xl text-blue-700">
              <MdContactPage />
            </span>
            <h1 className="lg:text-xl xs:text-base font-semibold ">
              {t("contact-details")}
            </h1>
          </div>
          <div className="flex justify-end  ">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md flex items-center justify-end gap-2  md:text-base xs:text-base "
              onClick={addContactInfo}
            >
              <IoMdSave />{" "}
              <h1 className="sm:block xs:hidden">{t("save-changes")}</h1>
            </button>
          </div>
        </div>

        <hr className="h-1"></hr>
        <div className=" w-full flex justify-center items-center">
          <div className=" md:w-[80%] xs:w-full flex flex-col gap-3  my-3">
            <div className="flex lg:flex-row xs:flex-col w-full  justify-between gap-3 xs:px-5 lg:px-10 rounded-md py-2 bg-[#f3f4f6a1] ">
              <label className="font-semibold xs:w-[200px] lg:w-[320px] flex gap-3 items-center">
                <span className="text-xl text-gray-700">
                  <MdEmail />
                </span>
                <h1 className=" text-gray-500 md:text-sm xs:text-xs">
                  {t("official-email-address")}
                </h1>
              </label>
              <div className="flex items-center gap-5 w-full">
                <input
                  type="text"
                  className=" border w-full border-gray-300 rounded-md px-3 py-1 "
                  onChange={(e) => {
                    setContactInfo((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }));
                  }}
                  value={contactInfo.email}
                />
                <button className=" text-gray-500 text-base"
                onClick={()=>{
                   setContactInfo((prev) => ({
                      ...prev,
                      email: '',
                    }));
                }}
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className="flex lg:flex-row xs:flex-col w-full  justify-between   gap-3 xs:px-5 lg:px-10 rounded-md py-2 bg-[#f3f4f6a1] ">
              <label className="font-semibold xs:w-[200px] lg:w-[320px]  flex gap-3 items-center">
                <span className="text-xl text-gray-700">
                  <FaSquarePhone />{" "}
                </span>
                <h1 className=" text-gray-500 md:text-sm xs:text-xs ">
                  {t("support-phone-number")}
                </h1>
              </label>
              <div className="flex items-center gap-5 w-full">
                <input
                  type="text"
                  className=" border w-full border-gray-300 rounded-md px-3 py-1 "
                  onChange={(e) => {
                    setContactInfo((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }));
                  }}
                  value={contactInfo.phone}
                />
                <button className=" text-gray-500 text-base"
                 onClick={()=>{
                   setContactInfo((prev) => ({
                      ...prev,
                      phone: '',
                    }));
                }}>
                  <FaTimes />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-9 p-4">
          <span className="text-2xl text-blue-700">
            <IoMdShare />
          </span>
          <h1 className="lg:text-xl xs:text-base font-semibold ">
            {t("social-media-links")}
          </h1>
        </div>
        <hr className="h-1"></hr>
        <div className=" w-full flex justify-center items-center">
          <div className=" md:w-[80%] xs:w-full flex flex-col gap-3   my-3">
            <div className="flex lg:flex-row xs:flex-col w-full  justify-between gap-2 xs:px-5 lg:px-10 rounded-md py-2 bg-[#f3f4f6a1] ">
              <label className="font-semibold xs:w-[200px] lg:w-[320px]  flex gap-3 items-center">
                <span className="text-xl text-blue-700">
                  <FaFacebookSquare />
                </span>
                <h1 className=" text-gray-500  md:text-sm xs:text-xs">
                  Facebock
                </h1>
              </label>
              <div className="flex items-center gap-5 w-full">
                <input
                  type="text"
                  className=" border w-full border-gray-300 rounded-md px-3 py-1 "
                  onChange={(e) =>
                    setContactInfo((prev) => ({
                      ...prev,
                      facebock: e.target.value,
                    }))
                  }
                  value={contactInfo.facebock}
                />
                <button className=" text-gray-500 text-base"
                 onClick={()=>{
                   setContactInfo((prev) => ({
                      ...prev,
                      facebock: '',
                    }));
                }}>
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className="flex lg:flex-row xs:flex-col w-full  justify-between gap-2 xs:px-5 lg:px-10 rounded-md py-2 bg-[#f3f4f6a1] ">
              <label className="font-semibold xs:w-[200px] lg:w-[320px]  flex gap-3 items-center">
                <span className="text-2xl text-green-600">
                  <FaSquareWhatsapp />
                </span>
                <h1 className=" text-gray-500  md:text-sm xs:text-xs ">
                  WhatsApp
                </h1>
              </label>
              <div className="flex items-center gap-5 w-full">
                <input
                  type="text"
                  className=" border w-full border-gray-300 rounded-md px-3 py-1 "
                  onChange={(e) =>
                    setContactInfo((prev) => ({
                      ...prev,
                      whatsApp: e.target.value,
                    }))
                  }
                  value={contactInfo.whatsApp}
                />
                <button className=" text-gray-500 text-base"
                 onClick={()=>{
                   setContactInfo((prev) => ({
                      ...prev,
                      whatsApp: '',
                    }));
                }}>
                  <FaTimes />
                </button>
              </div>
            </div>

            <div className="flex lg:flex-row xs:flex-col w-full  justify-between gap-2 xs:px-5 lg:px-10 rounded-md py-2 bg-[#f3f4f6a1] ">
              <label className="font-semibold xs:w-[200px] lg:w-[320px]  flex gap-3 items-center">
                <span className="text-2xl text-blue-600">
                  <FaTelegram />
                </span>
                <h1 className=" text-gray-500   md:text-sm xs:text-xs">
                  Telegram
                </h1>
              </label>
              <div className="flex items-center gap-5 w-full">
                <input
                  type="text"
                  className=" border w-full border-gray-300 rounded-md px-3 py-1 "
                  onChange={(e) =>
                    setContactInfo((prev) => ({
                      ...prev,
                      telegram: e.target.value,
                    }))
                  }
                  value={contactInfo.telegram}
                />
                <button className=" text-gray-500 text-base"
                 onClick={()=>{
                   setContactInfo((prev) => ({
                      ...prev,
                      telegram: '',
                    }));
                }}>
                  <FaTimes />
                </button>
              </div>
            </div>

            <div className="flex lg:flex-row xs:flex-col w-full  justify-between gap-2 xs:px-5 lg:px-10 rounded-md py-2 bg-[#f3f4f6a1] ">
              <label className="font-semibold xs:w-[200px] lg:w-[320px]  flex gap-3 items-center">
                <span className="text-xl text-pink-600">
                  <FaInstagramSquare />{" "}
                </span>
                <h1 className=" text-gray-500  md:text-sm xs:text-xs">
                  Instagram
                </h1>
              </label>
              <div className="flex items-center gap-5 w-full">
                <input
                  type="text"
                  className=" border w-full border-gray-300 rounded-md px-3 py-1 "
                  onChange={(e) =>
                    setContactInfo((prev) => ({
                      ...prev,
                      instagram: e.target.value,
                    }))
                  }
                  value={contactInfo.instagram}
                />
                <button className=" text-gray-500 text-base"
                 onClick={()=>{
                   setContactInfo((prev) => ({
                      ...prev,
                      instagram: '',
                    }));
                }}>
                  <FaTimes />
                </button>
              </div>
            </div>

            <div className="flex lg:flex-row xs:flex-col w-full  justify-between gap-2 xs:px-5 lg:px-10 rounded-md py-2 bg-[#f3f4f6a1] ">
              <label className="font-semibold xs:w-[200px] lg:w-[320px]  flex gap-3 items-center">
                <span className="text-2xl text-black">
                  <FaXTwitter />
                </span>
                <h1 className=" text-gray-500  md:text-sm xs:text-xs">X</h1>
              </label>
              <div className="flex items-center gap-5 w-full">
                <input
                  type="text"
                  className=" border w-full border-gray-300 rounded-md px-3 py-1 "
                  onChange={(e) =>
                    setContactInfo((prev) => ({
                      ...prev,
                      x: e.target.value,
                    }))
                  }
                  value={contactInfo.x}
                />
                <button className=" text-gray-500 text-base"
                 onClick={()=>{
                   setContactInfo((prev) => ({
                      ...prev,
                      x: '',
                    }));
                }}>
                  <FaTimes />
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
