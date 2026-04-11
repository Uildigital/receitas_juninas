"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// --- Dynamic Imports for Heavy Sections ---
const VIPArea = dynamic(() => import("@/components/VIPArea"), { 
  loading: () => <div className="min-h-screen bg-[#FFF8F0] animate-pulse" />,
  ssr: false 
});

const LandingPage = dynamic(() => import("@/components/LandingPage"), { 
  loading: () => <div className="min-h-screen bg-[#0A0807] animate-pulse" />,
  ssr: false
});

export default function SmartRootPage() {
  const [isVipUser, setIsVipUser] = useState<boolean | null>(null);

  useEffect(() => {
    // Check VIP status without blocking render
    const urlParams = new URLSearchParams(window.location.search);
    const isVipParam = urlParams.get("vip") === "true";
    const isVipStored = localStorage.getItem("webbook-isvip") === "true";

    if (isVipParam || isVipStored) {
      setIsVipUser(true);
      if (isVipParam) localStorage.setItem("webbook-isvip", "true");
    } else {
      setIsVipUser(false);
    }
  }, []);

  // Show a neutral background while checking status to avoid layout shift
  if (isVipUser === null) return <div className="min-h-screen bg-[#0A0807]" />;

  return isVipUser ? <VIPArea /> : <LandingPage />;
}
