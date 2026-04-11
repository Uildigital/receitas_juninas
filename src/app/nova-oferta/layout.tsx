import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oferta Especial | Guia Interativo de Receitas Juninas 🌽",
  description: "Garanta seu acesso vitalício ao Guia Junino Interativo com 76% de desconto. Aprenda 30+ receitas lucrativas e use nossa calculadora de lucro em tempo real.",
  openGraph: {
    title: "Oportunidade Única: Guia Junino Interativo",
    description: "Transforme sua cozinha em uma fonte de lucro nestas festas juninas.",
    images: [
      {
        url: "/images/mockup.png",
        width: 1200,
        height: 630,
        alt: "Mockup do Guia Junino",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guia Junino Interativo - Oferta de Lançamento",
    description: "Receitas profissionais e calculadora de lucro por apenas R$ 47.",
    images: ["/images/mockup.png"],
  },
};

export default function NovaOfertaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
