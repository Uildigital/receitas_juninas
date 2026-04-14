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
  Zap,
  ShoppingCart,
  Trash2,
  Store,
  Info
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
  const [activeTab, setActiveTab] = useState<'dashboard' | 'recipes' | 'bonuses' | 'shopping'>('dashboard');
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
        ) : activeTab === 'shopping' ? (
            <ShoppingView onBack={() => setActiveTab('dashboard')} />
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
            { id: 'shopping', icon: Package, label: 'Mercado' },
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
          <div className="grid grid-cols-1 gap-4">
             <button onClick={() => onNavigate('recipes')} className="group bg-white p-6 rounded-[2.5rem] border-2 border-primary/5 shadow-xl text-left flex items-center justify-between hover:border-secondary/20 transition-all">
                <div className="flex items-center gap-5">
                   <div className="h-14 w-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary"><BookOpen size={28} /></div>
                   <div>
                      <h3 className="font-black text-primary text-sm uppercase tracking-widest">Receitas de Ouro</h3>
                      <p className="text-[10px] text-primary/40 font-bold uppercase italic">Segredos do Arraiá</p>
                   </div>
                </div>
                <ArrowRight size={20} className="text-primary/10 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
             </button>

             <button onClick={() => onNavigate('shopping')} className="group bg-white p-6 rounded-[2.5rem] border-2 border-primary/5 shadow-xl text-left flex items-center justify-between hover:border-secondary/20 transition-all">
                <div className="flex items-center gap-5">
                   <div className="h-14 w-14 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500"><Package size={28} /></div>
                   <div>
                      <h3 className="font-black text-primary text-sm uppercase tracking-widest">Sistema de Lucro</h3>
                      <p className="text-[10px] text-primary/40 font-bold uppercase italic">Mercado & Produção</p>
                   </div>
                </div>
                <ArrowRight size={20} className="text-primary/10 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
             </button>

             <button onClick={() => onNavigate('bonuses')} className="group bg-white p-6 rounded-[2.5rem] border-2 border-primary/5 shadow-xl text-left flex items-center justify-between hover:border-accent/20 transition-all">
                <div className="flex items-center gap-5">
                   <div className="h-14 w-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent"><Gift size={28} /></div>
                   <div>
                      <h3 className="font-black text-primary text-sm uppercase tracking-widest">Meus Bônus</h3>
                      <p className="text-[10px] text-primary/40 font-bold uppercase italic">Extras de Elite</p>
                   </div>
                </div>
                <ArrowRight size={20} className="text-primary/10 group-hover:text-accent group-hover:translate-x-1 transition-all" />
             </button>
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

    // --- LÓGICA DE PERSISTÊNCIA GLOBAL ---
    
    // Função para salvar preço globalmente por nome do ingrediente
    const saveGlobalPrice = (ingName: string, price: string, totalQty: string) => {
        const saved = localStorage.getItem('webbook-global-prices');
        const prices = saved ? JSON.parse(saved) : {};
        // Limpa o nome do ingrediente (remove parênteses com pesos para busca genérica)
        const cleanName = ingName.split('(')[0].trim().toLowerCase();
        prices[cleanName] = { price, totalQty };
        localStorage.setItem('webbook-global-prices', JSON.stringify(prices));
    };

    // Inicializa dados com base no JSON e na Memória Global
    useEffect(() => {
        const saved = localStorage.getItem('webbook-global-prices');
        const globalPrices = saved ? JSON.parse(saved) : {};
        const initial: any = {};

        recipe.ingredientes.forEach((ing: string, i: number) => {
            const cleanName = ing.split('(')[0].trim().toLowerCase();
            const match = ing.match(/(\d+)(g|ml)/i);
            
            // Prioriza o que está na memória global, senão usa padrão do JSON
            initial[i] = { 
                price: globalPrices[cleanName]?.price || '', 
                totalQty: globalPrices[cleanName]?.totalQty || (match ? match[1] : '1000'), 
                usedQty: match ? match[1] : '100' 
            };
        });
        setCalcData(initial);
    }, [recipe]);

    const handlePriceUpdate = (index: number, field: 'price' | 'totalQty', value: string) => {
        const newData = { ...calcData, [index]: { ...calcData[index], [field]: value } };
        setCalcData(newData);
        
        // Salva na memória global para outras receitas usarem
        saveGlobalPrice(recipe.ingredientes[index], newData[index].price, newData[index].totalQty);
    };

    // --- CÁLCULOS ROI ---
    const totalIngCost = Object.values(calcData).reduce((acc, item) => {
        const p = parseFloat(item.price.replace(',', '.'));
        const t = parseFloat(item.totalQty.replace(',', '.'));
        const u = parseFloat(item.usedQty.replace(',', '.'));
        if (isNaN(p) || isNaN(t) || isNaN(u) || t === 0) return acc;
        return acc + (p / t) * u;
    }, 0);

    const extrasSum = (parseFloat(extraCosts.gas) || 0) + (parseFloat(extraCosts.labor) || 0) + (parseFloat(extraCosts.energy) || 0) + (parseFloat(extraCosts.packaging) || 0);
    const costPerRecipe = (totalIngCost + extrasSum) * yieldMultiplier;
    const sellPrice = costPerRecipe * parseFloat(extraCosts.sellMultiplier);
    const profitPerRecipe = sellPrice - costPerRecipe;
    const unitsToGoal = profitPerRecipe > 0 ? Math.ceil(parseFloat(monthlyGoal) / profitPerRecipe) : 0;

    return (
      <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="pb-48 bg-[#FFF8F0] min-h-screen">
        {/* Header Elite */}
        <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-primary/5 p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2.5 bg-primary/10 rounded-xl text-primary active:scale-90 transition-transform"><ChevronLeft size={20} /></button>
            <h2 className="font-black text-[13px] text-primary truncate max-w-[150px] leading-tight tracking-tight">{recipe.titulo}</h2>
          </div>
          <div className="flex bg-primary/5 p-1.5 rounded-2xl border border-primary/10">
              {[
                { id: 'cozinha', icon: ChefHat, label: 'Preparo' },
                { id: 'lucro', icon: Calculator, label: 'ROI' },
                { id: 'dicas', icon: Sparkles, label: 'Dicas' }
              ].map((t: any) => (
                  <button key={t.id} onClick={() => setDetailTab(t.id as any)} className={`flex items-center justify-center p-3 rounded-xl transition-all ${detailTab === t.id ? "bg-primary text-white shadow-xl scale-110" : "text-primary/30 hover:text-primary/60"}`}>
                      <t.icon size={20}/>
                  </button>
              ))}
          </div>
        </header>

        <div className="relative h-[30vh] w-full">
            <Image src={recipe.imagem} alt={recipe.titulo} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F0] via-transparent to-transparent" />
        </div>

        <div className="px-5 -mt-8 relative z-10 max-w-lg mx-auto">
          <AnimatePresence mode="wait">
            
            {detailTab === 'cozinha' && (
              <motion.div key="cozinha" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                <section className="bg-primary text-white p-6 rounded-[2.5rem] shadow-2xl relative overflow-hidden border-b-4 border-secondary/50">
                    <div className="relative z-10 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center text-secondary shadow-inner"><Calculator size={18} /></div>
                            <div>
                                <h3 className="text-sm font-black tracking-tight leading-none mb-1">Escala</h3>
                                <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Ajuste Rápido</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/5">
                            <button onClick={() => setYieldMultiplier(Math.max(1, yieldMultiplier - 1))} className="h-8 w-8 bg-white/10 rounded-lg flex items-center justify-center active:scale-90 transition-all"><Minus size={14} /></button>
                            <div className="px-3 text-center min-w-[50px]"><span className="text-xl font-black text-secondary leading-none">{yieldMultiplier}x</span></div>
                            <button onClick={() => setYieldMultiplier(yieldMultiplier + 1)} className="h-8 w-8 bg-secondary rounded-lg flex items-center justify-center text-primary active:scale-90 transition-all font-black"><Plus size={14} /></button>
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

            {detailTab === 'lucro' && (
              <motion.div key="lucro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
                <div className="bg-success text-white p-8 rounded-[3rem] shadow-2xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-black mb-1 flex items-center gap-2"><Calculator size={24} /> Simulador ROI Expert</h3>
                        <p className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em]">Memória inteligente de preços ativa ✅</p>
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
                                        <input type="text" value={calcData[i]?.price || ''} onChange={(e) => handlePriceUpdate(i, 'price', e.target.value)} className="w-full bg-transparent outline-none font-black text-xs" placeholder="0,00" />
                                    </div>
                                    <div className="bg-white p-3 rounded-xl border border-primary/10">
                                        <span className="text-[8px] font-black uppercase text-primary/30 block mb-1">Peso Total (g/ml)</span>
                                        <input type="text" value={calcData[i]?.totalQty || ''} onChange={(e) => handlePriceUpdate(i, 'totalQty', e.target.value)} className="w-full bg-transparent outline-none font-black text-xs" placeholder="1000" />
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
                                    <span className="text-[10px] font-black uppercase text-white/70 block mb-2">Quero Ganhar (Lucro)</span>
                                    <div className="flex items-center justify-center gap-1"><span className="text-xs font-black opacity-70">R$</span><input type="text" value={monthlyGoal} onChange={(e) => setMonthlyGoal(e.target.value)} className="bg-transparent border-b border-secondary/40 text-2xl font-black outline-none w-24 text-center text-secondary" /></div>
                                </div>
                                <div className="flex-1 text-center">
                                    <span className="text-[10px] font-black uppercase text-white/70 block mb-2">Meta de Vendas</span>
                                    <p className="text-3xl font-black">{unitsToGoal} un</p>
                                    <span className="text-[8px] font-black uppercase text-secondary tracking-widest">Desta Receita</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-[-30%] left-[-10%] w-48 h-48 bg-white/5 blur-[50px] rounded-full" />
                </section>
              </motion.div>
            )}

            {detailTab === 'dicas' && (
              <motion.div key="dicas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
                <div className="bg-secondary p-8 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-black text-white mb-1 flex items-center gap-2 tracking-tighter"><Sparkles size={24} /> Chef's Corner</h3>
                        <p className="text-[10px] font-bold text-white/80 uppercase tracking-[0.2em]">O diferencial que cobra caro.</p>
                    </div>
                    <Activity className="absolute bottom-[-10%] right-[-10%] text-primary/5" size={140} />
                </div>

                <div className="bg-white p-10 rounded-[4rem] shadow-2xl border border-primary/10 space-y-10 relative overflow-hidden text-primary">
                    <div className="space-y-4">
                        <h4 className="flex items-center gap-2 font-black text-sm uppercase tracking-widest text-secondary"><Zap size={18}/> O Grande Segredo</h4>
                        <p className="text-[15px] leading-relaxed font-bold italic border-l-4 border-secondary pl-6 py-2 bg-secondary/5 rounded-r-2xl">
                            "{recipe.segredo || "O segredo desta receita está no tempo exato de descanso."}"
                        </p>
                    </div>
                    <div className="space-y-6 pt-10 border-t border-primary/5">
                        <h4 className="flex items-center gap-2 font-black text-sm uppercase tracking-widest text-secondary"><Activity size={18}/> Harmonização Premium</h4>
                        <p className="text-[14px] leading-relaxed text-primary/80 font-medium">
                            {recipe.harmonizacao || "Sugira aos seus clientes acompanhar com um café gourmet ou chá de canela."}
                        </p>
                    </div>
                    <div className="p-8 bg-primary text-white rounded-[3rem] shadow-xl space-y-4">
                        <h4 className="flex items-center gap-3 text-secondary font-black text-sm uppercase tracking-widest leading-none mt-1"><Target size={18} /> Engenharia de Produto</h4>
                        <p className="text-[13px] text-white/90 leading-relaxed font-medium">
                            {recipe.diferencial || "Receita otimizada para manter a umidade por até 48 horas em temperatura ambiente."}
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

function ShoppingView({ onBack }: any) {
    const [prices, setPrices] = useState<Record<string, { price: string; totalQty: string }>>({});
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [productionPlan, setProductionPlan] = useState<Record<number, number>>({}); // recipeId -> quantity
    const [mode, setMode] = useState<'plan' | 'shop'>('plan');

    // Pega todos os ingredientes únicos das receitas para oferecer como sugestão
    const allIngredients = useMemo(() => {
        const unique = new Set<string>();
        (recipesData as any[]).forEach(r => {
            r.ingredientes.forEach((i: string) => {
                const name = i.split('(')[0].trim().toLowerCase();
                if (name) unique.add(name);
            });
        });
        return Array.from(unique).sort();
    }, []);

    // Calcula a soma de insumos necessários com base no plano de produção
    const calculatedShoppingList = useMemo(() => {
        const totals: Record<string, { qty: number; unit: string }> = {};
        
        Object.entries(productionPlan).forEach(([id, multiplier]) => {
            if (multiplier <= 0) return;
            const recipe = (recipesData as any[]).find(r => r.id === parseInt(id));
            if (!recipe) return;

            recipe.ingredientes.forEach((ing: string) => {
                const name = ing.split('(')[0].trim().toLowerCase();
                const match = ing.match(/(\d+)(g|ml)/i);
                if (match) {
                    const val = parseInt(match[1]) * multiplier;
                    const unit = match[2];
                    if (!totals[name]) totals[name] = { qty: 0, unit };
                    totals[name].qty += val;
                }
            });
        });

        return totals;
    }, [productionPlan]);

    useEffect(() => {
        const saved = localStorage.getItem('webbook-global-prices');
        if (saved) setPrices(JSON.parse(saved));
        
        const savedList = localStorage.getItem('webbook-shopping-list');
        if (savedList) setSelectedIngredients(JSON.parse(savedList));
        
        const savedPlan = localStorage.getItem('webbook-production-plan');
        if (savedPlan) setProductionPlan(JSON.parse(savedPlan));
    }, []);

    const updatePrice = (name: string, field: 'price' | 'totalQty', value: string) => {
        const newPrices = { ...prices, [name]: { ...prices[name], [field]: value } };
        setPrices(newPrices);
        localStorage.setItem('webbook-global-prices', JSON.stringify(newPrices));
    };

    const toggleIngredient = (name: string) => {
        const newList = selectedIngredients.includes(name) 
            ? selectedIngredients.filter(i => i !== name)
            : [...selectedIngredients, name];
        setSelectedIngredients(newList);
        localStorage.setItem('webbook-shopping-list', JSON.stringify(newList));
    };

    const updatePlan = (id: number, qty: number) => {
        const newPlan = { ...productionPlan, [id]: Math.max(0, qty) };
        setProductionPlan(newPlan);
        localStorage.setItem('webbook-production-plan', JSON.stringify(newPlan));
    };

    const generateListFromPlan = () => {
        const itemsFromPlan = Object.keys(calculatedShoppingList);
        if (itemsFromPlan.length === 0) return;
        
        const newList = Array.from(new Set([...selectedIngredients, ...itemsFromPlan]));
        setSelectedIngredients(newList);
        localStorage.setItem('webbook-shopping-list', JSON.stringify(newList));
        setMode('shop');
    };

    const clearAll = () => {
        if (confirm("Deseja resetar todo o planejamento e lista?")) {
            setProductionPlan({});
            setSelectedIngredients([]);
            localStorage.removeItem('webbook-production-plan');
            localStorage.removeItem('webbook-shopping-list');
        }
    };

    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-6 max-w-lg mx-auto pb-48 pt-12">
            <header className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <button onClick={onBack} className="p-2 bg-primary/10 rounded-xl text-primary"><ChevronLeft /></button>
                        <h1 className="text-3xl font-black text-primary tracking-tight">Sistema de Lucro</h1>
                    </div>
                    {(selectedIngredients.length > 0 || Object.keys(productionPlan).length > 0) && (
                        <button onClick={clearAll} className="p-3 text-red-500 bg-red-50 rounded-xl active:scale-90 transition-all">
                            <Trash2 size={20} />
                        </button>
                    )}
                </div>

                {/* Alternador de Modo */}
                <div className="flex bg-white p-1.5 rounded-[2rem] border border-primary/5 shadow-xl">
                    <button 
                        onClick={() => setMode('plan')}
                        className={`flex-1 py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${mode === 'plan' ? "bg-primary text-white shadow-lg" : "text-primary/60 hover:text-primary"}`}
                    >
                        <Target size={16} /> 1. Planejar
                    </button>
                    <button 
                        onClick={() => setMode('shop')}
                        className={`flex-1 py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${mode === 'shop' ? "bg-secondary text-white shadow-lg" : "text-primary/60 hover:text-primary"}`}
                    >
                        <ShoppingCart size={16} /> 2. Mercado
                    </button>
                </div>
            </header>

            <AnimatePresence mode="wait">
                {mode === 'plan' ? (
                    <motion.div key="plan" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                        <div className="bg-primary p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden mb-8">
                            <div className="relative z-10">
                                <h3 className="text-xl font-black mb-2 flex items-center gap-2"><Zap className="text-secondary" /> O que você vai produzir?</h3>
                                <p className="text-[10px] text-white/70 font-bold uppercase tracking-widest italic">Defina as quantidades para gerar a lista abaixo.</p>
                            </div>
                        </div>

                        <div className="space-y-3 pb-24">
                            {(recipesData as any[]).map(recipe => (
                                <div key={recipe.id} className="bg-white p-5 rounded-[2.5rem] border-2 border-primary/5 shadow-xl flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-2xl overflow-hidden relative border border-primary/10 shadow-sm">
                                            <Image src={recipe.imagem} alt={recipe.titulo} fill className="object-cover" />
                                        </div>
                                        <span className="font-black text-sm text-primary uppercase leading-tight max-w-[130px]">{recipe.titulo}</span>
                                    </div>
                                    <div className="flex items-center gap-1 bg-primary/5 p-1 rounded-2xl border border-primary/10">
                                        <button onClick={() => updatePlan(recipe.id, (productionPlan[recipe.id] || 0) - 1)} className="h-8 w-8 bg-white rounded-xl flex items-center justify-center text-primary active:scale-90 transition-all"><Minus size={14}/></button>
                                        <input 
                                            type="number" 
                                            value={productionPlan[recipe.id] || 0}
                                            onChange={(e) => updatePlan(recipe.id, parseInt(e.target.value))}
                                            className="w-10 bg-transparent text-center font-black text-sm text-primary outline-none"
                                        />
                                        <button onClick={() => updatePlan(recipe.id, (productionPlan[recipe.id] || 0) + 1)} className="h-8 w-8 bg-secondary rounded-xl flex items-center justify-center text-white active:scale-90 transition-all"><Plus size={14}/></button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {Object.values(productionPlan).some(v => v > 0) && (
                            <div className="fixed bottom-24 left-6 right-6 z-[60] animate-in slide-in-from-bottom-5 duration-500">
                                <button 
                                    onClick={generateListFromPlan}
                                    className="w-full bg-secondary text-white py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-[0_20px_40px_-10px_rgba(183,83,23,0.5)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3"
                                >
                                    <ArrowRight size={20} /> Gerar Lista de Compras
                                </button>
                            </div>
                        )}
                    </motion.div>
                ) : (
                    <motion.div key="shop" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                        {/* Buscador de Insumos Extra */}
                        <div className="relative mb-8">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                            <input 
                                type="text" 
                                placeholder="Adicionar outro ingrediente..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-16 bg-white rounded-full pl-16 pr-6 outline-none border-2 border-primary/10 shadow-xl text-xs uppercase font-black text-primary placeholder:text-primary/30"
                            />
                            {searchTerm && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-[2rem] shadow-2xl border border-primary/5 z-[60] max-h-48 overflow-y-auto p-2">
                                    {allIngredients.filter(i => i.includes(searchTerm.toLowerCase())).map(ing => (
                                        <button key={ing} onClick={() => { toggleIngredient(ing); setSearchTerm(""); }} className="w-full text-left p-4 hover:bg-primary/5 rounded-xl font-black text-[10px] uppercase text-primary border-b border-primary/5 flex items-center justify-between">
                                            {ing} <Plus size={14} className="text-secondary" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {selectedIngredients.length === 0 ? (
                            <div className="text-center py-20 opacity-20"><Store size={64} className="mx-auto mb-4" /><p className="font-black uppercase text-[10px] tracking-[0.3em]">Lista vazia</p></div>
                        ) : (
                            <div className="space-y-4">
                                {selectedIngredients.map((ing) => (
                                    <div key={ing} className="bg-white p-6 rounded-[2.5rem] border-2 border-primary/10 shadow-xl">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <span className="font-black text-sm text-primary uppercase tracking-tight block">{ing}</span>
                                                {calculatedShoppingList[ing] && (
                                                    <span className="text-[11px] font-black text-secondary uppercase italic">Necessário: {calculatedShoppingList[ing].qty}{calculatedShoppingList[ing].unit}</span>
                                                )}
                                            </div>
                                            <button onClick={() => toggleIngredient(ing)} className="text-primary/20 hover:text-red-400 p-1"><X size={16}/></button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-primary/5 p-4 rounded-2xl border-2 border-primary/5">
                                                <span className="text-[9px] font-black uppercase text-primary/60 block mb-1">Paguei (R$)</span>
                                                <input type="text" value={prices[ing]?.price || ''} onChange={(e) => updatePrice(ing, 'price', e.target.value)} placeholder="0,00" className="w-full bg-transparent outline-none font-black text-xs text-secondary placeholder:text-primary/20"/>
                                            </div>
                                            <div className="bg-primary/5 p-4 rounded-2xl border-2 border-primary/5">
                                                <span className="text-[9px] font-black uppercase text-primary/60 block mb-1">Peso Total (g/ml)</span>
                                                <input type="text" value={prices[ing]?.totalQty || ''} onChange={(e) => updatePrice(ing, 'totalQty', e.target.value)} placeholder="Ex: 1000" className="w-full bg-transparent outline-none font-black text-xs text-primary placeholder:text-primary/20"/>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
