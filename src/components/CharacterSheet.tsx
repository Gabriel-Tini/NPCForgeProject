import React, { useState } from "react";
import type { NPC } from "../types/npc";
import { Star, Copy, Check, ThumbsUp, ThumbsDown, Key, Scroll } from "lucide-react";

interface CharacterSheetProps {
  npc: NPC;
  onToggleFavorite: (npc: NPC) => void;
  onFeedback: (npcId: string, type: "like" | "dislike") => void;
}

export const CharacterSheet: React.FC<CharacterSheetProps> = ({
  npc,
  onToggleFavorite,
  onFeedback
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `
⚔️ ${npc.name} — ${npc.title}
Race: ${npc.race} | Class: ${npc.characterClass} | Age: ${npc.age}
Setting: ${npc.setting} | Tone: ${npc.tone}

📜 APPEARANCE:
${npc.appearance}

🧠 PERSONALITY:
${npc.personalityTraits.map((t) => `• ${t}`).join("\n")}

📖 BACKSTORY:
${npc.backstory}

🗝️ SECRET:
${npc.secret}

💬 DIALOGUE:
${npc.dialogueQuotes.map((q) => `"${q}"`).join("\n")}

🎲 ATTRIBUTES:
STR: ${npc.attributes.strength} | DEX: ${npc.attributes.dexterity} | CON: ${npc.attributes.constitution}
INT: ${npc.attributes.intelligence} | WIS: ${npc.attributes.wisdom} | CHA: ${npc.attributes.charisma}

📜 QUEST: ${npc.quest.title} [${npc.quest.difficulty}]
${npc.quest.description}
Reward: ${npc.quest.reward}
`.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const difficultyColors = {
    Easy: "bg-emerald-950/80 text-emerald-300 border-emerald-600/50",
    Medium: "bg-sky-950/80 text-sky-300 border-sky-600/50",
    Hard: "bg-amber-950/80 text-amber-300 border-amber-600/50",
    Legendary: "bg-purple-950/80 text-purple-300 border-purple-500/50"
  };

  return (
    <div className="bg-[#121620]/95 backdrop-blur-md border border-[#c5a059]/40 rounded-xl p-6 sm:p-8 shadow-[0_15px_45px_rgba(0,0,0,0.7)] relative overflow-hidden text-slate-200">
      {/* Decorative filigree corners */}
      <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[#d4af37]/70 pointer-events-none" />
      <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[#d4af37]/70 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-[#d4af37]/70 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#d4af37]/70 pointer-events-none" />

      {/* Header bar */}
      <div className="flex items-start justify-between border-b border-[#2a241b] pb-4 mb-5">
        <div>
          <h2 className="font-['Cinzel',serif] text-xl sm:text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#fae8b4] via-[#dfba5c] to-[#b08731]">
            {npc.name}
          </h2>
          <p className="text-xs sm:text-sm font-['Cinzel',serif] text-[#c5a059] italic mt-0.5">
            {npc.title}
          </p>
        </div>

        {/* Action icons */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {/* Favorite button */}
          <button
            onClick={() => onToggleFavorite(npc)}
            className={`p-2 rounded-lg border transition-all text-sm flex items-center justify-center ${
              npc.isFavorite
                ? "bg-amber-500/20 border-[#d4af37] text-[#ffd700] shadow-[0_0_12px_rgba(212,175,55,0.4)]"
                : "bg-[#181d2a] border-slate-700/80 text-slate-400 hover:text-[#d4af37] hover:border-[#c5a059]/60"
            }`}
            title={npc.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          >
            <Star className={`w-4 h-4 ${npc.isFavorite ? "fill-[#ffd700] text-[#ffd700]" : ""}`} />
          </button>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="px-2.5 py-1.5 rounded-lg border border-slate-700/80 bg-[#181d2a] text-slate-300 hover:text-white hover:border-slate-500 transition-all text-xs flex items-center gap-1.5"
            title="Copy Character Sheet"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy</span>
              </>
            )}
          </button>

          {/* Feedback thumbs up */}
          <button
            onClick={() => onFeedback(npc.id, "like")}
            className={`p-2 rounded-lg border transition-all text-sm flex items-center justify-center ${
              npc.feedback === "like"
                ? "bg-emerald-900/40 border-emerald-500 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                : "bg-[#181d2a] border-slate-700/80 text-slate-400 hover:text-emerald-400 hover:border-emerald-600/50"
            }`}
            title="Like this NPC"
          >
            <ThumbsUp className={`w-4 h-4 ${npc.feedback === "like" ? "fill-emerald-400/40" : ""}`} />
          </button>

          {/* Feedback thumbs down */}
          <button
            onClick={() => onFeedback(npc.id, "dislike")}
            className={`p-2 rounded-lg border transition-all text-sm flex items-center justify-center ${
              npc.feedback === "dislike"
                ? "bg-rose-900/40 border-rose-500 text-rose-300 shadow-[0_0_8px_rgba(244,63,94,0.3)]"
                : "bg-[#181d2a] border-slate-700/80 text-slate-400 hover:text-rose-400 hover:border-rose-600/50"
            }`}
            title="Dislike this NPC"
          >
            <ThumbsDown className={`w-4 h-4 ${npc.feedback === "dislike" ? "fill-rose-400/40" : ""}`} />
          </button>
        </div>
      </div>

      {/* Metadata tags */}
      <div className="flex flex-wrap gap-2 text-xs mb-5">
        <span className="px-2.5 py-1 rounded bg-[#1b212f] border border-slate-700 text-slate-300 font-medium">
          <strong className="text-slate-400">Race:</strong> {npc.race}
        </span>
        <span className="px-2.5 py-1 rounded bg-[#1b212f] border border-slate-700 text-slate-300 font-medium">
          <strong className="text-slate-400">Class:</strong> {npc.characterClass}
        </span>
        <span className="px-2.5 py-1 rounded bg-[#1b212f] border border-slate-700 text-slate-300 font-medium">
          <strong className="text-slate-400">Age:</strong> {npc.age}
        </span>
        <span className="px-2.5 py-1 rounded bg-[#201d14] border border-[#c5a059]/40 text-[#f5dfa2] font-medium">
          {npc.setting}
        </span>
      </div>

      {/* Main details sections */}
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Appearance */}
        <div>
          <h4 className="font-['Cinzel',serif] text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-1">
            Appearance
          </h4>
          <p className="text-slate-300 leading-relaxed font-sans">{npc.appearance}</p>
        </div>

        {/* Personality Traits */}
        <div>
          <h4 className="font-['Cinzel',serif] text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-1.5">
            Personality Traits
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {npc.personalityTraits.map((trait, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#1a2130] text-[#7dd3fc] border border-[#38bdf8]/30 shadow-sm"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        {/* Backstory */}
        <div>
          <h4 className="font-['Cinzel',serif] text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-1">
            Backstory & Destiny
          </h4>
          <p className="text-slate-300 leading-relaxed font-sans">{npc.backstory}</p>
        </div>

        {/* Secret Callout */}
        <div className="p-3.5 rounded-lg bg-gradient-to-r from-[#241c0f] to-[#181a24] border border-[#d4af37]/60 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
          <div className="flex items-start space-x-2.5">
            <Key className="w-5 h-5 text-[#ffd700] shrink-0 mt-0.5" />
            <div>
              <span className="font-['Cinzel',serif] font-bold text-xs uppercase tracking-wider text-[#f5dfa2] block mb-0.5">
                Secret (Game Master Hook)
              </span>
              <p className="text-xs text-amber-100/90 italic leading-relaxed">{npc.secret}</p>
            </div>
          </div>
        </div>

        {/* Dialogue Quotes */}
        <div>
          <h4 className="font-['Cinzel',serif] text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-1.5">
            Voice & Dialogue
          </h4>
          <div className="space-y-1 pl-2 border-l-2 border-[#c5a059]/40 italic text-slate-300 text-xs sm:text-sm font-serif">
            {npc.dialogueQuotes.map((q, i) => (
              <p key={i}>"{q}"</p>
            ))}
          </div>
        </div>

        {/* Attributes Matrix */}
        <div className="pt-2">
          <h4 className="font-['Cinzel',serif] text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-2">
            Attributes
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {Object.entries(npc.attributes).map(([attr, val]) => {
              const abbr = attr.substring(0, 3).toUpperCase();
              const percentage = Math.min(100, Math.round((val / 20) * 100));
              return (
                <div key={attr} className="bg-[#181d2a] p-2 rounded-lg border border-slate-700/60">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="font-['Cinzel',serif] font-bold text-slate-300 tracking-wider">
                      {abbr}
                    </span>
                    <span className="font-bold text-[#f5dfa2]">{val}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#c5a059] to-[#ffd700] rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quest Section (Bounty / Parchment style) */}
        <div className="pt-2">
          <div className="bg-gradient-to-b from-[#221c13] to-[#171618] border-2 border-[#c5a059]/70 rounded-xl p-4 sm:p-5 relative shadow-[0_5px_20px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-['Cinzel',serif] text-xs font-black uppercase tracking-widest text-[#d4af37] flex items-center gap-1.5">
                <Scroll className="w-3.5 h-3.5" /> ASSOCIATED QUEST
              </span>
              <span
                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                  difficultyColors[npc.quest.difficulty] || difficultyColors.Medium
                }`}
              >
                {npc.quest.difficulty}
              </span>
            </div>
            <h5 className="font-['Cinzel',serif] text-sm sm:text-base font-bold text-[#fae8b4] mb-1">
              {npc.quest.title}
            </h5>
            <p className="text-xs text-slate-300 mb-2 leading-relaxed">{npc.quest.description}</p>
            <div className="text-xs text-[#c5a059] pt-2 border-t border-[#3a3020] flex items-center justify-between">
              <span className="font-semibold">Bounty & Reward:</span>
              <span className="font-bold text-[#ffd700]">{npc.quest.reward}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};