"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Lock,
  Clock,
  Trophy,
  ChefHat,
  MessageCircle,
  Play,
  ShieldCheck,
  ChevronDown,
  Star,
  Users,
  Timer,
  ShoppingBag,
  Zap,
  TrendingUp,
  CreditCard,
  Target,
  Rocket,
  ArrowUpRight,
  Check
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// Helper Component for the Calculator Icon
function CalculatorIcon(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    >
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <line x1="8" x2="16" y1="6" y2="6" />
      <line x1="16" x2="16" y1="14" y2="18" />
      <path d="M16 10h.01" />
      <path d="M12 10h.01" />
      <path d="M8 10h.01" />
      <path d="M12 14h.01" />
      <path d="M8 14h.01" />
      <path d="M12 18h.01" />
      <path d="M8 18h.01" />
    </svg>
  );
}

export default function LandingPageEliteFinal() {
  const checkoutUrl = "https://pay.kiwify.com.br/VGZzMTK";
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [itemsSold, setItemsSold] = useState(1242);
  
  // Tracking Logic
  const getCookie = (name: string) => {
    if (typeof document === 'undefined') return undefined;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return undefined;
  };

  const trackServerEvent = async (eventName: string, customData: any = {}) => {
    try {
      const fbp = getCookie('_fbp');
      const fbc = getCookie('_fbc');
      await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          event_name: eventName, 
          url: window.location.href,
          fbp,
          fbc,
          custom_data: customData 
        })
      });
    } catch (e) { console.error("Error tracking server event", e); }
  };

  useEffect(() => {
    // Timer Logic
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { minutes: prev.minutes - 1, seconds: 59 };
        return prev;
      });
    }, 1000);

    // Items Sold Counter Simulation
    const itemsInterval = setInterval(() => {
      setItemsSold(prev => prev + Math.floor(Math.random() * 2));
    }, 30000);

    // Scroll Observer
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);

    // Initial Tracking
    const urlParams = new URLSearchParams(window.location.search);
    const fbclid = urlParams.get('fbclid');
    if (fbclid && typeof document !== 'undefined') {
      document.cookie = `_fbc=fb.1.${Date.now()}.${fbclid}; path=/; max-age=7776000`;
    }
    trackServerEvent('PageView');

    return () => {
      clearInterval(timer);
      clearInterval(itemsInterval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCTA = () => {
    trackServerEvent('InitiateCheckout', { value: 47.00, currency: 'BRL' });
    window.location.href = checkoutUrl;
  };

  return (
    <div className="min-h-screen bg-[#0A0807] text-white font-sans selection:bg-accent/30 overflow-x-hidden">
      {/* Dynamic Background Noise/Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Top Urgency Bar */}
      <div className="bg-gradient-to-r from-[#8B4513] via-[#D2691E] to-[#FF8C00] py-2 relative z-[70] overflow-hidden">
        <motion.div 
          animate={{ x: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="text-center text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]"
        >
          🎁 OPORTUNIDADE: ACESSO VITALÍCIO COM 76% DE DESCONTO ACABA EM: {timeLeft.minutes.toString().padStart(2, '0')}:{timeLeft.seconds.toString().padStart(2, '0')}
        </motion.div>
      </div>

      {/* Floating Sticky Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: isScrolled ? 0 : -100 }}
        className="fixed top-0 left-0 right-0 z-[65] transition-all duration-300 pointer-events-none"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 pointer-events-auto">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl">
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
              <button 
                onClick={handleCTA}
                className="bg-secondary hover:bg-secondary/90 text-white px-5 py-2 rounded-xl font-black text-sm transition-all shadow-lg shadow-secondary/20 flex items-center gap-2"
              >
                GARANTIR VAGA <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-6 overflow-hidden">
        {/* Animated Background Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-secondary/20 blur-[150px] rounded-full z-0" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -45, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, delay: 2 }}
          className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-accent/10 blur-[120px] rounded-full z-0" 
        />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-md"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">325 Pessoas Vendo Isso Agora</span>
            </motion.div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.95] tracking-[ -0.04em] mb-8">
              Transforme a <br />
              <span className="text-secondary italic">Culinária Junina</span> <br />
              em Lucro de Verdade.
            </h1>

            <p className="text-lg sm:text-xl text-white/60 mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Venda o equivalente a 3 meses de faturamento em apenas 30 dias com o método passo a passo de receitas profissionais e calculadora de custos integrada.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCTA}
                className="group relative px-10 py-6 bg-secondary text-white rounded-[2rem] font-black text-xl shadow-[0_20px_50px_-10px_rgba(210,105,30,0.5)] overflow-hidden transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span className="relative flex items-center justify-center gap-3">
                  QUERO COMEÇAR AGORA <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </span>
              </motion.button>
              
              <div className="flex flex-col items-center lg:items-start justify-center gap-2">
                <div className="flex -space-x-3">
                  {[
                    { name: 'Eduardo', url: 'https://webbookpro.com/imagens/eduardo.avif' },
                    { name: 'Roberto', url: 'https://webbookpro.com/imagens/roberto.avif' },
                    { name: 'Neide', url: 'https://webbookpro.com/imagens/neide.avif' },
                    { name: 'Maria', url: 'https://webbookpro.com/imagens/maria.avif' }
                  ].map((user, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0A0807] overflow-hidden grayscale hover:grayscale-0 transition-all cursor-pointer">
                      <Image src={user.url} alt={user.name} width={40} height={40} />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-[#0A0807] bg-white/10 backdrop-blur-md flex items-center justify-center text-[10px] font-black">
                    +3k
                  </div>
                </div>
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">+3.242 alunos faturando</span>
              </div>
            </div>
          </motion.div>

          {/* Premium Product Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-square w-full max-w-[550px] mx-auto group">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-secondary/30 blur-[120px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-1000" />
              
              {/* Main Mockup Container with Glassmorphism Border */}
              <div className="relative w-full h-full rounded-[4rem] p-4 bg-white/5 backdrop-blur-sm border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
                <Image 
                  src="https://webbookpro.com/imagens/mockup.avif"
                  alt="Guia Junino Interativo Mockup"
                  fill
                  className="object-contain p-8 group-hover:scale-105 transition-transform duration-1000"
                  priority
                />
              </div>

              {/* Floating Performance Tag */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-8 -right-8 bg-[#1C1917]/80 backdrop-blur-xl border border-white/10 p-5 rounded-[2.5rem] shadow-2xl z-20"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-2xl flex items-center justify-center text-secondary">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-white/40 tracking-wider">Média de Faturamento</p>
                    <p className="text-xl font-black text-white">R$ 3.840<span className="text-secondary text-sm ml-1">/mês</span></p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Tech Tag */}
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1, ease: "easeInOut" }}
                className="absolute -bottom-8 -left-8 bg-[#1C1917]/80 backdrop-blur-xl border border-white/10 p-5 rounded-[2.5rem] shadow-2xl z-20"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center text-accent">
                    <CalculatorIcon size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-white/40 tracking-wider">Tecnologia Smart</p>
                    <p className="text-base font-black text-white">Calculadora Integrada</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust & Proof Section with Scrolling Brands */}
      <section className="bg-white/[0.02] border-y border-white/5 py-12 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-10">MÉTODOS TESTADOS E APROVADOS PELOS MAIORES DO MERCADO</p>
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-24 whitespace-nowrap grayscale opacity-30 hover:opacity-100 transition-opacity duration-500"
          >
             {/* Doubling items for seamless loop */}
             {[1,2].map(group => (
               <React.Fragment key={group}>
                 <span className="text-2xl font-black tracking-tighter flex items-center gap-3"><Lock size={20} className="text-secondary" /> KIWIFY PLATINUM</span>
                 <span className="text-2xl font-black tracking-tighter flex items-center gap-3"><ShieldCheck size={20} className="text-secondary" /> SAFO PAY SECURE</span>
                 <span className="text-2xl font-black tracking-tighter flex items-center gap-3"><Trophy size={20} className="text-secondary" /> MESTRADO GOURMET</span>
                 <span className="text-2xl font-black tracking-tighter flex items-center gap-3"><Star size={20} className="text-secondary" /> ELITE DIGITAL 2024</span>
                 <span className="text-2xl font-black tracking-tighter flex items-center gap-3"><Zap size={20} className="text-secondary" /> PIX INSTANTÂNEO</span>
                 {group === 1 && <div className="h-4 w-4 rounded-full bg-white/5" />}
               </React.Fragment>
             ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content / Modules */}
      <section className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-secondary font-black text-xs uppercase tracking-[0.3em] mb-4 block"
            >
              Conteúdo de Elite
            </motion.span>
            <h2 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight">O Que Você Vai Aprender</h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto font-medium">Não é apenas um livro de receitas. É um plano de negócio completo para quem quer lucrar de verdade.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: ChefHat, 
                title: "O Tesouro das Receitas", 
                desc: "Das clássicas pamonhas aos quentões gourmet que vendem por 3x mais. Passo a passo impossível de errar.",
                tag: "Modulo 01",
                color: "from-secondary/20"
              },
              { 
                icon: CalculatorIcon, 
                title: "Lucro no Centavo", 
                desc: "Acesse nossa planilha interativa pelo celular. Coloque o preço dos ingredientes e saiba seu lucro imediato.",
                tag: "Ferramenta",
                color: "from-accent/20"
              },
              { 
                icon: Target, 
                title: "Vendas no WhatsApp", 
                desc: "Scripts prontos e estratégias de Instagram para esgotar sua produção em poucas horas todos os dias.",
                tag: "Estratégia",
                color: "from-blue-500/20"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-[#14110F] p-10 rounded-[3rem] border border-white/5 overflow-hidden transition-all"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                
                <div className="relative z-10">
                  <div className="inline-block px-3 py-1 bg-white/5 rounded-full text-[10px] font-black text-white/40 uppercase tracking-widest mb-8">{item.tag}</div>
                  <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-secondary mb-8 group-hover:bg-secondary group-hover:text-white transition-all duration-500 shadow-xl">
                    <item.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-black mb-4 leading-tight">{item.title}</h3>
                  <p className="text-white/40 text-[15px] leading-relaxed font-normal">{item.desc}</p>
                </div>
                
                <div className="absolute bottom-6 right-10 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                  <ArrowUpRight size={24} className="text-secondary" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bonus Section with Glass Interaction */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#1C1917] to-[#0A0807] rounded-[4rem] p-8 sm:p-16 border border-white/10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full" />
          
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <div className="flex items-center gap-2 text-accent mb-4">
                <Sparkles size={20} />
                <span className="font-black text-xs uppercase tracking-[0.2em]">Bônus Exclusivo de Lançamento</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black mb-8 tracking-tight">Guia de Embalagens que <span className="text-secondary">Valorizam o Produto</span> em 5x.</h2>
              <ul className="space-y-4 mb-10">
                {[
                  "Como criar marcas artesanais sem gastar",
                  "Fornecedores de embalagens premium",
                  "Dicas de fotografia para redes sociais"
                ].map((li, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/70 font-medium">
                    <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                      <Check size={12} strokeWidth={4} />
                    </div>
                    {li}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-4 px-6 py-4 bg-black/40 rounded-2xl border border-white/5 inline-flex">
                 <span className="text-xs font-bold text-white/30 uppercase tracking-widest">Valor do Bônus:</span>
                 <span className="text-lg font-black text-white/80 line-through">R$ 97,00</span>
                 <span className="text-sm font-black text-secondary">GRÁTIS HOJE</span>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
               <Image 
                 src="/images/recipe_premium.png" 
                 alt="Premium Bonus" 
                 fill 
                 className="object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                  <p className="text-xs font-black text-secondary uppercase tracking-[0.3em]">Módulo Premium</p>
                  <p className="text-xl font-bold">Apresentação Profissional</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Elite Proof */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-20 text-center">
            <div className="flex items-center justify-center gap-1 mb-6">
               {[1,2,3,4,5].map(s => <Star key={s} size={18} className="text-secondary fill-secondary" />)}
            </div>
            <h2 className="text-4xl sm:text-6xl font-black mb-4 uppercase tracking-tighter">Resultados de Quem Fez</h2>
            <p className="text-white/40 font-medium tracking-wide">Mais de 3.000 vidas transformadas em todo o Brasil.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                text: "Eu achava que sabia fazer milho, mas o segredo da cremosidade estava nesse guia. Vendi 42 pamonhas no primeiro dia!", 
                author: "Luciana Alves", 
                loc: "Produtora em Campinas", 
                img: "https://i.pravatar.cc/100?u=luciana2"
              },
              { 
                text: "A calculadora é sensacional. Descobri que estava tendo prejuízo nas canjicas. Ajustei o preço e agora o lucro é real.", 
                author: "Ricardo Mendes", 
                loc: "Gourmet Home, SP", 
                img: "https://i.pravatar.cc/100?u=ricardo"
              },
              { 
                text: "Embalagem é tudo. O bônus de apresentação mudou meu jogo. Meus produtos triplicaram de valor visual no Instagram.", 
                author: "Beatriz Sousa", 
                loc: "Confeiteira em BH", 
                img: "https://i.pravatar.cc/100?u=beatriz"
              }
            ].map((test, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-[#14110F] p-8 rounded-[2.5rem] border border-white/5 relative flex flex-col justify-between"
              >
                 <MessageCircle className="text-secondary/20 absolute top-8 right-8" size={40} />
                 <p className="text-lg text-white/80 font-medium mb-12 italic leading-relaxed relative z-10">"{test.text}"</p>
                 <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-secondary/20">
                      <Image src={test.img} alt={test.author} width={56} height={56} />
                    </div>
                    <div>
                       <p className="text-base font-black text-white">{test.author}</p>
                       <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">{test.loc}</p>
                    </div>
                 </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* High-Conversion Pricing Section */}
      <section id="checkout" className="py-32 px-6 relative overflow-hidden bg-gradient-to-b from-transparent to-[#120D0B]">
        {/* Artistic Light Streaks */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-secondary/10 blur-[150px] rotate-12 rounded-full" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-5 py-2 bg-secondary/20 text-secondary border border-secondary/30 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-12 animate-pulse"
          >
            🔥 OFERTA VITALÍCIA LIMITADA
          </motion.div>
          
          <h2 className="text-5xl sm:text-8xl font-black mb-12 tracking-tighter leading-[0.9]">
            Comece Sua <br /> <span className="text-secondary italic">Nova Jornada</span> Agora.
          </h2>
          
          <div className="bg-[#1C1917] border border-white/10 rounded-[4rem] p-8 sm:p-20 mb-16 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.8)] relative group">
            {/* Corner Badge */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-secondary to-[#FF8C00] text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-[0.4em] shadow-xl z-20">GARANTIR MEU ACESSO</div>
            
            <div className="flex flex-col items-center gap-2 mb-8">
              <span className="text-2xl text-white/20 line-through font-bold tracking-tight">De R$ 197,90</span>
              <div className="flex items-center gap-3">
                 <span className="bg-secondary text-white px-3 py-1 rounded-lg text-xs font-black uppercase">76% OFF</span>
                 <span className="text-white/40 text-sm font-bold uppercase tracking-widest">Apenas Hoje</span>
              </div>
            </div>
            
            <div className="relative mb-10">
              <div className="text-8xl sm:text-[11rem] font-black tracking-tighter text-white leading-none">
                <span className="text-3xl sm:text-4xl font-medium align-top mt-10 inline-block mr-2">R$</span>47
              </div>
              <p className="text-white/40 font-bold uppercase tracking-[0.3em] mt-4">Ou 12x de R$ 4,72 no cartão</p>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCTA}
              className="w-full bg-secondary text-white py-8 rounded-[2.5rem] font-black text-2xl shadow-[0_20px_60px_-10px_rgba(210,105,30,0.6)] hover:bg-secondary/90 transition-all flex flex-col items-center gap-2 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              SIM! QUERO ACESSAR AGORA
              <span className="text-[10px] text-white/50 font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                <ShieldCheck size={14} /> 100% Seguro & Vitalício
              </span>
            </motion.button>

            <div className="mt-12 flex justify-center gap-8 text-white/20">
              <div className="flex flex-col items-center gap-2">
                <CreditCard size={32} />
                <span className="text-[8px] font-black uppercase tracking-widest">Cartão</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-secondary">
                <Zap size={32} fill="currentColor" />
                <span className="text-[8px] font-black uppercase tracking-widest">Pix</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Target size={32} />
                <span className="text-[8px] font-black uppercase tracking-widest">Boleto</span>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-12 text-left">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-success/10 rounded-2xl flex items-center justify-center text-success shrink-0 font-black">7d</div>
              <div>
                <p className="text-sm font-black uppercase tracking-widest mb-1">Satisfação Garantida</p>
                <p className="text-xs text-white/30 leading-relaxed font-medium">Ou devolvemos 100% do seu investimento sem perguntas.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/40 shrink-0"><Lock size={20} /></div>
              <div>
                <p className="text-sm font-black uppercase tracking-widest mb-1">Checkout Blindado</p>
                <p className="text-xs text-white/30 leading-relaxed font-medium">Utilizamos criptografia de nível bancário de ponta a ponta.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/40 shrink-0"><CheckCircle2 size={20} /></div>
              <div>
                <p className="text-sm font-black uppercase tracking-widest mb-1">Plataforma Segura</p>
                <p className="text-xs text-white/30 leading-relaxed font-medium">Pagamento processado pela Kiwify, líder no Brasil.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Overlay */}
      <section className="max-w-3xl mx-auto px-6 py-32 border-t border-white/5">
         <div className="flex flex-col items-center mb-16">
            <Rocket className="text-secondary mb-4" size={32} />
            <h2 className="text-center text-3xl font-black uppercase tracking-[0.2em]">Dúvidas Frequentes</h2>
         </div>
         <div className="space-y-4">
            {[
              { q: "Qual o formato do curso?", a: "O Guia Interativo é digital, totalmente otimizado para celulares. Você recebe acesso vitalício a todas as receitas, vídeos complementares e à calculadora inteligente." },
              { q: "As receitas são difíceis?", a: "Pelo contrário. Selecionamos apenas receitas que dependem de processos simples e ingredientes fáceis de encontrar em qualquer supermercado do Brasil." },
              { q: "Como uso a calculadora?", a: "Ela é integrada no próprio guia. Você preenche o custo dos ingredientes principais e ela gera automaticamente o valor sugerido de venda com a margem desejada." },
              { q: "E se eu não gostar?", a: "Você tem 7 dias de garantia incondicional. Se por qualquer motivo sentir que o método não é para você, basta pedir o reembolso com um clique." }
            ].map((faq, i) => (
              <div 
                key={i} 
                className={`bg-white/5 border transition-colors cursor-pointer rounded-[2rem] overflow-hidden ${activeFaq === i ? 'border-secondary/30 bg-[#1C1816]' : 'border-white/5 hover:border-white/10'}`} 
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
              >
                 <button className="w-full p-8 flex items-center justify-between text-left group">
                    <span className="text-lg font-black text-white/80 group-hover:text-white transition-colors">{faq.q}</span>
                    <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-transform duration-500 ${activeFaq === i ? 'rotate-180 bg-secondary border-secondary text-white' : 'text-white/40'}`}>
                      <ChevronDown size={20} />
                    </div>
                 </button>
                 <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }} 
                        animate={{ height: "auto", opacity: 1 }} 
                        exit={{ height: 0, opacity: 0 }} 
                        className="overflow-hidden bg-black/20"
                      >
                         <p className="p-8 text-[15px] text-white/50 leading-relaxed font-medium border-t border-white/5">{faq.a}</p>
                      </motion.div>
                    )}
                 </AnimatePresence>
              </div>
            ))}
         </div>
      </section>

      <footer className="py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10 opacity-30 grayscale inline-block">
             <ChefHat size={32} />
          </div>
          <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.5em] mb-4">
            Elite Gourmet Digital &copy; {new Date().getFullYear()}
          </p>
          <div className="flex items-center justify-center gap-6 text-[10px] text-white/40 font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-secondary transition-colors">Termos de Uso</a>
            <span className="w-1 h-1 bg-white/10 rounded-full" />
            <a href="#" className="hover:text-secondary transition-colors">Privacidade</a>
          </div>
          <p className="mt-12 text-[8px] text-white/10 max-w-lg mx-auto uppercase leading-loose">
            Este site não faz parte do Google Inc. ou do Facebook Inc. Além disso, este site NÃO é endossado pelo Google ou pelo Facebook de nenhuma maneira. GOOGLE é uma marca comercial da GOOGLE Inc. FACEBOOK é uma marca comercial da FACEBOOK Inc.
          </p>
        </div>
      </footer>

      {/* Mobile Sticky Action Bar */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div 
            initial={{ y: 150 }}
            animate={{ y: 0 }}
            exit={{ y: 150 }}
            className="fixed bottom-0 left-0 right-0 z-[100] p-4 bg-gradient-to-t from-[#0A0807] via-[#0A0807] to-transparent lg:hidden"
          >
             <button 
              onClick={handleCTA}
              className="w-full bg-secondary text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.15em] shadow-[0_-20px_50px_rgba(210,105,30,0.3)] flex items-center justify-center gap-3 active:scale-95 transition-all"
            >
              GARANTIR MINHA VAGA <ArrowRight size={18} />
            </button>
            <p className="text-center text-[8px] text-white/30 font-black uppercase tracking-widest mt-3">Acesso Liberado Imediatamente 🚀</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
