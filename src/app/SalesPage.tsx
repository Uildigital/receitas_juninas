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
      setIsScrolled(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => { 
      clearInterval(timer); 
      window.removeEventListener("scroll", handleScroll); 
    };
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

      {/* Floating Header - Re-activated with Smooth CSS transition */}
      <header 
        className={`fixed top-0 left-0 right-0 z-[65] px-6 py-4 transition-all duration-500 transform ${isScrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
      >
        <div className="max-w-6xl mx-auto bg-[#1C1816]/90 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-2">
            <Smartphone size={18} className="text-secondary" />
            <span className="font-black tracking-tighter text-[10px] sm:text-xs uppercase">Guia Junino</span>
          </div>
          <button 
            onClick={handleCTA}
            className="bg-secondary hover:brightness-110 text-white px-5 py-2.5 rounded-xl font-black text-[10px] sm:text-xs transition-all uppercase"
          >
            Garantir Minha Vaga
          </button>
        </div>
      </header>

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
              Pare de Perder <br />
              <span className="text-secondary">Dinheiro</span> no <br />
              São João.
            </h1>

            <p className="text-lg sm:text-xl text-white/60 mb-12 max-w-xl leading-relaxed italic border-l-4 border-secondary/30 pl-8 font-medium">
              "70% das doceiras perdem lucro sem perceber no preço do milho e do gás. Nossa inteligência faz a matemática para você lucrar em cada espiga vendida."
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

      {/* Differentiation Section - ELITE RE-DESIGNED */}
      <section className="py-24 px-6 bg-[#0E0C0B]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black mb-4 uppercase tracking-tighter">O Guia Junino <span className="text-secondary italic">Não é um E-book comum</span></h2>
            <p className="text-white/40 text-sm sm:text-base font-medium max-w-2xl mx-auto italic">"Um erro de R$ 0,50 no cálculo de um pote de canjica pode custar R$ 500,00 de prejuízo no final do mês. Não deixe isso acontecer com você."</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* Common E-book card */}
            <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 sm:p-12 opacity-50 relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase text-white/40 tracking-[0.3em] mb-8">E-book Comum (PDF)</p>
                <div className="space-y-6">
                  {[
                    "Receitas Estáticas",
                    "Sem Cálculo de Lucro",
                    "Difícil de achar no celular",
                    "Informação desatualizada",
                    "Suporte Inexistente"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-4 text-xs sm:text-sm font-bold text-white/40">
                      <span className="w-5 h-5 shrink-0 rounded-full border border-white/10 flex items-center justify-center text-[10px]">✕</span>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Elite System card */}
            <div className="bg-gradient-to-br from-[#1C1816] to-[#0A0807] border-2 border-secondary/30 rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-6 opacity-10"><Zap size={100} className="text-secondary" /></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                   <p className="text-[10px] font-black uppercase text-secondary tracking-[0.3em]">Plataforma Elite Junina</p>
                   <span className="bg-success/20 text-success text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Tecnologia 2024</span>
                </div>
                <div className="space-y-6">
                  {[
                    { t: "Fácil como usar o WhatsApp", d: "Sem planilhas chatas. Se você sabe enviar mensagem, sabe usar o sistema." },
                    { t: "Calculadora de Lucro Real", d: "Mude o preço do amendoim e veja seu lucro mudar na hora." },
                    { t: "Simulador de Metas de Ouro", d: "Diga quanto quer faturar e receba seu roteiro de vendas." },
                    { t: "Memória de Preços Inteligente", d: "Cadastre um ingrediente uma vez e use em todo o cardápio." },
                    { t: "Suporte VIP no Arraiá", d: "Dúvidas resolvidas em minutos pela nossa equipe." }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-6 h-6 shrink-0 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                        <Check size={14} />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-black text-white uppercase tracking-tight mb-1">{item.t}</p>
                        <p className="text-[10px] sm:text-xs text-white/40 font-medium leading-relaxed">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bonus - RESTORED RICH DESCRIPTIONS */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-6xl font-black mb-6 uppercase tracking-tight">Potencializadores de <span className="text-secondary italic">Lucro</span></h2>
          <p className="text-white/40 text-lg mb-20">Acelere seus resultados com estratégias que os amadores desconhecem.</p>
          
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { 
                title: "Acelerador de Valor Individual", 
                desc: "Neurociência das Embalagens: Como cobrar 3x mais pelo mesmo doce apenas mudando a apresentação.",
                img: "/imagens/bonus_embalagens.png" 
              },
              { 
                title: "Máquina de Vendas WhatsApp", 
                desc: "Scripts de Neuromarketing prontos para copiar e colar. Transforme curiosos em clientes em segundos.",
                img: "/imagens/bonus_whatsapp.png" 
              },
              { 
                title: "O Guardião do Lucro (Estoque)", 
                desc: "Engenharia de Estoque: O protocolo para eliminar 100% dos desperdícios de ingredientes no Arraiá.",
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
              { q: "Como a memória de preços funciona?", a: "Ao digitar o preço de um insumo, ele salva globalmente. Todas as receitas que usam esse ingrediente atualizam o custo sozinhas." },
              { q: "O acesso é imediato?", a: "Sim! Assim que o pagamento for aprovado, você receberá os dados de acesso instantaneamente no seu e-mail. Pagamentos via PIX e Cartão são liberados na hora." },
              { q: "Por quanto tempo terei acesso?", a: "Seu acesso é vitalício. Você paga uma única vez e terá o guia para sempre, inclusive com todas as atualizações e novas receitas que adicionarmos." },
              { q: "Preciso entender de matemática ou planilhas?", a: "De jeito nenhum! O sistema foi criado para ser mais simples que o WhatsApp. Você só preenche os preços e ele calcula seu lucro automaticamente." },
              { q: "Funciona em qualquer celular?", a: "Sim! A plataforma é totalmente responsiva. Funciona perfeitamente em Android, iPhone, tablets e computadores." },
              { q: "Tenho suporte se tiver dúvidas?", a: "Com certeza. Temos uma equipe pronta para te ajudar com qualquer dúvida técnica ou de acesso que você possa ter." },
              { q: "Só serve para a época de São João?", a: "De jeito nenhum! Embora sejam receitas típicas, elas são campeãs de vendas o ano todo. Canjica, amendoim e milho são paixões nacionais que vendem em qualquer estação." },
              { q: "Posso imprimir as receitas?", a: "Sim! A plataforma é otimizada para celular, mas você também pode acessar pelo computador e imprimir suas receitas favoritas se preferir o papel na cozinha." },
              { q: "O pagamento é seguro?", a: "Totalmente. Processamos nossos pagamentos através da Kiwify, uma das maiores e mais seguras plataformas do Brasil. Seus dados estão 100% protegidos." },
              { q: "E se eu não gostar do conteúdo?", a: "Você tem 7 dias de garantia incondicional. Se por qualquer motivo você não ficar satisfeita, devolvemos 100% do seu dinheiro sem burocracia." }
            ].map((faq, i) => (
              <div 
                key={i} 
                className={`group transition-all duration-500 ${activeFaq === i ? "bg-white/10 ring-1 ring-white/20 shadow-2xl" : "bg-white/5 hover:bg-white/[0.08]"} border border-white/5 rounded-[2rem] overflow-hidden cursor-pointer`}
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
              >
                 <button className="w-full p-7 sm:p-8 flex items-center justify-between text-left font-black text-white/90 uppercase text-[10px] sm:text-[11px] tracking-[0.2em] leading-relaxed transition-colors">
                   <span className={activeFaq === i ? "text-secondary" : "group-hover:text-white"}>{faq.q}</span>
                   <div className={`p-2 rounded-xl transition-all duration-500 ${activeFaq === i ? "bg-secondary text-white rotate-180" : "bg-white/5 text-white/20"}`}>
                      <ChevronDown size={14} />
                   </div>
                 </button>
                 <div className={`grid transition-all duration-500 ease-in-out ${activeFaq === i ? "grid-rows-[1fr] opacity-100 pb-8" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                       <p className="px-8 pt-6 text-xs sm:text-sm text-white/50 font-medium leading-relaxed border-t border-white/5">
                          {faq.a}
                       </p>
                    </div>
                 </div>
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
