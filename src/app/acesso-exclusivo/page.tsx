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
  PartyPopper,
  X,
  Users,
  Plus,
  Minus,
  Search,
  Filter,
  Sparkles,
  Menu,
  Trophy,
  MessageCircle,
  Settings,
  Lock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import recipesData from "@/data/receitas.json";
import dynamic from "next/dynamic";

const SidebarDrawer = dynamic(() => Promise.resolve(SidebarDrawerComponent), { ssr: false });
const UpsellModal = dynamic(() => Promise.resolve(UpsellModalComponent), { ssr: false });
const SuccessModal = dynamic(() => Promise.resolve(SuccessModalComponent), { ssr: false });

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
  descricao?: string;
  diferencial?: string;
  segredo?: string;
  harmonizacao?: string;
  rendimento?: string;
}

export default function RecipeApp() {
  const categories = useMemo(() => ["Todas", ...new Set((recipesData as Recipe[]).map(r => r.categoria))], []);
  const categoryInfo: Record<string, { title: string, subtitle: string }> = {
    "Todas": { 
      title: "Todas as Receitas", 
      subtitle: "Explore todas as delícias do nosso arraial em um só lugar." 
    },
    "🌽 Clássicos": { 
      title: "🌽 1. Clássicos do Arraiá (Os Obrigatórios)", 
      subtitle: "Focados em milho, amendoim e pratos que definem a festa." 
    },
    "🍬 Doces": { 
      title: "🍬 2. Doces e Quitutes (Para Beliscar)", 
      subtitle: "Receitas de porções menores, ideais para festas e vendas." 
    },
    "🍲 Salgados": { 
      title: "🍲 3. Quentinhos e Salgados (O Equilíbrio)", 
      subtitle: "Para aquecer as noites de frio e equilibrar o açúcar." 
    },
    "⚡ 15 Minutos": { 
      title: "⚡ 4. Receitas de 15 Minutos (Praticidade Máxima)", 
      subtitle: "Gatilho de conveniência para quem não quer perder tempo na cozinha." 
    }
  };

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("🌽 Clássicos");
  const [yieldMultiplier, setYieldMultiplier] = useState(1);
  const [isVip, setIsVip] = useState(false);
  const freeIds = [1, 2, 4, 21, 31]; 
  const checkoutUrl = "https://pay.kiwify.com.br/VGZzMTK";

  const getCookie = (name: string) => {
    if (typeof document === 'undefined') return undefined;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return undefined;
  };

  const trackServerEvent = async (eventName: string, customData: any = {}) => {
    try {
      const fbp = getCookie('_fbp');
      const fbc = getCookie('_fbc');
      await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          event_name: eventName, 
          url: window.location.href,
          fbp,
          fbc,
          custom_data: customData 
        })
      });
    } catch (e) { console.error("Error tracking server event", e); }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const fbclid = urlParams.get('fbclid');
    if (fbclid && typeof document !== 'undefined') {
      document.cookie = `_fbc=fb.1.${Date.now()}.${fbclid}; path=/; max-age=7776000`;
    }
    trackServerEvent('PageView');
    if (urlParams.get("vip") === "true") {
      setIsVip(true);
      if (!localStorage.getItem("webbook-purchase-tracked")) {
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Purchase', { currency: 'BRL', value: 47.00 });
        }
        trackServerEvent('Purchase', { currency: 'BRL', value: 47.00 });
        localStorage.setItem("webbook-purchase-tracked", "true");
      }
      localStorage.setItem("webbook-isvip", "true");
    } else {
      const storedVip = localStorage.getItem("webbook-isvip");
      if (storedVip === "true") setIsVip(true);
    }
    const saved = localStorage.getItem("receitas-progress");
    if (saved) {
      try {
        setCompletedItems(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading progress", e);
      }
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("receitas-progress", JSON.stringify(completedItems));
    }
  }, [completedItems, isMounted]);

  const toggleItem = (recipeId: number, type: "ing" | "step", index: number) => {
    const key = `${recipeId}-${type}-${index}`;
    const isNowChecked = !completedItems[key];
    const newCompleted = { ...completedItems, [key]: isNowChecked };
    setCompletedItems(newCompleted);

    if (typeof window !== "undefined" && window.navigator.vibrate) {
      window.navigator.vibrate(10);
    }

    const recipe = (recipesData as Recipe[]).find(r => r.id === recipeId);
    if (recipe) {
      const totalItems = recipe.ingredientes.length + recipe.preparo.length;
      const doneItems = Object.keys(newCompleted).filter(k => 
        k.startsWith(`${recipeId}-`) && newCompleted[k]
      ).length;

      if (doneItems === totalItems && isNowChecked) {
        triggerSuccess();
      }
    }
  };

  const triggerSuccess = async () => {
    const confetti = (await import("canvas-confetti")).default;
    const scalar = 2;
    const triangle = confetti.shapeFromPath({ path: 'M0 10 L5 0 L10 10z' });
    confetti({
      shapes: [triangle],
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#8B4513", "#D2691E", "#FF8C00", "#FFD700"],
      scalar
    });
    setTimeout(() => setShowSuccessModal(true), 800);
  };

  const getRecipeProgress = (recipeId: number) => {
    const recipe = (recipesData as Recipe[]).find(r => r.id === recipeId);
    if (!recipe) return 0;
    const totalItems = recipe.ingredientes.length + recipe.preparo.length;
    const doneItems = Object.keys(completedItems).filter(k => 
      k.startsWith(`${recipeId}-`) && completedItems[k]
    ).length;
    return Math.round((doneItems / totalItems) * 100);
  };

  const isRecipeDone = (recipeId: number) => getRecipeProgress(recipeId) === 100;

  const filteredRecipes = useMemo(() => {
    return (recipesData as Recipe[]).filter(recipe => {
      const matchesSearch = recipe.titulo.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "Todas" || recipe.categoria === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUpsellModal, setShowUpsellModal] = useState(false);

  const completedRecipesCount = Array.from(new Set(Object.keys(completedItems).map(k => k.split('-')[0]))).length;
  const globalProgress = Math.round((completedRecipesCount / recipesData.length) * 100);

  return (
    <main className="min-h-screen bg-[#FFF8F0] selection:bg-secondary/30 antialiased overflow-x-hidden">
      <AnimatePresence>
        {isMenuOpen && (
          <SidebarDrawer 
            isOpen={isMenuOpen} 
            onClose={() => setIsMenuOpen(false)}
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={(cat: string) => {
              setActiveCategory(cat);
              setIsMenuOpen(false);
            }}
            globalProgress={globalProgress}
            completedCount={completedRecipesCount}
            totalCount={recipesData.length}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!selectedRecipe ? (
          <HomeView 
            recipes={filteredRecipes} 
            categories={categories}
            activeCategoryInfo={categoryInfo[activeCategory] || { title: activeCategory, subtitle: "" }}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onOpenMenu={() => setIsMenuOpen(true)}
            onSelect={(r: Recipe) => {
              setYieldMultiplier(1);
              setSelectedRecipe(r);
            }} 
            getProgress={getRecipeProgress}
            isDone={isRecipeDone}
            isVip={isVip}
            freeIds={freeIds}
            setShowUpsellModal={setShowUpsellModal}
            trackServerEvent={trackServerEvent}
          />
        ) : (
          <RecipeDetailView 
            recipe={selectedRecipe} 
            onBack={() => setSelectedRecipe(null)} 
            completedItems={completedItems}
            toggleItem={toggleItem}
            progress={getRecipeProgress(selectedRecipe.id)}
            yieldMultiplier={yieldMultiplier}
            setYieldMultiplier={setYieldMultiplier}
            isVip={isVip}
            isFree={freeIds.includes(selectedRecipe.id)}
            onUnlock={() => setShowUpsellModal(true)}
          />
        )}
      </AnimatePresence>

      <UpsellModal 
        isOpen={showUpsellModal} 
        onClose={() => setShowUpsellModal(false)}
        checkoutUrl={checkoutUrl}
      />

      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => {
          setShowSuccessModal(false);
          setSelectedRecipe(null);
        }} 
      />
    </main>
  );
}

function HomeView({ 
  recipes, 
  categories, 
  activeCategoryInfo,
  activeCategory, 
  setActiveCategory, 
  searchQuery, 
  setSearchQuery, 
  onOpenMenu,
  onSelect, 
  getProgress, 
  isDone,
  isVip,
  freeIds,
  setShowUpsellModal,
  trackServerEvent
}: any) {
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 max-w-lg mx-auto pb-24 font-sans"
    >
      <div className="fixed top-0 left-0 right-0 z-40 bg-[#FFF8F0]/95 sm:bg-[#FFF8F0]/80 sm:backdrop-blur-lg border-b border-primary/5 px-6 py-4 flex items-center justify-between">
         <button 
           onClick={onOpenMenu}
           className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-lg shadow-primary/5 border border-primary/5 active:bg-primary active:text-white transition-all active:scale-95"
         >
           <Menu size={20} />
         </button>
         <div className="flex flex-col items-center">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Web Book</h2>
            <div className="h-0.5 w-8 bg-secondary rounded-full mt-0.5" />
         </div>
         <div className="h-10 w-10 flex items-center justify-center">
            <div className="h-8 w-8 bg-primary/20 rounded-full border border-primary/20 flex items-center justify-center text-[10px] font-black text-primary/80">
               {recipes.length}
            </div>
         </div>
      </div>

      <header className="mb-10 mt-16 min-h-[160px]">
        <div>
          <span className="text-secondary font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block leading-tight">Plataforma de Elite</span>
          <h1 className="text-4xl font-black text-primary mb-2 tracking-tight">{activeCategoryInfo.title}</h1>
          <p className="text-sm text-primary font-black leading-relaxed max-w-[280px] mb-8">{activeCategoryInfo.subtitle}</p>
        </div>

        <div className="relative mb-10">
          <button 
            onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
            className="w-full h-16 bg-primary text-white rounded-[1.5rem] px-8 flex items-center justify-between shadow-2xl shadow-primary/20 z-10 relative active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-3">
               <Menu size={20} className="text-secondary" />
               <span className="text-xs font-black uppercase tracking-[0.3em]">Menu de Receitas</span>
            </div>
            <div className={`transition-transform duration-300 ${isCategoryMenuOpen ? 'rotate-180' : ''}`}><ChevronLeft className="-rotate-90" size={20} /></div>
          </button>
          <AnimatePresence>
            {isCategoryMenuOpen && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-white rounded-b-[2rem] -mt-8 pt-10 shadow-2xl shadow-primary/10 border border-primary/5 px-4 pb-6">
                <div className="space-y-1">
                   {categories.map((cat: string) => (
                     <button key={cat} onClick={() => { setActiveCategory(cat); setIsCategoryMenuOpen(false); }} className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all ${activeCategory === cat ? "bg-primary/5 text-primary" : "text-primary hover:bg-primary/[0.02]"}`}>
                       <div className="flex items-center gap-4"><span className="text-xl">{cat.split(' ')[0]}</span><span className="text-[11px] font-black uppercase tracking-widest leading-none">{cat === "Todas" ? "Ver Tudo" : cat.split(' ').slice(1).join(' ')}</span></div>
                     </button>
                   ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-5 flex items-center text-primary/60"><Search size={14} /></div>
          <input type="text" placeholder="Encontre uma receita específica..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full h-12 bg-white rounded-2xl pl-12 pr-4 border border-primary/5 outline-none text-primary font-black placeholder:text-primary transition-all text-[10px] uppercase tracking-widest" />
        </div>
      </header>
      
      <div className="grid gap-6">
          {recipes.map((recipe: Recipe, idx: number) => {
             const isLocked = !isVip && !freeIds.includes(recipe.id);
             return (
               <div key={recipe.id} onClick={() => { if (isLocked) { trackServerEvent('InitiateCheckout', { content_name: recipe.titulo }); setShowUpsellModal(true); } else { onSelect(recipe); } }} className={`group relative bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/10 cursor-pointer border border-primary/5 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] ${isLocked ? "opacity-60 saturate-0 grayscale" : "opacity-100"}`}>
                  <div className="relative h-64 w-full">
                    <Image src={recipe.imagem} alt={recipe.titulo} fill className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                    {isLocked && (
                      <div className="absolute inset-0 bg-primary/40 backdrop-blur-[4px] flex flex-col items-center justify-center p-6 text-center">
                        <div className="p-4 bg-white/20 backdrop-blur-md rounded-full mb-4 border border-white/30"><Lock size={32} className="text-secondary" /></div>
                        <span className="bg-white px-4 py-2 rounded-full text-[10px] font-black text-primary uppercase">Conteúdo Premium</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-6 left-6"><span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-white/20">{recipe.categoria}</span></div>
                    {isDone(recipe.id) && <div className="absolute top-6 right-6 bg-success text-white px-4 py-2 rounded-full text-xs font-black">CONCLUÍDO</div>}
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h2 className="text-2xl font-black mb-3 leading-[1.1] tracking-tight">{recipe.titulo}</h2>
                      <div className="flex gap-4 text-xs font-black uppercase tracking-widest text-white"><span className="flex items-center gap-1.5"><Clock size={14} className="text-milho" /> {recipe.tempo}</span><span className="flex items-center gap-1.5"><ChefHat size={14} className="text-milho" /> {recipe.dificuldade}</span></div>
                    </div>
                  </div>
               </div>
             );
          })}
      </div>
    </motion.div>
  );
}

function RecipeDetailView({ recipe, onBack, completedItems, toggleItem, progress, yieldMultiplier, setYieldMultiplier }: any) {
  const [showProfitCalc, setShowProfitCalc] = useState(false);
  const [ingredientCosts, setIngredientCosts] = useState<Record<number, number>>({});
  const [markup, setMarkup] = useState(3);

  const scaleIngredient = (text: string) => {
    const toFraction = (decimal: number) => {
      if (decimal % 1 === 0) return decimal.toString();
      const whole = Math.floor(decimal);
      const rem = decimal - whole;
      if (Math.abs(rem - 0.5) < 0.01) return (whole > 0 ? whole + " " : "") + "1/2";
      return decimal.toFixed(1);
    };
    return text.replace(/(\d+[\/\.]?\d*)/g, (match) => {
      try {
        let val = match.includes("/") ? (parts => parseInt(parts[0]) / parseInt(parts[1]))(match.split("/")) : parseFloat(match);
        return isNaN(val) ? match : toFraction(val * yieldMultiplier);
      } catch (e) { return match; }
    });
  };

  const totalCost = Object.values(ingredientCosts).reduce((acc, curr) => acc + curr, 0);
  const suggestedPrice = totalCost * markup;
  const profit = suggestedPrice - totalCost;

  return (
    <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }} className="pb-32">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-xl border-b border-primary/5">
        <div className="max-w-lg mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <button onClick={onBack} className="p-3 bg-primary/10 rounded-2xl text-primary"><ChevronLeft size={24} /></button>
          <div className="flex-1 flex flex-col items-center">
             <div className="h-1.5 w-full max-w-[120px] bg-primary/10 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-gradient-to-r from-secondary to-accent" /></div>
          </div>
          <div className="w-10 text-right"><span className="text-sm font-black text-primary">{progress}%</span></div>
        </div>
      </header>

      <div className="relative h-[45vh] w-full overflow-hidden">
        <Image src={recipe.imagem} alt={recipe.titulo} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F0] via-transparent to-black/20" />
        <div className="absolute bottom-10 left-8 right-8"><h1 className="text-4xl font-black text-primary leading-tight">{recipe.titulo}</h1></div>
      </div>

      <div className="max-w-lg mx-auto px-6 -mt-4 relative z-10">
        <div className="grid grid-cols-2 gap-3 mb-10">
          {[
            { icon: Clock, label: "Preparo", val: recipe.tempo },
            { icon: ChefHat, label: "Nível", val: recipe.dificuldade },
            { icon: Coins, label: "Custo", val: recipe.custo },
            { icon: Users, label: "Rendimento", val: recipe.rendimento || "Padrão" }
          ].map((item, i) => (
            <div key={i} className="bg-white/80 backdrop-blur-md p-4 rounded-3xl text-center shadow-lg border border-primary/5">
              <item.icon size={18} className="text-secondary mx-auto mb-2" />
              <span className="text-[9px] uppercase tracking-wider text-primary/60 block font-black">{item.label}</span>
              <span className="text-xs font-black text-primary">{item.val}</span>
            </div>
          ))}
        </div>

        <div className="flex bg-primary/5 p-1 rounded-2xl mb-8">
           <button onClick={() => setShowProfitCalc(false)} className={`flex-1 py-3 rounded-xl font-black text-xs uppercase ${!showProfitCalc ? "bg-white text-primary" : "text-primary/40"}`}>Receita</button>
           <button onClick={() => setShowProfitCalc(true)} className={`flex-1 py-3 rounded-xl font-black text-xs uppercase ${showProfitCalc ? "bg-white text-secondary" : "text-primary/40"}`}>Precificação 💰</button>
        </div>

        {!showProfitCalc ? (
          <>
            <section className="mb-10">
              <div className="bg-primary/5 rounded-[2rem] p-6 flex items-center justify-between border border-primary/5">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white rounded-2xl"><Users size={20} className="text-secondary" /></div>
                  <h4 className="font-black text-primary text-sm uppercase">Rendimento</h4>
                </div>
                <div className="flex items-center gap-4 bg-white/50 p-2 rounded-2xl">
                  <button onClick={() => setYieldMultiplier(Math.max(0.5, yieldMultiplier - 0.5))} className="h-10 w-10 bg-white rounded-xl flex items-center justify-center" disabled={yieldMultiplier <= 0.5}><Minus size={18} /></button>
                  <span className="font-black text-xl text-primary">{yieldMultiplier}x</span>
                  <button onClick={() => setYieldMultiplier(yieldMultiplier + 0.5)} className="h-10 w-10 bg-white rounded-xl flex items-center justify-center"><Plus size={18} /></button>
                </div>
              </div>
            </section>
            <section className="mb-12">
              <h3 className="text-2xl font-black text-primary mb-6">Ingredientes</h3>
              <div className="space-y-3">
                {recipe.ingredientes.map((ing: string, i: number) => (
                  <div key={i} onClick={() => toggleItem(recipe.id, "ing", i)} className={`flex items-center gap-5 p-5 rounded-[2rem] border transition-all cursor-pointer ${completedItems[`${recipe.id}-ing-${i}`] ? "bg-secondary/5 border-secondary/20 opacity-50" : "bg-white border-primary/5 shadow-xl"}`}>
                    <div className={`h-9 w-9 rounded-2xl border-2 flex items-center justify-center ${completedItems[`${recipe.id}-ing-${i}`] ? "bg-secondary border-secondary text-white" : "border-primary/10"}`}>{completedItems[`${recipe.id}-ing-${i}`] ? <CheckCircle2 size={24} /> : <div className="h-2 w-2 rounded-full bg-primary/10" />}</div>
                    <span className="text-lg font-bold">{scaleIngredient(ing)}</span>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <section className="pb-20">
            <div className="bg-secondary/5 rounded-3xl p-6 border border-secondary/10 mb-8">
               <h3 className="text-xl font-black text-primary mb-6">Ficha Técnica</h3>
               <div className="space-y-4">
                 {recipe.ingredientes.map((ing: string, i: number) => (
                   <div key={i} className="flex items-center justify-between gap-4">
                      <span className="text-xs font-bold text-primary/60 flex-1 truncate">{ing}</span>
                      <input type="number" step="0.01" placeholder="0,00" value={ingredientCosts[i] || ""} onChange={(e) => setIngredientCosts({...ingredientCosts, [i]: parseFloat(e.target.value) || 0})} className="w-28 bg-white border border-primary/10 rounded-xl py-2 px-3 text-xs font-black text-primary" />
                   </div>
                 ))}
               </div>
            </div>
            <div className="bg-primary p-6 rounded-3xl text-center text-white">
               <span className="text-[10px] font-black opacity-60 uppercase">Sugestão de Venda</span>
               <div className="text-4xl font-black">R$ {(totalCost * markup).toFixed(2)}</div>
            </div>
          </section>
        )}
      </div>
    </motion.div>
  );
}

function SidebarDrawerComponent({ isOpen, onClose, categories, activeCategory, onSelectCategory, globalProgress, completedCount, totalCount }: any) {
  return (
    <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed inset-0 z-50 flex">
      <div className="w-full max-w-xs bg-primary text-white p-8 flex flex-col">
        <div className="flex items-center justify-between mb-12"><div className="flex flex-col"><h2 className="text-2xl font-black tracking-tighter">Mestre do Arraiá</h2><span className="text-[10px] font-bold text-secondary tracking-widest uppercase">Elite Recipe Experience</span></div><button onClick={onClose} className="p-2 bg-white/10 rounded-xl"><X size={20} /></button></div>
        <div className="flex-1 space-y-2 overflow-y-auto pr-2">
          {categories.map((cat: string) => (
            <button key={cat} onClick={() => onSelectCategory(cat)} className={`w-full text-left p-4 rounded-2xl transition-all ${activeCategory === cat ? "bg-secondary text-white font-black" : "hover:bg-white/5 text-white/60"}`}>{cat}</button>
          ))}
        </div>
      </div>
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />
    </motion.div>
  );
}

function UpsellModalComponent({ isOpen, onClose, checkoutUrl }: any) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} className="relative w-full max-w-md bg-white rounded-[2.5rem] overflow-hidden">
        <div className="bg-primary p-8 text-center text-white">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"><Lock size={40} className="text-white" /></div>
          <h2 className="text-3xl font-black mb-2">Desbloqueie o Arraiá Completo!</h2>
          <p className="text-white/60 text-sm">Tenha acesso a mais de 40 receitas exclusivas, calculadora de custos e segredos de elite.</p>
        </div>
        <div className="p-8 space-y-4">
          <a href={checkoutUrl} className="w-full py-5 bg-success text-white rounded-2xl font-black text-center block shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all">GARANTIR ACESSO VIP - R$ 47</a>
          <button onClick={onClose} className="w-full py-4 text-primary/40 font-black text-sm uppercase tracking-widest">Agora não, obrigado</button>
        </div>
      </motion.div>
    </div>
  );
}

function SuccessModalComponent({ isOpen, onClose }: any) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative w-full max-w-sm bg-white rounded-[2.5rem] p-10 text-center">
        <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6"><Trophy size={40} className="text-white" /></div>
        <h2 className="text-3xl font-black text-primary mb-4">Parabéns, Mestre!</h2>
        <p className="text-primary/60 text-sm mb-8">Você concluiu esta receita com perfeição. Que tal começar a próxima agora?</p>
        <button onClick={onClose} className="w-full py-5 bg-primary text-white rounded-2xl font-black shadow-xl">CONTINUAR JORNADA</button>
      </motion.div>
    </div>
  );
}
