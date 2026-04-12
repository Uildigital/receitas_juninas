"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
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
  Eye,
  ArrowRight
} from "lucide-react";

export default function GuiaEmbalagens({ onBack }: { onBack: () => void }) {
  const [activeCategory, setActiveCategory] = useState<'conceito' | 'kits' | 'entrega'>('conceito');

  const categories = [
    { id: 'conceito', label: 'Conceito & Design', icon: Palette },
    { id: 'kits', label: 'Estratégia de Kits', icon: Award },
    { id: 'entrega', label: 'Logística & Mimo', icon: Truck }
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="pb-32 bg-[#FFF8F0] min-h-screen">
      {/* Header Fixo Premium */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFF8F0]/95 backdrop-blur-xl border-b border-primary/5 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2.5 bg-primary/10 rounded-2xl text-primary">
            <ChevronLeft size={22} />
          </button>
          <h2 className="font-black text-xs text-primary uppercase tracking-widest">Guia de Design Elite</h2>
        </div>
      </header>
      
      {/* Hero Section */}
      <div className="pt-20">
        <div className="relative h-[240px] w-full overflow-hidden shadow-2xl">
          <Image src="/images/bonus_embalagens.png" alt="Embalagens Elite" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F0] via-[#FFF8F0]/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-3xl font-black text-primary tracking-tighter leading-none mb-2">Manual Visual<br/><span className="text-secondary italic">de Embalagens</span></h1>
            <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">Aprenda a vender com os olhos</p>
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
              className={`flex items-center gap-3 px-6 py-4 rounded-[2rem] whitespace-nowrap font-black text-[10px] uppercase tracking-widest transition-all ${activeCategory === cat.id ? "bg-primary text-white shadow-xl scale-105" : "bg-white text-primary/30 border border-primary/5 hover:text-primary"}`}
            >
              <cat.icon size={16} />
              {cat.label}
            </button>
          ))}
        </div>

        {/* --- ABA CONCEITO --- */}
        {activeCategory === 'conceito' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
            <section>
              <h3 className="text-xl font-black text-primary mb-6 flex items-center gap-2">Minimalismo Rústico</h3>
              <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-primary/5 mb-8">
                <div className="relative h-56 w-full">
                    <Image src="/images/bonus_embalagens.png" alt="Exemplo Minimalista" fill className="object-cover" />
                    <div className="absolute top-4 right-4 bg-secondary text-white text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Referência Real</div>
                </div>
                <div className="p-8">
                    <h4 className="font-black text-primary mb-3">O Visual que Cobra Caro</h4>
                    <p className="text-xs text-primary/60 leading-relaxed font-medium">Use papel kraft fosco e transparência absoluta. O cliente precisa ver a cremosidade do bolo de milho ou o brilho da canjica antes de abrir a caixa.</p>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* --- ABA KITS --- */}
        {activeCategory === 'kits' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
             <section>
                <h3 className="text-xl font-black text-primary mb-6">Exemplos de Alta Conversão</h3>
                
                {/* Box Degustação */}
                <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-primary/5 mb-10">
                    <div className="relative h-64 w-full">
                        <Image src="/images/box_degustacao.png" alt="Box Degustação" fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <span className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold px-4 py-2 rounded-full border border-white/20">Box Degustação 4 Sabores</span>
                    </div>
                    <div className="p-8">
                        <p className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] mb-2">Ideal para Novos Clientes</p>
                        <h4 className="text-lg font-black text-primary mb-3">Engenharia de Menu</h4>
                        <p className="text-xs text-primary/60 leading-relaxed font-medium mb-6">Divida 4 mini-porções: Bolo de Milho, Canjica, Pamonha e Pé de Moleque. A caixa com visor cria o desejo imediato de experimentar tudo ao mesmo tempo.</p>
                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/5 flex items-center justify-between">
                            <span className="text-[10px] font-black text-primary/60 uppercase">Valor Percebido:</span>
                            <span className="text-sm font-black text-primary">R$ 35,00 - R$ 45,00</span>
                        </div>
                    </div>
                </div>

                {/* Cesta Luxo */}
                <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-primary/5">
                    <div className="relative h-64 w-full">
                        <Image src="/images/cesta_luxo.png" alt="Cesta Luxo" fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <span className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold px-4 py-2 rounded-full border border-white/20">Cesta Arraiá Premium</span>
                    </div>
                    <div className="p-8">
                        <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em] mb-2">Ticket Alto (B2C / B2B)</p>
                        <h4 className="text-lg font-black text-primary mb-3">Presente de Classe A</h4>
                        <p className="text-xs text-primary/60 leading-relaxed font-medium mb-6">Utilize cestas de vime real e tecido Vichy (xadrez) vermelho. O segredo aqui é o volume. As embalagens individuais kraft dentro da cesta dão a impressão de um banquete variado.</p>
                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/5 flex items-center justify-between">
                            <span className="text-[10px] font-black text-primary/60 uppercase">Valor Percebido:</span>
                            <span className="text-sm font-black text-primary">R$ 120,00 - R$ 180,00</span>
                        </div>
                    </div>
                </div>
            </section>
          </motion.div>
        )}

        {/* --- ABA LOGÍSTICA --- */}
        {activeCategory === 'entrega' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
            <section className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-primary/5">
                <div className="relative h-64 w-full">
                    <Image src="/images/delivery_safe.png" alt="Delivery Tag" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary"><MessageSquareHeart size={20} /></div>
                        <h3 className="text-xl font-black text-primary">A Arte do Lacre</h3>
                    </div>
                    
                    <p className="text-xs text-primary/60 leading-relaxed font-medium mb-8">O delivery termina na porta do cliente, mas a venda fideliza no detalhe. Uma sacola de papel kraft resistente com um lacre adesivo e uma tag escrita à mão remove qualquer percepção de "comida industrial".</p>
                    
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-5 rounded-3xl bg-primary/[0.02] border border-primary/5">
                            <CheckCircle2 className="text-success shrink-0" size={18} />
                            <div><h5 className="font-black text-[10px] uppercase text-primary mb-1">Dica de Ouro: Olfato</h5><p className="text-[10px] text-primary/50 font-medium">Borrife uma essência leve de canela ou baunilha na parte externa da sacola (nunca no doce). O aroma ao receber cria memória afetiva imediata.</p></div>
                        </div>
                        <div className="flex items-start gap-4 p-5 rounded-3xl bg-amber-50 border border-amber-100">
                            <AlertCircle className="text-amber-500 shrink-0" size={18} />
                            <div><h5 className="font-black text-[10px] uppercase text-amber-900 mb-1">Segurança Sanitária</h5><p className="text-[10px] text-amber-900/60 font-medium">Sempre use etiquetas de lacre que se rompem. Segurança é o luxo número 1 do delivery.</p></div>
                        </div>
                    </div>
                </div>
            </section>
          </motion.div>
        )}

      </div>
    </motion.div>
  );
}
