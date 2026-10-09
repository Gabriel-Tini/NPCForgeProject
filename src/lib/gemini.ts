import type { ForgeFormData, NPC } from "../types/npc";
import { firebaseConfig } from "./firebaseConfig";

// Fallback high-fantasy character generator if API is offline or quota reached
function generateFallbackNPC(data: ForgeFormData): NPC {
  const fantasyNames = [
    { name: "Thalric Ashveil", title: "The Lantern Keeper", race: "Half-Elf", class: "Ranger / Wayfarer", age: "42" },
    { name: "Morwen of the Iron Bough", title: "Keeper of the Forgotten Oaths", race: "Dwarf", class: "Runesmith", age: "114" },
    { name: "Elowen Duskwhisper", title: "The Silent Weaver", race: "Wood Elf", class: "Shadow Monk", age: "128" },
    { name: "Kaelen the Red", title: "Exiled Warmaster of Oakhaven", race: "Human", class: "Battlemaster", age: "36" },
    { name: "Sylas Bittergale", title: "Apothecary of the Veiled Marsh", race: "Tiefling", class: "Alchemist / Warlock", age: "29" }
  ];

  const pick = fantasyNames[Math.floor(Math.random() * fantasyNames.length)];
  const settingName = data.setting || "High Fantasy";
  const roleName = data.role || "Mysterious Wanderer";
  const toneName = data.tone || "Dark & Gritty";

  return {
    id: "npc-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
    createdAt: new Date().toISOString(),
    name: pick.name,
    title: pick.title,
    race: pick.race,
    characterClass: roleName.includes("Merchant") ? "Smuggler / Merchant" : pick.class,
    age: pick.age,
    setting: settingName,
    role: roleName,
    tone: toneName,
    appearance: `Weathered traveler draped in a moth-eaten cloak dyed midnight grey. A silver chain wrapped twice around their wrist clinks softly with every step, and their amber eyes catch the light with unnerving stillness.${data.extraDetail ? ` Notably: ${data.extraDetail}.` : ""}`,
    personalityTraits: ["Suspicious of strangers", "Bound by an ancient debt", "Speaks in measured whispers", "Observant"],
    backstory: `Once bound to the noble court of a forgotten realm, they broke their solemn oath to preserve a sacred relic from destruction. Now roaming the outer marches under false banners, they barter secrets and rare relics to those brave enough to seek them out.`,
    secret: "Carries the sealed ring of the fallen dynasty inside the hollow pommel of their hunting dagger.",
    dialogueQuotes: [
      `"Gold speaks loudly in the taverns, traveler, but silence buys you tomorrow's dawn."`,
      `"Do not look too closely into the lantern light. Some truths burn deeper than embers."`,
      `"I have walked through ash that was once king's halls. Tread softly."`
    ],
    attributes: {
      strength: 12 + Math.floor(Math.random() * 5),
      dexterity: 14 + Math.floor(Math.random() * 5),
      constitution: 13 + Math.floor(Math.random() * 4),
      intelligence: 15 + Math.floor(Math.random() * 4),
      wisdom: 16 + Math.floor(Math.random() * 4),
      charisma: 11 + Math.floor(Math.random() * 6)
    },
    quest: {
      title: "The Echo of the Black Gate",
      description: "Recover a rusted reliquary buried beneath the weeping willows at Deadman's Crossing before the inquisitors find it.",
      reward: "350 Silver Thalers & An Amulet of Veiled Thoughts",
      difficulty: "Hard"
    },
    isFavorite: false
  };
}

export async function generateNPCWithAI(data: ForgeFormData): Promise<NPC> {
  const customKey = localStorage.getItem("npc_forge_custom_key");
  const apiKey = customKey || firebaseConfig.apiKey;

  const systemPrompt = `You are a legendary Master RPG Storyteller and Character Architect specializing in atmospheric, deep, multi-layered characters inspired by Tolkien, dark fantasy, and classic roleplaying games.
Return a SINGLE JSON object matching this exact TypeScript structure:
{
  "name": string,
  "title": string,
  "race": string,
  "characterClass": string,
  "age": string,
  "appearance": string (1 rich atmospheric paragraph describing clothing, physique, distinctive marks),
  "personalityTraits": string[] (3 to 5 evocative traits),
  "backstory": string (1-2 compelling paragraphs with motive, tragedy or destiny),
  "secret": string (1 dark, juicy secret or narrative hook for the game master),
  "dialogueQuotes": string[] (exactly 3 memorable in-character voice quotes),
  "attributes": {
    "strength": number (between 8 and 19),
    "dexterity": number (between 8 and 19),
    "constitution": number (between 8 and 19),
    "intelligence": number (between 8 and 19),
    "wisdom": number (between 8 and 19),
    "charisma": number (between 8 and 19)
  },
  "quest": {
    "title": string,
    "description": string (clear objective and stakes),
    "reward": string (creative thematic reward),
    "difficulty": "Easy" | "Medium" | "Hard" | "Legendary"
  }
}
All text values must be in English. Output ONLY pure raw JSON without markdown code fences or backticks.`;

  const userPrompt = `Forge a unique NPC with these parameters:
Setting / World: ${data.setting}
Role / Archetype: ${data.role}
Narrative Tone: ${data.tone}
${data.extraDetail ? `Special Detail / Quirk: ${data.extraDetail}` : ""}`;

  // Try Gemini 2.5 Flash / Gemini 1.5 Flash via standard REST API
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }]
            }
          ],
          generationConfig: {
            temperature: 0.8,
            responseMimeType: "application/json"
          }
        })
      }
    );

    if (!response.ok) {
      console.warn("Gemini API call returned status:", response.status, "- using fallback forge");
      return generateFallbackNPC(data);
    }

    const json = await response.json();
    const rawText = json?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      return generateFallbackNPC(data);
    }

    const cleaned = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return {
      ...parsed,
      id: "npc-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
      createdAt: new Date().toISOString(),
      setting: data.setting,
      role: data.role,
      tone: data.tone,
      isFavorite: false
    };
  } catch (err) {
    console.warn("Using fallback generator due to:", err);
    return generateFallbackNPC(data);
  }
}
