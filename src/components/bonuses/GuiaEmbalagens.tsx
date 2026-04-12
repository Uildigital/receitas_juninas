"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  ChevronLeft, 
  Package, 
  Sparkles, 
  ShoppingBag, 
  Heart, 
  Smartphone, 
  ArrowUpRight,
  TrendingUp,
  Award,
  CircleCheck,
  Truck
} from "lucide-react";

export default function GuiaEmbalagens({ onBack }: { onBack: () => void }) {
  const [activeCategory, setActiveCategory] = useState<'conceito' | 'kits' | 'entrega'>('conceito');

  const categories = [
    { id: 'conceito', label: 'Conceito', icon: Sparkles },
    { id: 'kits', label: 'Kits Premium', icon: Award },
    { id: 'entrega', label: 'Delivery', icon: Truck }
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="pb-32 bg-[#FFF8F0] min-h-screen">
      {/* Header Fixo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFF8F0]/90 backdrop-blur-xl border-b border-primary/5 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 bg-primary/10 rounded-xl text-primary">
            <ChevronLeft size={24} />
          </button>
          <h2 className="font-black text-sm text-primary uppercase tracking-widest">Guia de Design de Embalagens</h2>
        </div>
        <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
      </header>
      
      {/* Hero Section */}
      <div className="pt-20">
        <div className="relative h-[250px] w-full overflow-hidden">
          <Image src="/images/bonus_embalagens.png" alt="Embalagens Elite" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F0] via-[#FFF8F0]/40 to-transparent" />
          <div className="absolute bottom-8 left-6 right-6">
            <span className="bg-secondary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-3 inline-block shadow-lg">Bônus Master</span>
            <h1 className="text-3xl font-black text-primary tracking-tight">O Segredo das Embalagens que Vendem 5x Mais</h1>
          </div>
        </div>
      </div>

      <div className="px-6 max-w-xl mx-auto mt-8">
        
        {/* Category Tabs */}
        <div className="flex gap-2 mb-10 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl whitespace-nowrap font-black text-[10px] uppercase tracking-widest transition-all ${activeCategory === cat.id ? "bg-primary text-white shadow-xl scale-105" : "bg-white text-primary/40 border border-primary/5 hover:text-primary"}`}
            >
              <cat.icon size={16} />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Content View */}
        {activeCategory === 'conceito' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <section>
              <h3 className="text-xl font-black text-primary mb-4 flex items-center gap-2">Psicologia do "Arraiá Chic"</h3>
              <p className="text-sm text-primary/70 leading-relaxed font-medium mb-6">Embalagens juninas não precisam ser infantis. O conceito "Rústico-Chique" utiliza materiais naturais para elevar o ticket médio.</p>
              
              <div className="grid gap-4">
                {[
                  { title: "Papel Kraft (Sustentabilidade)", desc: "Material barato que transmite o aspecto orgânico e artesanal.", highlight: "Custo-Benefício" },
                  { title: "Fio de Sisal & Palha", desc: "Traz a textura da roça sem perder o requinte.", highlight: "Visual Tátil" },
                  { title: "Transparência Focal", desc: "O doce é o protagonista. Use tampas de acrílico ou janelas em acetato.", highlight: "Desejo" }
                ].map((tip, i) => (
                  <div key={i} className="bg-white p-6 rounded-[2.5rem] border-l-4 border-secondary shadow-xl">
                    <span className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] mb-2 block">{tip.highlight}</span>
                    <h4 className="font-black text-primary mb-2">{tip.title}</h4>
                    <p className="text-xs text-primary/60 leading-relaxed font-medium">{tip.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="bg-primary p-8 rounded-[3rem] text-white overflow-hidden relative group">
              <div className="relative z-10">
                <h4 className="text-lg font-black mb-4 flex items-center gap-2"><TrendingUp className="text-secondary" /> A Matriz de Valor</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-white/10"><span className="text-white/60 text-xs font-bold">Investimento Médio:</span><span className="font-black text-secondary text-sm">R$ 1,20</span></div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10"><span className="text-white/60 text-xs font-bold">Percepção do Cliente:</span><span className="font-black text-secondary text-sm">+ R$ 7,50</span></div>
                  <div className="flex justify-between items-center pt-2"><span className="text-white/60 text-xs font-bold">ROI no Ticket Médio:</span><span className="font-black text-white text-sm">~ 525%</span></div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 blur-[50px] rounded-full group-hover:scale-150 transition-all duration-1000" />
            </div>
          </motion.div>
        )}

        {activeCategory === 'kits' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
             <section>
              <h3 className="text-xl font-black text-primary mb-4 flex items-center gap-2">Kits Presenteáveis</h3>
              <p className="text-sm text-primary/70 leading-relaxed font-medium mb-8">Ninguém quer o bônus de presente. Eles querem o presente pronto. Aqui é onde você vende ticket alto (Acima de R$ 80).</p>
              
              <div className="grid gap-6">
                <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-primary/5">
                  <div className="p-8">
                    <h4 className="text-lg font-black text-primary mb-4">🏠 "Arraiá na Caixa"</h4>
                    <p className="text-xs text-primary/60 font-medium mb-6 leading-relaxed text-balance">Reúna 5 tipos de doces diferentes em uma caixa de vime ou papelão rígido kraft. Adicione um mini girassol artificial.</p>
                    <div className="flex items-center gap-2"><CircleCheck className="text-success" size={16} /> <span className="text-[10px] font-black uppercase text-primary/80 tracking-widest">Ideal para Corporativo</span></div>
                  </div>
                </div>

                <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-primary/5">
                  <div className="p-8">
                    <h4 className="text-lg font-black text-primary mb-4">🎁 "Cesta Junina Luxo"</h4>
                    <p className="text-xs text-primary/60 font-medium mb-6 leading-relaxed text-balance">Uso de guardanapos de pano xadrez (vichy) para forrar. Agregue o Webbook impresso em QR Code (Opcional).</p>
                    <div className="flex items-center gap-2"><CircleCheck className="text-success" size={16} /> <span className="text-[10px] font-black uppercase text-primary/80 tracking-widest">Foco em Datas Específicas</span></div>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {activeCategory === 'entrega' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <section className="bg-white p-8 rounded-[3rem] shadow-2xl border border-primary/5">
              <h3 className="text-xl font-black text-primary mb-6 flex items-center gap-2"><Truck className="text-secondary" /> Logística de Elite</h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center font-black text-primary text-xs">01</div>
                  <div><h5 className="font-black text-sm text-primary mb-1">Selagem Térmica</h5><p className="text-xs text-primary/60 font-medium leading-relaxed">As receitas de canjica e bolo de milho quente devem ser seladas separadamente para manter a umidade.</p></div>
                </li>
                <li className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center font-black text-primary text-xs">02</div>
                  <div><h5 className="font-black text-sm text-primary mb-1">Adesivos de Segurança</h5><p className="text-xs text-primary/60 font-medium leading-relaxed">Garanta que o cliente veja que a caixa nunca foi aberta. Isso gera confiança imediata.</p></div>
                </li>
                <li className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center font-black text-primary text-xs">03</div>
                  <div><h5 className="font-black text-sm text-primary mb-1">O Fator "Uau" na Abertura</h5><p className="text-xs text-primary/60 font-medium leading-relaxed">Coloque um raminho de alecrim ou um pau de canela solto na caixa. O perfume ao abrir é o que fideliza.</p></div>
                </li>
              </ul>
            </section>
          </motion.div>
        )}

      </div>
    </motion.div>
  );
}
