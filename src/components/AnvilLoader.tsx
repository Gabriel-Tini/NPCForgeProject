import React, { useState, useEffect } from "react";

const FLAVOR_TEXTS = [
  "Striking the iron on the anvil of destiny...",
  "Consulting the archives of the ancient kings...",
  "Binding personality traits and hidden scars...",
  "Whispering oaths in the language of the elder stars...",
  "Forging dark secrets and grand quests..."
];

export const AnvilLoader: React.FC = () => {
  const [flavorIdx, setFlavorIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFlavorIdx((prev) => (prev + 1) % FLAVOR_TEXTS.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-[#121620]/80 rounded-xl border border-[#c5a059]/20 shadow-2xl min-h-[420px]">
      <div className="relative mb-6">
        {/* Pulsing glow ring */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#d4af37]/20 to-[#38bdf8]/20 animate-pulse blur-xl" />
        
        {/* Animated Anvil */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-[#d4af37] animate-bounce filter drop-shadow-[0_0_12px_rgba(212,175,55,0.7)]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M2 19.5v2h20v-2H2M18.8 8c.7-.6 1.2-1.3 1.2-2.2 0-1.8-1.5-3.3-3.3-3.3H7.3C5.5 2.5 4 4 4 5.8c0 .9.5 1.6 1.2 2.2L3 13.5c-.3.7-.1 1.5.5 2 .6.5 1.4.5 2 .1L8 14h8l2.5 1.6c.3.2.7.4 1.1.4.3 0 .7-.1 1-.3.6-.5.8-1.3.5-2L18.8 8z" />
          </svg>
        </div>
      </div>

      <h3 className="font-['Cinzel',serif] text-lg font-bold tracking-widest text-[#f5dfa2] mb-2">
        THE FORGE IS BLAZING
      </h3>
      <p className="text-xs text-slate-400 italic max-w-sm transition-all duration-300">
        "{FLAVOR_TEXTS[flavorIdx]}"
      </p>
    </div>
  );
};
