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
  Search,
  BookOpenCheck
} from "lucide-react";

export default function GuiaEmbalagens({ onBack }: { onBack: () => void }) {
  const [activeCategory, setActiveCategory] = useState<'conceito' | 'kits' | 'entrega'>('conceito');
  const { scrollY } = useScroll();
  
  const headerBg = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255, 248, 240, 0)", "rgba(255, 248, 240, 1)"]
  );

  const categories = [
    { id: 'conceito', label: 'Conceito Expert', icon: Palette },
    { id: 'kits', label: 'Estratégia ROI', icon: Award },
    { id: 'entrega', label: 'Logística Elite', icon: Truck }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="pb-40 bg-[#FFF8F0] min-h-screen selection:bg-secondary/30 antialiased"
    >
      {/* Header com Contraste Total */}
      <motion.header 
        style={{ backgroundColor: headerBg }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-primary/10 p-4 flex items-center justify-between transition-colors duration-300"
      >
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack} 
            className="p-2.5 bg-white border border-primary/20 shadow-md rounded-2xl text-primary active:scale-90"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="font-black text-[9px] text-primary/60 uppercase tracking-[0.3em] leading-none mb-1">Guia Profissional</h2>
            <p className="font-black text-[11px] text-primary uppercase tracking-widest leading-none">Design de Embalagens</p>
          </div>
        </div>
        <div className="bg-secondary px-3 py-1.5 rounded-xl shadow-lg">
            <span className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-1"><Star size={10}/> Mentoria Elite</span>
        </div>
      </motion.header>
      
      {/* Hero com Gradiente de Contraste Reforçado */}
      <div className="relative h-[320px] w-full overflow-hidden shadow-2xl">
        <Image src="/images/bonus_embalagens.png" alt="Embalagens Elite" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F0] via-[#FFF8F0]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
        <div className="absolute bottom-12 left-6 right-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <span className="bg-secondary text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] mb-4 inline-block shadow-2xl">
              <Sparkles size={10} className="inline mr-1 mb-0.5" /> Bônus Master Expert
            </span>
            <h1 className="text-4xl font-black text-primary tracking-tighter leading-[0.85] mb-2 text-balance">
                Embalagens que<br/><span className="text-secondary italic">Vendem Sozinhas</span>
            </h1>
            <p className="text-[12px] font-bold text-primary/80 uppercase tracking-widest max-w-[300px] leading-relaxed">Arquitetura de Marca e Psicologia de Venda.</p>
          </motion.div>
        </div>
      </div>

      <div className="px-5 max-w-xl mx-auto -mt-10 relative z-10">
        
        {/* Navigation Tabs (Contraste Máximo) */}
        <div className="bg-white p-2 rounded-[2.5rem] shadow-2xl border border-primary/10 flex items-center mb-12">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id as any)} className={`relative flex-1 flex items-center justify-center gap-2 py-4 rounded-[2rem] transition-all duration-500 ${activeCategory === cat.id ? "text-white" : "text-primary/50 hover:text-primary"}`}>
              {activeCategory === cat.id && (
                <motion.div layoutId="activeTab" className="absolute inset-0 bg-primary shadow-xl" style={{ borderRadius: "2rem" }} transition={{ type: "spring", bounce: 0.1, duration: 0.6 }} />
              )}
              <cat.icon size={14} className="relative z-10" />
              <span className="relative z-10 font-black text-[10px] uppercase tracking-widest leading-none">{cat.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }}>
            
            {/* --- ABA 1: CONCEITO --- */}
            {activeCategory === 'conceito' && (
              <div className="space-y-12">
                <section className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-primary/10">
                    <div className="relative h-60 w-full"><Image src="/images/bonus_embalagens.png" alt="Kraft Elite" fill className="object-cover" /></div>
                    <div className="p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-10 w-10 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary"><Layers size={22} /></div>
                            <div><h3 className="text-xl font-black text-primary tracking-tight">Arquitetura de Marca</h3><p className="text-[10px] font-black text-primary/50 uppercase tracking-widest leading-none">Minimalismo Rústico Profundo</p></div>
                        </div>
                        
                        <div className="space-y-8">
                            <div>
                                <h4 className="font-black text-[13px] text-secondary uppercase tracking-widest mb-3">01. O Poder da Gramatura (240g+)</h4>
                                <p className="text-[14px] text-primary leading-relaxed font-medium">No mercado de doces, a gramatura (espessura) do papel define o preço percebido. O Kraft de <strong>240g a 300g</strong> dá autoridade à caixa, protege o doce e cria um som "premium" ao abrir. Fuja de papeis finos que parecem descartáveis.</p>
                            </div>

                            <div className="bg-primary/[0.03] p-6 rounded-[2.5rem] border-l-4 border-secondary shadow-sm">
                                <h4 className="font-black text-[11px] text-primary uppercase mb-3 flex items-center gap-2"><Palette size={14} className="text-secondary" /> A Paleta Cromática do Lucro</h4>
                                <p className="text-[13px] text-primary leading-relaxed font-semibold mb-4"><strong>Terra, Ocre e Terracota:</strong> São tons que estimulam o apetite e a memória afetiva. Use carimbos manuais com tinta preta ou marrom fosca.</p>
                                <div className="flex gap-2">
                                    <div className="h-4 w-12 rounded-full bg-[#8B4513] shadow-md" />
                                    <div className="h-4 w-12 rounded-full bg-[#CD853F] shadow-md" />
                                    <div className="h-4 w-12 rounded-full bg-primary shadow-md" />
                                </div>
                            </div>

                            <div className="p-7 bg-amber-50 rounded-[2.5rem] border border-amber-200 flex gap-4 shadow-sm">
                                <AlertCircle size={28} className="text-amber-600 shrink-0" />
                                <div>
                                    <h5 className="text-[11px] font-black text-amber-900 uppercase mb-1">Dica Técnica: Papel Manteiga</h5>
                                    <p className="text-[13px] text-amber-950 leading-relaxed font-bold italic"><strong>Erro Fatal:</strong> Nunca encoste o doce direto no Kraft. A gordura do bolo de milho mancha o papel em minutos, destruindo a estética. Use sempre papel manteiga plissado.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
              </div>
            )}

            {/* --- ABA 2: KITS & ROI --- */}
            {activeCategory === 'kits' && (
              <div className="space-y-12">
                <section>
                    <div className="flex items-center gap-4 mb-8 pl-2 font-black text-primary uppercase tracking-tighter">
                        <TrendingUp size={24} className="text-secondary" />
                        <div><h2 className="text-2xl leading-none">Psicologia de Venda</h2><p className="text-[10px] text-primary/60 tracking-widest mt-1 uppercase leading-none">Ancoragem e Escala de Valor</p></div>
                    </div>

                    <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-primary/10 mb-10">
                        <div className="relative h-64 w-full"><Image src="/images/box_degustacao.png" alt="Box" fill className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" /><div className="absolute bottom-6 left-6"><span className="text-[10px] font-black text-white uppercase bg-secondary px-4 py-2 rounded-full shadow-xl">Produto Decisionário (Ticket Médio)</span></div></div>
                        <div className="p-9">
                            <h4 className="text-2xl font-black text-primary mb-4 leading-none">Box Degustação Luxo</h4>
                            <p className="text-[14px] text-primary font-bold italic mb-8 border-l-2 border-secondary pl-4 leading-relaxed">"O objetivo deste kit não é apenas lucro, é converter o cliente para festas maiores."</p>
                            
                            <div className="space-y-8">
                                <div><h5 className="text-[12px] font-black text-primary/70 uppercase mb-3 tracking-widest border-b border-primary/5 pb-1">Insight de Montagem (80g):</h5><p className="text-[14px] text-primary leading-relaxed font-medium">Manter as porções em 80g permite que o cliente experimente 4 sabores sem enjoar. Use forminhas plissadas para manter tudo limpo dentro da caixa.</p></div>
                                <div className="p-6 bg-secondary text-white rounded-[2.5rem] shadow-xl flex items-center justify-between"><div className="flex items-center gap-3"><Zap size={22} className="text-primary" /> <span className="text-[12px] font-black uppercase leading-none mt-1">ROI Sugerido:</span></div><span className="text-xl font-black">400% Real</span></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-primary p-10 rounded-[4rem] shadow-2xl text-white relative overflow-hidden mb-12 border-b-8 border-secondary">
                         <div className="relative z-10 space-y-8">
                            <div className="flex justify-between items-start">
                                <div><h4 className="text-3xl font-black mb-1">A Cesta High-End</h4><p className="text-[11px] font-black text-secondary uppercase tracking-[0.3em]">Ticket Único: R$ 145 - R$ 180</p></div>
                                <ShoppingCart size={32} className="text-secondary" />
                            </div>
                            
                            <div className="space-y-8">
                                <div className="relative h-56 w-full rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10"><Image src="/images/cesta_luxo.png" alt="Cesta" fill className="object-cover" /></div>
                                
                                <div className="space-y-8">
                                    <div><h5 className="text-[13px] font-black text-secondary uppercase mb-3 tracking-widest border-b border-white/10 pb-1">Verticalidade (A Regra dos Olhos)</h5><p className="text-[14px] text-white leading-relaxed font-medium"><strong>Insight:</strong> Jamais coloque produtos planos na cesta. Use o "Ninho de Palha" para elevar os potes maiores. A verticalidade gera uma percepção de "Banquete Farto".</p></div>
                                    <div><h5 className="text-[13px] font-black text-secondary uppercase mb-3 tracking-widest border-b border-white/10 pb-1">Ancoragem Matemática</h5><p className="text-[14px] text-white leading-relaxed font-medium">Sempre mostre que a Cesta custa menos que os itens avulsos. Isso remove a "Dor do Pagamento" do cliente de Elite.</p></div>
                                </div>
                            </div>
                         </div>
                         <div className="absolute top-[-30%] right-[-20%] w-80 h-80 bg-secondary/10 blur-[100px] rounded-full" />
                    </div>
                </section>
              </div>
            )}

            {/* --- ABA 3: LOGÍSTICA --- */}
            {activeCategory === 'entrega' && (
              <div className="space-y-12">
                <section>
                    <div className="bg-white rounded-[4rem] overflow-hidden shadow-2xl border border-primary/10 mb-10">
                        <div className="relative h-72 w-full"><Image src="/images/delivery_safe.png" alt="Delivery" fill className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" /><div className="absolute bottom-6 left-8 flex gap-3"><span className="bg-success text-white text-[11px] font-black px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2"><CheckCircle2 size={14}/> Segurança Total</span></div></div>
                        <div className="p-10">
                            <div className="flex items-center gap-4 mb-8"><MessageSquareHeart size={32} className="text-secondary" /><h3 className="text-2xl font-black text-primary tracking-tight leading-none">Experiência<br/>Pós-Entrega</h3></div>
                            
                            <div className="space-y-10">
                                <div>
                                    <h5 className="text-[13px] font-black text-primary uppercase mb-4 tracking-widest flex items-center gap-2 underline decoration-secondary decoration-4 underline-offset-8">Branding Olfativo (O Segredo)</h5>
                                    <p className="text-[14px] text-primary leading-relaxed font-bold italic"><strong>Técnica Expert:</strong> Use 50% água + 50% álcool + 3 gotas de essência de Baunilha. Borrife nas ALÇAS da sacola. O perfume cria uma conexão imediata de "Doce Quentinho".</p>
                                </div>

                                <div className="p-8 bg-primary text-white rounded-[3rem] shadow-xl space-y-8">
                                    <h5 className="text-[12px] font-black text-secondary uppercase flex items-center gap-2 tracking-[0.2em]"><Clock size={16} /> Guia de Reaquecimento Profissional</h5>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center py-4 border-b border-white/10"><span className="text-[13px] font-bold text-white/80">Bolos de Milho / Pamonha:</span><span className="text-[13px] font-black text-secondary">15s + Copo d'água</span></div>
                                        <div className="flex justify-between items-center py-4 border-b border-white/10"><span className="text-[13px] font-bold text-white/80">Canjica / Curau Cremoso:</span><span className="text-[13px] font-black text-secondary">30s + Mexer manual</span></div>
                                        <p className="text-[11px] text-white/40 leading-relaxed font-bold text-center px-4 italic">"O reaquecimento técnico mantém a textura de 'recém-saído do forno' na casa do seu cliente."</p>
                                    </div>
                                </div>

                                <div className="bg-amber-100 p-8 rounded-[3rem] border-2 border-amber-300 shadow-sm relative overflow-hidden">
                                    <h5 className="text-[13px] font-black text-amber-900 uppercase mb-3 flex items-center gap-2"><BookOpenCheck size={20} className="text-amber-600"/> O Detalhe do QR Code</h5>
                                    <p className="text-[14px] text-amber-950 leading-relaxed font-bold"><strong>Estratégia:</strong> Cole um QR Code que leva para o seu Instagram ou um vídeo rápido agradecendo. Isso humaniza a marca e destrói qualquer chance de concorrência por preço.</p>
                                    <div className="absolute right-[-10%] top-[-10%] opacity-10"><BookOpenCheck size={120}/></div>
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
