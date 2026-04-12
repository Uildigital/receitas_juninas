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
  HandHelping,
  Paintbrush,
  Crown
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
        </div>
        <div className="px-5 -mt-20 relative z-20">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-8 rounded-[3rem] shadow-2xl border border-primary/5 text-center">
                <h1 className="text-3xl font-black text-primary tracking-tighter leading-none mb-3 font-outfit">Branding & <span className="text-secondary italic font-outfit">Psicologia</span></h1>
                <p className="text-[12px] font-bold text-primary/50 uppercase tracking-[0.2em] font-inter">A ciência por trás do desejo visual.</p>
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
            
            {/* --- CONCEITO EXPERT: ENRIQUECIMENTO MONUMENTAL --- */}
            {activeCategory === 'conceito' && (
              <div className="space-y-12">
                <section className="bg-white rounded-[4rem] overflow-hidden shadow-2xl border border-primary/10">
                    <div className="relative h-64 w-full"><Image src="/images/bonus_embalagens.png" alt="Kraft Elite" fill className="object-cover" /></div>
                    <div className="p-10">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="h-12 w-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary shadow-inner"><Crown size={24} /></div>
                            <div>
                                <h3 className="text-2xl font-black text-primary tracking-tight font-outfit">O Conceito Loft-Rural</h3>
                                <p className="text-[10px] font-black text-primary/40 uppercase tracking-[0.3em]">Branding Gastronômico de Elite</p>
                            </div>
                        </div>
                        
                        <div className="space-y-12 text-[15px] text-primary/90 leading-relaxed font-medium">
                            <div className="space-y-4">
                                <h4 className="flex items-center gap-2 font-black text-sm uppercase tracking-widest text-secondary"><Paintbrush size={16}/> A Regra de Design 60-30-10</h4>
                                <p>Para que sua embalagem não pareça um "projeto escolar", aplique a regra de equilíbrio visual das grandes grifes:</p>
                                <ul className="space-y-3 font-bold text-primary/70">
                                    <li className="flex items-start gap-3"><div className="h-1.5 w-1.5 rounded-full bg-secondary mt-2 shrink-0" /> <span><strong className="text-primary">60% Rústico (Papel Kraft):</strong> É a sua cor dominante. Ela comunica origem, cuidado artesanal e sustentabilidade.</span></li>
                                    <li className="flex items-start gap-3"><div className="h-1.5 w-1.5 rounded-full bg-secondary mt-2 shrink-0" /> <span><strong className="text-primary">30% Gourmet (Cor de Marca):</strong> Use em fitas de cetim ou adesivos. Sugerimos tons de Terra ou Azul Petróleo para um contraste de luxo.</span></li>
                                    <li className="flex items-start gap-3"><div className="h-1.5 w-1.5 rounded-full bg-secondary mt-2 shrink-0" /> <span><strong className="text-primary">10% Ouro (Detalhe Final):</strong> O fecho em sisal fino, um carimbo dourado ou um raminho de alecrim seco. É o "brilho" que justifica o ticket alto.</span></li>
                                </ul>
                            </div>

                            <div className="relative p-8 bg-primary text-white rounded-[3rem] shadow-2xl overflow-hidden">
                                <div className="relative z-10">
                                    <h4 className="font-black text-[13px] uppercase mb-4 text-secondary tracking-widest">Neurociência: O Valor da Espessura</h4>
                                    <p className="text-[14px] leading-relaxed mb-6 opacity-80">Nosso cérebro associa <strong>resistência mecânica à qualidade de conteúdo</strong>. Embalagens moles ou finas (abaixo de 200g) transmitem a ideia de produto industrializado e barato. Ao usar o Kraft de 240g, o som da caixa ao ser aberta emite uma frequência que o subconsciente do cliente interpreta como "Produto de Elite".</p>
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
                                        <Layers size={20} className="text-secondary" />
                                        <p className="text-[11px] font-bold">DICA: Peça sempre Kraft 'Pardo', que possui fibras mais longas e visual mais rústico que o Kraft 'Simples'.</p>
                                    </div>
                                </div>
                                <div className="absolute top-[-30%] right-[-20%] w-64 h-64 bg-secondary/10 blur-[60px] rounded-full" />
                            </div>

                            <div className="space-y-4">
                                <h4 className="flex items-center gap-2 font-black text-sm uppercase tracking-widest text-secondary"><Zap size={16}/> Camadas de Antecipação (Unboxing)</h4>
                                <p>O erro do iniciante é mostrar o doce logo de cara. O Expert cria uma jornada de descoberta:</p>
                                <p className="p-6 border-l-4 border-secondary bg-secondary/5 italic font-bold text-primary/70">"O prazer do unboxing não está no produto final, mas no tempo que levamos para chegar até ele. Use papel de seda branco ou pardo dentro da caixa, fechado com um simples adesivo circular. Isso força o cliente a interagir com a marca por mais 5 segundos antes de ver o doce, aumentando o nível de dopamina."</p>
                            </div>
                        </div>
                    </div>
                </section>
              </div>
            )}

            {/* --- KITS STRATEGY --- */}
            {activeCategory === 'kits' && (
              <div className="space-y-12 text-primary">
                <section className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-primary/10">
                    <div className="relative h-64 w-full"><Image src="/images/box_degustacao.png" alt="Box" fill className="object-cover" /></div>
                    <div className="p-9">
                        <h4 className="text-2xl font-black mb-6">Kit "Degustação Estratégica"</h4>
                        <p className="text-[14px] leading-relaxed mb-8">O segredo para escalar é a **Box de 80g**. Este tamanho é matematicamente perfeito: o cliente mata o desejo de provar todos os sabores sem se sentir saciado demais, gerando o desejo de repetir a compra.</p>
                        <div className="p-6 bg-secondary/10 rounded-3xl border border-secondary/20">
                            <h5 className="font-black text-secondary text-[10px] uppercase mb-2">ROI de Experiência:</h5>
                            <p className="font-bold text-[13px]">Venda um combo de 4 boxes por um valor 20% menor que o individual. Isso ancora o cérebro na economia e eleva o volume diário.</p>
                        </div>
                    </div>
                </section>
              </div>
            )}

            {/* --- LOGISTICS --- */}
            {activeCategory === 'entrega' && (
              <div className="space-y-12">
                <section className="bg-white rounded-[4rem] overflow-hidden shadow-2xl border border-primary/5">
                    <div className="relative h-72 w-full"><Image src="/images/delivery_safe.png" alt="Delivery" fill className="object-cover" /></div>
                    <div className="p-10">
                        <div className="flex items-center gap-4 mb-8"><MessageSquareHeart size={32} className="text-secondary" /><h3 className="text-2xl font-black text-primary tracking-tight">Logística Elite</h3></div>
                        
                        <div className="space-y-12">
                            <div className="bg-primary text-white p-8 rounded-[3rem] shadow-xl">
                                <h4 className="font-black text-lg mb-6 text-secondary uppercase"><ThermometerSun size={24} className="inline mr-2"/> Reaquecimento Técnico</h4>
                                <div className="space-y-6 text-[13px] leading-relaxed">
                                    <p><strong>Bolo e Pamonha:</strong> Use a técnica do copo com 50ml de água ao lado no micro-ondas por 15s. O vapor hidrata a massa instantaneamente.</p>
                                    <p><strong>Cremes:</strong> Adicione uma colher de leite frio antes de aquecer por 30s. Ao mexer, a cremosidade original será reativada.</p>
                                </div>
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
