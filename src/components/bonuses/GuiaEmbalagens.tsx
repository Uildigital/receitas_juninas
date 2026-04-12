"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  ChevronLeft, 
  Palette, 
  Award, 
  Truck,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Clock,
  MessageSquareHeart,
  ShoppingCart,
  Zap,
  Star
} from "lucide-react";

export default function GuiaEmbalagens({ onBack }: { onBack: () => void }) {
  const [activeCategory, setActiveCategory] = useState<'conceito' | 'kits' | 'entrega'>('conceito');

  const categories = [
    { id: 'conceito', label: 'Conceito & Design', icon: Palette },
    { id: 'kits', label: 'Estratégia de Kits', icon: Award },
    { id: 'entrega', label: 'Logística & Mimo', icon: Truck }
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="pb-32 bg-[#FFF8F0] min-h-screen">
      {/* Header Premium com Barra de Progresso Sugerida */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFF8F0]/95 backdrop-blur-xl border-b border-primary/5 p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2.5 bg-primary/10 rounded-2xl text-primary hover:bg-primary/20 transition-all">
            <ChevronLeft size={22} />
          </button>
          <div>
            <h2 className="font-black text-[9px] text-primary/40 uppercase tracking-[0.3em]">Manual Profissional</h2>
            <p className="font-black text-xs text-primary uppercase tracking-widest">Branding e Experiência</p>
          </div>
        </div>
        <div className="bg-secondary/20 px-3 py-1 rounded-full"><span className="text-[10px] font-black text-secondary uppercase animate-pulse">Conteúdo Elite</span></div>
      </header>
      
      {/* Hero Interativo */}
      <div className="pt-20">
        <div className="relative h-[260px] w-full overflow-hidden shadow-2xl">
          <Image src="/images/bonus_embalagens.png" alt="Embalagens Elite" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F0] via-[#FFF8F0]/20 to-transparent" />
          <div className="absolute bottom-8 left-6 right-6">
            <h1 className="text-4xl font-black text-primary tracking-tighter leading-[0.9] mb-3">A Psicologia do<br/><span className="text-secondary italic">Unboxing Junino</span></h1>
            <p className="text-[11px] font-bold text-primary/60 uppercase tracking-[0.2em] max-w-[250px]">Onde a sua cozinha deixa de ser um custo e vira uma marca de luxo.</p>
          </div>
        </div>
      </div>

      <div className="px-6 max-w-xl mx-auto mt-8">
        
        {/* Navegação de Abas Fluida */}
        <div className="flex gap-2 mb-12 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`flex items-center gap-3 px-6 py-4 rounded-[2rem] whitespace-nowrap font-black text-[10px] uppercase tracking-widest transition-all duration-500 ease-out ${activeCategory === cat.id ? "bg-primary text-white shadow-[0_20px_40px_rgba(0,0,0,0.15)] -translate-y-1" : "bg-white text-primary/30 border border-primary/5 hover:text-primary"}`}
            >
              <cat.icon size={16} />
              {cat.label}
            </button>
          ))}
        </div>

        {/* --- ABA CONCEITO: BRANDING & MATERIAIS --- */}
        <AnimatePresence mode="wait">
        {activeCategory === 'conceito' && (
          <motion.div key="conceito" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
            
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary"><Palette size={20} /></div>
                <h3 className="text-xl font-black text-primary">Branding de Alto Valor</h3>
              </div>

              <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-primary/5 mb-10">
                <div className="relative h-64 w-full">
                    <Image src="/images/bonus_embalagens.png" alt="Kraft Minimalista" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white"><p className="text-[10px] font-black uppercase tracking-widest text-secondary">Referência Profissional</p><h4 className="font-black text-lg">Kraft Minimalista (240g)</h4></div>
                </div>
                <div className="p-8 space-y-6">
                    <div>
                        <h4 className="font-black text-sm text-primary uppercase mb-3 flex items-center gap-2">Psicologia do "Material Natural"</h4>
                        <p className="text-xs text-primary/60 leading-relaxed font-medium">As pessoas associam o Papel Kraft ao produto direto da fazenda. Mas o segredo da <strong>Elite</strong> é usar a gramatura correta (de 240g a 300g). Isso dá "corpo" à embalagem, passa a sensação de que o produto é pesado e valioso.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-5 rounded-[2rem] bg-[#FAFAFA] border border-primary/5">
                            <h5 className="text-[10px] font-black text-primary uppercase mb-2">Visor de Acetato</h5>
                            <p className="text-[9px] text-primary/40 font-medium leading-relaxed">Sempre utilize visor de alta claridade. Se o visor estiver embaçado ou amassado, a percepção de frescor do doce cai pela metade.</p>
                        </div>
                        <div className="p-5 rounded-[2rem] bg-[#FAFAFA] border border-primary/5">
                            <h5 className="text-[10px] font-black text-primary uppercase mb-2">Fio de Sisal Fino</h5>
                            <p className="text-[9px] text-primary/40 font-medium leading-relaxed">Use o sisal calibre 1.5mm. É mais elegante e não solta fiapos no doce como os sisais mais grossos e baratos.</p>
                        </div>
                    </div>
                </div>
              </div>
            </section>

            <div className="bg-primary p-8 rounded-[4rem] text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h4 className="text-base font-black mb-6 flex items-center gap-2 text-secondary"><Star size={20} /> O Guia dos 3 Contrastes</h4>
                    <div className="space-y-4">
                        <div className="bg-white/5 p-5 rounded-3xl border border-white/5"><h5 className="text-[11px] font-black text-secondary uppercase mb-1">01. Cor</h5><p className="text-[10px] text-white/60 leading-relaxed">Cores quentes (doce) contrastando com neutras (kraft). O ocre do bolo de milho deve saltar aos olhos.</p></div>
                        <div className="bg-white/5 p-5 rounded-3xl border border-white/5"><h5 className="text-[11px] font-black text-secondary uppercase mb-1">02. Textura</h5><p className="text-[10px] text-white/60 leading-relaxed">A aspereza do fio de sisal vs a suavidade do laço de fita gorgurão. Misture materiais!</p></div>
                        <div className="bg-white/5 p-5 rounded-3xl border border-white/5"><h5 className="text-[11px] font-black text-secondary uppercase mb-1">03. Temperatura</h5><p className="text-[10px] text-white/60 leading-relaxed">A embalagem rústica kraft contrastando com uma sacola plástica térmica interna (se necessário).</p></div>
                    </div>
                </div>
                <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-secondary/10 blur-[80px] rounded-full" />
            </div>
          </motion.div>
        )}

        {/* --- ABA KITS: ESTRATÉGIAS DE ESCALA --- */}
        {activeCategory === 'kits' && (
          <motion.div key="kits" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
             <section>
                <div className="flex items-center gap-3 mb-8">
                    <div className="h-10 w-10 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary"><Award size={20} /></div>
                    <h3 className="text-xl font-black text-primary">Engenharia de Menu Junino</h3>
                </div>

                {/* Box Degustação Detalhada */}
                <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-primary/5 mb-12">
                    <div className="relative h-64 w-full">
                        <Image src="/images/box_degustacao.png" alt="Box Degustação" fill className="object-cover" />
                        <div className="absolute top-6 right-6 bg-primary text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl">Best Seller</div>
                    </div>
                    <div className="p-8">
                        <h4 className="text-xl font-black text-primary mb-4 flex items-center justify-between">Box Quatro Estações <Zap className="text-secondary" size={20}/></h4>
                        <p className="text-xs text-primary/60 leading-relaxed font-medium mb-8 italic">"A degustação é a porta de entrada para encomendas de festas grandes."</p>
                        
                        <div className="space-y-6">
                            <div>
                                <h5 className="text-[10px] font-black text-primary uppercase mb-2 tracking-widest">A Montagem Perfeita:</h5>
                                <ul className="grid grid-cols-2 gap-2 text-[10px] font-bold text-primary/70">
                                    <li className="bg-primary/5 p-3 rounded-xl flex items-center gap-2"><div className="h-1 w-1 bg-secondary rounded-full"/> 80g Bolo de Milho</li>
                                    <li className="bg-primary/5 p-3 rounded-xl flex items-center gap-2"><div className="h-1 w-1 bg-secondary rounded-full"/> 80g Canjica Cremosa</li>
                                    <li className="bg-primary/5 p-3 rounded-xl flex items-center gap-2"><div className="h-1 w-1 bg-secondary rounded-full"/> 2 Mini Pamonhas</li>
                                    <li className="bg-primary/5 p-3 rounded-xl flex items-center gap-2"><div className="h-1 w-1 bg-secondary rounded-full"/> 50g Pé de Moleque</li>
                                </ul>
                            </div>
                            <p className="text-[10px] text-primary/60 font-medium leading-relaxed bg-amber-50 p-4 rounded-2xl border border-amber-100"><strong>DICA DE OURO:</strong> Use forminhas de papel impermeável plissado dentro do visor. Isso evita que a gordura do bolo de milho "manche" o papel kraft da caixa externa, mantendo o visual limpo até o fim.</p>
                        </div>
                    </div>
                </div>

                {/* Cesta Luxo Detalhada */}
                <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-primary/5">
                    <div className="relative h-72 w-full">
                        <Image src="/images/cesta_luxo.png" alt="Cesta Luxo" fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    </div>
                    <div className="p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div><h4 className="text-xl font-black text-primary mb-1">Cesta Arraiá Imperial</h4><p className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">Ticket Médio: R$ 145,00</p></div>
                            <div className="h-12 w-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary"><ShoppingCart size={20}/></div>
                        </div>
                        <p className="text-xs text-primary/60 leading-relaxed font-medium mb-8">Esta não é uma venda de doce, é uma venda de **comodidade**. Ideal para empresas que querem presentear gestores ou famílias pequenas que não querem fazer a festa, mas querem a mesa posta.</p>
                        
                        <div className="space-y-4">
                            <div className="p-5 rounded-3xl bg-[#FAFAFA] border border-primary/5">
                                <h5 className="text-[10px] font-black text-primary uppercase mb-2">Estrutura Interna Profissional:</h5>
                                <p className="text-[10px] text-primary/60 font-medium leading-relaxed"><strong>Ninho de Palha:</strong> Sempre forre a cesta com palha seca de milho tratada. Ela "trava" os potes e não deixa nada tombar durante o transporte no carro.</p>
                            </div>
                            <div className="p-5 rounded-3xl bg-[#FAFAFA] border border-primary/5">
                                <h5 className="text-[10px] font-black text-primary uppercase mb-2">O Souvenir Junino:</h5>
                                <p className="text-[10px] text-primary/60 font-medium leading-relaxed">Coloque um mini chapéu de palha (3cm) amarrado no gargalo do pote de canjica. Este pequeno detalhe de R$ 0,50 faz o cliente tirar foto e postar no Instagram marcando você.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
          </motion.div>
        )}

        {/* --- ABA LOGÍSTICA: EXPERIÊNCIA E ENCANTAMENTO --- */}
        {activeCategory === 'entrega' && (
          <motion.div key="entrega" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary"><Truck size={20} /></div>
                <h3 className="text-xl font-black text-primary">Logística & Encantamento</h3>
              </div>

              {/* Card Delivery Safe Detalhado */}
              <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-primary/5 mb-10">
                <div className="relative h-64 w-full">
                    <Image src="/images/delivery_safe.png" alt="Delivery" fill className="object-cover" />
                    <div className="absolute top-6 left-6 flex gap-2">
                        <span className="bg-success text-white text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-xl flex items-center gap-1"><CheckCircle2 size={10}/> Lacre 100% Seguro</span>
                    </div>
                </div>
                <div className="p-8">
                    <h4 className="text-xl font-black text-primary mb-6 flex items-center gap-3"><MessageSquareHeart className="text-accent" size={24} /> A Conexão com o Cliente</h4>
                    
                    <div className="space-y-8">
                        <div>
                            <h5 className="text-[11px] font-black text-primary uppercase mb-3 tracking-widest">O Branding Olfativo (O SEGREDO)</h5>
                            <p className="text-xs text-primary/60 leading-relaxed font-medium mb-4"><strong>A Técnica:</strong> Dilua essência de baunilha em álcool de cereais (70%) e dê UMA borrifada leve na ALÇA da sacola de papel. Quando o cliente segura a sacola, o calor da mão libera o perfume, avisando o cérebro que algo delicioso chegou.</p>
                        </div>

                        <div className="bg-primary/5 p-6 rounded-[2.5rem] border border-primary/5">
                            <h5 className="text-[11px] font-black text-primary uppercase mb-3 tracking-widest flex items-center gap-2"><Clock size={14}/> Manual de Reaquecimento Profissional</h5>
                            <p className="text-xs text-primary/60 font-medium mb-4 leading-relaxed italic">"Não queremos apenas que você compre, queremos que você tenha a melhor experiência possível."</p>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-4 bg-white rounded-2xl shadow-sm"><p className="text-[9px] font-black text-primary/40 uppercase mb-1">Bolo de Milho</p><p className="text-[10px] font-bold text-primary">15s c/ Copo d'água</p></div>
                                <div className="p-4 bg-white rounded-2xl shadow-sm"><p className="text-[9px] font-black text-primary/40 uppercase mb-1">Canjica / Curau</p><p className="text-[10px] font-bold text-primary">25s + Mexer bem</p></div>
                            </div>
                        </div>

                        <div className="p-6 bg-white border border-primary/5 rounded-[2.5rem] shadow-xl">
                            <h5 className="text-[11px] font-black text-primary uppercase mb-3 tracking-widest">O Bilhete de Ouro (Copy & Cola)</h5>
                            <p className="text-xs text-primary/60 mb-6 font-medium">Escreva à mão: <em>"Oi [Nome]! Acabei de tirar esse bolo do forno e o cheirinho na minha cozinha está incrível. Espero que sua festa de São João seja tão doce quanto esse mimo. Aproveite! - [Seu Nome]"</em></p>
                            <div className="flex items-center gap-2 text-[10px] font-black text-primary/30 uppercase tracking-widest"><AlertCircle size={14}/> Isso gera repost imediato no Instagram</div>
                        </div>
                    </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}
