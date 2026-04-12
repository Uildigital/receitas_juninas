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
  ThermometerSun,
  HandHelping
} from "lucide-react";

export default function GuiaEmbalagens({ onBack }: { onBack: () => void }) {
  const [activeCategory, setActiveCategory] = useState<'conceito' | 'kits' | 'entrega'>('conceito');
  const { scrollY } = useScroll();
  
  const headerBg = useTransform(scrollY, [0, 50], ["rgba(255, 248, 240, 0)", "rgba(255, 248, 240, 1)"]);

  const categories = [
    { id: 'conceito', label: 'Conceito Expert', icon: Palette },
    { id: 'kits', label: 'Estratégia ROI', icon: Award },
    { id: 'entrega', label: 'Logística Elite', icon: Truck }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-40 bg-[#FFF8F0] min-h-screen antialiased">
      {/* Header Premium */}
      <motion.header style={{ backgroundColor: headerBg }} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-primary/10 p-4 flex items-center justify-between">
        <button onClick={onBack} className="p-2.5 bg-white border border-primary/20 shadow-md rounded-2xl text-primary"><ChevronLeft size={20} /></button>
        <div className="bg-secondary px-3 py-1.5 rounded-xl shadow-lg border border-white/20"><span className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-1"><Star size={10}/> Mentoria Elite</span></div>
      </motion.header>
      
      {/* Hero Section */}
      <div className="relative w-full overflow-hidden pb-12">
        <div className="relative h-[300px] w-full">
            <Image src="/images/bonus_embalagens.png" alt="Embalagens Elite" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F0] to-transparent/10" />
            <div className="absolute top-4 left-0 right-0 flex justify-center">
                <span className="bg-primary/20 backdrop-blur-md text-white text-[8px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.3em] border border-white/10">Bônus Master Expert</span>
            </div>
        </div>
        <div className="px-5 -mt-20 relative z-20">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-8 rounded-[3rem] shadow-2xl border border-primary/5 text-center">
                <h1 className="text-3xl font-black text-primary tracking-tighter leading-none mb-3">Embalagens que<br/><span className="text-secondary italic">Vendem Sozinhas</span></h1>
                <p className="text-[12px] font-bold text-primary/50 uppercase tracking-[0.2em]">Manual técnico detalhado de experiência e branding.</p>
            </motion.div>
        </div>
      </div>

      <div className="px-5 max-w-xl mx-auto -mt-4 relative z-10">
        
        {/* Navigation Tabs */}
        <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-[2.5rem] shadow-xl border border-primary/5 flex items-center mb-12">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id as any)} className={`relative flex-1 flex items-center justify-center gap-2 py-4 rounded-[2rem] transition-all duration-500 ${activeCategory === cat.id ? "text-white" : "text-primary/40 hover:text-primary"}`}>
              {activeCategory === cat.id && <motion.div layoutId="activeTab" className="absolute inset-0 bg-primary shadow-xl" style={{ borderRadius: "2rem" }} transition={{ type: "spring", bounce: 0.1, duration: 0.6 }} />}
              <cat.icon size={14} className="relative z-10" />
              <span className="relative z-10 font-black text-[9px] uppercase tracking-widest leading-none">{cat.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }}>
            
            {activeCategory === 'conceito' && (
              <div className="space-y-12">
                <section className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-primary/10">
                    <div className="relative h-60 w-full"><Image src="/images/bonus_embalagens.png" alt="Kraft Elite" fill className="object-cover" /></div>
                    <div className="p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-10 w-10 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary"><Layers size={22} /></div>
                            <div><h3 className="text-xl font-black text-primary tracking-tight">Arquitetura de Marca</h3></div>
                        </div>
                        <div className="space-y-8 text-[14px] text-primary leading-relaxed font-medium">
                            <p>O segredo da elite é a <strong>consistência</strong>. Ao usar o papel kraft de <span className="text-secondary font-black">240g</span>, você não está entregando apenas um doce, está entregando um presente. A caixa deve ter resistência estrutural para que o cliente sinta o "peso" da qualidade.</p>
                            <div className="p-6 bg-amber-50 rounded-[2.5rem] border border-amber-200">
                                <h4 className="font-black text-amber-900 text-[11px] uppercase mb-2">A Tática do Papel Manteiga Plissado:</h4>
                                <p className="text-amber-900/70 text-[13px]">Ao dobrar o papel manteiga em pequenas pregas (efeito plissado), você cria um colchão de ar que isola o calor do doce, impedindo que a gordura atinja a caixa de kraft e cause manchas visíveis que matam a estética do unboxing.</p>
                            </div>
                        </div>
                    </div>
                </section>
              </div>
            )}

            {activeCategory === 'kits' && (
              <div className="space-y-12">
                <section className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-primary/10">
                    <div className="relative h-64 w-full"><Image src="/images/box_degustacao.png" alt="Box" fill className="object-cover" /></div>
                    <div className="p-9">
                        <h4 className="text-2xl font-black text-primary mb-6">Kit "Degustação Estratégica"</h4>
                        <div className="space-y-6 text-[14px] text-primary/80 leading-relaxed">
                            <p>Muitos erram ao vender apenas porções grandes. O segredo para escalar é a **Box de 80g**. Este tamanho é matematicamente perfeito: o cliente mata o desejo de provar todos os sabores sem se sentir saciado demais, o que gera o desejo de repetir a compra no dia seguinte.</p>
                            <div className="p-6 bg-secondary/10 rounded-3xl border border-secondary/20">
                                <h5 className="font-black text-secondary text-[10px] uppercase mb-2">ROI de Experiência:</h5>
                                <p className="text-primary font-bold text-[13px]">Venda um combo de 4 boxes (80g cada) por um valor 20% menor que o doce individual. Isso ancora o cérebro do cliente na economia e eleva o seu volume de venda diário.</p>
                            </div>
                        </div>
                    </div>
                </section>
              </div>
            )}

            {activeCategory === 'entrega' && (
              <div className="space-y-12">
                <section className="bg-white rounded-[4rem] overflow-hidden shadow-2xl border border-primary/5">
                    <div className="relative h-72 w-full"><Image src="/images/delivery_safe.png" alt="Delivery" fill className="object-cover" /></div>
                    <div className="p-10">
                        <div className="flex items-center gap-4 mb-8"><MessageSquareHeart size={32} className="text-secondary" /><h3 className="text-2xl font-black text-primary tracking-tight leading-none">Logística de<br/>Alta Performance</h3></div>
                        
                        <div className="space-y-12">
                            {/* REAQUECIMENTO DETALHADO */}
                            <div className="bg-primary text-white p-8 rounded-[3rem] shadow-xl relative overflow-hidden">
                                <div className="relative z-10">
                                    <h4 className="flex items-center gap-2 font-black text-lg mb-6 text-secondary uppercase tracking-tighter"><ThermometerSun size={24} /> O Segredo do Reaquecimento Técnico</h4>
                                    
                                    <div className="space-y-8">
                                        <div className="space-y-2">
                                            <h5 className="font-black text-[12px] text-white uppercase border-b border-white/10 pb-2">Bolo de Milho e Pamonha (Maciez Máxima)</h5>
                                            <p className="text-[13px] text-white/70 leading-relaxed font-medium">Jamais aqueça o bolo sozinho. O micro-ondas retira a umidade da massa, deixando-a "elástica". <strong>A técnica:</strong> Coloque o bolo em um prato e, ao lado dele, coloque um pequeno copo com 50ml de água. O vapor gerado atuará como uma mini camâra de hidratação, mantendo o bolo fofinho e com aspecto de recém-saído do forno por 15 segundos.</p>
                                        </div>

                                        <div className="space-y-2">
                                            <h5 className="font-black text-[12px] text-white uppercase border-b border-white/10 pb-2">Canjica, Curau e Cremes (Cremosidade de Colher)</h5>
                                            <p className="text-[13px] text-white/70 leading-relaxed font-medium">Após o resfriamento, o amido do milho endurece. Para reativar a textura sedosa, adicione uma colher de sopa de leite (ou leite de coco) sobre o creme e aqueça por 30 segundos. Após retirar, misture vigorosamente por 5 segundos. O leite novo se fundirá ao creme aquecido, removendo qualquer aspecto granulado.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-secondary/10 blur-[80px] rounded-full" />
                            </div>

                            {/* MIME E BRANDING OLFATIVO */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary"><HandHelping size={20} /></div>
                                    <h4 className="font-black text-lg text-primary tracking-tight">O Fator "UAU" na Entrega</h4>
                                </div>
                                <p className="text-[14px] text-primary/80 leading-relaxed font-medium"><strong>Branding Olfativo Técnico:</strong> Não borrife perfume. Misture 100ml de álcool de cereais com 3 gotas de essência de baunilha e 1 cravo-da-índia. Borrife exclusivamente na alça da sacola kraft. O álcool evaporará, mas a essência fixará na alça. Assim que o entregador estender a mão, o aroma ativará o paladar do cliente de forma inconsciente.</p>
                            </div>
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
