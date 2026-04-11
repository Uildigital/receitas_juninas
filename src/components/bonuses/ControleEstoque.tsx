"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ClipboardCheck, ThermometerSnowflake, History, Search, AlertTriangle, Snowflake, Refrigerator, Store } from "lucide-react";

export default function ControleEstoque({ onBack }: { onBack: () => void }) {
  const [searchQuery, setSearchQuery] = useState("");

  const validades = [
    { item: "Bolo de Milho", geladeira: "4 dias", congelador: "30 dias", ambiente: "2 dias" },
    { item: "Massa de Canjica", geladeira: "3 dias", congelador: "15 dias", ambiente: "Não recomendado" },
    { item: "Pamonha (Cozida)", geladeira: "5 dias", congelador: "90 dias", ambiente: "12 horas" },
    { item: "Amendoim Torrado", geladeira: "Não necessário", congelador: "Não necessário", ambiente: "60 dias (vedado)" },
    { item: "Quentão (Base)", geladeira: "7 dias", congelador: "Não recomendado", ambiente: "1 dia" },
    { item: "Doces de Colher", geladeira: "5 dias", congelador: "20 dias", ambiente: "1 dia" }
  ];

  const filteredValidades = validades.filter(v => 
    v.item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="pb-32 bg-[#FFF8F0] min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFF8F0]/90 backdrop-blur-xl border-b border-primary/5 p-4 flex items-center gap-4">
        <button onClick={onBack} className="p-2 bg-primary/10 rounded-xl text-primary hover:bg-primary/20 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div>
          <h2 className="font-black text-sm text-primary uppercase tracking-widest">Bônus Especial</h2>
          <p className="text-[10px] text-primary/50 font-bold tracking-widest uppercase">Organização de Estoque</p>
        </div>
      </header>
      
      <div className="pt-24 px-6 max-w-xl mx-auto">
        <div className="bg-primary text-white p-8 rounded-[3rem] shadow-2xl mb-10 overflow-hidden relative">
          <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-secondary/30 blur-[40px] rounded-full z-0" />
          <div className="relative z-10">
            <h1 className="text-3xl font-black tracking-tight mb-4 leading-tight">Zero Desperdício</h1>
            <p className="text-white/70 text-sm leading-relaxed font-medium">O lucro da cozinha muitas vezes vai embora no lixo. Aprenda a controlar seu estoque como uma profissional.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="bg-white p-6 rounded-[2.5rem] border border-primary/5 shadow-xl text-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mx-auto mb-4"><Refrigerator size={24} /></div>
                <h3 className="text-xs font-black text-primary uppercase mb-1">Geladeira</h3>
                <p className="text-[10px] text-primary/40 font-bold">Max. 4°C</p>
            </div>
            <div className="bg-white p-6 rounded-[2.5rem] border border-primary/5 shadow-xl text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mx-auto mb-4"><Snowflake size={24} /></div>
                <h3 className="text-xs font-black text-primary uppercase mb-1">Freezer</h3>
                <p className="text-[10px] text-primary/40 font-bold">Min. -18°C</p>
            </div>
        </div>

        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-primary">Tabela de Validades</h2>
            <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/20" size={14} /><input type="text" placeholder="Buscar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-white border border-primary/5 rounded-full py-2 pl-9 pr-4 text-[10px] font-black uppercase outline-none focus:border-secondary transition-all w-32" /></div>
          </div>
          
          <div className="space-y-4">
            {filteredValidades.map((v, i) => (
                <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-primary/5 shadow-lg">
                    <h3 className="font-black text-primary mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-secondary" />
                        {v.item}
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="flex flex-col gap-1">
                            <span className="text-[8px] font-black uppercase text-primary/30">Ambiente</span>
                            <span className="text-[10px] font-bold text-primary/70">{v.ambiente}</span>
                        </div>
                        <div className="flex flex-col gap-1 border-x border-primary/5 px-2">
                            <span className="text-[8px] font-black uppercase text-secondary">Geladeira</span>
                            <span className="text-[10px] font-bold text-primary/70">{v.geladeira}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[8px] font-black uppercase text-accent">Congelador</span>
                            <span className="text-[10px] font-bold text-primary/70">{v.congelador}</span>
                        </div>
                    </div>
                </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 p-8 rounded-[3rem] mb-12">
            <div className="flex items-center gap-3 mb-4 text-amber-700">
                <AlertTriangle size={24} />
                <h3 className="font-black text-sm uppercase tracking-widest">Atenção Médica</h3>
            </div>
            <p className="text-xs text-amber-900/70 leading-relaxed font-medium">Nunca congele um produto que já foi descongelado. Ao utilizar o método PVPS (Primeiro que Vence, Primeiro que Sai), você garante que nada expire na sua prateleira.</p>
        </div>

      </div>
    </motion.div>
  );
}
