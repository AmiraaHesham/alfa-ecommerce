"use client"
import { useRouter } from "next/navigation";
// import Header from "./user/components/Header";
// import Homepage from "./user/pages/home/page";
// import Searchpage from "./user/pages/search/page";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const role = typeof window !== "undefined" ? localStorage.getItem("role") : null;
  useEffect(() => {
    // غيّر '/ar' إلى الرابط اللي عايزه
    if (
      role === "ADMIN"

    ) {
      router.replace('/admin/pages/Dashboard');

    } else {
      router.replace('/user/home'); // استخدم replace عشان ما يبقاش في التاريخ

    }
  }, []);

  return null;

}
