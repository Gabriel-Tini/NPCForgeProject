import React from "react";
import type { NPC } from "../types/npc";
import type { Language } from "../lib/i18n";
import { translations } from "../lib/i18n";
import { Star, Download, Trash2, X } from "lucide-react";

interface FavoritesModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
  favorites: NPC[];
  onSelect: (npc: NPC) => void;
  onDelete: (id: string) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  language,
  onClose,
  favorites,
  onSelect,
  onDelete
}) => {
  if (!isOpen) return null;
  const t = translations[language];

  const exportAllJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(favorites, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `npc_forge_favorites_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#121620] border-2 border-[#c5a059]/60 rounded-xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2a241b] pb-4 mb-4">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-[#d4af37] fill-[#d4af37]" />
            <h3 className="font-['Cinzel',serif] text-lg font-bold text-[#f5dfa2]">
              {t.savedCharacters} ({favorites.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {favorites.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p className="text-sm">{t.noSavedYet}</p>
              <p className="text-xs text-slate-500 mt-1">
                {t.noSavedTip}
              </p>
            </div>
          ) : (
            favorites.map((npc) => (
              <div
                key={npc.id}
                className="bg-[#181d2a] border border-slate-700/80 hover:border-[#c5a059]/60 rounded-lg p-3.5 flex items-center justify-between transition-all group"
              >
                <div
                  className="cursor-pointer flex-1"
                  onClick={() => {
                    onSelect(npc);
                    onClose();
                  }}
                >
                  <h4 className="font-['Cinzel',serif] text-sm font-bold text-[#f5dfa2] group-hover:text-[#ffd700] transition-colors">
                    {npc.name}
                  </h4>
                  <p className="text-xs text-[#c5a059] italic">{npc.title}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {npc.race} • {npc.characterClass} • {npc.setting}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      onSelect(npc);
                      onClose();
                    }}
                    className="px-2.5 py-1 text-xs rounded bg-[#201d14] border border-[#c5a059]/40 text-[#f5dfa2] hover:bg-[#302818] transition-colors"
                  >
                    {t.view}
                  </button>
                  <button
                    onClick={() => onDelete(npc.id)}
                    className="p-1.5 text-xs text-rose-400 hover:text-rose-300 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {favorites.length > 0 && (
          <div className="pt-4 border-t border-[#2a241b] mt-4 flex justify-between items-center">
            <button
              onClick={exportAllJSON}
              className="text-xs text-[#f5dfa2] hover:underline flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> {t.exportJson}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-[#181d2a] hover:bg-[#202738] text-xs font-semibold text-slate-200 transition-colors"
            >
              {t.close}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};