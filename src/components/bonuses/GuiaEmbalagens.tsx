"use client";

import React, { useState, useEffect } from "react";
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
  
  // Efeito de opacidade para o header no mobile
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
      {/* Header Mobile-First (Glassmorphism) */}
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
            <span className="text-[8px] font-black text-primary/40 uppercase tracking-widest tracking-[0.3em]">Online</span>
        </div>
      </motion.header>
      
      {/* Hero Interativo com Efeito de Parallax Suave */}
      <div className="relative h-[280px] w-full overflow-hidden shadow-2xl">
        <motion.div 
          initial={{ scale: 1.1 }} 
          animate={{ scale: 1 }} 
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative h-full w-full"
        >
          <Image 
            src="/images/bonus_embalagens.png" 
            alt="Embalagens Elite" 
            fill 
            className="object-cover" 
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F0] via-[#FFF8F0]/30 to-transparent" />
        </motion.div>
        
        <div className="absolute bottom-10 left-6 right-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-secondary/20 backdrop-blur-md text-secondary text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest mb-4 inline-block border border-secondary/20 shadow-sm">
              <Sparkles size={10} className="inline mr-1 mb-0.5" /> Bônus Master Expert
            </span>
            <h1 className="text-4xl font-black text-primary tracking-tighter leading-[0.85] mb-2 text-balance">
                Design de<br/><span className="text-secondary italic">Alta Conversão</span>
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="px-5 max-w-xl mx-auto -mt-6 relative z-10">
        
        {/* Navigation Tabs (Styled as Segmented Control) */}
        <div className="bg-white p-1.5 rounded-[2.5rem] shadow-xl border border-primary/5 flex items-center mb-10 overflow-hidden">
          {categories.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`relative flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[2rem] transition-all duration-500 ${activeCategory === cat.id ? "text-white" : "text-primary/40 hover:text-primary"}`}
            >
              {activeCategory === cat.id && (
                <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary shadow-lg shadow-primary/20"
                    style={{ borderRadius: "2rem" }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <cat.icon size={14} className="relative z-10" />
              <span className="relative z-10 font-black text-[10px] uppercase tracking-widest">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Content View com Transições Suaves */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* --- CONCEITO --- */}
            {activeCategory === 'conceito' && (
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-primary/5 relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-6">
                        <Palette className="text-secondary" size={24} />
                        <h3 className="text-2xl font-black text-primary tracking-tight">O Olhar Profissional</h3>
                    </div>
                    <p className="text-sm text-primary/60 leading-relaxed font-medium mb-8">
                        No mercado de Elite, a embalagem é 50% do produto. Use o Kraft de alta gramatura (<span className="text-primary font-bold">240g+</span>) para transmitir robustez e luxo artesanal.
                    </p>
                    
                    <div className="space-y-4">
                        {[
                            { title: "Linguagem das Cores", desc: "Tons de terra e laranja queimado ativam o hipocampo (memória afetiva) e o apetite imediatamente.", icon: Palette },
                            { title: "Toque Humano", desc: "Tags escritas à mão ou carimbos manuais permitem que você cobre um ticket 25% maior.", icon: MessageSquareHeart }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 p-5 rounded-3xl bg-[#FAFAFA] border border-primary/5 hover:border-secondary transition-colors">
                                <item.icon className="text-secondary shrink-0" size={18} />
                                <div>
                                    <h4 className="font-black text-xs text-primary uppercase mb-1">{item.title}</h4>
                                    <p className="text-[11px] text-primary/50 leading-relaxed font-medium">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-secondary p-8 rounded-[3.5rem] shadow-2xl text-white relative overflow-hidden group">
                    <div className="relative z-10">
                        <h4 className="flex items-center gap-2 font-black text-lg mb-4 uppercase tracking-tighter"><TrendingUp size={22} className="text-primary" /> ROI da Embalagem Elite</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/10 p-5 rounded-3xl backdrop-blur-md">
                                <p className="text-[9px] font-black uppercase text-white/60 mb-1">Custo Insumo</p>
                                <p className="text-2xl font-black italic">R$ 1,50</p>
                            </div>
                            <div className="bg-primary/20 p-5 rounded-3xl backdrop-blur-md border border-white/5">
                                <p className="text-[9px] font-black uppercase text-white/60 mb-1">Lucro Adicional</p>
                                <p className="text-2xl font-black italic text-primary">+ R$ 8,00</p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/20 blur-[50px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
                </div>
              </div>
            )}

            {/* --- KITS --- */}
            {activeCategory === 'kits' && (
              <div className="space-y-10">
                <section>
                    <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-primary/5 mb-8 group active:scale-[0.98] transition-all">
                        <div className="relative h-60 w-full">
                            <Image src="/images/box_degustacao.png" alt="Box" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-6 left-6"><span className="text-[9px] font-black text-secondary uppercase bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">Box Degustação</span></div>
                        </div>
                        <div className="p-8">
                            <h4 className="text-xl font-black text-primary mb-3">O Abre-Portas do Lucro</h4>
                            <p className="text-xs text-primary/60 leading-relaxed font-medium mb-6">Ofereça mini-porções (80g) em visor transparente. Use forminhas plissadas para que a gordura do doce não manche o papel kraft.</p>
                            <div className="flex items-center gap-2 text-[10px] font-black text-primary/30 uppercase tracking-[0.2em]"><Zap size={14} className="text-secondary" /> Ticket Sugerido: R$ 45,00</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-primary/5 group active:scale-[0.98] transition-all">
                        <div className="relative h-60 w-full">
                            <Image src="/images/cesta_luxo.png" alt="Cesta" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-6 left-6"><span className="text-[9px] font-black text-secondary uppercase bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">Cesta Premium</span></div>
                        </div>
                        <div className="p-8">
                            <h4 className="text-xl font-black text-primary mb-3">Cesta "Banquet Arraiá"</h4>
                            <p className="text-xs text-primary/60 leading-relaxed font-medium mb-6">Utilize cestas de vime real forradas com tecido Vichy. Trave os produtos com ninho de palha seca tratada. O segredo é o volume visual.</p>
                            <div className="flex items-center gap-2 text-[10px] font-black text-primary/30 uppercase tracking-[0.2em]"><Zap size={14} className="text-secondary" /> Ticket Sugerido: R$ 160,00</div>
                        </div>
                    </div>
                </section>
              </div>
            )}

            {/* --- LOGÍSTICA --- */}
            {activeCategory === 'entrega' && (
              <div className="space-y-10">
                <section className="bg-white p-8 rounded-[3.5rem] shadow-2xl border border-primary/5">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="h-12 w-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary shadow-lg"><Truck size={24} /></div>
                        <h3 className="text-2xl font-black text-primary tracking-tight leading-tight">Delivery de<br/>Encantamento</h3>
                    </div>

                    <div className="space-y-6">
                        <div className="relative h-48 w-full rounded-[2.5rem] overflow-hidden mb-8">
                            <Image src="/images/delivery_safe.png" alt="Delivery" fill className="object-cover" />
                        </div>
                        
                        <div className="space-y-4">
                            {[
                                { title: "Branding Olfativo", desc: "Uma borrifada de essência de baunilha na ALÇA da sacola capta a atenção do cliente antes de abrir.", icon: Sparkles },
                                { title: "Manual de Calor", desc: "Ensine o cliente a aquecer (15s micro-ondas) para ter a experiência de doce recém-saído do forno.", icon: Clock },
                                { title: "Lacre de Confiança", desc: "Adesivos que se rompem garantem a segurança alimentar e reforçam o cuidado sanitário.", icon: CheckCircle2 }
                            ].map((item, i) => (
                                <div key={i} className="p-5 rounded-3xl bg-[#FAFAFA] border border-primary/5 flex gap-4 items-start">
                                    <div className="h-8 w-8 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0"><item.icon size={16}/></div>
                                    <div><h5 className="font-black text-xs text-primary uppercase mb-1">{item.title}</h5><p className="text-[11px] text-primary/50 font-medium leading-relaxed">{item.desc}</p></div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 p-8 rounded-[3rem] bg-amber-50 border border-amber-100 flex items-center gap-5">
                            <AlertCircle size={28} className="text-amber-500 shrink-0" />
                            <p className="text-[11px] text-amber-950/70 font-bold leading-relaxed uppercase tracking-[0.1em]">Atenção: A temperatura da entrega altera a percepção do sabor. Sempre use bolsas térmicas no transporte.</p>
                        </div>
                    </div>
                </section>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </motion.div>
  );
}
