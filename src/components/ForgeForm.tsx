import React from "react";
import type { ForgeFormData } from "../types/npc";
import { Dices, Sparkles, Hammer } from "lucide-react";

interface ForgeFormProps {
  formData: ForgeFormData;
  onChange: (data: ForgeFormData) => void;
  onSubmit: (data: ForgeFormData) => void;
  isLoading: boolean;
}

const SETTINGS = [
  "High Fantasy (Epic Kingdoms & Elves)",
  "Dark Fantasy (Grim, Corrupt & Deadly)",
  "Cyberpunk (Neon, Megacorps & Chrome)",
  "Cosmic Horror (Lovecraftian & Eldritch)",
  "Steampunk & Victorian Arcana",
  "Post-Apocalyptic Wasteland",
  "Feudal Myth & Wandering Ronin",
  "Space Opera & Galactic Outlaws"
];

const ROLES = [
  "Mysterious Merchant & Relic Peddler",
  "Exiled Knight / Disgraced Paladin",
  "Cynical Rogue / Guild Assassin",
  "Ancient Mage / Cryptic Scholar",
  "Tavern Keeper & Secret Informant",
  "Ruthless Bounty Hunter",
  "Apothecary / Hedge Witch",
  "Traveling Bard / Spymaster"
];

const TONES = [
  "Dark & Gritty",
  "Epic & Heroic",
  "Mysterious & Cryptic",
  "Melancholic & Tragic",
  "Humorous & Eccentric"
];

export const ForgeForm: React.FC<ForgeFormProps> = ({ formData, onChange, onSubmit, isLoading }) => {
  const handleChange = (field: keyof ForgeFormData, val: string) => {
    onChange({ ...formData, [field]: val });
  };

  const handleRandomize = () => {
    const randomSetting = SETTINGS[Math.floor(Math.random() * SETTINGS.length)];
    const randomRole = ROLES[Math.floor(Math.random() * ROLES.length)];
    const randomTone = TONES[Math.floor(Math.random() * TONES.length)];
    const sampleQuirks = [
      "Missing left ring finger, bound by a blood contract",
      "Refuses to accept standard coinage, only barters for memories or teeth",
      "Followed by three silent white owls wherever they travel",
      "Carries a shattered blade that whispers warnings in the dark",
      "Possesses an hourglass running with black sand that never empties"
    ];
    const randomQuirk = sampleQuirks[Math.floor(Math.random() * sampleQuirks.length)];

    const randomized: ForgeFormData = {
      setting: randomSetting,
      role: randomRole,
      tone: randomTone,
      extraDetail: randomQuirk
    };
    onChange(randomized);
    onSubmit(randomized);
  };

  return (
    <div className="bg-[#121620]/90 backdrop-blur-md border border-[#c5a059]/30 rounded-xl p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.6)] relative overflow-hidden">
      {/* Decorative elven corner lines */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#d4af37]/60 pointer-events-none" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#d4af37]/60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#d4af37]/60 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#d4af37]/60 pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="font-['Cinzel',serif] text-xl font-bold tracking-wider text-[#f5dfa2] flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-[#d4af37]" />
          Forge Your NPC
          <Sparkles className="w-4 h-4 text-[#d4af37]" />
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Select parameters or roll destiny to create a character
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formData);
        }}
        className="space-y-4"
      >
        {/* Setting */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            World Setting
          </label>
          <select
            value={formData.setting}
            onChange={(e) => handleChange("setting", e.target.value)}
            disabled={isLoading}
            className="w-full bg-[#181d2a] border border-slate-700/80 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] rounded-lg px-3.5 py-2.5 text-sm text-slate-200 outline-none transition-all cursor-pointer"
          >
            {SETTINGS.map((s) => (
              <option key={s} value={s} className="bg-[#181d2a] text-slate-200">
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Role */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Role & Archetype
          </label>
          <select
            value={formData.role}
            onChange={(e) => handleChange("role", e.target.value)}
            disabled={isLoading}
            className="w-full bg-[#181d2a] border border-slate-700/80 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] rounded-lg px-3.5 py-2.5 text-sm text-slate-200 outline-none transition-all cursor-pointer"
          >
            {ROLES.map((r) => (
              <option key={r} value={r} className="bg-[#181d2a] text-slate-200">
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Tone */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Narrative Tone
          </label>
          <select
            value={formData.tone}
            onChange={(e) => handleChange("tone", e.target.value)}
            disabled={isLoading}
            className="w-full bg-[#181d2a] border border-slate-700/80 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] rounded-lg px-3.5 py-2.5 text-sm text-slate-200 outline-none transition-all cursor-pointer"
          >
            {TONES.map((t) => (
              <option key={t} value={t} className="bg-[#181d2a] text-slate-200">
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Extra details */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Extra Detail or Quirk <span className="text-slate-500 font-normal">(optional)</span>
          </label>
          <textarea
            rows={2}
            value={formData.extraDetail}
            onChange={(e) => handleChange("extraDetail", e.target.value)}
            disabled={isLoading}
            placeholder="e.g. Has an eyepatch, speaks only in riddles, carries an elven ring..."
            className="w-full bg-[#181d2a] border border-slate-700/80 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] rounded-lg px-3.5 py-2 text-sm text-slate-200 placeholder-slate-500 outline-none transition-all resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="pt-2 space-y-2.5">
          {/* Forge Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full relative group overflow-hidden rounded-lg p-[1px] font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_30px_rgba(212,175,55,0.45)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#b38728] via-[#fbf5b7] to-[#aa771c] transition-all duration-300 group-hover:scale-105" />
            <div className="relative bg-gradient-to-r from-[#2a2012] via-[#3a2c16] to-[#2a2012] px-6 py-3 rounded-[7px] flex items-center justify-center space-x-2 transition-colors">
              <span className="font-['Cinzel',serif] text-[#fceec7] font-bold tracking-widest text-base">
                {isLoading ? "FORGING CHARACTER..." : "FORGE NPC"}
              </span>
              <Hammer className="w-5 h-5 text-[#ffd700]" />
            </div>
          </button>

          {/* Random Roll Button */}
          <button
            type="button"
            onClick={handleRandomize}
            disabled={isLoading}
            className="w-full py-2.5 rounded-lg border border-[#c5a059]/40 bg-[#161a25] hover:bg-[#1f2636] hover:border-[#c5a059]/70 text-[#f5dfa2] text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center space-x-2"
          >
            <Dices className="w-4 h-4 text-[#ffd700]" />
            <span>Roll Random Destiny</span>
          </button>
        </div>
      </form>
    </div>
  );
};