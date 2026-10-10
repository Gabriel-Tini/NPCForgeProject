export type Language = "en" | "pt-BR";

export interface Translations {
  tagline: string;
  savedNpcs: string;
  settings: string;
  forgeTitle: string;
  forgeSubtitle: string;
  worldSetting: string;
  roleArchetype: string;
  narrativeTone: string;
  extraDetailLabel: string;
  extraDetailOptional: string;
  extraDetailPlaceholder: string;
  forgeButton: string;
  forgingButton: string;
  randomButton: string;
  blazingTitle: string;
  emptyTitle: string;
  emptySubtitle: string;
  emptyButton: string;
  copied: string;
  copy: string;
  race: string;
  characterClass: string;
  age: string;
  appearance: string;
  personality: string;
  backstory: string;
  secret: string;
  dialogue: string;
  attributes: string;
  associatedQuest: string;
  bountyReward: string;
  savedCharacters: string;
  noSavedYet: string;
  noSavedTip: string;
  view: string;
  exportJson: string;
  close: string;
  forgeSettings: string;
  customKeyLabel: string;
  customKeyOptional: string;
  customKeyDesc: string;
  activeEngine: string;
  hostingLabel: string;
  projectLabel: string;
  cancel: string;
  save: string;
  saved: string;
  settingsList: string[];
  rolesList: string[];
  tonesList: string[];
  quirksList: string[];
}

