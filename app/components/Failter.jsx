"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext.js";
import { IoMdSearch } from "react-icons/io";
import { MdFilterList } from "react-icons/md";
import { FaRegCalendar } from "react-icons/fa6";

export default function Orders_Failter({ placeholder, view }) {
  const { t } = useLanguage();

  switch (placeholder) {
    case "Search by order code or name":
      placeholder = "search_by_order_code_or_name";
      break;
    case "Search by username or email":
      placeholder = "search_by_username_or_email";
      break;
  }

  return <div></div>;
}
