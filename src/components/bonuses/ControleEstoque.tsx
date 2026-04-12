"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { 
  ChevronLeft, 
  ClipboardCheck, 
  ThermometerSnowflake, 
  History, 
  Search, 
  AlertTriangle, 
  Snowflake, 
  Refrigerator, 
  Store,
  Star,
  Activity,
  Calculator,
  ShieldAlert,
  ArrowDownToLine,
  TrendingUp,
  PackageOpen
} from "lucide-react";

export default function ControleEstoque({ onBack }: { onBack: () => void }) {
  const [activeCategory, setActiveCategory] = useState<'fundamentos' | 'validades' | 'perdas'>('fundamentos');
  const [searchQuery, setSearchQuery] = useState("");
  const { scrollY } = useScroll();
  
  const headerBg = useTransform(scrollY, [0, 50], ["rgba(255, 248, 240, 0)", "rgba(255, 248, 240, 1)"]);

  const validades = [
    { item: "Bolo de Milho", geladeira: "4 dias", congelador: "30 dias", ambiente: "2 dias" },
    { item: "Massa de Canjica", geladeira: "3 dias", congelador: "15 dias", ambiente: "Não expor" },
    { item: "Pamonha (Cozida)", geladeira: "5 dias", congelador: "90 dias", ambiente: "12 horas" },
    { item: "Amendoim Torrado", geladeira: "Não precisa", congelador: "Não precisa", ambiente: "60 dias" },
    { item: "Quentão (Base)", geladeira: "7 dias", congelador: "Não congela", ambiente: "1 dia" },
    { item: "Doces de Colher", geladeira: "5 dias", congelador: "20 dias", ambiente: "1 dia" }
  ];

  const filteredValidades = validades.filter(v => 
    v.item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [
    { id: 'fundamentos', label: 'Estratégia 360º', icon: Activity },
    { id: 'validades', label: 'Tabela Técnica', icon: ThermometerSnowflake },
    { id: 'perdas', label: 'Lucro Invisível', icon: Calculator }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-40 bg-[#FFF8F0] min-h-screen antialiased">
      {/* Header Premium */}
      <motion.header style={{ backgroundColor: headerBg }} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-primary/10 p-4 flex items-center justify-between transition-colors duration-300">
        <button onClick={onBack} className="p-2.5 bg-white border border-primary/20 shadow-md rounded-2xl text-primary active:scale-95 transition-transform"><ChevronLeft size={20} /></button>
        <div className="bg-primary px-3 py-1.5 rounded-xl shadow-lg border border-white/20"><span className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-1"><Star size={10}/> Gestão Master</span></div>
      </motion.header>
      
      {/* Hero Section Masterclass */}
      <div className="relative w-full overflow-hidden pb-12">
        <div className="relative h-[300px] w-full">
            <Image src="/images/bonus_estoque.png" alt="Gestão de Estoque Elite" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F0] via-[#FFF8F0]/40 to-transparent" />
            <div className="absolute inset-0 bg-black/10" />
        </div>
        <div className="px-5 -mt-24 relative z-20">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-8 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-primary/5 text-center">
                <div className="flex justify-center mb-4">
                    <div className="bg-primary p-2.5 rounded-2xl text-white shadow-xl shadow-primary/30">
                        <ClipboardCheck size={24} />
                    </div>
                </div>
                <h1 className="text-3xl font-black text-primary tracking-tighter leading-none mb-3 font-outfit">Blindagem<br/><span className="text-secondary italic">de Lucro Real</span></h1>
                <p className="text-[12px] font-bold text-primary/50 uppercase tracking-[0.2em] leading-relaxed">Estoque não é depósito.<br/>Estoque é dinheiro parado.</p>
            </motion.div>
        </div>
      </div>

      <div className="px-5 max-w-xl mx-auto -mt-2 relative z-10">
        
        {/* Navigation Tabs */}
        <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-[2.5rem] shadow-xl border border-primary/5 flex items-center mb-10 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id as any)} className={`relative flex-1 min-w-[110px] flex justify-center items-center gap-2 py-4 rounded-[2rem] transition-all duration-500 ${activeCategory === cat.id ? "text-white" : "text-primary/40 hover:text-primary"}`}>
              {activeCategory === cat.id && <motion.div layoutId="estoqueTab" className="absolute inset-0 bg-primary shadow-lg shadow-primary/20" style={{ borderRadius: "2rem" }} transition={{ type: "spring", bounce: 0.15, duration: 0.6 }} />}
              <cat.icon size={14} className="relative z-10" />
              <span className="relative z-10 font-black text-[9px] uppercase tracking-widest leading-none">{cat.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }}>
            
            {/* ======================================================== */}
            {/* ABA 1: FUNDAMENTOS / ESTRATÉGIA */}
            {/* ======================================================== */}
            {activeCategory === 'fundamentos' && (
              <div className="space-y-10">
                 <div className="flex items-center gap-4 mb-2 pl-2 font-black text-primary uppercase tracking-tighter">
                    <History size={24} className="text-secondary" />
                    <div><h2 className="text-2xl leading-none">A Regra de Ouro</h2><p className="text-[10px] text-primary/50 tracking-widest mt-1 uppercase leading-none">Mentalidade de Alta Cozinha</p></div>
                </div>

                <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-primary/10 p-8 space-y-8">
                    <div className="bg-primary/5 p-6 rounded-[2.5rem] border border-primary/10 relative">
                        <ArrowDownToLine className="absolute top-4 right-4 text-primary/10" size={40} />
                        <h3 className="font-black text-[13px] uppercase text-primary mb-3">O Princípio P.V.P.S.</h3>
                        <p className="text-[14px] text-primary/80 leading-relaxed font-medium">A base de qualquer restaurante com Estrela Michelin. <strong>P</strong>rimeiro que <strong>V</strong>ence, <strong>P</strong>rimeiro que <strong>S</strong>ai. {"\n\n"}Isso significa que, ao guardar um novo lote de leite condensado, ele obrigatoriamente vai para o fundo da prateleira. Se você coloca o novo na frente, o velho fica oculto e passa do prazo de validade.</p>
                    </div>
                </div>

                <div className="bg-primary text-white rounded-[3.5rem] overflow-hidden shadow-2xl p-8 relative">
                    <div className="relative z-10 space-y-6">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                            <PackageOpen size={24} className="text-secondary" />
                            <h3 className="text-xl font-black">A "Curva ABC" na Prática</h3>
                        </div>
                        <p className="text-[14px] leading-relaxed text-white/80 font-medium">Nem todo ingrediente demanda o mesmo cuidado. Trate seu estoque com o método de risco:</p>
                        <ul className="space-y-4">
                            <li className="bg-white/5 p-4 rounded-3xl border border-white/10">
                                <span className="font-black text-secondary block mb-1">Risco A (Alto Valor + Baixa Duração):</span>
                                <span className="text-[12px] text-white/60">Laticínios, cremes frescos, coco ralado in natura. Monitoramento diário obrigatório.</span>
                            </li>
                            <li className="bg-white/5 p-4 rounded-3xl border border-white/10">
                                <span className="font-black text-white block mb-1">Risco C (Baixo Valor + Longa Duração):</span>
                                <span className="text-[12px] text-white/60">Açúcar, sal, amendoim selado. Checagem mensal apenas para reposição de volume.</span>
                            </li>
                        </ul>
                    </div>
                    <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-secondary/10 blur-[50px] rounded-full" />
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* ABA 2: TABELA TÉCNICA */}
            {/* ======================================================== */}
            {activeCategory === 'validades' && (
              <div className="space-y-8">
                 <div className="flex items-center gap-4 mb-2 pl-2 font-black text-primary uppercase tracking-tighter">
                    <Refrigerator size={24} className="text-secondary" />
                    <div><h2 className="text-2xl leading-none">Matriz de Validade</h2><p className="text-[10px] text-primary/50 tracking-widest mt-1 uppercase leading-none">Segurança Alimentar Total</p></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-[2.5rem] border border-primary/5 shadow-lg text-center flex flex-col items-center justify-center">
                        <div className="w-10 h-10 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-3"><Refrigerator size={20} /></div>
                        <h3 className="text-[11px] font-black text-primary uppercase mb-1">Geladeira</h3>
                        <p className="text-[10px] text-primary/50 font-bold">Max. 4°C</p>
                    </div>
                    <div className="bg-white p-6 rounded-[2.5rem] border border-primary/5 shadow-lg text-center flex flex-col items-center justify-center">
                        <div className="w-10 h-10 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-3"><Snowflake size={20} /></div>
                        <h3 className="text-[11px] font-black text-primary uppercase mb-1">Freezer</h3>
                        <p className="text-[10px] text-primary/50 font-bold">Min. -18°C</p>
                    </div>
                </div>

                <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-primary/10 p-6">
                    <div className="relative mb-6">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" size={16} />
                        <input 
                            type="text" 
                            placeholder="Buscar ingrediente..." 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)} 
                            className="w-full bg-primary/[0.03] border border-primary/10 rounded-[2rem] py-4 pl-12 pr-6 text-[12px] font-bold text-primary outline-none focus:border-secondary transition-all" 
                        />
                    </div>
                    
                    <div className="space-y-4">
                        {filteredValidades.map((v, i) => (
                            <div key={i} className="bg-[#FAFAFA] p-6 rounded-[2rem] border border-primary/5">
                                <h3 className="font-black text-[14px] text-primary mb-4 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-secondary" />
                                    {v.item}
                                </h3>
                                <div className="grid grid-cols-3 gap-2">
                                    <div className="flex flex-col gap-1.5">
                                        <span className="text-[9px] font-black uppercase text-primary/40 leading-none">Ambiente</span>
                                        <span className="text-[11px] font-bold text-primary/90 leading-tight">{v.ambiente}</span>
                                    </div>
                                    <div className="flex flex-col gap-1.5 border-x border-primary/10 px-3">
                                        <span className="text-[9px] font-black uppercase text-secondary leading-none">Geladeira</span>
                                        <span className="text-[11px] font-bold text-primary/90 leading-tight">{v.geladeira}</span>
                                    </div>
                                    <div className="flex flex-col gap-1.5 pl-1">
                                        <span className="text-[9px] font-black uppercase text-accent leading-none">Congelador</span>
                                        <span className="text-[11px] font-bold text-primary/90 leading-tight">{v.congelador}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {filteredValidades.length === 0 && (
                            <p className="text-center text-primary/40 font-bold py-6 text-sm">Nenhum item encontrado.</p>
                        )}
                    </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* ABA 3: LUCRO INVISÍVEL E PERDAS */}
            {/* ======================================================== */}
            {activeCategory === 'perdas' && (
              <div className="space-y-12">
                 <div className="flex items-center gap-4 mb-2 pl-2 font-black text-primary uppercase tracking-tighter">
                    <TrendingUp size={24} className="text-secondary" />
                    <div><h2 className="text-2xl leading-none">A Matemática do Lixo</h2><p className="text-[10px] text-primary/50 tracking-widest mt-1 uppercase leading-none">Protegendo sua Margem</p></div>
                </div>

                <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-primary/10 p-8 space-y-6">
                    <div className="p-6 bg-secondary text-white rounded-[2.5rem] shadow-xl flex items-center gap-4">
                        <ShieldAlert size={32} className="shrink-0 text-white/50" />
                        <p className="text-[13px] font-medium leading-relaxed">Você acha que perder uma lata de leite condensado vencida custa apenas R$ 6,00? <strong>Você está caindo na Ilusão do Custo Bruto.</strong></p>
                    </div>

                    <div className="space-y-4 pt-4">
                        <h3 className="font-black text-sm uppercase text-primary tracking-widest border-b border-primary/10 pb-2">A Regra da Margem de 30%</h3>
                        <p className="text-[14px] text-primary/80 leading-relaxed font-medium">Se a sua margem de lucro líquido em um produto for de 30%, isso significa que para pagar aquela lata de R$ 6,00 que foi pro lixo, você não precisa fazer mais R$ 6,00. <strong>Você precisa vender R$ 20,00 pra recuperar o prejuízo da perda!</strong></p>
                        
                        <div className="bg-amber-50 border border-amber-200 p-6 rounded-[2rem] mt-4 flex gap-4">
                            <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-1" />
                            <p className="text-[12px] text-amber-900/80 font-bold leading-relaxed">Etiquetar todos os insumos abertos com a "Data de Abertura" não é preciosismo de chefe, é uma ferramenta de retenção de lucro.</p>
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
