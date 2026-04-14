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
    const purchaseAlreadyTracked = localStorage.getItem("webbook-purchase-tracked") === "true";

    if (isVipParam || isVipStored) {
      setIsVipUser(true);

      // Dispara Purchase UMA única vez: primeira entrada com ?vip=true
      if (isVipParam && !purchaseAlreadyTracked) {
        localStorage.setItem("webbook-isvip", "true");
        localStorage.setItem("webbook-purchase-tracked", "true");

        // Track Purchase on Meta Pixel (only on first access)
        if (typeof window !== "undefined" && (window as any).fbq) {
          (window as any).fbq('track', 'Purchase', { 
            value: 47.00, 
            currency: 'BRL',
            content_name: 'Receitas Juninas Interativo: 40 Receitas Premium com Check-Point',
            content_category: 'Webbook'
          });
        }
      } else if (isVipParam && !isVipStored) {
        // VIP param presente mas purchase já rastreado (reload/reopen do link)
        localStorage.setItem("webbook-isvip", "true");
      }
    }
  }, []);

  // Use a simple conditional render. Direct SalesPage for best FCP.
  if (isVipUser) {
    return <VIPArea />;
  }

  return <SalesPage />;
}
