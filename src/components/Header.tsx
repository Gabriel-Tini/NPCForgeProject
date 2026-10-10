import React from "react";
import { Star, Settings, GitBranch, Globe } from "lucide-react";
import type { Language } from "../lib/i18n";
import { translations } from "../lib/i18n";

interface HeaderProps {
  savedCount: number;
  language: Language;
  onToggleLanguage: () => void;
  onOpenSaved: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  savedCount,
  language,
  onToggleLanguage,
  onOpenSaved,
  onOpenSettings
}) => {
  const t = translations[language];

  return (
    <header className="border-b border-[#2a241b] bg-[#0d1017]/90 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-3.5 shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and title */}
        <div className="flex items-center space-x-3.5">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-lg bg-gradient-to-br from-[#2a2214] to-[#12151d] border border-[#c5a059]/40 shadow-[0_0_15px_rgba(197,160,89,0.25)]">
            <svg
              className="w-6 h-6 text-[#d4af37] filter drop-shadow-[0_2px_4px_rgba(212,175,55,0.4)]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M2 19.5v2h20v-2H2M18.8 8c.7-.6 1.2-1.3 1.2-2.2 0-1.8-1.5-3.3-3.3H7.3C5.5 2.5 4 4 4 5.8c0 .9.5 1.6 1.2 2.2L3 13.5c-.3.7-.1 1.5.5 2 .6.5 1.4.5 2 .1L8 14h8l2.5 1.6c.3.2.7.4 1.1.4.3 0 .7-.1 1-.3.6-.5.8-1.3.5-2L18.8 8z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#38bdf8] animate-ping opacity-75" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#38bdf8]/90 shadow-[0_0_8px_#38bdf8]" />
          </div>

          <div>
            <h1 className="font-['Cinzel',serif] text-xl sm:text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#f5dfa2] via-[#d4af37] to-[#aa802c]">
              NPC FORGE
            </h1>
            <p className="text-xs text-slate-400 font-medium tracking-wide">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Language toggle */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md border border-[#c5a059]/40 bg-[#161a24] hover:bg-[#1f2636] hover:border-[#ffd700] text-[#f5dfa2] transition-all text-xs font-semibold shadow-md"
            title={language === "en" ? "Mudar para Português (BR)" : "Switch to English"}
          >
            <Globe className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="tracking-wider">{language === "en" ? "EN" : "PT-BR"}</span>
          </button>

          {/* Saved NPCs Button */}
          <button
            onClick={onOpenSaved}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-md border border-[#c5a059]/30 bg-[#161a24] hover:bg-[#1d2331] hover:border-[#c5a059]/60 text-slate-200 transition-all text-xs sm:text-sm font-medium shadow-md"
            title={t.savedNpcs}
          >
            <Star className="w-3.5 h-3.5 text-[#d4af37] fill-[#d4af37]" />
            <span className="hidden sm:inline">{t.savedNpcs}</span>
            <span className="px-1.5 py-0.2 text-[11px] rounded-full bg-[#c5a059]/20 text-[#f5dfa2] font-semibold border border-[#c5a059]/30">
              {savedCount}
            </span>
          </button>

          {/* GitHub Repo link */}
          <a
            href="https://github.com/Gabriel-Tini/NPCForgeProject"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-md border border-slate-700/60 bg-[#141822] hover:bg-[#1c2230] hover:border-slate-500 text-slate-300 transition-all text-xs sm:text-sm"
            title="View on GitHub"
          >
            <GitBranch className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          {/* Settings modal trigger */}
          <button
            onClick={onOpenSettings}
            className="p-1.5 rounded-md border border-slate-700/60 bg-[#141822] hover:bg-[#1c2230] hover:border-[#c5a059]/40 text-slate-400 hover:text-[#f5dfa2] transition-all"
            title={t.settings}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};