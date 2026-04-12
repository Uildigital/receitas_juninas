"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Carregamento ultrarrápido da SalesPage (apenas o topo)
// As seções pesadas foram movidas para componentes dinâmicos dentro da SalesPage
const SalesPage = dynamic(() => import("./SalesPage"), {
  loading: () => <div className="min-h-screen bg-[#0A0807]" />,
  ssr: true // Ativado para garantir que o conteúdo inicial apareça no primeiro frame
});

const VIPArea = dynamic(() => import("@/components/VIPArea"), { 
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

  // No servidor, sempre renderizamos a SalesPage para melhor LCP/SEO
  if (!isClient) {
    return <SalesPage />;
  }

  return isVipUser ? <VIPArea /> : <SalesPage />;
}
