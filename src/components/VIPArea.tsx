"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { 
  ChevronLeft, 
  Clock, 
  ChefHat, 
  Coins, 
  CheckCircle2, 
  ArrowRight,
  X,
  Plus,
  Minus,
  Search,
  Sparkles,
  Menu,
  Trophy,
  LayoutDashboard,
  BookOpen,
  Gift,
  Calculator,
  Package,
  ScrollText,
  ArrowUpRight,
  Target,
  Activity,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import recipesData from "@/data/receitas.json";
import dynamic from "next/dynamic";

// --- Lazy loaded Modals ---
const UpsellModal = dynamic(() => import("./Modals").then(m => m.UpsellModal), { ssr: false });
const SuccessModal = dynamic(() => import("./Modals").then(m => m.SuccessModal), { ssr: false });
const SidebarDrawer = dynamic(() => import("./Modals").then(m => m.SidebarDrawer), { ssr: false });
const ScriptsWhatsApp = dynamic(() => import("./bonuses/ScriptsWhatsApp"));
const GuiaEmbalagens = dynamic(() => import("./bonuses/GuiaEmbalagens"));
const ControleEstoque = dynamic(() => import("./bonuses/ControleEstoque"));

interface Recipe {
  id: number;
  titulo: string;
  categoria: string;
  imagem: string;
  tempo: string;
  dificuldade: string;
  custo: string;
  ingredientes: string[];
  preparo: string[];
  rendimento?: string;
}

