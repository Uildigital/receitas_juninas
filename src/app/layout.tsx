import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Guia Junino Interativo | Receitas que Calculam seu Lucro 🌽",
  description: "Garanta seu acesso vitalício ao Guia Junino Interativo com 76% de desconto. 40+ receitas lucrativas com calculadora de custos e simulador de metas.",
  manifest: "/manifest.json",
  openGraph: {
    title: "Guia Junino Interativo | Web-App de Lucro",
    description: "Transforme sua cozinha em uma fonte de lucro nestas festas juninas.",
    images: [{ url: "/imagens/mockup.avif", width: 1200, height: 630, alt: "Mockup do Guia Junino" }],
    type: "website",
  },
  verification: {
    other: {
      "facebook-domain-verification": ["uebq3kzcd3u1ni8hjupk4iwn8w8hxa"],
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Receitas Juninas",
  },
};

export const viewport: Viewport = {
  themeColor: "#8B4513",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <link rel="preload" href="/imagens/mockup.avif" as="image" type="image/avif" />
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1523944362485658');
            fbq('track', 'PageView');
          `}
        </Script>
      <link rel="preconnect" href="https://webbookpro.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" />
        <noscript>
          <img height="1" width="1" style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1523944362485658&ev=PageView&noscript=1"
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
