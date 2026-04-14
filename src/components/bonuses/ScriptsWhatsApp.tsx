"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { 
  ChevronLeft, 
  MessageCircle, 
  Flame, 
  Target, 
  Copy, 
  Check, 
  Info,
  Star,
  Sparkles,
  Zap,
  TrendingUp,
  BrainCircuit,
  MessageSquareShare
} from "lucide-react";

export default function ScriptsWhatsApp({ onBack }: { onBack: () => void }) {
  const [activeCategory, setActiveCategory] = useState<'lancamento' | 'fechamento' | 'retencao'>('lancamento');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { scrollY } = useScroll();
  
  const headerBg = useTransform(scrollY, [0, 50], ["rgba(255, 248, 240, 0)", "rgba(255, 248, 240, 1)"]);

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Falha ao copiar", err);
    }
  };

  const categories = [
    { id: 'lancamento', label: '1. Atração', icon: Flame },
    { id: 'fechamento', label: '2. Fechamento', icon: Target },
    { id: 'retencao', label: '3. Ticket Máximo', icon: TrendingUp }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-40 bg-[#FFF8F0] min-h-screen antialiased">
      {/* Header Elite */}
      <motion.header style={{ backgroundColor: headerBg }} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-primary/10 p-4 flex items-center justify-between transition-colors duration-300">
        <button onClick={onBack} className="p-2.5 bg-white border border-primary/20 shadow-md rounded-2xl text-primary active:scale-95 transition-transform"><ChevronLeft size={20} /></button>
        <div className="bg-success px-3 py-1.5 rounded-xl shadow-lg border border-white/20"><span className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-1"><MessageCircle size={10}/> Copywriting</span></div>
      </motion.header>
      
      {/* Hero Section Masterclass */}
      <div className="relative w-full overflow-hidden pb-12">
        <div className="relative h-[300px] w-full">
            <Image src="/imagens/bonus_whatsapp.png" alt="WhatsApp Sales" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F0] via-[#FFF8F0]/40 to-transparent" />
            <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="px-5 -mt-24 relative z-20">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-8 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-primary/5 text-center">
                <div className="flex justify-center mb-4">
                    <div className="bg-success p-2.5 rounded-2xl text-white shadow-xl shadow-success/30">
                        <MessageSquareShare size={24} />
                    </div>
                </div>
                <h1 className="text-3xl font-black text-primary tracking-tighter leading-none mb-3 font-outfit">Máquina de Vendas<br/><span className="text-success tracking-tight">no WhatsApp</span></h1>
                <p className="text-[12px] font-bold text-primary/70 uppercase tracking-[0.2em] leading-relaxed">Não implore por vendas.<br/>Gere desejo antecipado.</p>
            </motion.div>
        </div>
      </div>

      <div className="px-5 max-w-xl mx-auto -mt-2 relative z-10">
        
        {/* Navigation Tabs (SegControl) */}
        <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-[2.5rem] shadow-xl border border-primary/5 flex items-center mb-10 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id as any)} className={`relative flex-1 min-w-[110px] flex justify-center items-center gap-2 py-4 rounded-[2rem] transition-all duration-500 ${activeCategory === cat.id ? "text-white" : "text-primary/70 hover:text-primary"}`}>
              {activeCategory === cat.id && <motion.div layoutId="whatsappTab" className="absolute inset-0 bg-success shadow-lg shadow-success/20" style={{ borderRadius: "2rem" }} transition={{ type: "spring", bounce: 0.15, duration: 0.6 }} />}
              <cat.icon size={14} className="relative z-10" />
              <span className="relative z-10 font-black text-[9px] uppercase tracking-widest leading-none">{cat.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }}>
            
            {/* ======================================================== */}
            {/* ABA 1: ATRAÇÃO (LANÇAMENTO) */}
            {/* ======================================================== */}
            {activeCategory === 'lancamento' && (
              <div className="space-y-10">
                 <div className="flex items-center gap-4 mb-2 pl-2 font-black text-primary uppercase tracking-tighter">
                    <Flame size={24} className="text-secondary" />
                    <div><h2 className="text-2xl leading-none">Criando Desejo</h2><p className="text-[10px] text-primary/70 tracking-widest mt-1 uppercase leading-none">Abordagem Fria e Morna</p></div>
                </div>

                {/* SCRIPT 1: LANÇAMENTO VIP */}
                <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-primary/10">
                    <div className="p-8 border-b border-primary/5 bg-[#FAFAFA]">
                        <h3 className="text-xl font-black text-primary mb-3 flex items-center gap-3">🚀 Lançamento VIP</h3>
                        <p className="text-[13px] text-primary/60 font-medium">Use na primeira semana para avisar seus contatos que você abriu a agenda. O objetivo aqui não é vender direto, é <strong>gerar curiosidade</strong>.</p>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="bg-success/5 p-6 rounded-[2.5rem] border border-success/20 relative">
                            <Zap className="absolute top-4 right-4 text-success/20" size={40} />
                            <p className="text-[14px] text-primary/80 whitespace-pre-wrap leading-relaxed font-medium italic relative z-10">
                                Oi <span className="text-success font-black">[Nome do Cliente]</span>! Preparada(o) para a melhor época do ano? 🎉🔥{"\n\n"}
                                Estou passando pra avisar <strong>em primeira mão</strong> que acabei de finalizar o meu Cardápio de Elite Junino! Temos desde o tradicional Bolo de Milho da roça até Fatias Supremas.{"\n\n"}
                                Como você já é <strong>meu cliente especial</strong>, liberei as encomendas pra você 2 horas antes de eu postar no Instagram oficial.{"\n\n"}
                                Quer que eu te mande o cardápio secreto só pra você dar uma espiadinha? 👀
                            </p>
                        </div>
                        
                        <div className="flex bg-primary/5 rounded-[2rem] p-5 gap-4 items-start">
                            <BrainCircuit className="text-primary shrink-0" size={20} />
                            <div><h4 className="font-black text-[10px] uppercase text-primary mb-1">Neuromarketing Aplicado:</h4><p className="text-[12px] font-medium text-primary/60 leading-relaxed">As expressões <em>"Primeira mão"</em>, <em>"Cliente especial"</em> e <em>"Antes de postar no Instagram"</em> ativam o Gatilho da Exclusividade. O cliente sente necessidade de aproveitar o "privilégio".</p></div>
                        </div>

                        <button onClick={() => handleCopy('lancamento', "Oi [Nome do Cliente]! Preparada(o) para a melhor época do ano? 🎉🔥\n\nEstou passando pra avisar em primeira mão que acabei de finalizar o meu Cardápio de Elite Junino! Temos desde o tradicional Bolo de Milho da roça até Fatias Supremas.\n\nComo você já é meu cliente especial, liberei as encomendas pra você 2 horas antes de eu postar no Instagram oficial.\n\nQuer que eu te mande o cardápio secreto só pra você dar uma espiadinha? 👀")} className={`w-full py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95 ${copiedId === 'lancamento' ? "bg-success text-white shadow-success/30" : "bg-primary text-white hover:bg-primary/90"}`}>
                            {copiedId === 'lancamento' ? <><Check size={18} /> COPIADO PARA O ZAP!</>  : <><Copy size={18} /> COPIAR SCRIPT PROFISSIONAL</>}
                        </button>
                    </div>
                </div>

                {/* SCRIPT 2: RECUPERAÇÃO */}
                <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-primary/10">
                    <div className="p-8 border-b border-primary/5 bg-[#FAFAFA]">
                        <h3 className="text-xl font-black text-primary mb-3 flex items-center gap-3">♻️ Regate de Inativos</h3>
                        <p className="text-[13px] text-primary/60 font-medium">Envie para quem comprou com você há muito tempo e "sumiu".</p>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="bg-success/5 p-6 rounded-[2.5rem] border border-success/20">
                            <p className="text-[14px] text-primary/80 whitespace-pre-wrap leading-relaxed font-medium italic">
                            Oi <span className="text-success font-black">[Nome]</span>! Quanto tempo! A cozinha por aqui tá a todo vapor e lembrei de você hoje. 😊{"\n\n"}
                            Esse mês nós revolucionamos o nosso cardápio. Modéstia à parte, os sabores de São João estão absurdos. Tem até uma receita que era segredo de família!{"\n\n"}
                            Você quer que eu te mande o cardápio novo só pra você ver as fotos? (Mas cuidado que dá muita água na boca!) 🤤
                            </p>
                        </div>
                        <button onClick={() => handleCopy('recuperacao', "Oi [Nome]! Quanto tempo! A cozinha por aqui tá a todo vapor e lembrei de você hoje. 😊\n\nEsse mês nós revolucionamos o nosso cardápio. Modéstia à parte, os sabores de São João estão absurdos. Tem até uma receita que era segredo de família!\n\nVocê quer que eu te mande o cardápio novo só pra você ver as fotos? (Mas cuidado que dá muita água na boca!) 🤤")} className={`w-full py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95 ${copiedId === 'recuperacao' ? "bg-success text-white shadow-success/30" : "bg-white text-primary border-2 border-primary hover:bg-primary/5"}`}>
                            {copiedId === 'recuperacao' ? <><Check size={18} /> COPIADO PARA O ZAP!</>  : <><Copy size={18} /> COPIAR SCRIPT PROFISSIONAL</>}
                        </button>
                    </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* ABA 2: FECHAMENTO */}
            {/* ======================================================== */}
            {activeCategory === 'fechamento' && (
              <div className="space-y-12">
                <div className="flex items-center gap-4 mb-2 pl-2 font-black text-primary uppercase tracking-tighter">
                    <Target size={24} className="text-secondary" />
                    <div><h2 className="text-2xl leading-none">Trancando a Venda</h2><p className="text-[10px] text-primary/70 tracking-widest mt-1 uppercase leading-none">Matando objeções rápido</p></div>
                </div>

                {/* SCRIPT: ESCASSEZ */}
                <div className="bg-primary text-white rounded-[3.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.2)]">
                    <div className="p-8 border-b border-white/10 bg-white/5 relative overflow-hidden">
                        <h3 className="text-xl font-black mb-3 flex items-center gap-3 text-highlight">⏳ Gatilho de Escassez Real</h3>
                        <p className="text-[13px] text-white/70 font-medium">A pior coisa que você pode fazer é a "cobrança chata". O cliente pediu o cardápio, viu o preço e sumiu? Use isso em 24h:</p>
                        <div className="absolute top-[-50%] right-[-10%] w-40 h-40 bg-secondary/10 blur-[40px] rounded-full" />
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="bg-white/10 p-6 rounded-[2.5rem] border border-white/20 backdrop-blur-md">
                            <p className="text-[14px] text-white/90 whitespace-pre-wrap leading-relaxed font-bold italic">
                            Oi <span className="text-highlight">[Nome]</span>! Tudo bem? Passando rapidinho por aqui pra ser justa com você.{"\n\n"}
                            Como tivemos muitos pedidos na última hora, eu <strong>só tenho mais 3 vagas</strong> de produção para as encomendas deste fim de semana! 🏃‍♀️💨{"\n\n"}
                            Como você já tinha me pedido o cardápio, vim te avisar antes de fechar a agenda. Você vai querer garantir a sua Pamona e o Bolo de Milho? Me avisa pra eu bloquear sua vaga agora.
                            </p>
                        </div>

                        <div className="flex bg-white/5 rounded-[2rem] p-5 gap-4 items-start border border-white/5">
                            <BrainCircuit className="text-highlight shrink-0" size={20} />
                            <div><h4 className="font-black text-[10px] uppercase text-white mb-1">Neuromarketing Aplicado:</h4><p className="text-[12px] font-medium text-white/80 leading-relaxed">Isso aciona o <strong>FOMO (Fear Of Missing Out - Medo de ficar de fora)</strong>. O cliente não sente que está sendo "cobrado", ele sente que você está fazendo um <em>favor</em> em avisar antes de acabar.</p></div>
                        </div>

                        <button onClick={() => handleCopy('escassez', "Oi [Nome]! Tudo bem? Passando rapidinho por aqui pra ser justa com você.\n\nComo tivemos muitos pedidos na última hora, eu só tenho mais 3 vagas de produção para as encomendas deste fim de semana! 🏃‍♀️💨\n\nComo você já tinha me pedido o cardápio, vim te avisar antes de fechar a agenda. Você vai querer garantir a sua Pamona e o Bolo de Milho? Me avisa pra eu bloquear sua vaga agora.")} className={`w-full py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95 ${copiedId === 'escassez' ? "bg-success text-white" : "bg-highlight text-primary"}`}>
                            {copiedId === 'escassez' ? <><Check size={18} /> COPIADO! VÁ PARA O ZAP</>  : <><Copy size={18} /> COPIAR GATILHO DE VENDA</>}
                        </button>
                    </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* ABA 3: TICKET MÁXIMO E RETENÇÃO */}
            {/* ======================================================== */}
            {activeCategory === 'retencao' && (
              <div className="space-y-12">
                <div className="flex items-center gap-4 mb-2 pl-2 font-black text-primary uppercase tracking-tighter">
                    <TrendingUp size={24} className="text-secondary" />
                    <div><h2 className="text-2xl leading-none">B2B e Ticket Alto</h2><p className="text-[10px] text-primary/70 tracking-widest mt-1 uppercase leading-none">Escalando o Faturamento</p></div>
                </div>

                {/* SCRIPT: CORPORATIVO */}
                <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-primary/10">
                    <div className="p-8 border-b border-primary/5 bg-[#FAFAFA]">
                        <h3 className="text-xl font-black text-primary mb-3 flex items-center gap-3">🏢 O Pitch Corporativo B2B</h3>
                        <p className="text-[13px] text-primary/60 font-medium">Empresas compram de baciada. Envie este script para currículos e contatos de RH de empresas da sua cidade.</p>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="bg-secondary/10 p-6 rounded-[2.5rem] border border-secondary/20">
                            <p className="text-[14px] text-primary/80 whitespace-pre-wrap leading-relaxed font-medium italic">
                            Olá, <span className="text-secondary font-black">[Nome do Gestor/RH]</span>! Tudo excelente?{"\n\n"}
                            Nós sabemos que a Festa Junina é o momento do ano que a equipe mais se engaja nas empresas! Eu lidero uma cozinha artesanal gourmet na cidade e montei <strong>Kits Corporativos de Luxo</strong> (Caixas de Degustação na mesa) para presentear funcionários agora em Junho.{"\n\n"}
                            Para resolver o "problema" do lanche da equipe de vocês, nossa agenda corporativa tem os 4 últimos lugares abertos.{"\n\n"}
                            Você teria interesse em receber nosso book em PDF com as condições de atacado para empresas, sem compromisso?
                            </p>
                        </div>
                        <button onClick={() => handleCopy('corporativo', "Olá, [Nome do Gestor/RH]! Tudo excelente?\n\nNós sabemos que a Festa Junina é o momento do ano que a equipe mais se engaja nas empresas! Eu lidero uma cozinha artesanal gourmet na cidade e montei *Kits Corporativos de Luxo* (Caixas de Degustação na mesa) para presentear funcionários agora em Junho.\n\nPara resolver o \"problema\" do lanche da equipe de vocês, nossa agenda corporativa tem os 4 últimos lugares abertos.\n\nVocê teria interesse em receber nosso book em PDF com as condições de atacado para empresas, sem compromisso?")} className={`w-full py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95 ${copiedId === 'corporativo' ? "bg-success text-white" : "bg-primary text-white"}`}>
                            {copiedId === 'corporativo' ? <><Check size={18} /> COPIADO PARA O ZAP!</>  : <><Copy size={18} /> COPIAR PITCH B2B</>}
                        </button>
                    </div>
                </div>

                {/* SCRIPT: UPSELL */}
                <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-primary/10">
                    <div className="p-8 border-b border-primary/5 bg-[#FAFAFA]">
                        <h3 className="text-xl font-black text-primary mb-3 flex items-center gap-3">💰 Upsell de Frente (O "Já Que")</h3>
                        <p className="text-[13px] text-primary/60 font-medium">A hora que o cliente é mais vulnerável é no exato momento logo após ele fechar um pedido. É a hora do troco.</p>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="bg-success/5 p-6 rounded-[2.5rem] border border-success/20">
                            <p className="text-[14px] text-primary/80 whitespace-pre-wrap leading-relaxed font-medium italic">
                            Pedido fechadíssimo, <span className="text-success font-black">[Nome]</span>! Fica pronto sexta às 16h.{"\n\n"}
                            Aproveitando que estamos aqui... Eu acabei de tirar uma fornada recém-assada da nossa <strong>Canjica Branca Imperial</strong> e o cheirinho na cozinha tá absurdo. Ela combina perfeitamente como sobremesa depois do seu pedido principal.{"\n\n"}
                            <em>"Já que"</em> eu vou te entregar na sexta, quer que eu coloque uma no pacote pra você testar? O valor dela é só R$ [Preço], compensa demais no frete!
                            </p>
                        </div>
                        <button onClick={() => handleCopy('upsell', "Pedido fechadíssimo, [Nome]! Fica pronto sexta às 16h.\n\nAproveitando que estamos aqui... Eu acabei de tirar uma fornada recém-assada da nossa *Canjica Branca Imperial* e o cheirinho na cozinha tá absurdo. Ela combina perfeitamente como sobremesa depois do seu pedido principal.\n\n\"Já que\" eu vou te entregar na sexta, quer que eu coloque uma no pacote pra você testar? O valor dela é só R$ [Preço], compensa demais no frete!")} className={`w-full py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95 ${copiedId === 'upsell' ? "bg-success text-white" : "bg-primary text-white"}`}>
                            {copiedId === 'upsell' ? <><Check size={18} /> COPIADO PARA O ZAP!</>  : <><Copy size={18} /> COPIAR SCRIPT UPSELL</>}
                        </button>
                    </div>
                </div>

              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </motion.div>
  );
}
