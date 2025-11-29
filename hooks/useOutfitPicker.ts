import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const harmony: Record<string, string[]> = {
  red:    ["black", "white", "gray", "pink", "tan"],
  orange: ["white", "tan", "brown", "black"],
  yellow: ["white", "gray", "blue", "tan", "brown"],
  green:  ["white", "black", "brown", "tan", "gray"],
  blue:   ["white", "gray", "black", "beige", "tan"],
  purple: ["white", "gray", "black", "pink"],
  brown:  ["white", "tan", "beige", "green", "yellow"],
  black:  ["white", "gray", "red", "blue", "green", "pink", "purple", "orange", "yellow", "tan", "brown"],
  white:  ["black", "gray", "red", "blue", "green", "pink", "purple", "yellow", "tan", "brown", "beige"],
  gray:   ["white", "black", "red", "blue", "pink", "purple", "yellow"],
  pink:   ["white", "gray", "black", "red", "purple"],
  beige:  ["white", "brown", "tan", "blue", "green"],
  tan:    ["white", "black", "brown", "beige", "blue", "green", "yellow"],
};


function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function matchColor(base: any, options: any[]) {
  if (!base || options.length === 0) return null;
  const allowed = harmony[base.color] || [];
  const strictMatch = options.find(o => allowed.includes(o.color));
  if (strictMatch) return strictMatch;
  return options[Math.floor(Math.random() * options.length)];
}

export default function useOutfitPicker() {
  const [outfit, setOutfit] = useState<any>(null);

  async function loadCategory(key: string) {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  async function pickOutfit() {
    const tops = shuffle(await loadCategory("tops"));
    const bottoms = shuffle(await loadCategory("bottoms"));
    const outerwear = shuffle(await loadCategory("outerwear"));
    const shoes = shuffle(await loadCategory("shoes"));

    const top = tops.length ? tops[Math.floor(Math.random() * tops.length)] : null;
    const bottom = matchColor(top, bottoms);
    const jacket = matchColor(top, outerwear);
    const shoe = matchColor(top, shoes);

    setOutfit({
      top,
      bottom,
      outerwear,
      shoes,
    });
  }

  useEffect(() => {
    pickOutfit();
  }, []);

  return { outfit, refresh: pickOutfit };
}
