import React, { useState, useEffect } from "react";
import type { ForgeFormData, NPC } from "./types/npc";
import { generateNPCWithAI } from "./lib/gemini";
import { Header } from "./components/Header";
import { ForgeForm } from "./components/ForgeForm";
import { CharacterSheet } from "./components/CharacterSheet";
import { AnvilLoader } from "./components/AnvilLoader";
import { FavoritesModal } from "./components/FavoritesModal";
import { SettingsModal } from "./components/SettingsModal";

export const App: React.FC = () => {
  const [formData, setFormData] = useState<ForgeFormData>({
    setting: "High Fantasy (Epic Kingdoms & Elves)",
    role: "Mysterious Merchant & Relic Peddler",
    tone: "Dark & Gritty",
    extraDetail: ""
  });

  const [activeNPC, setActiveNPC] = useState<NPC | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<NPC[]>([]);
  const [isSavedOpen, setIsSavedOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("npc_forge_favorites");
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Could not load favorites:", e);
    }
  }, []);

  // Save favorites to localStorage
  const saveFavoritesList = (list: NPC[]) => {
    setFavorites(list);
    try {
      localStorage.setItem("npc_forge_favorites", JSON.stringify(list));
    } catch (e) {
      console.error("Could not save favorites:", e);
    }
  };

  // Generate NPC
  const handleForge = async (data: ForgeFormData) => {
    setIsLoading(true);
    try {
      const forged = await generateNPCWithAI(data);
      // Check if already in favorites
      const isFav = favorites.some((f) => f.id === forged.id);
      setActiveNPC({ ...forged, isFavorite: isFav });
    } catch (err) {
      console.error("Error forging NPC:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle favorite
  const handleToggleFavorite = (npc: NPC) => {
    const isCurrentlyFav = favorites.some((f) => f.id === npc.id);
    let updated: NPC[];
    if (isCurrentlyFav) {
      updated = favorites.filter((f) => f.id !== npc.id);
    } else {
      updated = [npc, ...favorites];
    }
    saveFavoritesList(updated);
    if (activeNPC && activeNPC.id === npc.id) {
      setActiveNPC({ ...activeNPC, isFavorite: !isCurrentlyFav });
    }
  };

  // Delete from favorites modal
  const handleDeleteFavorite = (id: string) => {
    const updated = favorites.filter((f) => f.id !== id);
    saveFavoritesList(updated);
    if (activeNPC && activeNPC.id === id) {
      setActiveNPC({ ...activeNPC, isFavorite: false });
    }
  };

  // Feedback (thumbs up / down)
  const handleFeedback = (npcId: string, type: "like" | "dislike") => {
    if (!activeNPC || activeNPC.id !== npcId) return;
    const newFeedback = activeNPC.feedback === type ? null : type;
    setActiveNPC({ ...activeNPC, feedback: newFeedback });
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-200 flex flex-col font-sans selection:bg-[#d4af37]/30 selection:text-[#fceec7]">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-[#38bdf8]/5 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-[#b38728]/10 rounded-full blur-[130px]" />
      </div>

      {/* Header */}
      <Header
        savedCount={favorites.length}
        onOpenSaved={() => setIsSavedOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Form (5 cols on lg) */}
          <div className="lg:col-span-5 sticky top-24">
            <ForgeForm
              formData={formData}
              onChange={setFormData}
              onSubmit={handleForge}
              isLoading={isLoading}
            />
          </div>

          {/* Right Column: Character Sheet (7 cols on lg) */}
          <div className="lg:col-span-7">
            {isLoading ? (
              <AnvilLoader />
            ) : activeNPC ? (
              <CharacterSheet
                npc={activeNPC}
                onToggleFavorite={handleToggleFavorite}
                onFeedback={handleFeedback}
              />
            ) : (
              /* Empty state / Welcome card */
              <div className="bg-[#121620]/90 backdrop-blur-md border border-[#c5a059]/30 rounded-xl p-8 sm:p-12 text-center shadow-[0_10px_35px_rgba(0,0,0,0.6)] min-h-[480px] flex flex-col items-center justify-center relative overflow-hidden">
                <div className="w-20 h-20 rounded-full bg-[#181d2a] border border-[#c5a059]/40 flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(197,160,89,0.15)]">
                  <span className="text-3xl text-[#d4af37]">?</span>
                </div>
                <h3 className="font-['Cinzel',serif] text-xl font-bold tracking-wider text-[#f5dfa2] mb-2">
                  THE FORGE AWAITS YOUR COMMAND
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed mb-6">
                  Select your world setting, archetype, and narrative tone on the left, then strike the anvil to forge a living legend with Google Gemini.
                </p>
                <button
                  onClick={() => handleForge(formData)}
                  className="px-6 py-2.5 rounded-lg border border-[#c5a059]/50 bg-gradient-to-r from-[#2a2012] via-[#3a2c16] to-[#2a2012] hover:border-[#ffd700] text-[#fceec7] font-['Cinzel',serif] text-xs font-bold tracking-widest uppercase transition-all shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                >
                  Strike the Anvil Now ?
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1f1a14] py-6 px-4 text-center text-xs text-slate-500 z-10 bg-[#0d1017]/80">
        <p className="font-medium text-slate-400">
          NPC Forge � Built by{" "}
          <a
            href="https://github.com/Gabriel-Tini"
            target="_blank"
            rel="noreferrer"
            className="text-[#f5dfa2] hover:underline"
          >
            Gabriel-Tini
          </a>{" "}
          with Antigravity, React, TypeScript & Google Gemini
        </p>
        <p className="text-[11px] text-slate-600 mt-1">
          Published on Firebase Hosting � Free & Open Source
        </p>
      </footer>

      {/* Modals */}
      <FavoritesModal
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        favorites={favorites}
        onSelect={(npc) => setActiveNPC(npc)}
        onDelete={handleDeleteFavorite}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};

export default App;
