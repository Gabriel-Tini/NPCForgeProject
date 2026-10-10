import React, { useState, useEffect } from "react";
import type { Language } from "../lib/i18n";
import { translations } from "../lib/i18n";
import { Settings, X } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, language, onClose }) => {
  const [apiKey, setApiKey] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const t = translations[language];

  useEffect(() => {
    const existing = localStorage.getItem("npc_forge_custom_key") || "";
    setApiKey(existing);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem("npc_forge_custom_key", apiKey.trim());
    } else {
      localStorage.removeItem("npc_forge_custom_key");
    }
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#121620] border-2 border-[#c5a059]/60 rounded-xl max-w-md w-full p-6 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-[#2a241b] pb-3.5 mb-4">
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-[#d4af37]" />
            <h3 className="font-['Cinzel',serif] text-lg font-bold text-[#f5dfa2]">
              {t.forgeSettings}
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs text-slate-300">
          <div>
            <label className="block font-semibold uppercase tracking-wider text-slate-300 mb-1">
              {t.customKeyLabel} <span className="text-slate-500 font-normal">{t.customKeyOptional}</span>
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-[#181d2a] border border-slate-700 rounded-lg px-3 py-2 text-slate-200 outline-none focus:border-[#d4af37]"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              {t.customKeyDesc}
            </p>
          </div>

          <div className="p-3 rounded bg-[#181d2a] border border-slate-800 space-y-1 text-[11px]">
            <p className="text-slate-400">
              <strong className="text-slate-300">{t.activeEngine}</strong> Google Gemini 2.5 Flash / 3.8 Flash
            </p>
            <p className="text-slate-400">
              <strong className="text-slate-300">{t.hostingLabel}</strong> Firebase Hosting (Spark Free Tier)
            </p>
            <p className="text-slate-400">
              <strong className="text-slate-300">{t.projectLabel}</strong> npcforgeproject
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-[#2a241b] mt-5 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-[#181d2a] text-xs font-semibold text-slate-300 hover:bg-[#202738]"
          >
            {t.cancel}
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#b38728] to-[#aa771c] text-xs font-bold text-black hover:brightness-110"
          >
            {savedSuccess ? t.saved : t.save}
          </button>
        </div>
      </div>
    </div>
  );
};