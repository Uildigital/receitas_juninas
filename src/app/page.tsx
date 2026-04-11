"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const VIPArea = dynamic(() => import("@/components/VIPArea"), { 
  loading: () => <div className="min-h-screen bg-[#FFF8F0] animate-pulse" />,
  ssr: false 
});

import LandingPage from "@/components/LandingPage";

export default function SmartRootPage() {
  const [isVipUser, setIsVipUser] = useState<boolean | null>(false); // Assume false for SSR to deliver Landing Page immediately
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const urlParams = new URLSearchParams(window.location.search);
    const isVipParam = urlParams.get("vip") === "true";
    const isVipStored = localStorage.getItem("webbook-isvip") === "true";

    if (isVipParam || isVipStored) {
      setIsVipUser(true);
      if (isVipParam) localStorage.setItem("webbook-isvip", "true");
    }
  }, []);

  if (!isClient) {
      // Server-side: Always render LandingPage immediately for fast FCP/LCP
      return <LandingPage />;
  }

  return isVipUser ? <VIPArea /> : <LandingPage />;
}