export default function VIPArea() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'recipes' | 'bonuses'>('dashboard');
  const [activeBonus, setActiveBonus] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("🌽 Clássicos");
  const [yieldMultiplier, setYieldMultiplier] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUpsellModal, setShowUpsellModal] = useState(false);

  const categories = useMemo(() => ["Todas", ...new Set((recipesData as Recipe[]).map(r => r.categoria))], []);
  
  useEffect(() => {
    const saved = localStorage.getItem("receitas-progress");
    if (saved) {
      try { setCompletedItems(JSON.parse(saved)); } catch (e) { console.error("Error loading progress", e); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("receitas-progress", JSON.stringify(completedItems));
  }, [completedItems]);

  const toggleItem = (recipeId: number, type: "ing" | "step", index: number) => {
    const key = `${recipeId}-${type}-${index}`;
    const newCompleted = { ...completedItems, [key]: !completedItems[key] };
    setCompletedItems(newCompleted);
    
    if (newCompleted[key]) {
      const recipe = (recipesData as Recipe[]).find(r => r.id === recipeId);
      if (recipe) {
        const total = recipe.ingredientes.length + recipe.preparo.length;
        const done = Object.keys(newCompleted).filter(k => k.startsWith(`${recipeId}-`) && newCompleted[k]).length;
        if (done === total) triggerSuccess();
      }
    }
  };

  const triggerSuccess = async () => {
    const confetti = (await import("canvas-confetti")).default;
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => setShowSuccessModal(true), 800);
  };

  const filteredRecipes = useMemo(() => {
    return (recipesData as Recipe[]).filter(recipe => {
      const matchesSearch = recipe.titulo.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "Todas" || recipe.categoria === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const completedCount = Array.from(new Set(Object.keys(completedItems).map(k => k.split('-')[0]))).length;
  const globalProgress = Math.round((completedCount / recipesData.length) * 100);

  return (
    <main className="min-h-screen bg-[#FFF8F0] selection:bg-secondary/30 antialiased overflow-x-hidden">
      <AnimatePresence>
        {isMenuOpen && (
          <SidebarDrawer 
            isOpen={isMenuOpen} 
            onClose={() => setIsMenuOpen(false)}
            categories={categories}
            activeCategory={activeCategory}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onSelectCategory={(cat: string) => { setActiveCategory(cat); setActiveTab('recipes'); setIsMenuOpen(false); }}
            globalProgress={globalProgress}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {selectedRecipe ? (
          <RecipeDetailView 
            recipe={selectedRecipe} 
            onBack={() => setSelectedRecipe(null)} 
            completedItems={completedItems}
            toggleItem={toggleItem}
            yieldMultiplier={yieldMultiplier}
            setYieldMultiplier={setYieldMultiplier}
          />
        ) : activeTab === 'dashboard' ? (
            <DashboardView 
              globalProgress={globalProgress} 
              completedCount={completedCount}
              totalCount={recipesData.length}
              onNavigate={(tab: any) => setActiveTab(tab)}
            />
        ) : activeTab === 'recipes' ? (
          <RecipesListView 
            recipes={filteredRecipes} 
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onOpenMenu={() => setIsMenuOpen(true)}
            onSelect={(r: Recipe) => { setYieldMultiplier(1); setSelectedRecipe(r); }} 
            isDone={(id: number) => Object.keys(completedItems).filter(k => k.startsWith(`${id}-`) && completedItems[k]).length === 100} // Simplified
          />
        ) : activeTab === 'bonuses' && activeBonus === 'scripts' ? (
            <ScriptsWhatsApp onBack={() => setActiveBonus(null)} />
        ) : activeTab === 'bonuses' && activeBonus === 'embalagens' ? (
            <GuiaEmbalagens onBack={() => setActiveBonus(null)} />
        ) : activeTab === 'bonuses' && activeBonus === 'estoque' ? (
            <ControleEstoque onBack={() => setActiveBonus(null)} />
        ) : (
            <BonusesView 
              onBack={() => setActiveTab('dashboard')} 
              onSelect={(bonusId: string) => setActiveBonus(bonusId)} 
            />
        )}
      </AnimatePresence>

      {/* Floating Bottom Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-primary/90 backdrop-blur-xl border border-white/10 rounded-full p-2 flex items-center gap-1 shadow-2xl">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Início' },
            { id: 'recipes', icon: BookOpen, label: 'Receitas' },
            { id: 'bonuses', icon: Gift, label: 'Bônus' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { 
                setActiveTab(tab.id as any); 
                setSelectedRecipe(null); 
                setActiveBonus(null); 
              }}
              className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all ${activeTab === tab.id ? "bg-secondary text-white shadow-lg" : "text-white/40 hover:text-white"}`}
            >
              <tab.icon size={18} />
              {activeTab === tab.id && <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>}
            </button>
          ))}
        </div>
      </div>

      <UpsellModal isOpen={showUpsellModal} onClose={() => setShowUpsellModal(false)} />
      <SuccessModal isOpen={showSuccessModal} onClose={() => { setShowSuccessModal(false); setSelectedRecipe(null); }} />
    </main>
  );
}

// Subcomponents extracted for better readability and performance
function DashboardView({ globalProgress, completedCount, totalCount, onNavigate }: any) {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-6 max-w-lg mx-auto pb-32 pt-12">
          <header className="mb-10">
            <div className="flex items-center justify-between mb-8">
               <div className="flex flex-col"><span className="text-secondary font-black text-[10px] uppercase tracking-[0.4em] mb-1">Boas-vindas, Mestre</span><h1 className="text-4xl font-black text-primary tracking-tight">Seu Arraiá VIP</h1></div>
               <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-secondary shadow-xl border border-primary/5"><ChefHat size={24} /></div>
            </div>
            <div className="bg-primary p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6"><span className="text-[10px] font-black uppercase tracking-widest text-white/40">Progresso Geral</span><span className="text-3xl font-black">{globalProgress}%</span></div>
                <div className="h-2 w-full bg-white/10 rounded-full mb-6 overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${globalProgress}%` }} className="h-full bg-secondary" /></div>
                <p className="text-sm font-medium text-white/60">Você já domina <span className="text-white font-black">{completedCount}</span> de <span className="text-white font-black">{totalCount}</span> segredos juninos.</p>
              </div>
            </div>
          </header>
          <div className="grid grid-cols-2 gap-4">
             <button onClick={() => onNavigate('recipes')} className="bg-white p-6 rounded-[2.5rem] border border-primary/5 shadow-xl text-left"><BookOpen size={24} className="text-secondary mb-6" /><h3 className="font-black text-primary text-sm uppercase">Receitas</h3></button>
             <button onClick={() => onNavigate('bonuses')} className="bg-white p-6 rounded-[2.5rem] border border-primary/5 shadow-xl text-left"><Gift size={24} className="text-accent mb-6" /><h3 className="font-black text-primary text-sm uppercase">Bônus</h3></button>
          </div>
        </motion.div>
    );
}

function RecipesListView({ recipes, categories, activeCategory, setActiveCategory, searchQuery, setSearchQuery, onOpenMenu, onSelect }: any) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 max-w-lg mx-auto pb-32">
      <div className="fixed top-0 left-0 right-0 z-40 bg-[#FFF8F0]/95 backdrop-blur-lg border-b border-primary/5 px-6 py-4 flex items-center justify-between">
         <button onClick={onOpenMenu} className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-lg border border-primary/5"><Menu size={20} /></button>
         <span className="font-black text-[10px] uppercase tracking-[0.4em] text-primary">Web Book</span>
         <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-[10px] font-black text-primary">{recipes.length}</div>
      </div>
      <header className="mt-20 mb-8">
        <h1 className="text-4xl font-black text-primary mb-4 tracking-tight">{activeCategory}</h1>
        <div className="relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={16} /><input type="text" placeholder="Filtrar por nome..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full h-12 bg-white rounded-2xl pl-12 pr-4 outline-none border border-primary/5 font-black text-xs uppercase" /></div>
      </header>
      <div className="grid gap-6">
        {recipes.map((r: any) => (
          <div key={r.id} onClick={() => onSelect(r)} className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-primary/5 cursor-pointer active:scale-95 transition-all">
            <div className="relative h-48 w-full"><Image src={r.imagem} alt={r.titulo} fill className="object-cover" /></div>
            <div className="p-6"><h3 className="font-black text-xl text-primary leading-tight">{r.titulo}</h3></div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function RecipeDetailView({ recipe, onBack, completedItems, toggleItem, yieldMultiplier, setYieldMultiplier }: any) {
    const [detailTab, setDetailTab] = useState<'cozinha' | 'lucro' | 'dicas'>('cozinha');
    const [calcData, setCalcData] = useState<Record<number, { price: string; totalQty: string; usedQty: string }>>({});
    const [extraCosts, setExtraCosts] = useState({ gas: '2', labor: '5', energy: '1', packaging: '3', sellMultiplier: '3' });
    const [monthlyGoal, setMonthlyGoal] = useState('2000');

    // Inicializa pesos sugeridos do JSON se vazio
    useEffect(() => {
        const initial: any = {};
        recipe.ingredientes.forEach((ing: string, i: number) => {
            const match = ing.match(/(\d+)(g|ml)/i);
            initial[i] = { price: '', totalQty: match ? match[1] : '1000', usedQty: match ? match[1] : '100' };
        });
        setCalcData(initial);
    }, [recipe]);

    const totalIngCost = Object.values(calcData).reduce((acc, item) => {
        const p = parseFloat(item.price.replace(',', '.'));
        const t = parseFloat(item.totalQty.replace(',', '.'));
        const u = parseFloat(item.usedQty.replace(',', '.'));
        if (isNaN(p) || isNaN(t) || isNaN(u) || t === 0) return acc;
        return acc + (p / t) * u;
    }, 0);

    const extrasSum = parseFloat(extraCosts.gas) + parseFloat(extraCosts.labor) + parseFloat(extraCosts.energy) + parseFloat(extraCosts.packaging);
    const costPerRecipe = (totalIngCost + extrasSum) * yieldMultiplier;
    const sellPrice = costPerRecipe * parseFloat(extraCosts.sellMultiplier);
    const profitPerRecipe = sellPrice - costPerRecipe;
    const unitsToGoal = profitPerRecipe > 0 ? Math.ceil(parseFloat(monthlyGoal) / profitPerRecipe) : 0;

    return (
      <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="pb-48 bg-[#FFF8F0] min-h-screen">
        {/* Header Elite */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-primary/5 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 bg-primary/10 rounded-xl text-primary active:scale-90 transition-transform"><ChevronLeft size={24} /></button>
            <h2 className="font-black text-sm text-primary truncate max-w-[200px] leading-tight">{recipe.titulo}</h2>
          </div>
          <div className="flex bg-primary/5 p-1 rounded-xl border border-primary/10">
              {['cozinha', 'lucro', 'dicas'].map((t: any) => (
                  <button key={t} onClick={() => setDetailTab(t)} className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${detailTab === t ? "bg-primary text-white shadow-lg" : "text-primary/40"}`}>
                      {t === 'cozinha' ? <ChefHat size={14}/> : t === 'lucro' ? <Calculator size={14}/> : <Sparkles size={14}/>}
                  </button>
              ))}
          </div>
        </header>

        <div className="relative h-[35vh] w-full">
            <Image src={recipe.imagem} alt={recipe.titulo} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F0] via-transparent to-transparent" />
        </div>

        <div className="px-6 -mt-6 relative z-10 max-w-lg mx-auto">
          <AnimatePresence mode="wait">
            
            {/* ======================================================== */}
            {/* ABA: COZINHA (PREPARO) */}
            {/* ======================================================== */}
            {detailTab === 'cozinha' && (
              <motion.div key="cozinha" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
                <section className="bg-primary text-white p-8 rounded-[3rem] shadow-2xl relative overflow-hidden border-b-8 border-secondary">
                    <div className="relative z-10 flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-black mb-1 flex items-center gap-2 tracking-tight"><Calculator size={22} className="text-secondary" /> Escala de Produção</h3>
                            <p className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">Multiplicador Inteligente</p>
                        </div>
                        <div className="flex items-center gap-1 bg-white/10 p-1.5 rounded-2.5rem">
                            <button onClick={() => setYieldMultiplier(Math.max(1, yieldMultiplier - 1))} className="h-10 w-10 bg-white/10 rounded-2xl flex items-center justify-center active:scale-90"><Minus size={18} /></button>
                            <div className="px-4 text-center min-w-[60px]"><span className="text-2xl font-black text-secondary leading-none">{yieldMultiplier}x</span></div>
                            <button onClick={() => setYieldMultiplier(yieldMultiplier + 1)} className="h-10 w-10 bg-secondary rounded-2xl flex items-center justify-center text-primary active:scale-90"><Plus size={18} /></button>
                        </div>
                    </div>
                </section>

                <section className="bg-white p-8 rounded-[3rem] shadow-2xl border border-primary/5">
                    <h3 className="text-2xl font-black text-primary mb-6">Ingredientes</h3>
                    <div className="space-y-3">
                    {recipe.ingredientes.map((ing: string, i: number) => (
                        <div key={i} onClick={() => toggleItem(recipe.id, "ing", i)} className={`flex items-center gap-4 p-5 rounded-2xl border transition-all cursor-pointer ${completedItems[`${recipe.id}-ing-${i}`] ? "bg-secondary/5 opacity-40 grayscale" : "bg-white border-primary/5 shadow-sm active:scale-[0.98]"}`}>
                        <div className={`h-6 w-6 rounded-lg border-2 flex items-center justify-center shrink-0 ${completedItems[`${recipe.id}-ing-${i}`] ? "bg-secondary border-secondary text-white" : "border-primary/10"}`}>{completedItems[`${recipe.id}-ing-${i}`] && <CheckCircle2 size={16} />}</div>
                        <span className="text-[14px] font-bold text-primary leading-tight">{yieldMultiplier > 1 && <span className="text-secondary mr-2">{yieldMultiplier}x</span>}{ing}</span>
                        </div>
                    ))}
                    </div>
                </section>

                <section className="bg-white p-8 rounded-[3rem] shadow-2xl border border-primary/5">
                    <h3 className="text-2xl font-black text-primary mb-8 flex items-center gap-3"><ChefHat size={28} className="text-secondary" /> Passo a Passo</h3>
                    <div className="space-y-8">
                    {recipe.preparo.map((step: string, i: number) => (
                        <div key={i} onClick={() => toggleItem(recipe.id, "step", i)} className={`flex gap-5 p-6 rounded-[2.5rem] border transition-all cursor-pointer ${completedItems[`${recipe.id}-step-${i}`] ? "bg-secondary/5 opacity-40 grayscale" : "bg-white border-primary/5 shadow-sm active:scale-[0.98]"}`}>
                        <div className={`h-10 w-10 shrink-0 rounded-2xl flex items-center justify-center font-black text-lg ${completedItems[`${recipe.id}-step-${i}`] ? "bg-secondary text-white" : "bg-primary/5 text-primary"}`}>{i + 1}</div>
                        <p className="text-[15px] font-bold leading-relaxed text-primary/90">{step}</p>
                        </div>
                    ))}
                    </div>
                </section>
              </motion.div>
            )}

            {/* ======================================================== */}
            {/* ABA: LUCRO REAL (SIMULADOR AVANÇADO) */}
            {/* ======================================================== */}
            {detailTab === 'lucro' && (
              <motion.div key="lucro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
                <div className="bg-success text-white p-8 rounded-[3rem] shadow-2xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-black mb-1 flex items-center gap-2"><Calculator size={24} /> Simulador ROI Expert</h3>
                        <p className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em]">Sua empresa, seus números.</p>
                    </div>
                    <div className="absolute top-[-40%] right-[-10%] w-48 h-48 bg-white/10 blur-[50px] rounded-full" />
                </div>

                <section className="bg-white p-8 rounded-[3rem] shadow-2xl border border-primary/10">
                    <h4 className="text-[10px] font-black text-primary/40 uppercase tracking-widest mb-6 pl-2">1. Insumos (Preço e Medida Total):</h4>
                    <div className="space-y-4">
                        {recipe.ingredientes.map((ing: string, i: number) => (
                            <div key={i} className="bg-primary/[0.02] p-6 rounded-[2.5rem] border border-primary/5 space-y-4">
                                <span className="text-[13px] font-black text-primary block leading-tight">{ing}</span>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-white p-3 rounded-xl border border-primary/10">
                                        <span className="text-[8px] font-black uppercase text-primary/30 block mb-1">Preço Pago (R$)</span>
                                        <input type="text" value={calcData[i]?.price || ''} onChange={(e) => setCalcData({...calcData, [i]: {...calcData[i], price: e.target.value}})} className="w-full bg-transparent outline-none font-black text-xs" placeholder="0,00" />
                                    </div>
                                    <div className="bg-white p-3 rounded-xl border border-primary/10">
                                        <span className="text-[8px] font-black uppercase text-primary/30 block mb-1">Peso Total (g/ml)</span>
                                        <input type="text" value={calcData[i]?.totalQty || ''} onChange={(e) => setCalcData({...calcData, [i]: {...calcData[i], totalQty: e.target.value}})} className="w-full bg-transparent outline-none font-black text-xs" placeholder="1000" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-white p-8 rounded-[3rem] shadow-2xl border border-primary/10">
                    <h4 className="text-[10px] font-black text-primary/40 uppercase tracking-widest mb-6 pl-2">2. Custos Indiretos (Por Receita):</h4>
                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(extraCosts).map(([key, val]) => (
                            key !== 'sellMultiplier' && (
                                <div key={key} className="bg-primary/[0.02] p-4 rounded-2xl border border-primary/5">
                                    <span className="text-[8px] font-black uppercase text-primary/40 block mb-1">{key === 'gas' ? 'Gás/Energia' : key === 'labor' ? 'Mão de Obra' : key === 'energy' ? 'Água/Diversos' : 'Embalagem/Tags'} (R$)</span>
                                    <input type="text" value={val} onChange={(e) => setExtraCosts({...extraCosts, [key]: e.target.value})} className="w-full bg-transparent outline-none font-black text-xs text-primary" />
                                </div>
                            )
                        ))}
                    </div>
                </section>

                <section className="bg-primary text-white p-10 rounded-[4rem] shadow-2xl space-y-8 relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex justify-between items-center bg-white/10 p-6 rounded-[2rem] border border-white/10 mb-6">
                            <div><span className="text-[10px] font-black uppercase text-white/50">Custo Total x{yieldMultiplier}</span><p className="text-3xl font-black">R$ {costPerRecipe.toFixed(2).replace('.', ',')}</p></div>
                            <div className="text-right">
                                <span className="text-[10px] font-black uppercase text-secondary">Margem Sugerida</span>
                                <select value={extraCosts.sellMultiplier} onChange={(e) => setExtraCosts({...extraCosts, sellMultiplier: e.target.value})} className="bg-secondary text-primary font-black px-3 py-1 rounded-lg outline-none ml-2 block">
                                    <option value="2">2x (Baixa)</option>
                                    <option value="2.5">2.5x (Média)</option>
                                    <option value="3">3x (Ideal)</option>
                                    <option value="4">4x (Premium)</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-xl font-black text-secondary flex items-center gap-2">🎯 Meta Mensal de Lucro</h4>
                            <div className="flex items-center gap-4 bg-white/5 p-6 rounded-[2.5rem] border border-white/10">
                                <div className="flex-1 text-center border-r border-white/10">
                                    <span className="text-[9px] font-black uppercase text-white/40 block mb-2">Quero Ganhar (Lucro)</span>
                                    <div className="flex items-center justify-center gap-1"><span className="text-xs font-black opacity-40">R$</span><input type="text" value={monthlyGoal} onChange={(e) => setMonthlyGoal(e.target.value)} className="bg-transparent border-b border-secondary/40 text-2xl font-black outline-none w-24 text-center text-secondary" /></div>
                                </div>
                                <div className="flex-1 text-center">
                                    <span className="text-[9px] font-black uppercase text-white/40 block mb-2">Meta de Vendas</span>
                                    <p className="text-3xl font-black">{unitsToGoal} un</p>
                                    <span className="text-[8px] font-black uppercase text-secondary tracking-widest">Desta Receita</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
              </motion.div>
            )}

            {/* ======================================================== */}
            {/* ABA: DICAS MASTER (CHEF'S CORNER) */}
            {/* ======================================================== */}
            {detailTab === 'dicas' && (
              <motion.div key="dicas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
                <div className="bg-secondary p-8 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-black text-primary mb-1 flex items-center gap-2 tracking-tighter"><Sparkles size={24} /> Chef's Corner</h3>
                        <p className="text-[10px] font-bold text-primary/50 uppercase tracking-[0.2em]">O diferencial que cobra caro.</p>
                    </div>
                    <Activity className="absolute bottom-[-10%] right-[-10%] text-primary/5" size={140} />
                </div>

                <div className="bg-white p-10 rounded-[4rem] shadow-2xl border border-primary/10 space-y-10 relative overflow-hidden text-primary">
                    <div className="space-y-4">
                        <h4 className="flex items-center gap-2 font-black text-sm uppercase tracking-widest text-secondary"><Zap size={18}/> O Grande Segredo</h4>
                        <p className="text-[15px] leading-relaxed font-bold italic border-l-4 border-secondary pl-6 py-2 bg-secondary/5 rounded-r-2xl">
                            "{recipe.segredo || "O segredo desta receita está no tempo exato de descanso para que a textura atinja o ponto de corte perfeito."}"
                        </p>
                    </div>

                    <div className="space-y-6 pt-10 border-t border-primary/5">
                        <h4 className="flex items-center gap-2 font-black text-sm uppercase tracking-widest text-secondary"><Activity size={18}/> Harmonização Premium</h4>
                        <p className="text-[14px] leading-relaxed text-primary/80 font-medium">
                            {recipe.harmonizacao || "Sugira aos seus clientes acompanhar com um café gourmet de torra média ou um chá de canela intenso para elevar o valor percebido do kit."}
                        </p>
                    </div>

                    <div className="p-8 bg-primary text-white rounded-[3rem] shadow-xl space-y-4">
                        <h4 className="flex items-center gap-3 text-secondary font-black text-sm uppercase tracking-widest leading-none mt-1"><Target size={18} /> Engenharia de Produto</h4>
                        <p className="text-[12px] text-white/60 leading-relaxed font-medium">
                            {recipe.diferencial || "Esta receita foi otimizada para manter a umidade por até 48 horas em temperatura ambiente, ideal para delivery e encomendas antecipadas."}
                        </p>
                    </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    );
}

function BonusesView({ onBack, onSelect }: any) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-6 max-w-lg mx-auto pb-32 pt-12">
      <header className="mb-10 flex items-center gap-4"><button onClick={onBack} className="p-2 bg-primary/10 rounded-xl"><ChevronLeft /></button><h1 className="text-4xl font-black text-primary tracking-tight">Meus Bônus</h1></header>
      
      <div onClick={() => onSelect('embalagens')} className="bg-gradient-to-br from-white to-amber-50 p-8 rounded-[3rem] border border-primary/10 shadow-2xl mb-6 cursor-pointer active:scale-95 transition-all relative overflow-hidden group">
        <Package size={32} className="text-secondary mb-6 relative z-10" />
        <h3 className="text-xl font-black mb-2 flex items-center justify-between relative z-10">Guia de Embalagens <ArrowRight size={20} className="text-primary group-hover:translate-x-2 transition-transform"/></h3>
        <p className="text-sm text-primary/60 font-medium relative z-10">Sua checklist interativa para valorizar o produto.</p>
      </div>

      <div onClick={() => onSelect('scripts')} className="bg-gradient-to-br from-white to-orange-50 p-8 rounded-[3rem] border border-primary/10 shadow-2xl mb-6 cursor-pointer active:scale-95 transition-all relative overflow-hidden group">
        <ScrollText size={32} className="text-accent mb-6" />
        <h3 className="text-xl font-black mb-2 flex items-center justify-between">Scripts WhatsApp <ArrowRight size={20} className="text-primary group-hover:translate-x-2 transition-transform"/></h3>
        <p className="text-sm text-primary/60 font-medium">Clique para acessar e copiar as mensagens prontas que vendem de verdade.</p>
      </div>

      <div onClick={() => onSelect('estoque')} className="bg-gradient-to-br from-white to-green-50 p-8 rounded-[3rem] border border-primary/10 shadow-2xl cursor-pointer active:scale-95 transition-all relative overflow-hidden group">
        <Target size={32} className="text-secondary mb-6 relative z-10" />
        <h3 className="text-xl font-black mb-2 flex items-center justify-between relative z-10">Organização de Estoque <ArrowRight size={20} className="text-primary group-hover:translate-x-2 transition-transform"/></h3>
        <p className="text-sm text-primary/60 font-medium relative z-10">Aprenda a gerenciar os seus insumos e evitar desperdícios.</p>
      </div>
    </motion.div>
  );
}
