"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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
  Star,
  Sparkles,
  Layers,
  BookOpenCheck
} from "lucide-react";

export default function GuiaEmbalagens({ onBack }: { onBack: () => void }) {
  const [activeCategory, setActiveCategory] = useState<'conceito' | 'kits' | 'entrega'>('conceito');
  const { scrollY } = useScroll();
  
  const headerBg = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255, 248, 240, 0)", "rgba(255, 248, 240, 1)"]
  );

  const categories = [
    { id: 'conceito', label: 'Conceito Expert', icon: Palette },
    { id: 'kits', label: 'Estratégia ROI', icon: Award },
    { id: 'entrega', label: 'Logística Elite', icon: Truck }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="pb-40 bg-[#FFF8F0] min-h-screen selection:bg-secondary/30 antialiased"
    >
      {/* Header Premium com Contraste Real */}
      <motion.header 
        style={{ backgroundColor: headerBg }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-primary/10 p-4 flex items-center justify-between transition-colors duration-300"
      >
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack} 
            className="p-2.5 bg-white border border-primary/20 shadow-md rounded-2xl text-primary active:scale-90"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="font-black text-[9px] text-primary/60 uppercase tracking-[0.3em] leading-none mb-1">Guia Profissional</h2>
            <p className="font-black text-[11px] text-primary uppercase tracking-widest leading-none">Design de Embalagens</p>
          </div>
        </div>
        <div className="bg-secondary px-3 py-1.5 rounded-xl shadow-lg border border-white/20">
            <span className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-1"><Star size={10}/> Expert</span>
        </div>
      </motion.header>
      
      {/* Hero Section Refatorada para Visualização Perfeita */}
      <div className="relative w-full overflow-hidden pb-12">
        {/* Imagem de Fundo com Fade nas Bordas */}
        <div className="relative h-[300px] w-full">
            <Image src="/images/bonus_embalagens.png" alt="Embalagens Elite" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F0] to-transparent/10" />
            <div className="absolute top-4 left-0 right-0 flex justify-center">
                <span className="bg-primary/20 backdrop-blur-md text-white text-[8px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.3em] border border-white/10">Bônus Master Expert</span>
            </div>
        </div>

        {/* Card de Título (Isolamento Visual) */}
        <div className="px-5 -mt-20 relative z-20">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-primary/5 text-center"
            >
                <div className="flex justify-center mb-4">
                    <div className="bg-secondary p-2 rounded-xl text-white shadow-lg shadow-secondary/20">
                        <Sparkles size={20} />
                    </div>
                </div>
                <h1 className="text-3xl font-black text-primary tracking-tighter leading-none mb-3">
                    Embalagens que<br/>
                    <span className="text-secondary italic">Vendem Sozinhas</span>
                </h1>
                <p className="text-[12px] font-bold text-primary/50 uppercase tracking-[0.2em] leading-relaxed">
                    A Psicologia do unboxing aplicado ao<br/>mercado de doces juninos.
                </p>
            </motion.div>
        </div>
      </div>

      <div className="px-5 max-w-xl mx-auto -mt-4 relative z-10">
        
        {/* Tab Navigation */}
        <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-[2.5rem] shadow-xl border border-primary/5 flex items-center mb-12">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id as any)} className={`relative flex-1 flex items-center justify-center gap-2 py-4 rounded-[2rem] transition-all duration-500 ${activeCategory === cat.id ? "text-white" : "text-primary/40 hover:text-primary"}`}>
              {activeCategory === cat.id && (
                <motion.div layoutId="activeTab" className="absolute inset-0 bg-primary shadow-lg" style={{ borderRadius: "2rem" }} transition={{ type: "spring", bounce: 0.1, duration: 0.6 }} />
              )}
              <cat.icon size={14} className="relative z-10" />
              <span className="relative z-10 font-black text-[9px] uppercase tracking-widest leading-none">{cat.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }}>
            
            {/* --- ABA 1: CONCEITO --- */}
            {activeCategory === 'conceito' && (
              <div className="space-y-12">
                <section className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-primary/10">
                    <div className="relative h-60 w-full"><Image src="/images/bonus_embalagens.png" alt="Kraft Elite" fill className="object-cover" /></div>
                    <div className="p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-10 w-10 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary"><Layers size={22} /></div>
                            <div><h3 className="text-xl font-black text-primary tracking-tight">Arquitetura de Marca</h3><p className="text-[10px] font-black text-primary/50 uppercase tracking-widest leading-none">Minimalismo Rústico 2.0</p></div>
                        </div>
                        
                        <div className="space-y-8">
                            <div>
                                <h4 className="font-black text-[13px] text-secondary uppercase tracking-widest mb-3">01. O Poder da Gramatura (240g+)</h4>
                                <p className="text-[14px] text-primary leading-relaxed font-medium">No mercado premium, a gramatura (espessura) do papel define o preço. O Kraft de <strong>240g a 300g</strong> dá autoridade à caixa, resiste à umidade e cria um som "premium" ao abrir.</p>
                            </div>

                            <div className="bg-primary/[0.03] p-6 rounded-[2.5rem] border-l-4 border-secondary shadow-sm">
                                <h4 className="font-black text-[11px] text-primary uppercase mb-3 flex items-center gap-2"><Palette size={14} className="text-secondary" /> A Paleta Cromática</h4>
                                <p className="text-[13px] text-primary leading-relaxed font-semibold mb-4"><strong>Terra, Ocre e Terracota:</strong> Tons que estimulam apetite e a memória afetiva.</p>
                                <div className="flex gap-2">
                                    <div className="h-4 w-12 rounded-full bg-[#8B4513] shadow-md" />
                                    <div className="h-4 w-12 rounded-full bg-[#CD853F] shadow-md" />
                                    <div className="h-4 w-12 rounded-full bg-primary shadow-md" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
              </div>
            )}

            {/* --- ABA 2: KITS --- */}
            {activeCategory === 'kits' && (
              <div className="space-y-12">
                <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-primary/10 group active:scale-[0.98] transition-all">
                    <div className="relative h-64 w-full"><Image src="/images/box_degustacao.png" alt="Box" fill className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" /><div className="absolute bottom-6 left-6"><span className="text-[10px] font-black text-white uppercase bg-secondary px-4 py-2 rounded-full shadow-xl">Box Degustação Luxo</span></div></div>
                    <div className="p-9">
                        <h4 className="text-xl font-black text-primary mb-3">O Abre-Portas do Lucro</h4>
                        <p className="text-[14px] text-primary leading-relaxed font-medium mb-6 italic">Ofereça mini-porções de 80g em visor transparente. A degustação é o primeiro passo para encomendas grandes.</p>
                        <div className="p-5 bg-secondary/10 rounded-3xl border border-secondary/10 flex items-center justify-between"><div className="flex items-center gap-3"><Zap size={22} className="text-secondary" /> <span className="text-[12px] font-black uppercase text-primary leading-none mt-1">ROI Sugerido:</span></div><span className="text-xl font-black text-primary">400% Real</span></div>
                    </div>
                </div>

                <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-primary/10 group active:scale-[0.98] transition-all">
                    <div className="relative h-64 w-full"><Image src="/images/cesta_luxo.png" alt="Cesta" fill className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" /><div className="absolute bottom-6 left-6"><span className="text-[10px] font-black text-white uppercase bg-secondary px-4 py-2 rounded-full shadow-xl">Cesta Arraiá Premium</span></div></div>
                    <div className="p-9">
                        <h4 className="text-xl font-black text-primary mb-3">Cesta "Banquet"</h4>
                        <p className="text-[14px] text-primary leading-relaxed font-medium mb-6">Utilize vime real e tecido Xadrez Vichy. Trave os produtos com ninho de palha seca tratada. O segredo é a verticalidade visual.</p>
                        <div className="p-5 bg-secondary/10 rounded-3xl border border-secondary/10 flex items-center justify-between"><div className="flex items-center gap-3"><ShoppingCart size={22} className="text-secondary" /> <span className="text-[12px] font-black uppercase text-primary leading-none mt-1">Ticket Médio:</span></div><span className="text-xl font-black text-primary">R$ 145,00+</span></div>
                    </div>
                </div>
              </div>
            )}

            {/* --- ABA 3: LOGÍSTICA --- */}
            {activeCategory === 'entrega' && (
              <div className="space-y-12">
                <div className="bg-white rounded-[4rem] overflow-hidden shadow-2xl border border-primary/5">
                    <div className="relative h-72 w-full"><Image src="/images/delivery_safe.png" alt="Delivery" fill className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" /><div className="absolute bottom-6 left-8"><span className="bg-success text-white text-[11px] font-black px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2"><CheckCircle2 size={14}/> Entrega Expert</span></div></div>
                    <div className="p-10">
                        <div className="flex items-center gap-4 mb-8"><MessageSquareHeart size={32} className="text-secondary" /><h3 className="text-2xl font-black text-primary tracking-tight">Efeito Encantamento</h3></div>
                        <p className="text-[14px] text-primary leading-relaxed font-bold italic mb-8">Borrife essência de baunilha na alça da sacola. O perfume cria uma conexão imediata de "Doce Caseiro".</p>
                        <div className="p-8 bg-primary text-white rounded-[3rem] shadow-xl space-y-6">
                            <h5 className="text-[12px] font-black text-secondary uppercase flex items-center gap-2 tracking-[0.2em]"><Clock size={16} /> Reaquecimento Profissional</h5>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-4 border-b border-white/10"><span className="text-[13px] font-bold text-white/80">Bolos e Pamonhas:</span><span className="text-[13px] font-black text-secondary">15s + Água</span></div>
                                <div className="flex justify-between items-center py-4 border-b border-white/10"><span className="text-[13px] font-bold text-white/80">Canjica Cremosa:</span><span className="text-[13px] font-black text-secondary">30s + Mexer</span></div>
                            </div>
                        </div>
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
