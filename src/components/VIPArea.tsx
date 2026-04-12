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
  Target
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
    return (
      <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="pb-40 bg-[#FFF8F0] min-h-screen">
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-primary/5 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 bg-primary/10 rounded-xl text-primary active:scale-90 transition-transform"><ChevronLeft size={24} /></button>
            <div>
                <h2 className="font-black text-xs text-primary/40 uppercase tracking-widest leading-none mb-1">{recipe.categoria}</h2>
                <h2 className="font-black text-sm text-primary truncate max-w-[180px] leading-none">{recipe.titulo}</h2>
            </div>
          </div>
          <div className="bg-secondary/10 px-3 py-1.5 rounded-xl border border-secondary/10 flex items-center gap-2">
            <Calculator size={14} className="text-secondary" />
            <span className="text-[10px] font-black text-secondary uppercase tracking-widest">Calculadora Ativa</span>
          </div>
        </header>

        <div className="relative h-[45vh] w-full shadow-2xl">
            <Image src={recipe.imagem} alt={recipe.titulo} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F0] via-transparent to-transparent" />
            
            {/* Medidores Rápidos floating */}
            <div className="absolute bottom-10 left-6 right-6 flex gap-2">
                <div className="bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 border border-white/20">
                    <Clock size={14} className="text-secondary" />
                    <span className="text-[11px] font-black text-primary uppercase">{recipe.tempo}</span>
                </div>
                <div className="bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 border border-white/20">
                    <Trophy size={14} className="text-secondary" />
                    <span className="text-[11px] font-black text-primary uppercase">{recipe.dificuldade}</span>
                </div>
            </div>
        </div>

        <div className="px-6 -mt-6 relative z-10 max-w-lg mx-auto space-y-8">
          
          {/* CALCULADORA DE PORÇÕES (ESCALABILIDADE) */}
          <section className="bg-primary text-white p-8 rounded-[3rem] shadow-2xl relative overflow-hidden border-b-8 border-secondary">
            <div className="relative z-10 flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-black mb-1 flex items-center gap-2 tracking-tight"><Calculator size={22} className="text-secondary" /> Ajuste de Receita</h3>
                    <p className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">Escalabilidade Automática</p>
                </div>
                <div className="flex items-center gap-1 bg-white/10 p-1.5 rounded-2.5rem border border-white/10">
                    <button 
                        onClick={() => setYieldMultiplier(Math.max(1, yieldMultiplier - 1))}
                        className="h-10 w-10 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white/20 active:scale-90 transition-all font-black"
                    >
                        <Minus size={18} />
                    </button>
                    <div className="px-4 text-center min-w-[60px]">
                        <span className="text-2xl font-black text-secondary leading-none">{yieldMultiplier}x</span>
                        <p className="text-[8px] font-black uppercase text-white/40 tracking-widest mt-1">Porção</p>
                    </div>
                    <button 
                        onClick={() => setYieldMultiplier(yieldMultiplier + 1)}
                        className="h-10 w-10 bg-secondary rounded-2xl flex items-center justify-center text-primary hover:bg-secondary/90 active:scale-90 transition-all font-black"
                    >
                        <Plus size={18} />
                    </button>
                </div>
            </div>
            <div className="absolute top-[-30%] right-[-10%] w-48 h-48 bg-secondary/10 blur-[60px] rounded-full" />
          </section>

          {/* INGREDIENTES COM MULTIPLICADOR */}
          <section className="bg-white p-8 rounded-[3rem] shadow-2xl border border-primary/5">
            <h3 className="text-2xl font-black text-primary mb-6 flex items-center justify-between">
                Ingredientes
                <span className="text-[9px] bg-primary/5 text-primary/40 px-3 py-1 rounded-full font-black uppercase tracking-widest">
                    {yieldMultiplier === 1 ? "Original" : `Ajustado p/ ${yieldMultiplier}x`}
                </span>
            </h3>
            <div className="space-y-3">
              {recipe.ingredientes.map((ing: string, i: number) => (
                <motion.div 
                    layout
                    key={i} 
                    onClick={() => toggleItem(recipe.id, "ing", i)} 
                    className={`flex items-center gap-4 p-5 rounded-2xl border transition-all cursor-pointer ${completedItems[`${recipe.id}-ing-${i}`] ? "bg-secondary/5 opacity-50 grayscale" : "bg-white border-primary/5 shadow-sm active:scale-[0.98]"}`}
                >
                  <div className={`h-6 w-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-colors ${completedItems[`${recipe.id}-ing-${i}`] ? "bg-secondary border-secondary text-white" : "border-primary/10"}`}>
                    {completedItems[`${recipe.id}-ing-${i}`] && <CheckCircle2 size={16} />}
                  </div>
                  <span className="text-[14px] font-bold text-primary leading-tight">
                    {/* Logica simples de multiplicacao visual */}
                    {yieldMultiplier > 1 && <span className="text-secondary mr-2">{yieldMultiplier}x</span>}
                    {ing}
                  </span>
                </motion.div>
              ))}
            </div>
          </section>

          {/* FICHA TÉCNICA & ROI */}
          <section className="bg-white p-10 rounded-[4rem] shadow-2xl border border-primary/10 overflow-hidden relative group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-700"><Coins size={120} /></div>
             <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-12 w-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary shadow-inner"><Coins size={26} /></div>
                    <div>
                        <h3 className="text-2xl font-black text-primary tracking-tight">Ficha Técnica & ROI</h3>
                        <p className="text-[10px] font-black text-primary/30 uppercase tracking-[0.3em]">Gestão de Lucro Por Receita</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="p-6 bg-primary/5 rounded-[2.5rem] border border-primary/5 space-y-4">
                        <div className="flex justify-between items-center"><span className="text-[12px] font-bold text-primary/60">Custo de Insumos Sugerido:</span><span className="text-sm font-black text-primary">{recipe.custo}</span></div>
                        <div className="flex justify-between items-center"><span className="text-[12px] font-bold text-primary/60">Preço de Venda Sugerido (P.V.):</span><span className="text-sm font-black text-secondary">R$ {(parseFloat(recipe.custo.replace('R$', '').replace(',', '.')) * 2.5).toFixed(2).replace('.', ',')}</span></div>
                        <div className="pt-4 border-t border-primary/10 flex justify-between items-center"><span className="text-[13px] font-black uppercase text-primary">Lucro Projetado (1x):</span><span className="text-xl font-black text-primary">R$ {(parseFloat(recipe.custo.replace('R$', '').replace(',', '.')) * 1.5).toFixed(2).replace('.', ',')}</span></div>
                    </div>
                    
                    <div className="bg-amber-100/50 p-6 rounded-[2.5rem] border border-amber-200">
                        <h4 className="font-black text-[10px] uppercase text-amber-900 mb-2 flex items-center gap-2"><Sparkles size={14} className="text-amber-600" /> Insight do Chef:</h4>
                        <p className="text-[12px] text-amber-950 font-medium leading-relaxed italic">"Esta receita tem uma das melhores margens do cardápio. Para maximizar o ROI, use a técnica do Upsell no WhatsApp que ensinamos no bônus exclusivo."</p>
                    </div>
                </div>
             </div>
          </section>

          {/* MODO DE PREPARO */}
          <section className="bg-white p-8 rounded-[3rem] shadow-2xl border border-primary/5">
            <h3 className="text-2xl font-black text-primary mb-8 flex items-center gap-3"><ChefHat size={28} className="text-secondary" /> Modo de Preparo</h3>
            <div className="space-y-8">
              {recipe.preparo.map((step: string, i: number) => (
                <div key={i} onClick={() => toggleItem(recipe.id, "step", i)} className={`flex gap-5 p-6 rounded-[2.5rem] border transition-all cursor-pointer ${completedItems[`${recipe.id}-step-${i}`] ? "bg-secondary/5 opacity-50 grayscale" : "bg-white border-primary/5 shadow-sm active:scale-[0.98]"}`}>
                  <div className={`h-10 w-10 shrink-0 rounded-2xl flex items-center justify-center font-black text-lg shadow-inner ${completedItems[`${recipe.id}-step-${i}`] ? "bg-secondary text-white" : "bg-primary/5 text-primary"}`}>{i + 1}</div>
                  <p className="text-[15px] font-bold leading-relaxed text-primary/90">{step}</p>
                </div>
              ))}
            </div>
          </section>

          {/* DICA DE ENGENHARIA DE CARDÁPIO */}
          <div className="p-10 bg-primary rounded-[4rem] text-white overflow-hidden relative">
             <div className="relative z-10 space-y-4">
                <h4 className="text-xl font-black flex items-center gap-3 text-secondary"><Target size={22} /> Engenharia de Produto</h4>
                <p className="text-xs text-white/60 leading-relaxed font-medium">Esta receita de <span className="text-secondary font-black">{recipe.titulo}</span> foi otimizada para ser feita em larga escala. Se você triplicar a produção (3x na nossa calculadora), o custo de gás e tempo de cozinha cai em 15% por unidade.</p>
             </div>
             <Activity className="absolute bottom-[-20%] right-[-10%] text-white/5" size={120} />
          </div>

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
