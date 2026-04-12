"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import SalesPage from "./SalesPage";

const VIPArea = dynamic(() => import("@/components/VIPArea"), { 
  loading: () => <div className="min-h-screen bg-[#0A0807] animate-pulse" />,
  ssr: false 
});

export default function SmartRootPage() {
  const [isVipUser, setIsVipUser] = useState<boolean | null>(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const isVipParam = new URLSearchParams(window.location.search).get("vip") === "true";
    const isVipStored = localStorage.getItem("webbook-isvip") === "true";

    if (isVipParam || isVipStored) {
      setIsVipUser(true);
      if (isVipParam) localStorage.setItem("webbook-isvip", "true");
    }
  }, []);

  // Use a simple conditional render. Direct SalesPage for best FCP.
  if (isVipUser) {
    return <VIPArea />;
  }

  return <SalesPage />;
}
