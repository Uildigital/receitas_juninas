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
    ["rgba(255, 248, 240, 0)", "rgba(255, 248, 240, 0.95)"]
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
      className="pb-40 bg-[#FFF8F0] min-h-screen selection:bg-secondary/30 antialiased font-inter"
    >
      {/* Header Glassmorphism */}
      <motion.header 
        style={{ backgroundColor: headerBg }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-primary/5 p-4 flex items-center justify-between transition-colors duration-300"
      >
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack} 
            className="p-2.5 bg-white border border-primary/5 shadow-sm rounded-2xl text-primary active:scale-90 transition-transform"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="font-black text-[9px] text-primary/30 uppercase tracking-[0.3em] leading-none mb-1">Área de Bônus</h2>
            <p className="font-black text-[11px] text-primary uppercase tracking-widest leading-none">Design de Experiência</p>
          </div>
        </div>
        <div className="bg-secondary/10 px-3 py-1.5 rounded-xl border border-secondary/10">
            <span className="text-[10px] font-black text-secondary uppercase tracking-widest tracking-[0.2em] flex items-center gap-1"><Star size={10}/> Mentoria Premium</span>
        </div>
      </motion.header>
      
      {/* Hero Section */}
      <div className="relative h-[300px] w-full overflow-hidden shadow-2xl">
        <Image src="/images/bonus_embalagens.png" alt="Embalagens Elite" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F0] via-[#FFF8F0]/30 to-transparent" />
        <div className="absolute bottom-12 left-6 right-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <span className="bg-secondary text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] mb-4 inline-block shadow-2xl">
              <Sparkles size={10} className="inline mr-1 mb-0.5" /> Bônus Master Expert
            </span>
            <h1 className="text-4xl font-black text-primary tracking-tighter leading-[0.8] mb-2 text-balance">
                Embalagens que<br/><span className="text-secondary italic">Vendem Sozinhas</span>
            </h1>
            <p className="text-[11px] font-bold text-primary/40 uppercase tracking-widest max-w-[280px] leading-relaxed">Não é sobre papel, é sobre a psicologia do desejo na culinária junina.</p>
          </motion.div>
        </div>
      </div>

      <div className="px-5 max-w-xl mx-auto -mt-8 relative z-10">
        
        {/* Navigation Tabs (Segmented Control) */}
        <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-[2.5rem] shadow-2xl border border-primary/5 flex items-center mb-12">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id as any)} className={`relative flex-1 flex items-center justify-center gap-2 py-4 rounded-[2rem] transition-all duration-500 ${activeCategory === cat.id ? "text-white" : "text-primary/40 hover:text-primary"}`}>
              {activeCategory === cat.id && (
                <motion.div layoutId="activeTab" className="absolute inset-0 bg-primary shadow-xl" style={{ borderRadius: "2rem" }} transition={{ type: "spring", bounce: 0.15, duration: 0.6 }} />
              )}
              <cat.icon size={14} className="relative z-10" />
              <span className="relative z-10 font-black text-[9px] uppercase tracking-widest">{cat.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }}>
            
            {/* --- ABA 1: CONCEITO & BRANDING --- */}
            {activeCategory === 'conceito' && (
              <div className="space-y-12">
                <section className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-primary/5">
                    <div className="relative h-60 w-full"><Image src="/images/bonus_embalagens.png" alt="Kraft Elite" fill className="object-cover" /></div>
                    <div className="p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-10 w-10 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary"><Layers size={22} /></div>
                            <div><h3 className="text-xl font-black text-primary tracking-tight">Arquitetura de Marca</h3><p className="text-[10px] font-black text-primary/30 uppercase tracking-widest">Minimalismo Rústico 2.0</p></div>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <h4 className="font-black text-sm text-primary uppercase tracking-widest text-secondary">A Base: Papel Kraft 240g+</h4>
                                <p className="text-xs text-primary/60 leading-relaxed font-medium">No mercado premium, a gramatura (espessura) do papel define o preço. Um papel fino passa "pobreza". Já o Kraft de 240g dá corpo à caixa, resiste à umidade dos doces e cria um som satisfatório ao abrir. É o segredo para cobrar R$ 45 num bolo que custou R$ 8.</p>
                            </div>

                            <div className="bg-primary/5 p-6 rounded-[2.5rem] border-l-4 border-secondary">
                                <h4 className="font-black text-[10px] text-primary uppercase mb-3 flex items-center gap-2"><Palette size={14} /> A Paleta do Desejo</h4>
                                <p className="text-[10px] text-primary/60 font-medium leading-relaxed mb-4"><strong>Terra, Ocre e Terracota:</strong> São as cores da culinária junina. Use carimbos em tinta preta fosca ou marrom café para as tags. Fuja de cores fluorescentes!</p>
                                <div className="flex gap-2">
                                    <div className="h-4 w-12 rounded-full bg-[#8B4513] shadow-sm" />
                                    <div className="h-4 w-12 rounded-full bg-[#CD853F] shadow-sm" />
                                    <div className="h-4 w-12 rounded-full bg-[#2A231F] shadow-sm" />
                                </div>
                            </div>

                            <div className="p-6 bg-amber-50 rounded-[2.5rem] border border-amber-100 flex gap-4">
                                <AlertCircle size={24} className="text-amber-500 shrink-0" />
                                <div><h5 className="text-[10px] font-black text-amber-900 uppercase mb-1">O Detalhe que Salva: Papel Manteiga</h5><p className="text-[10px] text-amber-900/60 font-medium leading-relaxed"><strong>Insight:</strong> Jamais coloque o bolo de milho direto no Kraft. A gordura mancha o papel em 10 minutos. Use uma base de papel manteiga plissado (dobradinho) entre o doce e a caixa.</p></div>
                            </div>
                        </div>
                    </div>
                </section>
              </div>
            )}

            {/* --- ABA 2: ESTRATÉGIA ROI & KITS --- */}
            {activeCategory === 'kits' && (
              <div className="space-y-12">
                <section>
                    <div className="flex items-center gap-4 mb-8 pl-2 font-black text-primary uppercase tracking-tighter">
                        <TrendingUp size={20} className="text-secondary" />
                        <div><h2 className="text-2xl leading-none">Psicologia de Venda</h2><p className="text-[10px] text-primary/30 tracking-widest mt-1">Ancoragem e Escala</p></div>
                    </div>

                    <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-primary/5 mb-10 group active:scale-[0.98] transition-all">
                        <div className="relative h-64 w-full"><Image src="/images/box_degustacao.png" alt="Box" fill className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" /><div className="absolute bottom-6 left-6"><span className="text-[10px] font-black text-secondary uppercase bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">Produto de Entrada</span></div></div>
                        <div className="p-8">
                            <h4 className="text-xl font-black text-primary mb-3">Box "Menu Arraiá"</h4>
                            <p className="text-xs text-primary/60 leading-relaxed font-medium mb-8 italic">"Venda a facilidade de experimentar tudo do seu cardápio em um só kit."</p>
                            <div className="space-y-6">
                                <div><h5 className="text-[11px] font-black text-primary uppercase mb-3 tracking-widest opacity-40">O Insight de Venda:</h5><p className="text-xs text-primary/60 leading-relaxed font-medium">Use porções de <strong>80g</strong>. Menos que isso parece pouco, mais que isso enjoa. O objetivo deste kit é a <strong>Degustação Decisiva</strong> para o cliente encomendar festas maiores.</p></div>
                                <div className="p-5 bg-secondary/10 rounded-3xl border border-secondary/10 flex items-center justify-between"><div className="flex items-center gap-3"><Zap size={18} className="text-secondary" /> <span className="text-[11px] font-black text-primary uppercase">ROI Sugerido:</span></div><span className="text-sm font-black text-primary">400% por Unidade</span></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-primary p-10 rounded-[4rem] shadow-2xl text-white relative overflow-hidden mb-12">
                         <div className="relative z-10 space-y-8">
                            <div className="flex justify-between items-start">
                                <div><h4 className="text-2xl font-black mb-1">Cesta High-End</h4><p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Estratégia Gift (Presente)</p></div>
                                <ShoppingCart size={28} className="text-secondary" />
                            </div>
                            
                            <div className="space-y-6">
                                <div className="relative h-48 w-full rounded-[2.5rem] overflow-hidden shadow-inner border border-white/10"><Image src="/images/cesta_luxo.png" alt="Cesta" fill className="object-cover" /></div>
                                
                                <div className="space-y-6">
                                    <div><h5 className="text-[11px] font-black text-secondary uppercase mb-2">Verticalidade Visual (A Regra de Ouro)</h5><p className="text-xs text-white/50 leading-relaxed"><strong>Insight Elite:</strong> Nunca coloque os itens todos no mesmo nível. Use "ninhos" de palha para elevar os potes do fundo. Cestas com itens em diferentes alturas transmitem um valor percebido 40% maior.</p></div>
                                    <div><h5 className="text-[11px] font-black text-secondary uppercase mb-2">Ancoragem de Preço</h5><p className="text-xs text-white/50 leading-relaxed">Divulgue a cesta como um kit que economiza 20% em relação aos itens avulsos. O cliente sente que está lucrando ao comprar de você.</p></div>
                                </div>
                            </div>
                         </div>
                         <div className="absolute top-[-30%] right-[-20%] w-80 h-80 bg-secondary/10 blur-[100px] rounded-full" />
                    </div>
                </section>
              </div>
            )}

            {/* --- ABA 3: LOGÍSTICA & EXPERIÊNCIA --- */}
            {activeCategory === 'entrega' && (
              <div className="space-y-12">
                <section>
                    <div className="bg-white rounded-[4rem] overflow-hidden shadow-2xl border border-primary/5 mb-10">
                        <div className="relative h-72 w-full"><Image src="/images/delivery_safe.png" alt="Delivery" fill className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" /><div className="absolute bottom-6 left-8 flex gap-3"><span className="bg-success text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl">Higiene & Luxo</span></div></div>
                        <div className="p-10">
                            <div className="flex items-center gap-4 mb-8"><MessageSquareHeart size={28} className="text-accent" /><h3 className="text-2xl font-black text-primary tracking-tight">Experiência Decisiva</h3></div>
                            
                            <div className="space-y-8">
                                <div>
                                    <h5 className="text-[11px] font-black text-primary uppercase mb-4 tracking-widest flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-secondary"/> O Branding Olfativo</h5>
                                    <p className="text-xs text-primary/60 leading-relaxed font-medium"><strong>Insight Técnico:</strong> Borrife uma solução de 50% água, 50% álcool de cereais e 2 gotas de extrato de baunilha na ALÇA externa da sacola. O cliente sente o aroma ao retirar da mão do entregador. O cérebro antecipa o sabor e ignora o preço pago.</p>
                                </div>

                                <div className="p-8 bg-primary/5 rounded-[3rem] border border-primary/5 space-y-6">
                                    <h5 className="text-[11px] font-black text-primary uppercase flex items-center gap-2"><Clock size={16} className="text-secondary" /> Manual de Reaquecimento Expert</h5>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center py-3 border-b border-primary/10"><span className="text-[10px] font-bold text-primary/70">Bolos e Tortas:</span><span className="text-[10px] font-black text-primary">15s + Copo d'água</span></div>
                                        <div className="flex justify-between items-center py-3 border-b border-primary/10"><span className="text-[10px] font-bold text-primary/70">Canjicas e Cremes:</span><span className="text-[10px] font-black text-primary">30s + Mexer manual</span></div>
                                        <p className="text-[9px] text-primary/40 leading-relaxed italic">"O reaquecimento correto garante que o sabor artesanal da sua cozinha seja o mesmo na casa do cliente."</p>
                                    </div>
                                </div>

                                <div className="bg-[#14110F] p-8 rounded-[3rem] text-white">
                                    <h5 className="text-xs font-black text-secondary uppercase mb-4 flex items-center gap-2"><BookOpenCheck size={18}/> O QR Code de Fidelidade</h5>
                                    <p className="text-[11px] text-white/50 leading-relaxed"><strong>Dica Elite:</strong> Coloque um cartão com QR Code que leva para um vídeo seu agradecendo a compra e ensinando a servir os doces. Isso cria uma barreira emocional imbatível contra a concorrência.</p>
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
