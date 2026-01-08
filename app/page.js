"use client"
import Image from "next/image";
import Link from "next/link"; 
import { useLanguage } from "../context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  return (
    <div className=" bg-[#F3F4F6] ">
      <main className="">
        <header className="w-full h-[70px] ">
 <Link href="/SignIn" className="m-4 p-2 bg-blue-600 text-white rounded-lg">Sign In</Link>
 <Link href="/SignUp" className="m-4 p-2 bg-blue-600 text-white rounded-lg">Sign Up</Link>
        </header>
      </main>

    </div>
  );
}
