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
  Crown,
  BarChart3,
  Percent,
  BookOpenCheck
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-44 bg-[#FFF8F0] min-h-screen antialiased">
      {/* Header Premium */}
      <motion.header style={{ backgroundColor: headerBg }} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-primary/10 p-4 flex items-center justify-between transition-colors duration-300">
        <button onClick={onBack} className="p-2.5 bg-white border border-primary/20 shadow-md rounded-2xl text-primary active:scale-95 transition-transform"><ChevronLeft size={20} /></button>
        <div className="bg-secondary px-3 py-1.5 rounded-xl shadow-lg border border-white/20"><span className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-1"><Star size={10}/> Mentoria Elite</span></div>
      </motion.header>
      
      {/* Hero Section */}
      <div className="relative w-full overflow-hidden pb-12">
        <div className="relative h-[300px] w-full">
            <Image src="/imagens/bonus_embalagens.png" alt="Embalagens Elite" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F0] to-transparent/10" />
        </div>
        <div className="px-5 -mt-20 relative z-20">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-8 rounded-[3rem] shadow-2xl border border-primary/5 text-center">
                <h1 className="text-3xl font-black text-primary tracking-tighter leading-none mb-3 font-outfit">Estratégia & <span className="text-secondary italic font-outfit">Lucratividade</span></h1>
                <p className="text-[12px] font-bold text-primary/50 uppercase tracking-[0.2em]">Onde o design encontra o faturamento real.</p>
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
                    <div className="relative h-64 w-full"><Image src="/imagens/bonus_embalagens.png" alt="Kraft Elite" fill className="object-cover" /></div>
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

            {/* --- ESTRATÉGIA ROI: ENRIQUECIMENTO MONUMENTAL --- */}
            {activeCategory === 'kits' && (
              <div className="space-y-12">
                <section>
                    <div className="flex items-center gap-4 mb-8 pl-2 font-black text-primary uppercase tracking-tighter">
                        <BarChart3 size={24} className="text-secondary" />
                        <div><h2 className="text-2xl leading-none">A Roda do Lucro</h2><p className="text-[10px] text-primary/60 tracking-widest mt-1 uppercase leading-none">Psicologia de Precificação Expert</p></div>
                    </div>

                    <div className="space-y-8">
                        {/* BOX DEGUSTAÇÃO - ENTRADA */}
                        <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-primary/10">
                            <div className="relative h-60 w-full"><Image src="/imagens/box_degustacao.png" alt="Box" fill className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" /><div className="absolute bottom-6 left-6 flex gap-2"><span className="bg-secondary text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest">Produto Decisionário</span></div></div>
                            <div className="p-10">
                                <h4 className="text-xl font-black text-primary mb-4">01. O "Peixe do Gancho" (Entry Ticket)</h4>
                                <p className="text-[14px] text-primary/70 leading-relaxed mb-6 font-medium">Use a Box de 80g para <strong>remover a trava de compra</strong> do cliente novo. Ele não quer arriscar R$ 100 em algo que não conhece. Ao vender a degustação por R$ 45, você inicia um relacionamento. <br/><br/><strong>Insight Elite:</strong> Se ele comprar 3 boxes de uma vez, dê o frete grátis. Você aumenta o volume e o cliente se sente um grande negociador.</p>
                            </div>
                        </div>

                        {/* CESTA LUXO - UPSELL */}
                        <div className="bg-primary p-10 rounded-[4rem] text-white shadow-[0_40px_80px_rgba(0,0,0,0.2)] relative overflow-hidden">
                            <div className="relative z-10 space-y-10">
                                <div className="flex justify-between items-start">
                                    <div className="bg-secondary/20 p-4 rounded-3xl border border-secondary/20"><ShoppingCart size={28} className="text-secondary" /></div>
                                    <div className="text-right"><h4 className="text-2xl font-black mb-1">Cesta Arraiá High-End</h4><p className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">Estratégia de Presenteáveis</p></div>
                                </div>
                                <div className="relative h-56 w-full rounded-[3rem] overflow-hidden border-2 border-white/5"><Image src="/imagens/cesta_luxo.png" alt="Cesta" fill className="object-cover" /></div>
                                <div className="space-y-8">
                                    <div>
                                        <h5 className="text-[12px] font-black text-secondary uppercase mb-3 flex items-center gap-2 tracking-[0.2em]"><Zap size={16}/> O Poder da Ancoragem</h5>
                                        <p className="text-[14px] text-white/70 leading-relaxed font-medium">Anunciar a Cesta de <strong>R$ 180,00</strong> primeiro no seu feed serve como <strong>âncora</strong>. Quando o cliente vê a Box por R$ 45,00, o cérebro dele a interpreta como "barata" instantaneamente. Sem a âncora do preço alto, ele acharia a box cara.</p>
                                    </div>
                                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                                        <h5 className="text-[11px] font-black text-white uppercase mb-2 tracking-widest flex items-center gap-2"><BarChart3 size={14} className="text-secondary"/> B2B: O Mercado das Empresas</h5>
                                        <p className="text-[11px] text-white/50 leading-relaxed font-medium italic">Empresas buscam cestas juninas para funcionários em Junho. Remova o preço unitário e foque em "Experiência da Empresa". Vender 50 cestas para um único CNPJ é o que vai te fazer mudar de patamar financeiro.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-secondary/5 blur-[80px] rounded-full" />
                        </div>

                        {/* MATRIZ DE ROI */}
                        <div className="bg-white p-10 rounded-[3.5rem] shadow-2xl border border-primary/10">
                            <h4 className="text-xl font-black text-primary mb-8 flex items-center gap-3"><Percent className="text-secondary" /> Matriz de Roi de Embalagem</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-4 border-b border-primary/5"><span className="text-[13px] font-bold text-primary/60">Investimento (Fita + Kraft + Tag):</span><span className="text-[14px] font-black text-primary">R$ 2,40</span></div>
                                <div className="flex justify-between items-center py-4 border-b border-primary/5"><span className="text-[13px] font-bold text-primary/60">Aumento no Ticket Médio:</span><span className="text-[14px] font-black text-secondary">+ R$ 12,50</span></div>
                                <div className="flex justify-between items-center py-4 text-primary bg-primary/5 px-6 rounded-2xl"><span className="text-[13px] font-black uppercase tracking-widest">Lucro Adicional por Unid:</span><span className="text-xl font-black">R$ 10,10</span></div>
                            </div>
                            <p className="text-[10px] text-primary/30 mt-6 text-center italic font-bold">"Em um volume de 100 pedidos, seu design te pagou R$ 1.010,00 a mais de lucro puro."</p>
                        </div>
                    </div>
                </section>
              </div>
            )}

            {/* --- LOGÍSTICA --- */}
            {activeCategory === 'entrega' && (
              <div className="space-y-12">
                 <section className="bg-white rounded-[4rem] overflow-hidden shadow-2xl border border-primary/5">
                    <div className="relative h-72 w-full"><Image src="/imagens/delivery_safe.png" alt="Delivery" fill className="object-cover" /></div>
                    <div className="p-10">
                        <div className="flex items-center gap-4 mb-8"><MessageSquareHeart size={32} className="text-secondary" /><h3 className="text-2xl font-black text-primary tracking-tight leading-none">Logística Elite</h3></div>
                        
                        <div className="space-y-12">
                            {/* REAQUECIMENTO DETALHADO */}
                            <div className="bg-primary text-white p-8 rounded-[3rem] shadow-xl relative overflow-hidden">
                                <div className="relative z-10">
                                    <h4 className="flex items-center gap-2 font-black text-lg mb-6 text-secondary uppercase tracking-tighter"><ThermometerSun size={24} /> O Segredo do Reaquecimento Técnico</h4>
                                    
                                    <div className="space-y-8">
                                        <div className="space-y-2">
                                            <h5 className="font-black text-[12px] text-white uppercase border-b border-white/10 pb-2">Bolo de Milho e Pamonha (Maciez Máxima)</h5>
                                            <p className="text-[13px] text-white/70 leading-relaxed font-medium">Jamais aqueça o bolo sozinho. O micro-ondas retira a umidade da massa, deixando-a "elástica". <strong>A técnica:</strong> Coloque o bolo em um prato e, ao lado dele, coloque um pequeno copo com 50ml de água. O vapor gerado atuará como uma mini camâra de hidratação, mantendo o bolo fofinho e com aspecto de recém-saído do forno por 15 segundos.</p>
                                        </div>

                                        <div className="space-y-2">
                                            <h5 className="font-black text-[12px] text-white uppercase border-b border-white/10 pb-2">Canjica, Curau e Cremes (Cremosidade de Colher)</h5>
                                            <p className="text-[13px] text-white/70 leading-relaxed font-medium">Após o resfriamento, o amido do milho endurece. Para reativar a textura sedosa, adicione uma colher de sopa de leite (ou leite de coco) sobre o creme e aqueça por 30 segundos. Após retirar, misture vigorosamente por 5 segundos. O leite novo se fundirá ao creme aquecido, removendo qualquer aspecto granulado.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-secondary/10 blur-[80px] rounded-full" />
                            </div>

                            {/* MIME E BRANDING OLFATIVO */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary"><HandHelping size={20} /></div>
                                    <h4 className="font-black text-lg text-primary tracking-tight">O Fator "UAU" na Entrega</h4>
                                </div>
                                <p className="text-[14px] text-primary/80 leading-relaxed font-medium"><strong>Branding Olfativo Técnico:</strong> Não borrife perfume. Misture 100ml de álcool de cereais com 3 gotas de essência de baunilha e 1 cravo-da-índia. Borrife exclusivamente na alça da sacola kraft. O álcool evaporará, mas a essência fixará na alça. Assim que o entregador estender a mão, o aroma ativará o paladar do cliente de forma inconsciente.</p>

                                <div className="bg-amber-100 p-8 rounded-[3rem] border-2 border-amber-300 shadow-sm relative overflow-hidden mt-6 flex gap-4 items-center">
                                    <BookOpenCheck size={36} className="text-amber-600 shrink-0"/>
                                    <div>
                                        <h5 className="text-[13px] font-black text-amber-900 uppercase mb-1">O Detalhe do QR Code</h5>
                                        <p className="text-[14px] text-amber-950 leading-relaxed font-bold">Cole um QR Code que leva para um vídeo rápido seu agradecendo. Isso humaniza a marca e destrói qualquer concorrência por preço.</p>
                                    </div>
                                    <div className="absolute right-[-5%] top-[-20%] opacity-10"><BookOpenCheck size={120}/></div>
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
