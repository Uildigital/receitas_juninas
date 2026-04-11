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
              onClick={() => { setActiveTab(tab.id as any); setSelectedRecipe(null); }}
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
      <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="pb-32">
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-primary/5 p-4 flex items-center gap-4">
          <button onClick={onBack} className="p-2 bg-primary/10 rounded-xl text-primary"><ChevronLeft size={24} /></button>
          <h2 className="font-black text-sm truncate">{recipe.titulo}</h2>
        </header>
        <div className="relative h-[40vh] w-full"><Image src={recipe.imagem} alt={recipe.titulo} fill className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F0] to-transparent" /></div>
        <div className="px-6 -mt-10 relative z-10 max-w-lg mx-auto">
          <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-primary/5 mb-8">
            <h3 className="text-2xl font-black text-primary mb-6">Ingredientes</h3>
            <div className="space-y-3">
              {recipe.ingredientes.map((ing: string, i: number) => (
                <div key={i} onClick={() => toggleItem(recipe.id, "ing", i)} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${completedItems[`${recipe.id}-ing-${i}`] ? "bg-secondary/5 opacity-50" : "bg-white border-primary/5"}`}>
                  <div className={`h-6 w-6 rounded-lg border-2 flex items-center justify-center ${completedItems[`${recipe.id}-ing-${i}`] ? "bg-secondary border-secondary text-white" : "border-primary/10"}`}>{completedItems[`${recipe.id}-ing-${i}`] && <CheckCircle2 size={16} />}</div>
                  <span className="text-sm font-bold">{ing}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-primary/5">
            <h3 className="text-2xl font-black text-primary mb-6">Modo de Preparo</h3>
            <div className="space-y-6">
              {recipe.preparo.map((step: string, i: number) => (
                <div key={i} onClick={() => toggleItem(recipe.id, "step", i)} className={`flex gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${completedItems[`${recipe.id}-step-${i}`] ? "bg-secondary/5 opacity-50" : "bg-white border-primary/5"}`}>
                  <div className="h-8 w-8 shrink-0 rounded-xl bg-primary/5 flex items-center justify-center font-black text-primary">{i + 1}</div>
                  <p className="text-sm font-bold leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
}

function BonusesView({ onBack, onSelect }: any) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-6 max-w-lg mx-auto pb-32 pt-12">
      <header className="mb-10 flex items-center gap-4"><button onClick={onBack} className="p-2 bg-primary/10 rounded-xl"><ChevronLeft /></button><h1 className="text-4xl font-black text-primary tracking-tight">Meus Bônus</h1></header>
      
      <div className="bg-white p-8 rounded-[3rem] border border-primary/5 shadow-2xl mb-6 opacity-60">
        <Package size={32} className="text-secondary mb-6" />
        <h3 className="text-xl font-black mb-2 flex items-center justify-between">Guia de Embalagens <span className="text-[10px] bg-primary/10 px-2 py-1 rounded-full uppercase tracking-widest text-primary/60">Em Breve</span></h3>
        <p className="text-sm text-primary/60 font-medium">Sua guia completa de como valorizar o produto.</p>
      </div>

      <div onClick={() => onSelect('scripts')} className="bg-gradient-to-br from-white to-orange-50 p-8 rounded-[3rem] border border-primary/10 shadow-2xl mb-6 cursor-pointer active:scale-95 transition-all relative overflow-hidden group">
        <ScrollText size={32} className="text-accent mb-6" />
        <h3 className="text-xl font-black mb-2 flex items-center justify-between">Scripts WhatsApp <ArrowRight size={20} className="text-primary group-hover:translate-x-2 transition-transform"/></h3>
        <p className="text-sm text-primary/60 font-medium">Clique para acessar e copiar as mensagens prontas que vendem de verdade.</p>
      </div>

      <div className="bg-white p-8 rounded-[3rem] border border-primary/5 shadow-2xl opacity-60">
        <Target size={32} className="text-secondary mb-6" />
        <h3 className="text-xl font-black mb-2 flex items-center justify-between">Organização de Estoque <span className="text-[10px] bg-primary/10 px-2 py-1 rounded-full uppercase tracking-widest text-primary/60">Em Breve</span></h3>
        <p className="text-sm text-primary/60 font-medium">Aprenda a gerenciar os seus insumos e evitar desperdícios.</p>
      </div>
    </motion.div>
  );
}
