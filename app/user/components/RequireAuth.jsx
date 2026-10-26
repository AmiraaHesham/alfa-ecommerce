"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RequireAuth({ children }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const hasSession = Boolean(
      localStorage.getItem("id") && localStorage.getItem("refreshToken"),
    );

    if (!hasSession) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("id");
      router.replace("/signin");
      return;
    }

    setReady(true);
  }, [router]);

  if (!ready) {
    return <div className="w-full min-h-[40vh]" />;
  }

  return children;
}
