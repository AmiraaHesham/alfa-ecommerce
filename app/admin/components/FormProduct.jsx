"use client"
import Image from "next/image";
import { MdCancel } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useLanguage } from "../../../context/LanguageContext.js";

export default function Home({name_categ , img , state}) {
  const [photo, setPhoto] = useState();
  const categoryName = useRef();
  const { t } = useLanguage();
    return (
    <div className="flex flex-col  gap-2">

        </div>
  );
}