export const translations: Record<Language, Translations> = {
  en: {
    tagline: "Forge legendary characters with AI",
    savedNpcs: "Saved NPCs",
    settings: "Settings",
    forgeTitle: "Forge Your NPC",
    forgeSubtitle: "Select parameters or roll destiny to create a character",
    worldSetting: "World Setting",
    roleArchetype: "Role & Archetype",
    narrativeTone: "Narrative Tone",
    extraDetailLabel: "Extra Detail or Quirk",
    extraDetailOptional: "(optional)",
    extraDetailPlaceholder: "e.g. Has an eyepatch, speaks only in riddles, carries an elven ring...",
    forgeButton: "FORGE NPC",
    forgingButton: "FORGING CHARACTER...",
    randomButton: "Roll Random Destiny",
    blazingTitle: "THE FORGE IS BLAZING",
    emptyTitle: "THE FORGE AWAITS YOUR COMMAND",
    emptySubtitle: "Select your world setting, archetype, and narrative tone on the left, then strike the anvil to forge a living legend with Google Gemini.",
    emptyButton: "Strike the Anvil Now ✦",
    copied: "Copied",
    copy: "Copy",
    race: "Race",
    characterClass: "Class",
    age: "Age",
    appearance: "Appearance",
    personality: "Personality Traits",
    backstory: "Backstory & Destiny",
    secret: "Secret (Game Master Hook)",
    dialogue: "Voice & Dialogue",
    attributes: "Attributes",
    associatedQuest: "ASSOCIATED QUEST",
    bountyReward: "Bounty & Reward:",
    savedCharacters: "Saved Characters",
    noSavedYet: "No saved characters yet.",
    noSavedTip: "Click the star on any forged NPC to save them here!",
    view: "View",
    exportJson: "Export all as JSON",
    close: "Close",
    forgeSettings: "Forge Settings",
    customKeyLabel: "Custom Gemini API Key",
    customKeyOptional: "(Optional)",
    customKeyDesc: "By default, NPC Forge uses the integrated Firebase backend. If you have your own key from Google AI Studio, you can paste it here.",
    activeEngine: "Active Engine:",
    hostingLabel: "Hosting:",
    projectLabel: "Project:",
    cancel: "Cancel",
    save: "Save",
    saved: "Saved!",
    settingsList: [
      "High Fantasy (Epic Kingdoms & Elves)",
      "Dark Fantasy (Grim, Corrupt & Deadly)",
      "Cyberpunk (Neon, Megacorps & Chrome)",
      "Cosmic Horror (Lovecraftian & Eldritch)",
      "Steampunk & Victorian Arcana",
      "Post-Apocalyptic Wasteland",
      "Feudal Myth & Wandering Ronin",
      "Space Opera & Galactic Outlaws"
    ],
    rolesList: [
      "Mysterious Merchant & Relic Peddler",
      "Exiled Knight / Disgraced Paladin",
      "Cynical Rogue / Guild Assassin",
      "Ancient Mage / Cryptic Scholar",
      "Tavern Keeper & Secret Informant",
      "Ruthless Bounty Hunter",
      "Apothecary / Hedge Witch",
      "Traveling Bard / Spymaster"
    ],
    tonesList: [
      "Dark & Gritty",
      "Epic & Heroic",
      "Mysterious & Cryptic",
      "Melancholic & Tragic",
      "Humorous & Eccentric"
    ],
    quirksList: [
      "Missing left ring finger, bound by a blood contract",
      "Refuses to accept standard coinage, only barters for memories or teeth",
      "Followed by three silent white owls wherever they travel",
      "Carries a shattered blade that whispers warnings in the dark",
      "Possesses an hourglass running with black sand that never empties"
    ]
  },
  "pt-BR": {
    tagline: "Forje personagens lendários com IA",
    savedNpcs: "NPCs Salvos",
    settings: "Configurações",
    forgeTitle: "Forje seu NPC",
    forgeSubtitle: "Escolha os parâmetros ou role o destino para criar seu personagem",
    worldSetting: "Cenário do Mundo",
    roleArchetype: "Função & Arquétipo",
    narrativeTone: "Tom Narrativo",
    extraDetailLabel: "Detalhe Extra ou Peculiaridade",
    extraDetailOptional: "(opcional)",
    extraDetailPlaceholder: "ex: Caolho, fala apenas por enigmas, carrega um anel élfico...",
    forgeButton: "FORJAR NPC",
    forgingButton: "FORJANDO PERSONAGEM...",
    randomButton: "Rolar Destino Aleatório",
    blazingTitle: "A FORJA ESTÁ EM CHAMAS",
    emptyTitle: "A FORJA AGUARDA SEU COMANDO",
    emptySubtitle: "Escolha o cenário, arquétipo e tom narrativo à esquerda e martele a bigorna para forjar uma lenda viva com o Google Gemini.",
    emptyButton: "Bater na Bigorna Agora ✦",
    copied: "Copiado",
    copy: "Copiar",
    race: "Raça",
    characterClass: "Classe",
    age: "Idade",
    appearance: "Aparência",
    personality: "Traços de Personalidade",
    backstory: "Histórico & Destino",
    secret: "Segredo (Gancho para o Mestre)",
    dialogue: "Voz & Falas Marcantes",
    attributes: "Atributos",
    associatedQuest: "MISSÃO ASSOCIADA",
    bountyReward: "Recompensa:",
    savedCharacters: "Personagens Salvos",
    noSavedYet: "Nenhum personagem salvo ainda.",
    noSavedTip: "Clique na estrela de qualquer NPC para guardá-lo aqui!",
    view: "Ver",
    exportJson: "Exportar todos em JSON",
    close: "Fechar",
    forgeSettings: "Configurações da Forja",
    customKeyLabel: "Chave Gemini API Própria",
    customKeyOptional: "(Opcional)",
    customKeyDesc: "Por padrão, o NPC Forge usa o backend integrado do Firebase. Se você tiver sua chave gratuita do Google AI Studio, pode inseri-la aqui.",
    activeEngine: "Motor Ativo:",
    hostingLabel: "Hospedagem:",
    projectLabel: "Projeto:",
    cancel: "Cancelar",
    save: "Salvar",
    saved: "Salvo!",
    settingsList: [
      "Fantasia Medieval Épica (Reinos e Elfos)",
      "Fantasia Sombria / Dark Fantasy",
      "Cyberpunk (Neon, Megacorporações e Próteses)",
      "Terror Cósmico (Lovecraftiano e Eldritch)",
      "Steampunk e Arcana Vitoriana",
      "Pós-Apocalíptico / Terra Devastada",
      "Mito Feudal e Ronin Errante",
      "Space Opera e Piratas Espaciais"
    ],
    rolesList: [
      "Mercador Misterioso e Mascate de Relíquias",
      "Cavaleiro Exilado / Paladino Caído",
      "Ladino Cínico / Assassino de Guilda",
      "Mago Ancião / Erudito Críptico",
      "Taverneiro e Informante Secreto",
      "Caçador de Recompensas Implacável",
      "Boticário / Bruxa do Pântano",
      "Bardo Viajante / Mestre dos Espiões"
    ],
    tonesList: [
      "Sombrio e Realista",
      "Épico e Heroico",
      "Misterioso e Críptico",
      "Melancólico e Trágico",
      "Bem-humorado e Excêntrico"
    ],
    quirksList: [
      "Falta o dedo anelar esquerdo, selado por um juramento de sangue",
      "Recusa moedas comuns, só negocia por memórias ou dentes",
      "Seguido por três corujas brancas silenciosas por onde passa",
      "Carrega uma lâmina estilhaçada que sussurra avisos no escuro",
      "Possui uma ampulheta de areia negra que nunca se esgota"
    ]
  }
};