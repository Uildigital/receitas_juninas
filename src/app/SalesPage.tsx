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
  Lightbulb,
  Smartphone,
  MessageCircle,
  ChevronDown
} from "lucide-react";

// Native CSS Animations (Zero JS overhead)
const cssAnimations = `
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-elite {
    animation: fade-in-up 0.8s ease-out forwards;
  }
`;

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
    <main className="min-h-screen bg-[#0A0807] text-white font-sans selection:bg-secondary/30 overflow-x-hidden">
      <style>{cssAnimations}</style>
      
      {/* Top Urgency Bar */}
      <div className="bg-secondary py-2 relative z-[70] border-b border-white/10">
        <div className="text-center text-[10px] sm:text-xs font-black uppercase tracking-widest px-4">
          🔥 OFERTA DE SÃO JOÃO: ACESSO AO SISTEMA JUNINO COM 76% OFF ACABA EM: {timeLeft.minutes.toString().padStart(2, '0')}:{timeLeft.seconds.toString().padStart(2, '0')}
        </div>
      </div>

      {/* Hero Section - RESTORED ELITE COPY & PROOF */}
      <section className="relative pt-16 pb-24 px-6 overflow-hidden min-h-[85vh] flex flex-col justify-center">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/10 blur-[130px] rounded-full z-0" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="animate-elite">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-8 text-[11px] font-black uppercase tracking-[0.2em] text-secondary">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Sistema Interativo Liberado
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tighter mb-8 italic">
              A Única <br />
              <span className="text-secondary">Plataforma</span> <br />
              de Lucro Junino.
            </h1>

            <p className="text-lg sm:text-xl text-white/60 mb-12 max-w-xl leading-relaxed italic border-l-4 border-secondary/30 pl-8">
              "Transforme a tradição do São João em um negócio previsível. Calcule o custo exato de cada espiga de milho e litro de quentão para lucrar centavo por centavo."
            </p>

            <div className="flex flex-col sm:flex-row gap-8 items-center lg:items-start">
              <button 
                onClick={handleCTA}
                className="w-full sm:w-auto px-12 py-6 bg-secondary text-white rounded-2xl font-black text-xl shadow-[0_20px_50px_-10px_rgba(183,83,23,0.5)] hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-tighter"
              >
                Acessar Guia de Lucro
              </button>

              <div className="flex flex-col items-center lg:items-start gap-2">
                <div className="flex -space-x-3">
                  {['eduardo','roberto','neide','luciana'].map((name, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0A0807] overflow-hidden bg-white/10">
                      <Image src={`/imagens/${name}.png`} alt={name} width={40} height={40} priority />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-[#0A0807] bg-secondary flex items-center justify-center text-[10px] font-black">+3k</div>
                </div>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest tracking-tighter">+3.242 alunos faturando</span>
              </div>
            </div>
          </div>

          <div className="relative animate-elite [animation-delay:0.2s]">
            <div className="relative aspect-square w-full max-w-[550px] mx-auto bg-white/5 rounded-[4rem] p-4 backdrop-blur-sm border border-white/10">
               <Image 
                src="/imagens/mockup.avif" 
                alt="Guia Junino" 
                fill 
                className="object-contain p-8" 
                priority 
                sizes="550px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Differentiation Section - RESTORED */}
      <section className="py-24 px-6 bg-[#0E0C0B]">
        <div className="max-w-6xl mx-auto border border-white/5 rounded-[4rem] p-10 sm:p-20 overflow-hidden relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-black mb-8 leading-tight tracking-tighter uppercase">Chega de E-books <br/><span className="text-secondary opacity-50">estáticos e sem vida.</span></h2>
              <div className="space-y-6">
                <div className="flex gap-4 p-6 bg-white/5 rounded-3xl border border-white/5">
                  <Zap size={28} className="text-secondary shrink-0" />
                  <div>
                    <h3 className="font-black text-white text-lg uppercase">Inteligência de São João</h3>
                    <p className="text-white/40 text-sm font-medium">O preço do milho ou amendoim subiu? Altere uma vez e o lucro de todas as suas receitas atualiza na hora.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-6 bg-white/5 rounded-3xl border border-white/5">
                  <Target size={28} className="text-secondary shrink-0" />
                  <div>
                    <h3 className="font-black text-white text-lg uppercase">Simulador de Metas ROI</h3>
                    <p className="text-white/40 text-sm font-medium">Diga quanto quer ganhar e nós te dizemos exatamente quanto você precisa vender de cada doce ou caldo.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 p-8 rounded-[3rem] border border-white/10">
               <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-6 opacity-30 line-through text-xs font-bold space-y-4">
                     <p>Estático</p>
                     <p>Sem Calculadora</p>
                     <p>Layout Confuso</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl text-xs font-black space-y-4">
                     <p className="text-secondary">PRODUTO ELITE</p>
                     <p className="flex items-center justify-center gap-2"><Check size={14} className="text-success"/> Interativo</p>
                     <p className="flex items-center justify-center gap-2"><Check size={14} className="text-success"/> ROI Simulator</p>
                     <p className="flex items-center justify-center gap-2"><Check size={14} className="text-success"/> Smart Memory</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bonus - RESTORED RICH DESCRIPTIONS */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-6xl font-black mb-6 uppercase tracking-tight">Conteúdo <span className="text-secondary italic">Exclusivo</span></h2>
          <p className="text-white/40 text-lg mb-20">Tudo o que você precisa para dominar a temporada de São João.</p>
          
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { 
                title: "Neurociência das Embalagens", 
                desc: "Como valorizar seu produto em até 5x usando materiais simples e design estratégico.",
                img: "/imagens/bonus_embalagens.png" 
              },
              { 
                title: "Máquina de Vendas WhatsApp", 
                desc: "Scripts de Neuromarketing categoria 'Elite' para fechar pedidos em segundos.",
                img: "/imagens/bonus_whatsapp.png" 
              },
              { 
                title: "Engenharia de Estoque", 
                desc: "Protocolo industrial para eliminar desperdícios e organizar seus insumos.",
                img: "/imagens/bonus_estoque.png" 
              }
            ].map((bonus, i) => (
              <div key={i} className="bg-[#1C1816] rounded-[2.5rem] border border-white/5 overflow-hidden flex flex-col group hover:border-secondary/30 transition-all">
                <div className="relative h-60 w-full">
                  <Image src={bonus.img} alt={bonus.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1816] to-transparent" />
                </div>
                <div className="p-10">
                  <h3 className="text-xl font-black mb-4 uppercase leading-none">{bonus.title}</h3>
                  <p className="text-white/40 text-xs font-medium leading-relaxed mb-8">{bonus.desc}</p>
                  <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-black text-white/20 uppercase">Valor: R$ 97,00</span>
                    <span className="text-sm font-black text-success uppercase">Grátis</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - RESTORED FULL PROOF */}
      <section className="py-32 px-6 bg-[#0E0C0B]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="flex justify-center gap-1 mb-6">
               {[1,2,3,4,5].map(s => <Star key={s} size={18} className="text-secondary fill-secondary" />)}
            </div>
            <h2 className="text-4xl sm:text-6xl font-black mb-4 uppercase tracking-tighter">Resultados Reais</h2>
            <p className="text-white/40 font-medium italic">Mais de 3.200 vidas transformadas em todo o país.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Luciana Santos", loc: "Recife/PE", text: "A calculadora é sensacional. Descobri prejuízos que nem imaginava nas canjicas.", img: "/imagens/luciana.png" },
              { name: "Neide Ferreira", loc: "Belo Horizonte/MG", text: "Meus produtos triplicaram de valor visual com os bônus de embalagem.", img: "/imagens/neide.png" },
              { name: "Eduardo Silva", loc: "Chef Confeiteiro", text: "Não é um livro de receitas, é uma empresa pronta. O controle de estoque mudou meu jogo.", img: "/imagens/eduardo.png" }
            ].map((test, i) => (
              <div key={i} className="bg-[#14110F] p-10 rounded-[2.5rem] border border-white/5 flex flex-col justify-between">
                 <p className="text-base text-white/80 italic mb-12 leading-relaxed">"{test.text}"</p>
                 <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-secondary/20 shadow-xl"><Image src={test.img} alt={test.name} width={48} height={48} /></div>
                    <div>
                       <p className="text-sm font-black text-white uppercase">{test.name}</p>
                       <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">{test.loc}</p>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - RESTORED */}
      <section className="max-w-3xl mx-auto px-6 py-32 border-t border-white/5">
         <h2 className="text-3xl font-black uppercase tracking-[0.2em] mb-16 text-center">Dúvidas Frequentes</h2>
         <div className="space-y-4">
            {[
              { q: "O acesso é um app ou um livro?", a: "É uma plataforma interativa protegida por login e senha. Você acessa receitas, bônus e calculadoras pelo celular ou computador." },
              { q: "Como a memória de preços funciona?", a: "Ao digitar o preço de um insumo, ele salva globalmente. Todas as receitas que usam esse ingrediente atualizam o custo sozinhas." }
            ].map((faq, i) => (
              <div key={i} className="bg-white/5 border border-white/5 rounded-3xl overflow-hidden cursor-pointer" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                 <button className="w-full p-8 flex items-center justify-between text-left font-black text-white/80 uppercase text-[10px] tracking-widest leading-relaxed">
                   {faq.q} <ChevronDown size={14} className={activeFaq === i ? "rotate-180" : ""} />
                 </button>
                 {activeFaq === i && <p className="p-8 pt-0 text-sm text-white/40 font-medium leading-relaxed">{faq.a}</p>}
              </div>
            ))}
         </div>
      </section>

      {/* Final Offer - RESTORED PRECEDENCE */}
      <section className="py-32 px-6 flex flex-col items-center text-center bg-gradient-to-b from-transparent to-[#120D0B]">
        <h2 className="text-5xl sm:text-7xl font-black uppercase mb-12 tracking-tighter leading-[0.9]">Garanta seu <br/><span className="text-secondary italic">Acesso Vitalício.</span></h2>
        
        <div className="w-full max-w-lg bg-[#1C1816] border border-secondary/20 rounded-[4rem] p-12 sm:p-20 shadow-2xl relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-secondary text-white px-10 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-xl">OFERTA DE SÃO JOÃO</div>
            <div className="text-white/40 text-sm font-black uppercase mb-4 tracking-widest">De R$ 197,90 por:</div>
            <div className="text-[7rem] sm:text-[9rem] font-black leading-none mb-10 tracking-tighter">
               <span className="text-3xl align-top mr-1 font-medium italic text-secondary">R$</span>47
            </div>
            <button onClick={handleCTA} className="w-full bg-secondary text-white py-8 rounded-[2rem] font-black text-2xl shadow-xl flex flex-col items-center gap-2 hover:brightness-110 active:scale-95 transition-all">
              SIM! QUERO ACESSAR AGORA
              <span className="text-[10px] text-white/50 font-bold uppercase flex items-center gap-2"><ShieldCheck size={14}/> Site 100% Seguro</span>
            </button>
        </div>
      </section>

      <footer className="py-20 px-6 text-center bg-[#080605] border-t border-white/5">
           <div className="max-w-4xl mx-auto space-y-8">
             <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">ELITE GOURMET PLATFORM &copy; 2024</p>
             
             <div className="flex flex-wrap justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-white/20">
               <a href="/termos" className="hover:text-secondary transition-colors" target="_blank">Termos de Uso</a>
               <a href="/privacidade" className="hover:text-secondary transition-colors" target="_blank">Política de Privacidade</a>
               <a href="#" className="hover:text-secondary transition-colors">Contato</a>
             </div>

             <div className="space-y-4 max-w-2xl mx-auto">
               <p className="text-[9px] text-white/20 leading-relaxed font-medium">
                 ESTE SITE NÃO FAZ PARTE DO SITE DO FACEBOOK OU DO FACEBOOK INC. ALÉM DISSO, ESTE SITE NÃO É ENDOSSADO PELO FACEBOOK DE NENHUMA MANEIRA. FACEBOOK É UMA MARCA COMERCIAL DA FACEBOOK, INC.
               </p>
               <p className="text-[9px] text-white/10 leading-relaxed font-normal">
                 Os resultados podem variar de pessoa para pessoa. As informações aqui contidas não são garantias de lucro. Todo esforço foi feito para representar com precisão este produto e seu potencial.
               </p>
             </div>
           </div>
      </footer>
    </main>
  );
}
