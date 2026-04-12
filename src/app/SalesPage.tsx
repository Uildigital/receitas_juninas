"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { 
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Star,
  MessageCircle,
  Zap,
  Target,
  Check,
  Package,
  Smartphone,
  BarChart3,
  Lightbulb
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Optimized Icons for performance
function CalculatorIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="20" x="4" y="2" rx="2" /><line x1="8" x2="16" y1="6" y2="6" /><line x1="16" x2="16" y1="14" y2="18" /><path d="M16 10h.01" /><path d="M12 10h.01" /><path d="M8 10h.01" /><path d="M12 14h.01" /><path d="M8 14h.01" /><path d="M12 18h.01" /><path d="M8 18h.01" />
    </svg>
  );
}

export default function SalesPage() {
  const checkoutUrl = "https://pay.kiwify.com.br/VGZzMTK";
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { minutes: prev.minutes - 1, seconds: 59 };
        return prev;
      });
    }, 1000);

    const handleScroll = () => {
        if (window.scrollY > 100 && !isScrolled) setIsScrolled(true);
        else if (window.scrollY <= 100 && isScrolled) setIsScrolled(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => { 
      clearInterval(timer); 
      window.removeEventListener("scroll", handleScroll); 
    };
  }, [isScrolled]);

  const handleCTA = () => {
    window.location.href = checkoutUrl;
  };

  return (
    <main className="min-h-screen bg-[#0A0807] text-white font-sans selection:bg-secondary/30">
      {/* Performance Optimized Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Top Urgency Bar */}
      <div className="bg-gradient-to-r from-[#8B4513] to-[#D2691E] py-2 relative z-[70]">
        <div className="text-center text-[10px] sm:text-xs font-black uppercase tracking-widest px-4">
          🔥 OPORTUNIDADE: ACESSO AO SISTEMA JUNINO COM 76% OFF ACABA EM: {timeLeft.minutes.toString().padStart(2, '0')}:{timeLeft.seconds.toString().padStart(2, '0')}
        </div>
      </div>

      {/* Floating Header - Only active after scroll to save initial TBT */}
      <AnimatePresence>
        {isScrolled && (
          <motion.header 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-0 right-0 z-[65] px-6 py-4"
          >
            <div className="max-w-6xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl">
              <div className="flex items-center gap-2">
                <Smartphone size={18} className="text-secondary" />
                <span className="font-black tracking-tighter text-sm uppercase">Guia Junino</span>
              </div>
              <button 
                onClick={handleCTA}
                className="bg-secondary hover:bg-secondary/90 text-white px-5 py-2 rounded-xl font-black text-xs transition-colors"
              >
                GARANTIR ACESSO
              </button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Hero Section - NO ANIMATIONS on first view to maximize LCP */}
      <section className="relative pt-12 pb-20 px-6 overflow-hidden min-h-[80vh] flex flex-col justify-center">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/10 blur-[120px] rounded-full z-0" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6 text-[10px] font-bold uppercase tracking-widest text-[#D2691E]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D2691E] animate-pulse" />
              SISTEMA DE PRECIFICAÇÃO LIBERADO
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tighter mb-8">
              A Única <br />
              <span className="text-secondary">Plataforma</span> <br />
              de Lucro Junino.
            </h1>

            <p className="text-lg text-white/60 mb-10 max-w-xl leading-relaxed italic border-l-2 border-secondary/30 pl-6">
              "Calcule o custo exato de cada espiga de milho e cada litro de quentão. Blindagem total contra prejuízos nestas Festas Juninas."
            </p>

            <div className="flex flex-col sm:flex-row gap-6 items-center lg:items-start">
              <button 
                onClick={handleCTA}
                className="w-full sm:w-auto px-10 py-5 bg-secondary text-white rounded-2xl font-black text-lg shadow-xl hover:scale-[1.02] transition-transform active:scale-95 uppercase"
              >
                Acessar Guia de Lucro
              </button>

              <div className="flex flex-col items-center lg:items-start gap-1">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0A0807] overflow-hidden bg-white/10">
                      <Image src={`/imagens/${['eduardo','roberto','neide','luciana'][i-1]}.png`} alt="Avatar" width={32} height={32} />
                    </div>
                  ))}
                </div>
                <span className="text-[10px] font-bold text-white/30 uppercase">+3.2k alunos lucrando</span>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* NO MOTION WRAPPER HERE FOR LCP */}
            <div className="relative aspect-square w-full max-w-[500px] mx-auto">
               <Image 
                src="/imagens/mockup.avif" 
                alt="Guia Junino Interativo" 
                fill 
                className="object-contain" 
                priority 
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits - Lightweight scroll animation */}
      <section className="py-24 px-6 bg-[#0E0C0B]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl sm:text-5xl font-black mb-8 leading-tight tracking-tighter uppercase">Chega de E-books <br/><span className="text-white/30 font-light italic">estáticos e sem vida.</span></h2>
              <div className="space-y-4">
                <div className="flex gap-4 p-6 bg-white/5 rounded-2xl border border-white/5">
                  <Zap size={24} className="text-secondary shrink-0" />
                  <div>
                    <h3 className="font-black text-white uppercase text-sm mb-1 uppercase">Inteligência de São João</h3>
                    <p className="text-white/40 text-xs font-medium">O preço do milho subiu? Altere uma vez e o lucro de todas as receitas atualiza na hora.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-6 bg-white/5 rounded-2xl border border-white/5">
                  <CalculatorIcon size={24} className="text-secondary shrink-0" />
                  <div>
                    <h3 className="font-black text-white uppercase text-sm mb-1 uppercase">Simulador de Metas</h3>
                    <p className="text-white/40 text-xs font-medium">Defina quanto quer ganhar e o sistema diz quantos caldos e bolos você precisa vender.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-white/5 rounded-3xl p-8 border border-white/10">
               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase text-white/30 border-b border-white/5 pb-4">
                     <span>Recurso</span>
                     <span>E-book Comum</span>
                     <span className="text-secondary">Nosso Sistema</span>
                  </div>
                  {[
                    { n: "Calculadora de Preço", a: false, b: true },
                    { n: "Simulador de Lucro", a: false, b: true },
                    { n: "Atualização Automática", a: false, b: true },
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-center text-xs font-bold py-1">
                       <span className="w-1/3">{row.n}</span>
                       <span className="w-1/3 text-center opacity-20"><Check size={14} className="mx-auto" /></span>
                       <span className="w-1/3 text-center text-secondary"><Check size={14} className="mx-auto" /></span>
                    </div>
                  ))}
               </div>
            </motion.div>
        </div>
      </section>

      {/* Bonus - Simplified for Performance */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase mb-4">Módulos de Bônus</h2>
            <p className="text-white/40 text-sm">Tudo o que você precisa para dominar a temporada de São João.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Neurociência das Embalagens", icon: Package, img: "/imagens/bonus_embalagens.png" },
              { title: "Máquina de Vendas WhatsApp", icon: MessageCircle, img: "/imagens/bonus_whatsapp.png" },
              { title: "Engenharia de Estoque", icon: BarChart3, img: "/imagens/bonus_estoque.png" }
            ].map((bonus, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, margin: "-100px" }}
                className="bg-[#1C1816] rounded-2xl border border-white/5 overflow-hidden flex flex-col hover:border-secondary/30 transition-colors"
              >
                <div className="relative h-48 w-full">
                  <Image src={bonus.img} alt={bonus.title} fill className="object-cover" sizes="300px" />
                </div>
                <div className="p-8">
                  <h3 className="text-sm font-black uppercase mb-2">{bonus.title}</h3>
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Valor: R$ 97,00</span>
                    <span className="text-xs font-black text-success uppercase">Grátis</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-[#0E0C0B]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center gap-1 mb-4">
               {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-secondary fill-secondary" />)}
            </div>
            <h2 className="text-3xl font-black uppercase">Resultados Reais</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Luciana Santos", text: "Faturei R$ 4.200,00 só com as estratégias de embalagem e precificação.", img: "/imagens/luciana.png" },
              { name: "Neide Ferreira", text: "Meus pedidos triplicaram no WhatsApp usando os scripts prontos.", img: "/imagens/neide.png" },
              { name: "Eduardo Silva", text: "O controle de estoque mudou meu jogo. Agora sei exatamente onde está meu lucro.", img: "/imagens/eduardo.png" }
            ].map((test, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="bg-white/5 p-8 rounded-2xl border border-white/5">
                 <p className="text-sm text-white/70 italic mb-8 font-medium leading-relaxed">"{test.text}"</p>
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-secondary/20"><Image src={test.img} alt={test.name} width={40} height={40} /></div>
                    <span className="text-xs font-black uppercase">{test.name}</span>
                 </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Offer */}
      <section className="py-32 px-6 flex flex-col items-center text-center">
        <h2 className="text-4xl sm:text-6xl font-black uppercase mb-12">Garanta seu <br/><span className="text-secondary italic">Acesso Vitalício.</span></h2>
        
        <div className="w-full max-w-lg bg-[#1C1816] border border-secondary/20 rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5"><CalculatorIcon size={120} /></div>
            <div className="text-white/40 text-xs font-black uppercase mb-4 tracking-widest">De R$ 197,90 por:</div>
            <div className="text-7xl sm:text-9xl font-black leading-none mb-6">
               <span className="text-2xl align-top mr-1 font-medium italic text-secondary font-sans leading-none">R$</span>47
            </div>
            <button 
              onClick={handleCTA}
              className="w-full bg-secondary text-white py-6 rounded-2xl font-black text-xl shadow-lg flex flex-col items-center gap-1 hover:brightness-110 active:scale-95 transition-all"
            >
              QUERO ACESSAR AGORA
              <span className="text-[9px] font-bold uppercase opacity-50 flex items-center gap-1"><ShieldCheck size={12}/> Site 100% Seguro</span>
            </button>
        </div>
        
        <div className="mt-8 flex items-center gap-2 text-white/30 text-[10px] font-black uppercase tracking-widest">
           <Check size={12} className="text-success" /> 7 dias de garantia incondicional
        </div>
      </section>

      <footer className="py-12 text-center opacity-20 border-t border-white/5 text-[10px] font-black uppercase tracking-[0.4em]">
           JUNINO GOURMET &copy; 2024
      </footer>
    </main>
  );
}
