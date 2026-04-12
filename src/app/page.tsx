"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const VIPArea = dynamic(() => import("@/components/VIPArea"), { 
  loading: () => <div className="min-h-screen bg-[#FFF8F0] animate-pulse" />,
  ssr: false 
});

const SalesPage = dynamic(() => import("./SalesPage"), {
  loading: () => <div className="min-h-screen bg-[#0A0807] animate-pulse" />,
  ssr: false
});

export default function SmartRootPage() {
  const [isVipUser, setIsVipUser] = useState<boolean | null>(false);
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
    return <div className="min-h-screen bg-[#0A0807]" />;
  }

  return isVipUser ? <VIPArea /> : <SalesPage />;
}
