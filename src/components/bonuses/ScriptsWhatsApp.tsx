"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Copy, Check, Info } from "lucide-react";
import scriptsData from "@/data/bonuses/scripts.json";

interface Script {
  id: string;
  titulo: string;
  descricao: string;
  texto: string;
}

export default function ScriptsWhatsApp({ onBack }: { onBack: () => void }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Falha ao copiar texto: ", err);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="pb-32 bg-[#FFF8F0] min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFF8F0]/90 backdrop-blur-xl border-b border-primary/5 p-4 flex items-center gap-4">
        <button onClick={onBack} className="p-2 bg-primary/10 rounded-xl text-primary hover:bg-primary/20 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div>
          <h2 className="font-black text-sm text-primary uppercase tracking-widest">Bônus Especial</h2>
          <p className="text-[10px] text-primary/50 font-bold tracking-widest uppercase">Copy & Cola para WhatsApp</p>
        </div>
      </header>
      
      <div className="pt-24 px-6 max-w-xl mx-auto">
        <div className="bg-primary text-white p-8 rounded-[3rem] shadow-2xl mb-10 overflow-hidden relative">
          <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-secondary/30 blur-[40px] rounded-full z-0" />
          <div className="relative z-10">
            <h1 className="text-3xl font-black tracking-tight mb-4 leading-tight">Venda Mais Todos Os Dias</h1>
            <p className="text-white/70 text-sm leading-relaxed font-medium">Esqueça o bloqueio criativo. Selecione a situação abaixo, clique em copiar e mande para a sua lista de clientes e feche pedidos em 5 minutos.</p>
          </div>
        </div>

        <div className="space-y-6">
          {(scriptsData as Script[]).map((script, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              key={script.id} 
              className="bg-white rounded-[2.5rem] border border-primary/5 shadow-xl overflow-hidden"
            >
              <div className="p-6 border-b border-primary/5 bg-primary/[0.02]">
                <h3 className="text-lg font-black text-primary mb-2 flex items-center gap-2">
                  {script.titulo}
                </h3>
                <p className="text-xs text-primary/60 font-medium flex items-start gap-2">
                  <Info size={14} className="shrink-0 mt-0.5" />
                  {script.descricao}
                </p>
              </div>
              <div className="p-6 bg-[#FAFAFA]">
                <p className="text-sm text-primary/80 whitespace-pre-wrap leading-relaxed font-medium italic mb-6">
                  "{script.texto}"
                </p>
                
                <button 
                  onClick={() => handleCopy(script.id, script.texto)}
                  className={\`w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 \${copiedId === script.id ? "bg-success text-white shadow-success/20" : "bg-primary text-white hover:bg-primary/90"}\`}
                >
                  {copiedId === script.id ? (
                    <><Check size={18} /> COPIADO! VÁ PARA O ZAP</>
                  ) : (
                    <><Copy size={18} /> COPIAR SCRIPT</>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
