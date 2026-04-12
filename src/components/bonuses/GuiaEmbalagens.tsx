"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  ChevronLeft, 
  Sparkles, 
  Award, 
  Truck,
  TrendingUp,
  Palette,
  Layout,
  MousePointer2,
  CheckCircle2,
  AlertCircle,
  Clock,
  MessageSquareHeart
} from "lucide-react";

export default function GuiaEmbalagens({ onBack }: { onBack: () => void }) {
  const [activeCategory, setActiveCategory] = useState<'conceito' | 'kits' | 'entrega'>('conceito');

  const categories = [
    { id: 'conceito', label: 'Conceito & Design', icon: Palette },
    { id: 'kits', label: 'Estratégia de Kits', icon: Award },
    { id: 'entrega', label: 'Logística & Mimo', icon: Truck }
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="pb-32 bg-[#FFF8F0] min-h-screen selection:bg-secondary/30">
      {/* Header Fixo Premium */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFF8F0]/95 backdrop-blur-xl border-b border-primary/5 p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2.5 bg-primary/10 rounded-2xl text-primary hover:bg-primary/20 transition-all active:scale-95">
            <ChevronLeft size={22} />
          </button>
          <div>
            <h2 className="font-black text-[10px] text-primary/40 uppercase tracking-[0.3em]">Bônus Master</h2>
            <p className="font-black text-xs text-primary uppercase tracking-widest">Guia de Design de Embalagens</p>
          </div>
        </div>
        <div className="flex gap-1">
          <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
          <div className="h-1.5 w-1.5 rounded-full bg-secondary/40" />
        </div>
      </header>
      
      {/* Hero Section */}
      <div className="pt-20">
        <div className="relative h-[220px] w-full overflow-hidden shadow-2xl">
          <Image src="/images/bonus_embalagens.png" alt="Embalagens Elite" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F0] via-[#FFF8F0]/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-3xl font-black text-primary tracking-tighter leading-none mb-2">Design Gastronômico<br/><span className="text-secondary italic">de Elite</span></h1>
            <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">Transforme papel em lucro real</p>
          </div>
        </div>
      </div>

      <div className="px-6 max-w-xl mx-auto mt-8">
        
        {/* Category Tabs */}
        <div className="flex gap-3 mb-12 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`flex items-center gap-3 px-6 py-4 rounded-[2rem] whitespace-nowrap font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 ${activeCategory === cat.id ? "bg-primary text-white shadow-[0_20px_40px_rgba(0,0,0,0.1)] scale-105" : "bg-white text-primary/30 border border-primary/5 hover:border-primary/20"}`}
            >
              <cat.icon size={16} className={activeCategory === cat.id ? "text-secondary" : "text-primary/20"} />
              {cat.label}
            </button>
          ))}
        </div>

        {/* --- ABA CONCEITO --- */}
        {activeCategory === 'conceito' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary"><Palette size={20} /></div>
                <h3 className="text-xl font-black text-primary">Branding Sensorial</h3>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-[3rem] border border-primary/5 shadow-xl">
                    <h4 className="font-black text-sm text-primary uppercase mb-4 tracking-widest text-secondary">01. Linguagem das Cores</h4>
                    <p className="text-xs text-primary/60 leading-relaxed font-medium mb-4 italic">"O cérebro decide a compra em 3 segundos."</p>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-xs font-medium text-primary/70">
                            <div className="h-1.5 w-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                            <span><strong>Laranja/Terracota:</strong> Estimula o apetite e remete ao conforto do lar (essencial para comida afetiva).</span>
                        </li>
                        <li className="flex items-start gap-3 text-xs font-medium text-primary/70">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#8B4513] mt-1.5 shrink-0" />
                            <span><strong>Marrom Kraft:</strong> Transmite honestidade, produto feito à mão e sustentabilidade.</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-white p-8 rounded-[3rem] border border-primary/5 shadow-xl">
                    <h4 className="font-black text-sm text-primary uppercase mb-4 tracking-widest text-secondary">02. Tipografia Afetiva</h4>
                    <p className="text-xs text-primary/60 leading-relaxed font-medium">Fuja de fontes corporativas. Use carimbos ou escreva o nome do cliente à mão nas tags. O toque humano permite cobrar 20% a mais pelo "exclusivo".</p>
                </div>

                <div className="bg-primary p-8 rounded-[3rem] text-white overflow-hidden relative group">
                  <div className="relative z-10">
                    <h4 className="text-base font-black mb-4 flex items-center gap-2 text-secondary"><TrendingUp /> ROI da Embalagem Elite</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                            <p className="text-[8px] font-black uppercase text-white/40 mb-1">Custo Adicional</p>
                            <p className="text-xl font-black text-white">R$ 1,50</p>
                        </div>
                        <div className="bg-secondary/20 p-4 rounded-2xl border border-secondary/20">
                            <p className="text-[8px] font-black uppercase text-secondary mb-1">Preço Sugerido</p>
                            <p className="text-xl font-black text-secondary">+ R$ 10,00</p>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* --- ABA KITS --- */}
        {activeCategory === 'kits' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
             <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary"><Award size={20} /></div>
                    <h3 className="text-xl font-black text-primary">Engenharia de Menu</h3>
                </div>

                <div className="grid gap-6">
                    <div className="bg-white p-8 rounded-[3.5rem] shadow-2xl border border-primary/5">
                        <span className="text-[9px] font-black bg-secondary/10 text-secondary px-3 py-1 rounded-full uppercase tracking-[0.2em] mb-4 inline-block">Alta Escala</span>
                        <h4 className="text-lg font-black text-primary mb-3">Box "Degustação Arraiá"</h4>
                        <p className="text-xs text-primary/60 leading-relaxed mb-6 font-medium">Ideal para clientes novos. Coloque 4 mini-porções de receitas diferentes. Use uma caixa com divisórias para que os sabores não se misturem.</p>
                        <div className="flex items-center gap-3 text-[10px] font-black text-primary/40 uppercase">
                            <CheckCircle2 size={14} className="text-success" /> Envio rápido
                            <CheckCircle2 size={14} className="text-success" /> Menor desperdício
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-primary to-[#2A231F] p-8 rounded-[3.5rem] shadow-2xl text-white">
                        <span className="text-[9px] font-black bg-white/10 text-secondary px-3 py-1 rounded-full uppercase tracking-[0.2em] mb-4 inline-block">Ticket Máximo</span>
                        <h4 className="text-lg font-black mb-3">O Kit "Festa em Casa"</h4>
                        <p className="text-xs text-white/60 leading-relaxed mb-6 font-medium">Inclua 1 Bolo Inteiro + 1 Porção de Canjica G + 6 Pamonhas. Embale em uma cesta de palha real forrada com tecido Xadrez Vichy Vermelho.</p>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                            <p className="text-[10px] font-bold text-secondary">DICA: Venda esse kit por R$ 120+ e economize no tempo de entrega única.</p>
                        </div>
                    </div>
                </div>
            </section>
          </motion.div>
        )}

        {/* --- ABA LOGÍSTICA --- */}
        {activeCategory === 'entrega' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary"><Truck size={20} /></div>
                <h3 className="text-xl font-black text-primary">Logística de Encantamento</h3>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-primary/5">
                    <h4 className="font-black text-sm text-primary flex items-center gap-2 mb-4 uppercase tracking-widest"><Clock size={16} className="text-secondary" /> O Manual de Reaquecimento</h4>
                    <p className="text-xs text-primary/60 leading-relaxed font-medium mb-4">Muitos doces juninos perdem a textura se aquecidos errado. Inclua um cartãozinho (ou QR Code):</p>
                    <div className="p-4 bg-primary/[0.02] border-l-2 border-secondary rounded-r-xl">
                        <p className="text-[10px] text-primary/70 font-bold italic">"Para o bolo de milho parecer recém-saído do forno, aqueça 15s no micro-ondas com um copinho de água ao lado."</p>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-primary/5">
                    <h4 className="font-black text-sm text-primary flex items-center gap-2 mb-4 uppercase tracking-widest"><MessageSquareHeart size={16} className="text-accent" /> O Bilhete da Gratidão</h4>
                    <p className="text-xs text-primary/60 leading-relaxed font-medium">Um adesivo de "Feito com Amor" não basta mais. Escreva o nome do cliente e uma frase curta sobre a sua produção artesanal. Isso reduz a taxa de reclamação em 95%.</p>
                </div>

                <div className="bg-amber-50 border border-amber-100 p-8 rounded-[3rem] flex gap-4">
                    <AlertCircle className="text-amber-500 shrink-0" size={20} />
                    <p className="text-[10px] text-amber-950/70 font-bold leading-relaxed uppercase tracking-widest">Aviso: Nunca use grampos metálicos em embalagens de delivery. Além de perigoso, destrói a estética premium rústica.</p>
                </div>
              </div>
            </section>
          </motion.div>
        )}

      </div>
    </motion.div>
  );
}
