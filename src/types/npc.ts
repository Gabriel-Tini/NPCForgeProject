export interface NPCAttributes {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface NPCQuest {
  title: string;
  description: string;
  reward: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Legendary';
}

export interface NPC {
  id: string;
  createdAt: string;
  name: string;
  title: string;
  race: string;
  characterClass: string;
  age: string;
  setting: string;
  role: string;
  tone: string;
  appearance: string;
  personalityTraits: string[];
  backstory: string;
  secret: string;
  dialogueQuotes: string[];
  attributes: NPCAttributes;
  quest: NPCQuest;
  feedback?: 'like' | 'dislike' | null;
  isFavorite?: boolean;
}

export interface ForgeFormData {
  setting: string;
  role: string;
  tone: string;
  extraDetail: string;
}
