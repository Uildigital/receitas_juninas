"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  ArrowRight,
  ShieldCheck,
  Star,
  Zap,
  Target,
  Check,
  Package,
  BarChart3,
  Lightbulb
} from "lucide-react";

// CSS Animations for zero JS cost
const styles = {
  fadeIn: "animate-[fade-in_0.5s_ease-out_forwards]",
  fadeInUp: "animate-[fade-in-up_0.6s_ease-out_forwards]",
};

export default function SalesPage() {
  const checkoutUrl = "https://pay.kiwify.com.br/VGZzMTK";
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { minutes: prev.minutes - 1, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCTA = () => { window.location.href = checkoutUrl; };

  return (
    <main className="min-h-screen bg-[#0A0807] text-white font-sans selection:bg-secondary/30">
      {/* Top Urgency Bar */}
      <div className="bg-secondary py-2 relative z-[70] border-b border-white/10">
        <div className="text-center text-[10px] font-black uppercase tracking-widest px-4">
          🔥 OFERTA DE SÃO JOÃO: ACESSO AO SISTEMA COM 76% OFF ACABA EM: {timeLeft.minutes.toString().padStart(2, '0')}:{timeLeft.seconds.toString().padStart(2, '0')}
        </div>
      </div>

      {/* Hero Section - Static First Render */}
      <section className="relative pt-12 pb-20 px-6 overflow-hidden min-h-[70vh] flex flex-col justify-center">
        <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-secondary/5 blur-[100px] rounded-full z-0" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className={styles.fadeInUp}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6 text-[10px] font-bold uppercase tracking-widest text-secondary">
              SISTEMA DE PRECIFICAÇÃO LIBERADO
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tighter mb-8">
              A Única <br />
              <span className="text-secondary italic">Plataforma</span> <br />
              de Lucro Junino.
            </h1>

            <p className="text-lg text-white/60 mb-10 max-w-xl leading-relaxed italic border-l-2 border-secondary/30 pl-6">
              "Calcule o custo exato de cada espiga de milho e litro de quentão. Blindagem total contra prejuízos nestas Festas Juninas."
            </p>

            <div className="flex flex-col sm:flex-row gap-6 items-center lg:items-start">
              <button 
                onClick={handleCTA}
                className="w-full sm:w-auto px-10 py-5 bg-secondary text-white rounded-xl font-black text-lg shadow-xl hover:brightness-110 active:scale-95 transition-all uppercase"
              >
                Acessar Guia de Lucro
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-square w-full max-w-[450px] mx-auto">
               <Image 
                src="/imagens/mockup.avif" 
                alt="Guia Junino Interativo" 
                fill 
                className="object-contain" 
                priority 
                sizes="(max-width: 768px) 100vw, 450px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits - Static Content */}
      <section className="py-24 px-6 bg-[#0E0C0B]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-black mb-8 leading-tight tracking-tighter uppercase">Chega de E-books <br/><span className="text-white/30">estáticos e sem vida.</span></h2>
              <div className="space-y-4">
                <div className="flex gap-4 p-6 bg-white/5 rounded-xl border border-white/5">
                  <Zap size={24} className="text-secondary shrink-0" />
                  <div>
                    <h3 className="font-black text-white uppercase text-sm mb-1">Inteligência de São João</h3>
                    <p className="text-white/40 text-xs font-medium">O preço do milho subiu? Altere uma vez e o lucro de todas as receitas atualiza na hora.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
               <div className="space-y-4">
                  {[
                    { n: "Calculadora de Preço", b: true },
                    { n: "Simulador de Lucro", b: true },
                    { n: "Atualização Automática", b: true },
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-center text-xs font-bold py-2 border-b border-white/5">
                       <span>{row.n}</span>
                       <Check size={14} className="text-secondary" />
                    </div>
                  ))}
               </div>
            </div>
        </div>
      </section>

      {/* Bonus - Simplified */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-black uppercase mb-16">Conteúdo Extra Grátis</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { title: "Neurociência das Embalagens", img: "/imagens/bonus_embalagens.png" },
              { title: "Máquina de Vendas WhatsApp", img: "/imagens/bonus_whatsapp.png" },
              { title: "Engenharia de Estoque", img: "/imagens/bonus_estoque.png" }
            ].map((bonus, i) => (
              <div key={i} className="bg-[#1C1816] rounded-xl border border-white/5 overflow-hidden flex flex-col">
                <div className="relative h-44 w-full">
                  <Image src={bonus.img} alt={bonus.title} fill className="object-cover" sizes="300px" />
                </div>
                <div className="p-6">
                  <h3 className="text-xs font-black uppercase">{bonus.title}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Valor: R$ 97,00</span>
                    <span className="text-xs font-black text-success uppercase">Grátis</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - Compact */}
      <section className="py-24 px-6 flex flex-col items-center text-center">
        <h2 className="text-4xl font-black uppercase mb-12 italic">Garanta seu Acesso Vitalício.</h2>
        <div className="w-full max-w-sm bg-[#1C1816] border border-secondary/20 rounded-3xl p-10 shadow-2xl">
            <div className="text-white/40 text-xs font-black uppercase mb-2">De R$ 197,90 por:</div>
            <div className="text-8xl font-black leading-none mb-8">
               <span className="text-2xl align-top mr-1 font-medium text-secondary">R$</span>47
            </div>
            <button onClick={handleCTA} className="w-full bg-secondary text-white py-5 rounded-xl font-black text-lg shadow-lg hover:brightness-110 active:scale-95 transition-all">
              QUERO ACESSAR AGORA
            </button>
        </div>
      </section>

      <footer className="py-12 text-center opacity-20 text-[10px] font-black uppercase tracking-[0.4em]">
           JUNINO GOURMET &copy; 2024
      </footer>
    </main>
  );
}
