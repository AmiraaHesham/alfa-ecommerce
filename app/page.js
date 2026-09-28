"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    // غيّر '/ar' إلى الرابط اللي عايزه
    const role =
      typeof window !== "undefined" ? localStorage.getItem("role") : null;
    if (
      role === "ADMIN"

    ) {
      router.replace('/admin/Dashboard');

    } else {
      router.replace('/user/home'); // استخدم replace عشان ما يبقاش في التاريخ

    }
  }, [router]);

  return null;

}
