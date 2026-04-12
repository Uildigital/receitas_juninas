"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Package, CheckCircle2, Star, Stamp, Scissors, Tag } from "lucide-react";

export default function GuiaEmbalagens({ onBack }: { onBack: () => void }) {
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCompletedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const checklist = [
    { id: "kraft", icon: Package, title: "Caixas e Sacos Kraft", desc: "Trazem um aspecto rústico, barato e premium (a cara do São João)." },
    { id: "sisal", icon: Scissors, title: "Fio de Sisal ou Fita Quadriculada", desc: "Substitua o tradicional durex por um laço bonito para fechar as embalagens." },
    { id: "carimbo", icon: Stamp, title: "Carimbo Personalizado", desc: "Muito mais barato que adesivo. Um carimbo com sua logo no papel kraft muda tudo." },
    { id: "etiqueta", icon: Tag, title: "Etiqueta de Validade Visível", desc: "Passa segurança, frescor e profissionalismo absurdo para o cliente." }
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="pb-32 bg-[#FFF8F0] min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFF8F0]/90 backdrop-blur-xl border-b border-primary/5 p-4 flex items-center gap-4">
        <button onClick={onBack} className="p-2 bg-primary/10 rounded-xl text-primary hover:bg-primary/20 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div>
          <h2 className="font-black text-sm text-primary uppercase tracking-widest">Bônus Especial</h2>
          <p className="text-[10px] text-primary/50 font-bold tracking-widest uppercase">Guia de Embalagens</p>
        </div>
      </header>
      
      <div className="pt-24 px-6 max-w-xl mx-auto">
        <div className="bg-secondary text-white p-8 rounded-[3rem] shadow-2xl mb-10 overflow-hidden relative">
          <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-accent/30 blur-[40px] rounded-full z-0" />
          <div className="relative z-10">
            <h1 className="text-3xl font-black tracking-tight mb-4 leading-tight">Agregue até 5x Mais Valor</h1>
            <p className="text-white/80 text-sm leading-relaxed font-medium">Você "come" com os olhos primeiro. Uma embalagem inteligente permite cobrar mais caro sem que o cliente ache ruim.</p>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-black text-primary mb-6 flex items-center gap-2"><Star size={20} className="text-accent" /> Regras de Ouro</h2>
          <div className="bg-white p-6 rounded-[2.5rem] border border-primary/5 shadow-xl space-y-4">
            <p className="text-sm text-primary/70 leading-relaxed font-medium"><strong className="text-primary">1. O Rústico é Premium:</strong> Esqueça plásticos brilhantes. No nicho junino, papel pardo, palha e madeira entregam luxo.</p>
            <p className="text-sm text-primary/70 leading-relaxed font-medium"><strong className="text-primary">2. Menos é Mais:</strong> Uma caixa kraft com tampa transparente e um laço simples vende mais do que cores berrantes.</p>
            <p className="text-sm text-primary/70 leading-relaxed font-medium"><strong className="text-primary">3. Visual Tátil:</strong> Crie texturas. O fio de sisal é áspero, a caixa lisa. O cérebro adora contrastes.</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-black text-primary mb-6">Seu Checklist de Compras</h2>
          <div className="space-y-4">
            {checklist.map((item) => (
              <div 
                key={item.id} 
                onClick={() => toggleItem(item.id)}
                className={`flex items-start gap-4 p-5 rounded-3xl border transition-all cursor-pointer shadow-lg ${completedItems[item.id] ? "bg-success/10 border-success opacity-80" : "bg-white border-primary/5 active:scale-95"}`}
              >
                <div className={`shrink-0 h-12 w-12 rounded-2xl flex items-center justify-center transition-all ${completedItems[item.id] ? "bg-success text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]" : "bg-primary/5 text-primary"}`}>
                  {completedItems[item.id] ? <CheckCircle2 size={24} /> : <item.icon size={24} />}
                </div>
                <div className="flex-1">
                  <h3 className={`text-base font-black mb-1 ${completedItems[item.id] ? "text-success" : "text-primary"}`}>{item.title}</h3>
                  <p className="text-xs text-primary/60 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
