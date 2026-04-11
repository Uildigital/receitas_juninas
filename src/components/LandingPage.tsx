"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  ChefHat, 
  ArrowRight,
  TrendingUp,
  CreditCard,
  Target,
  Rocket,
  ArrowUpRight,
  Check,
  ShieldCheck,
  ChevronDown,
  Star,
  Zap,
  Package,
  ScrollText,
  MessageCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function CalculatorIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" /><line x1="8" x2="16" y1="6" y2="6" /><line x1="16" x2="16" y1="14" y2="18" /><path d="M16 10h.01" /><path d="M12 10h.01" /><path d="M8 10h.01" /><path d="M12 14h.01" /><path d="M8 14h.01" /><path d="M12 18h.01" /><path d="M8 18h.01" /></svg>
  );
}

export default function LandingPage() {
  const checkoutUrl = "https://pay.kiwify.com.br/VGZzMTK";
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [viewers, setViewers] = useState(287);
  
  const trackServerEvent = async (eventName: string, customData: any = {}) => {
    try {
      await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_name: eventName, url: window.location.href, custom_data: customData })
      });
    } catch (e) { console.error("Error tracking", e); }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { minutes: prev.minutes - 1, seconds: 59 };
        return prev;
      });
    }, 1000);

    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    trackServerEvent('PageView');
    return () => { 
      clearInterval(timer); 
      window.removeEventListener("scroll", handleScroll); 
    };
  }, []);

  const handleCTA = () => {
    trackServerEvent('InitiateCheckout', { value: 47.00, currency: 'BRL' });
    window.location.href = checkoutUrl;
  };

  return (
    <div className="min-h-screen bg-[#0A0807] text-white font-sans selection:bg-accent/30 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="bg-gradient-to-r from-[#8B4513] via-[#D2691E] to-[#FF8C00] py-2 relative z-[70] overflow-hidden">
        <div className="text-center text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">
          🎁 OPORTUNIDADE: ACESSO VITALÍCIO COM 76% DE DESCONTO ACABA EM: {timeLeft.minutes.toString().padStart(2, '0')}:{timeLeft.seconds.toString().padStart(2, '0')}
        </div>
      </div>

      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: isScrolled ? 0 : -100 }}
        className="fixed top-0 left-0 right-0 z-[65] transition-all duration-300 pointer-events-none"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 pointer-events-auto">
          <div className="bg-[#1C1917]/90 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                <ChefHat size={18} className="text-white" />
              </div>
              <span className="font-black tracking-tighter text-lg hidden sm:block">GUIA JUNINO</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end mr-4">
                <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Oferta Limitada</span>
                <span className="text-sm font-black text-secondary">R$ 47,00</span>
              </div>
              <button onClick={handleCTA} className="bg-secondary hover:bg-secondary/90 text-white px-5 py-2 rounded-xl font-black text-sm transition-all shadow-lg shadow-secondary/20 flex items-center gap-2">
                GARANTIR VAGA <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <section className="relative pt-20 pb-24 px-6 overflow-hidden">
        {/* Optimized background: using CSS instead of Framer Motion for static-ish shapes */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-secondary/10 blur-[150px] rounded-full z-0" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-accent/5 blur-[120px] rounded-full z-0" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">{viewers} Pessoas Vendo Isso Agora</span>
            </div>

            <h1 className="text-[2.6rem] sm:text-7xl lg:text-8xl font-black leading-[0.95] tracking-[-0.04em] mb-8">
              Transforme a <br />
              <span className="text-secondary italic">Culinária Junina</span> <br />
              em Lucro de Verdade.
            </h1>

            <p className="text-lg sm:text-xl text-white/60 mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Venda o equivalente a 3 meses de faturamento em apenas 30 dias com o método passo a passo de receitas profissionais e calculadora de custos integrada.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <button onClick={handleCTA} className="group relative px-10 py-6 bg-secondary text-white rounded-[2rem] font-black text-xl shadow-[0_20px_50px_-10px_rgba(210,105,30,0.5)] transition-all overflow-hidden active:scale-95">
                <span className="relative flex items-center justify-center gap-3">
                  QUERO COMEÇAR AGORA <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </span>
              </button>
              
              <div className="flex flex-col items-center lg:items-start justify-center gap-2">
                <div className="flex -space-x-3">
                  {['eduardo', 'roberto', 'neide', 'maria'].map((name, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0A0807] overflow-hidden grayscale bg-white/10">
                      <Image src={`https://webbookpro.com/imagens/${name}.avif`} alt={name} width={40} height={40} />
                    </div>
                  ))}
                </div>
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">+3.242 alunos faturando</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-square w-full max-w-[550px] mx-auto">
              <div className="absolute inset-0 bg-secondary/20 blur-[100px] rounded-full" />
              <div className="relative w-full h-full rounded-[4rem] p-4 bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden">
                <Image src="/images/mockup.avif" alt="Guia Junino Interativo Mockup" fill className="object-contain p-8" priority />
              </div>

              <div className="absolute -top-8 -right-8 bg-[#1C1917]/90 backdrop-blur-xl border border-white/10 p-5 rounded-[2.5rem] shadow-2xl z-20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-2xl flex items-center justify-center text-secondary">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-white/40 tracking-wider">Média de Faturamento</p>
                    <p className="text-xl font-black text-white">R$ 3.840<span className="text-secondary text-sm ml-1">/mês</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white/[0.02] border-y border-white/5 py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 overflow-hidden flex items-center justify-center gap-24 whitespace-nowrap opacity-30 select-none">
            <span className="text-2xl font-black tracking-tighter flex items-center gap-3">KIWIFY PLATINUM</span>
            <span className="text-2xl font-black tracking-tighter flex items-center gap-3">SAFO PAY SECURE</span>
            <span className="text-2xl font-black tracking-tighter flex items-center gap-3">PIX INSTANTÂNEO</span>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight">O Que Você Vai Aprender</h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto font-medium">Não é apenas um livro de receitas. É um plano de negócio completo para quem quer lucrar de verdade.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: ChefHat, title: "O Tesouro das Receitas", desc: "Das clássicas pamonhas aos quentões gourmet que vendem por 3x mais. Passo a passo impossível de errar.", color: "from-secondary/20" },
              { icon: CalculatorIcon, title: "Lucro no Centavo", desc: "Acesse nossa planilha interativa pelo celular. Coloque o preço dos ingredientes e saiba seu lucro imediato.", color: "from-accent/20" },
              { icon: Target, title: "Vendas no WhatsApp", desc: "Scripts prontos e estratégias de Instagram para esgotar sua produção em poucas horas todos os dias.", color: "from-secondary/20" }
            ].map((item, i) => (
              <div key={i} className="group relative bg-[#14110F] p-10 rounded-[3rem] border border-white/5 overflow-hidden transition-all hover:border-white/10">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-secondary mb-8 transition-all duration-500 shadow-xl group-hover:bg-secondary group-hover:text-white"><item.icon size={32} /></div>
                  <h3 className="text-2xl font-black mb-4 leading-tight">{item.title}</h3>
                  <p className="text-white/40 text-[15px] leading-relaxed font-normal">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Triple Bonus Stack */}
      <section className="py-32 px-6 bg-[#0E0C0B]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight">O Que Você Leva de <span className="text-secondary italic">Graça</span></h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto font-medium">Se você agir agora, além das 40 receitas e da calculadora, você desbloqueia esses 3 bônus premium.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { id: 1, title: "Guia de Embalagens Lucrativas", desc: "Como valorizar seu produto em até 5x gastando quase nada em apresentação. O segredo do visual 'Elite'.", icon: Package, value: "R$ 97,00", img: "/images/recipe_premium.png" },
              { id: 2, title: "Scripts de Venda WhatsApp", desc: "Textos prontos e gatilhos mentais para você copiar e colar e esgotar sua produção em poucas horas.", icon: ScrollText, value: "R$ 147,00", img: "https://webbookpro.com/imagens/scrpts.avif" },
              { id: 3, title: "Lista de Fornecedores VIP", desc: "Onde comprar insumos profissionais com preço de atacado e frete grátis, direto da fonte.", icon: Users, value: "R$ 67,00", img: "https://webbookpro.com/imagens/fornecedores.avif" }
            ].map((bonus, i) => (
              <div key={i} className="bg-[#1C1816] rounded-[3rem] border border-white/5 overflow-hidden flex flex-col group shadow-2xl">
                <div className="relative h-64 w-full">
                  <Image src={bonus.img} alt={bonus.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1816] to-transparent" />
                  <div className="absolute top-6 right-6 bg-secondary text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">Grátis Hoje</div>
                </div>
                <div className="p-10 flex-1 flex flex-col">
                  <h3 className="text-2xl font-black mb-4 leading-tight">{bonus.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-8 flex-1">{bonus.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#14110F] border border-white/5 rounded-[4rem] p-10 sm:p-20 shadow-2xl text-center">
            <h2 className="text-3xl sm:text-5xl font-black mb-12 tracking-tighter uppercase">Vamos Resumir Tudo</h2>
            <div className="space-y-6 mb-16 text-left">
                {[
                    { item: "40+ Receitas Profissionais (Arraiá Elite)", val: "R$ 97,00" },
                    { item: "Calculadora de Custos & Precificação", val: "R$ 67,00" },
                    { item: "Bônus 1: Guia de Embalagens Lucrativas", val: "R$ 97,00" },
                    { item: "Bônus 2: Scripts de Venda WhatsApp", val: "R$ 147,00" },
                    { item: "Bônus 3: Lista de Fornecedores VIP", val: "R$ 67,00" }
                ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between py-4 border-b border-white/5">
                        <span className="text-sm font-bold text-white/80">{row.item}</span>
                        <span className="text-sm font-black text-white/30 italic">{row.val}</span>
                    </div>
                ))}
            </div>
            <div className="bg-white/5 rounded-3xl p-8 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left"><p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-1">Valor Total:</p><p className="text-3xl font-black text-white/60 line-through">R$ 475,00</p></div>
                <div className="text-center sm:text-right"><p className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] mb-1">Oferta Especial:</p><p className="text-4xl font-black text-secondary">R$ 47,00</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Section with improved accessibility (contrast) */}
      <section id="checkout" className="py-32 px-6 text-center">
          <h2 className="text-5xl sm:text-8xl font-black mb-12 tracking-tighter leading-[0.9]">Comece Sua <br /> <span className="text-secondary italic">Nova Jornada</span> Agora.</h2>
          <div className="max-w-xl mx-auto bg-[#1C1816] p-10 rounded-[3rem] border border-white/5">
            <div className="text-6xl sm:text-8xl font-black mb-10 tracking-tighter">R$ 47</div>
            <button onClick={handleCTA} className="w-full bg-secondary text-white py-8 rounded-[2rem] font-black text-2xl shadow-2xl active:scale-95 transition-all">GARANTIR MEU ACESSO</button>
            <div className="mt-8 text-[10px] text-white/40 font-black uppercase tracking-widest flex items-center justify-center gap-4">
                <span className="flex items-center gap-1"><ShieldCheck size={14} /> 7 Dias de Garantia</span>
                <span className="flex items-center gap-1"><Zap size={14} /> Acesso Imediato</span>
            </div>
          </div>
      </section>

      <footer className="py-20 text-center border-t border-white/5 opacity-40">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] mb-4">Elite Gourmet Digital &copy; {new Date().getFullYear()}</p>
        <div className="flex items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-widest">
            <a href="#">Termos</a>
            <a href="#">Privacidade</a>
        </div>
      </footer>

      <AnimatePresence>
        {isScrolled && (
          <motion.div initial={{ y: 150 }} animate={{ y: 0 }} exit={{ y: 150 }} className="fixed bottom-0 left-0 right-0 z-[100] p-4 bg-gradient-to-t from-[#0A0807] via-[#0A0807] to-transparent lg:hidden">
             <button onClick={handleCTA} className="w-full bg-secondary text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.15em] shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3">GARANTIR MINHA VAGA <ArrowRight size={18} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Users(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
}
