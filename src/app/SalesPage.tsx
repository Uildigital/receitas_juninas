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
  Check,
  Package,
  ScrollText,
  Smartphone,
  BarChart3,
  Lightbulb
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [itemsSold, setItemsSold] = useState(1421);
  const [viewers, setViewers] = useState(Math.floor(Math.random() * (365 - 280 + 1)) + 280);
  
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
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { minutes: prev.minutes - 1, seconds: 59 };
        return prev;
      });
    }, 1000);

    const itemsInterval = setInterval(() => {
      setItemsSold(prev => prev + Math.floor(Math.random() * 2));
    }, 30000);

    const viewersInterval = setInterval(() => {
      setViewers(prev => {
        const change = Math.floor(Math.random() * 7) - 3;
        const newValue = prev + change;
        return newValue < 250 ? 250 : newValue > 400 ? 400 : newValue;
      });
    }, 5000);

    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    trackServerEvent('PageView');
    return () => { 
      clearInterval(timer); 
      clearInterval(itemsInterval);
      clearInterval(viewersInterval);
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
      
      {/* Top Urgency Bar */}
      <div className="bg-gradient-to-r from-[#8B4513] via-[#D2691E] to-[#FF8C00] py-2 relative z-[70] overflow-hidden">
        <motion.div 
          animate={{ x: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="text-center text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]"
        >
          🎁 OPORTUNIDADE: ACESSO VITALÍCIO À PLATAFORMA COM 76% OFF ACABA EM: {timeLeft.minutes.toString().padStart(2, '0')}:{timeLeft.seconds.toString().padStart(2, '0')}
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
                <Smartphone size={18} className="text-white" />
              </div>
              <span className="font-black tracking-tighter text-lg hidden sm:block uppercase">Guia Interativo Junino</span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={handleCTA}
                className="bg-secondary hover:bg-secondary/90 text-white px-5 py-2 rounded-xl font-black text-sm transition-all shadow-lg flex items-center gap-2"
              >
                ACESSAR AGORA <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-6 overflow-hidden">
        <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} transition={{ duration: 20, repeat: Infinity }} className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-secondary/20 blur-[150px] rounded-full z-0" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span></span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">Plataforma Interativa Liberada</span>
            </div>

            <h1 className="text-[2.6rem] sm:text-7xl lg:text-[5.5rem] font-black leading-[0.95] tracking-[-0.04em] mb-8">
              A Única <br />
              <span className="text-secondary italic">Plataforma</span> <br />
              que Calcula seu Lucro.
            </h1>

            <p className="text-lg sm:text-xl text-white/60 mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium italic">
              "Pare de gastar dinheiro com ingredientes e começar a lucrar centavo por centavo com a nossa calculadora dinâmica blindada contra a inflação."
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCTA}
                className="group relative px-10 py-6 bg-secondary text-white rounded-[2rem] font-black text-xl shadow-[0_20px_50px_-10px_rgba(210,105,30,0.5)] overflow-hidden transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span className="relative flex items-center justify-center gap-3 uppercase tracking-tighter">
                  Acessar Minha Meta de Lucro <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </span>
              </motion.button>

              <div className="flex flex-col items-center lg:items-start justify-center gap-2">
                <div className="flex -space-x-3">
                  {[
                    { name: 'Eduardo', url: '/imagens/eduardo.png' },
                    { name: 'Roberto', url: '/imagens/roberto.png' },
                    { name: 'Neide', url: '/imagens/neide.png' },
                    { name: 'Luciana', url: '/imagens/luciana.png' }
                  ].map((user, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0A0807] overflow-hidden transition-all bg-white/10">
                      <Image src={user.url} alt={user.name} width={40} height={40} className="object-cover" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-[#0A0807] bg-white/10 backdrop-blur-md flex items-center justify-center text-[10px] font-black text-secondary">
                    +3k
                  </div>
                </div>
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">+3.242 alunos faturando</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="relative group">
            <div className="relative aspect-square w-full max-w-[550px] mx-auto rounded-[4rem] p-4 bg-white/5 backdrop-blur-sm border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
                <Image src="/imagens/mockup.avif" alt="Guia Junino Interativo" fill className="object-contain p-8 group-hover:scale-105 transition-transform duration-1000" priority />
            </div>
            
            <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-8 -right-8 bg-[#1C1917]/90 border border-secondary/30 p-6 rounded-[2.5rem] shadow-2xl z-20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-success/20 rounded-2xl flex items-center justify-center text-success"><BarChart3 size={24} /></div>
                  <div>
                    <p className="text-[9px] font-black uppercase text-white/40 tracking-wider">Memória de Preços</p>
                    <p className="text-lg font-black text-white">Sincronizado ✅</p>
                  </div>
                </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* DIFFERENTIATION SECTION: APP VS PDF */}
      <section className="py-24 px-6 bg-[#0E0C0B]">
        <div className="max-w-6xl mx-auto border border-white/5 rounded-[4rem] p-8 sm:p-20 overflow-hidden relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-5xl font-black mb-8 leading-tight tracking-tighter uppercase">Chega de E-books <br/><span className="text-secondary opacity-50">estáticos e sem vida.</span></h2>
              <div className="space-y-6">
                <div className="flex gap-4 p-6 bg-white/5 rounded-3xl border border-white/5">
                  <div className="h-10 w-10 shrink-0 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary"><Zap size={20}/></div>
                  <div>
                    <h4 className="font-black text-white text-lg">Atualização em Tempo Real</h4>
                    <p className="text-white/40 text-sm font-medium">Mudou o preço do leite no mercado? Digite uma vez e a plataforma ajusta o lucro de todas as receitas na hora.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-6 bg-white/5 rounded-3xl border border-white/5">
                  <div className="h-10 w-10 shrink-0 bg-success/10 rounded-xl flex items-center justify-center text-success"><CalculatorIcon size={20}/></div>
                  <div>
                    <h4 className="font-black text-white text-lg">Simulador de Metas ROI</h4>
                    <p className="text-white/40 text-sm font-medium">Diga quanto quer ganhar por mês e nós te dizemos exatamente quanto você precisa vender de cada doce.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 p-1 rounded-[3rem] border border-white/10">
               <div className="grid grid-cols-2 text-center h-full">
                  <div className="p-8 border-r border-white/5 opacity-30">
                    <p className="text-[10px] font-black uppercase text-white/40 mb-10">E-book Comum</p>
                    <div className="space-y-6 text-xs font-bold text-white/60 line-through">
                       <p>Estático</p>
                       <p>Sem Calculadora</p>
                       <p>PDF Gigante</p>
                       <p>Layout Confuso</p>
                    </div>
                  </div>
                  <div className="p-8 bg-white/5 rounded-[3rem]">
                    <p className="text-[10px] font-black uppercase text-secondary mb-10">Web-App Elite</p>
                    <div className="space-y-6 text-xs font-black text-white">
                       <p className="flex items-center justify-center gap-2 text-success"><Check size={14}/> Interativo</p>
                       <p className="flex items-center justify-center gap-2 text-success"><Check size={14}/> ROI Simulator</p>
                       <p className="flex items-center justify-center gap-2 text-success"><Check size={14}/> Memory Smart</p>
                       <p className="flex items-center justify-center gap-2 text-success"><Check size={14}/> Escala 1-Click</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features: The "Brain" of the business */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
             <h2 className="text-4xl sm:text-6xl font-black mb-6 uppercase tracking-tight">O Cérebro do Seu Negócio</h2>
             <p className="text-white/40 max-w-xl mx-auto">Você cozinha, nós fazemos a matemática. Blindagem total contra prejuízos.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
             {[
               { icon: Target, title: "Estipulador de Metas", desc: "Defina seu sonho (ex: R$ 3mil/mês) e a plataforma gera seu roteiro de vendas imediato." },
               { icon: BarChart3, title: "Gestão Portátil", desc: "Funciona como um aplicativo nativo. Controle seus custos direto do supermercado pelo celular." },
               { icon: Lightbulb, title: "Dicas de Escala", desc: "Otimize gás e tempo. Use nosso multiplicador para dobrar a produção com o mesmo esforço." }
             ].map((f, i) => (
               <div key={i} className="p-10 bg-white/5 rounded-[3rem] border border-white/5 hover:border-secondary/20 transition-colors group">
                  <f.icon size={32} className="text-secondary mb-8 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-black mb-4 uppercase leading-none">{f.title}</h3>
                  <p className="text-white/40 text-sm font-medium leading-relaxed">{f.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Bonus Masterclasses (Elite Refined) */}
      <section className="py-32 px-6 bg-[#0E0C0B]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight uppercase">Módulos de <span className="text-secondary italic">Bônus</span></h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto font-medium">Bônus exclusivos que seriam vendidos separadamente por mais de R$ 300,00.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Neurociência das Embalagens",
                desc: "O guia estratégico para usar a Regra 60-30-10 de cores e o Kraft 240g para dobrar seu preço sem mudar a receita.",
                icon: Package,
                value: "R$ 97,00",
                img: "/imagens/bonus_embalagens.png"
              },
              {
                title: "Máquina de Vendas WhatsApp",
                desc: "Scripts de Neuromarketing categoria 'Elite'. Do atendimento à recuperação de venda em 1 clique.",
                icon: MessageCircle,
                value: "R$ 147,00",
                img: "/imagens/bonus_whatsapp.png"
              },
              {
                title: "Engenharia de Fluxo (Estoque)",
                desc: "O protocolo industrial de organização para eliminar 100% dos desperdícios e otimizar cada centavo de insumo.",
                icon: BarChart3,
                value: "R$ 67,00",
                img: "/imagens/bonus_estoque.png"
              }
            ].map((bonus, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-[#1C1816] rounded-[3rem] border border-white/5 overflow-hidden flex flex-col group shadow-2xl">
                <div className="relative h-64 w-full">
                  <Image src={bonus.img} alt={bonus.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1816] to-transparent" />
                  <div className="absolute top-6 right-6 bg-secondary text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest italic animate-bounce">Acesso Liberado</div>
                </div>
                <div className="p-10 flex-1 flex flex-col">
                  <h3 className="text-xl font-black mb-4 uppercase tracking-tighter leading-none">{bonus.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed mb-8 flex-1 font-bold">{bonus.desc}</p>
                  <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Valor Real: {bonus.value}</span>
                    <span className="text-sm font-black text-success uppercase">Grátis</span>
                  </div>
                </div>
              </motion.div>
            ))}
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
            <p className="text-white/40 font-medium tracking-wide italic">Mais de 3.200 vidas transformadas em todo o Brasil apenas neste Arraiá.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                text: "A calculadora é sensacional. Descobri que estava tendo prejuízo nas canjicas há anos. Em junho passado faturei R$ 4.200,00 só com as estratégias de embalagem.", 
                author: "Luciana Santos", 
                loc: "Gourmet Home, Recife/PE", 
                img: "/imagens/luciana.png"
              },
              { 
                text: "Meus produtos triplicaram de valor visual no Instagram e as vendas explodiram usando os scripts de WhatsApp prontos. O retorno veio em 2 dias.", 
                author: "Neide Ferreira", 
                loc: "Doces da Vovó, BH", 
                img: "/imagens/neide.png"
              },
              { 
                text: "Não é um livro de receitas, é uma empresa pronta. O controle de estoque mudou meu jogo. Agora sei exatamente onde está meu lucro. Recomendo demais!", 
                author: "Eduardo Silva", 
                loc: "Chef Confeiteiro", 
                img: "/imagens/eduardo.png"
              }
            ].map((test, i) => (
              <div key={i} className="bg-[#14110F] p-8 rounded-[2.5rem] border border-white/5 relative flex flex-col justify-between hover:border-secondary/20 transition-all group">
                 <p className="text-base text-white/80 font-bold mb-12 leading-relaxed italic group-hover:text-white transition-colors">"{test.text}"</p>
                 <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-secondary/20"><Image src={test.img} alt={test.author} width={48} height={48} className="object-cover" /></div>
                    <div>
                       <p className="text-sm font-black text-white uppercase tracking-tight">{test.author}</p>
                       <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">{test.loc}</p>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="checkout" className="py-32 px-6 relative overflow-hidden bg-gradient-to-b from-transparent to-[#120D0B]">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl sm:text-7xl font-black mb-12 tracking-tighter leading-[0.9] uppercase">
            A última vaga <br /> com <span className="text-secondary italic">preço promocional.</span>
          </h2>
          
          <div className="bg-[#1C1816] border border-secondary/20 rounded-[4rem] p-8 sm:p-20 mb-16 shadow-2xl relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-secondary text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-[0.4em] shadow-xl z-20">ACESSO VITALÍCIO</div>
            
            <div className="flex flex-col items-center gap-2 mb-8">
              <span className="text-2xl text-white/20 line-through font-bold tracking-tight">De R$ 197,90</span>
              <span className="text-white/40 text-sm font-black uppercase tracking-[0.3em]">Por apenas 12 fatias de:</span>
            </div>
            
            <div className="relative mb-8">
              <div className="text-[8rem] sm:text-[11rem] font-black tracking-tighter text-white leading-none">
                <span className="text-3xl font-medium align-top mt-10 inline-block mr-2 text-secondary">R$</span>4,72
              </div>
              <p className="text-white font-black text-xl uppercase tracking-[0.2em] mt-2">Ou R$ 47,00 à vista (Preço de Custo)</p>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCTA}
              className="w-full bg-secondary text-white py-8 rounded-[2.5rem] font-black text-2xl shadow-xl flex flex-col items-center gap-2 group relative overflow-hidden mb-8"
            >
              SIM! QUERO ACESSAR AGORA
              <span className="text-[10px] text-white/50 font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                <ShieldCheck size={14} /> 100% Seguro & Vitalício
              </span>
            </motion.button>
          </div>
          
          <p className="text-white/20 text-xs font-black uppercase tracking-[0.4em] leading-relaxed">
             RISCO ZERO: 07 DIAS DE GARANTIA INCONDICIONAL <br/> SE NÃO LUCRAR NA PRIMEIRA SEMANA, DEVOLVEMOS CADA CENTAVO.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-32 border-t border-white/5 text-center">
         <h2 className="text-3xl font-black uppercase tracking-[0.2em] mb-16">Dúvidas Frequentes</h2>
         <div className="space-y-4 text-left">
            {[
              { q: "O acesso é um app ou um livro?", a: "É uma Web-App de última geração protegida por login e senha. Você acessa as receitas, os bônus e todas as calculadoras inteligentes pelo celular, tablet ou computador." },
              { q: "Como a memória de preços funciona?", a: "Ao digitar o preço do milho em uma receita, a plataforma salva isso globalmente. Quando você abrir outras 10 receitas que levam milho, o preço já estará atualizado para você." },
              { q: "Preciso de internet na cozinha?", a: "A plataforma é leve e otimizada. Uma conexão simples de 4G é suficiente para rodar todas as calculadoras e vídeos de suporte." }
            ].map((faq, i) => (
              <div key={i} className={`bg-white/5 border rounded-[2rem] overflow-hidden ${activeFaq === i ? 'border-secondary/30' : 'border-white/5'}`} onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                 <button className="w-full p-8 flex items-center justify-between text-left font-black text-white/80 uppercase text-xs tracking-widest">{faq.q} <ChevronDown size={14} /></button>
                 {activeFaq === i && <p className="p-8 pt-0 text-sm text-white/40 font-bold leading-relaxed">{faq.a}</p>}
              </div>
            ))}
         </div>
      </section>

      <footer className="py-20 text-center border-t border-white/5 opacity-40">
           <ChefHat size={32} className="mx-auto mb-6" />
           <p className="text-[10px] font-black uppercase tracking-[0.5em] mb-4">ELITE GOURMET PLATFORM &copy; 2024</p>
      </footer>
    </div>
  );
}
