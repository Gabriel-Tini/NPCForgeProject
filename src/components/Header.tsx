import React from "react";

interface HeaderProps {
  savedCount: number;
  onOpenSaved: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ savedCount, onOpenSaved, onOpenSettings }) => {
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
              {/* Anvil and hammer emblem */}
              <path d="M2 19.5v2h20v-2H2M18.8 8c.7-.6 1.2-1.3 1.2-2.2 0-1.8-1.5-3.3-3.3-3.3H7.3C5.5 2.5 4 4 4 5.8c0 .9.5 1.6 1.2 2.2L3 13.5c-.3.7-.1 1.5.5 2 .6.5 1.4.5 2 .1L8 14h8l2.5 1.6c.3.2.7.4 1.1.4.3 0 .7-.1 1-.3.6-.5.8-1.3.5-2L18.8 8z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#38bdf8] animate-ping opacity-75" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#38bdf8]/90 shadow-[0_0_8px_#38bdf8]" />
          </div>

          <div>
            <h1 className="font-['Cinzel',serif] text-xl sm:text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#f5dfa2] via-[#d4af37] to-[#aa802c]">
              NPC FORGE
            </h1>
            <p className="text-xs text-slate-400 font-medium tracking-wide">
              Forge legendary characters with AI
            </p>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Saved NPCs Button */}
          <button
            onClick={onOpenSaved}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-md border border-[#c5a059]/30 bg-[#161a24] hover:bg-[#1d2331] hover:border-[#c5a059]/60 text-slate-200 transition-all text-xs sm:text-sm font-medium shadow-md"
            title="View Saved NPCs"
          >
            <span className="text-[#d4af37]">?</span>
            <span>Saved NPCs</span>
            <span className="px-1.5 py-0.5 text-[11px] rounded-full bg-[#c5a059]/20 text-[#f5dfa2] font-semibold border border-[#c5a059]/30">
              {savedCount}
            </span>
          </button>

          {/* GitHub Repo link */}
          <a
            href="https://github.com/Gabriel-Tini/NPCForgeProject"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-md border border-slate-700/60 bg-[#141822] hover:bg-[#1c2230] hover:border-slate-500 text-slate-300 transition-all text-xs sm:text-sm"
            title="View on GitHub"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>GitHub</span>
          </a>

          {/* Settings modal trigger */}
          <button
            onClick={onOpenSettings}
            className="p-1.5 rounded-md border border-slate-700/60 bg-[#141822] hover:bg-[#1c2230] hover:border-[#c5a059]/40 text-slate-400 hover:text-[#f5dfa2] transition-all text-sm"
            title="Settings / API Key"
          >
            ?
          </button>
        </div>
      </div>
    </header>
  );
};
