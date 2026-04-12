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
  Sparkles
} from "lucide-react";

export default function GuiaEmbalagens({ onBack }: { onBack: () => void }) {
  const [activeCategory, setActiveCategory] = useState<'conceito' | 'kits' | 'entrega'>('conceito');
  const { scrollY } = useScroll();
  
  const headerBg = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255, 248, 240, 0)", "rgba(255, 248, 240, 0.95)"]
  );

  const categories = [
    { id: 'conceito', label: 'Conceito', icon: Palette },
    { id: 'kits', label: 'Estratégia', icon: Award },
    { id: 'entrega', label: 'Logística', icon: Truck }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="pb-32 bg-[#FFF8F0] min-h-screen selection:bg-secondary/30 antialiased"
    >
      {/* Header Glassmorphism */}
      <motion.header 
        style={{ backgroundColor: headerBg }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-primary/5 p-4 flex items-center justify-between transition-colors duration-300"
      >
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack} 
            className="p-2.5 bg-white border border-primary/5 shadow-sm rounded-2xl text-primary active:scale-90 transition-transform"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="font-black text-[9px] text-primary/40 uppercase tracking-[0.2em] leading-none mb-1">Guia Elite</h2>
            <p className="font-black text-[11px] text-primary uppercase tracking-widest">Embalagens</p>
          </div>
        </div>
        <div className="flex items-center gap-2 pr-2">
            <div className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
            <span className="text-[8px] font-black text-primary/40 uppercase tracking-[0.3em]">Expert</span>
        </div>
      </motion.header>
      
      {/* Hero Section */}
      <div className="relative h-[280px] w-full overflow-hidden shadow-2xl">
        <Image src="/images/bonus_embalagens.png" alt="Embalagens Elite" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F0] via-[#FFF8F0]/30 to-transparent" />
        <div className="absolute bottom-10 left-6 right-6">
          <span className="bg-secondary text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] mb-4 inline-block shadow-xl">
            <Sparkles size={10} className="inline mr-1 mb-0.5" /> Bônus Master Expert
          </span>
          <h1 className="text-4xl font-black text-primary tracking-tighter leading-[0.85] mb-2 text-balance">
              Design de<br/><span className="text-secondary italic">Alta Conversão</span>
          </h1>
        </div>
      </div>

      <div className="px-5 max-w-xl mx-auto -mt-6 relative z-10">
        
        {/* Navigation Tabs (Segmented Control) */}
        <div className="bg-white p-1.5 rounded-[2.5rem] shadow-xl border border-primary/5 flex items-center mb-10">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id as any)} className={`relative flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[2rem] transition-all duration-500 ${activeCategory === cat.id ? "text-white" : "text-primary/40 hover:text-primary"}`}>
              {activeCategory === cat.id && (
                <motion.div layoutId="activeTab" className="absolute inset-0 bg-primary shadow-lg" style={{ borderRadius: "2rem" }} transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
              )}
              <cat.icon size={14} className="relative z-10" />
              <span className="relative z-10 font-black text-[10px] uppercase tracking-widest">{cat.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }}>
            
            {/* --- CONCEITO --- */}
            {activeCategory === 'conceito' && (
              <div className="space-y-10">
                <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-primary/5">
                    <div className="relative h-60 w-full"><Image src="/images/bonus_embalagens.png" alt="Kraft Elite" fill className="object-cover" /></div>
                    <div className="p-8">
                        <div className="flex items-center gap-3 mb-6"><Palette className="text-secondary" size={24} /><h3 className="text-2xl font-black text-primary tracking-tight">Minimalismo Rústico</h3></div>
                        <p className="text-sm text-primary/60 leading-relaxed font-medium mb-6">A embalagem de <span className="text-primary font-bold">Kraft de 240g</span> é a base do sucesso. Ela transmite robustez e honestidade artesanal.</p>
                        <ul className="space-y-4">
                            <li className="flex gap-4 p-5 rounded-3xl bg-[#FAFAFA] border border-primary/5"><div className="h-2 w-2 rounded-full bg-secondary mt-1.5 shrink-0" /><div><h4 className="font-black text-xs text-primary uppercase mb-1">Psicologia do Toque</h4><p className="text-[11px] text-primary/50 leading-relaxed font-medium">Texturas naturais como sisal e palha ativam memórias afetivas e justificam um preço 25% maior.</p></div></li>
                        </ul>
                    </div>
                </div>

                <div className="bg-secondary p-8 rounded-[3.5rem] shadow-2xl text-white relative overflow-hidden">
                    <h4 className="flex items-center gap-2 font-black text-lg mb-4 uppercase tracking-tighter"><TrendingUp size={22} className="text-primary" /> ROI do Design</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 p-5 rounded-3xl backdrop-blur-md"><p className="text-[9px] font-black uppercase text-white/60 mb-1">Custo Adicional</p><p className="text-2xl font-black italic">R$ 1,50</p></div>
                        <div className="bg-primary/20 p-5 rounded-3xl backdrop-blur-md border border-white/5"><p className="text-[9px] font-black uppercase text-white/60 mb-1">Lucro Extra</p><p className="text-2xl font-black italic text-primary">+ R$ 8,00</p></div>
                    </div>
                </div>
              </div>
            )}

            {/* --- KITS --- */}
            {activeCategory === 'kits' && (
              <div className="space-y-10">
                <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-primary/5 group active:scale-[0.98] transition-all">
                    <div className="relative h-60 w-full"><Image src="/images/box_degustacao.png" alt="Box" fill className="object-cover transition-transform duration-700 hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" /><div className="absolute bottom-6 left-6"><span className="text-[9px] font-black text-secondary uppercase bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">Box de Degustação</span></div></div>
                    <div className="p-8">
                        <h4 className="text-xl font-black text-primary mb-3">Engenharia de Sabores</h4>
                        <p className="text-xs text-primary/60 leading-relaxed font-medium mb-6">Combine 4 porções de 80g. O visor transparente gera desejo imediato e FOMO (medo de ficar sem).</p>
                        <div className="flex items-center gap-2 text-[10px] font-black text-primary/30 uppercase tracking-[0.2em]"><Zap size={14} className="text-secondary" /> Ticket Médio: R$ 45,00</div>
                    </div>
                </div>

                <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-primary/5 group active:scale-[0.98] transition-all">
                    <div className="relative h-60 w-full"><Image src="/images/cesta_luxo.png" alt="Cesta" fill className="object-cover transition-transform duration-700 hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" /><div className="absolute bottom-6 left-6"><span className="text-[9px] font-black text-secondary uppercase bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">Cesta Arraiá Premium</span></div></div>
                    <div className="p-8">
                        <h4 className="text-xl font-black text-primary mb-3">Cesta "Banquet Arraiá"</h4>
                        <p className="text-xs text-primary/60 leading-relaxed font-medium mb-6">Utilize vime real e tecido Xadrez Vichy. Trave os produtos com ninho de palha seca tratada. O segredo é o volume visual.</p>
                        <div className="flex items-center gap-2 text-[10px] font-black text-primary/30 uppercase tracking-[0.2em]"><Zap size={14} className="text-secondary" /> Ticket Médio: R$ 160,00</div>
                    </div>
                </div>
              </div>
            )}

            {/* --- LOGÍSTICA --- */}
            {activeCategory === 'entrega' && (
              <div className="space-y-10">
                <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-primary/5">
                    <div className="relative h-64 w-full"><Image src="/images/delivery_safe.png" alt="Delivery" fill className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" /><div className="absolute bottom-6 left-6"><span className="text-[9px] font-black text-success uppercase bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">Entrega Expert</span></div></div>
                    <div className="p-8">
                        <div className="flex items-center gap-4 mb-6"><MessageSquareHeart size={24} className="text-accent" /><h3 className="text-2xl font-black text-primary tracking-tight">Branding Olfativo</h3></div>
                        <p className="text-xs text-primary/60 leading-relaxed font-medium mb-8">Borrife essência de baunilha na alça da sacola. O calor da mão libera o perfume antes mesmo do cliente abrir o pacote.</p>
                        <div className="space-y-4">
                            {[
                                { title: "Manual de Calor", desc: "Instruções de reaquecimento (15s) para garantir a experiência da cozinha.", icon: Clock },
                                { title: "Lacre de Confiança", desc: "Adesivos destrutíveis reforçam o cuidado sanitário e o luxo do delivery.", icon: CheckCircle2 }
                            ].map((item, i) => (
                                <div key={i} className="p-5 rounded-3xl bg-[#FAFAFA] border border-primary/5 flex gap-4 icons-start">
                                    <div className="h-8 w-8 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0"><item.icon size={16}/></div>
                                    <div><h4 className="font-black text-xs text-primary uppercase mb-1">{item.title}</h4><p className="text-[11px] text-primary/50 font-medium">{item.desc}</p></div>
                                </div>
                            ))}
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
