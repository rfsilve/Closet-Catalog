import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const harmony: Record<string, string[]> = {
  red: ["black", "white", "gray"],
  blue: ["white", "gray", "tan"],
  green: ["white", "black", "brown"],
  black: ["red", "blue", "white", "green", "tan"],
  white: ["red", "blue", "green", "black", "tan"],
  tan: ["white", "black", "blue"],
  gray: ["white", "black", "red"],
};

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function matchColor(base: any, options: any[]) {
  if (!base || options.length === 0) return null;
  const allowedStrict = harmony[base.color] || [];
  const strictMatch = options.find(o => allowedStrict.includes(o.color));
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

    if (!tops.length || !bottoms.length || !shoes.length) {
      setOutfit(null);
      return;
    }

    const top = tops[Math.floor(Math.random() * tops.length)];
    const bottom = matchColor(top, bottoms);
    const jacket = matchColor(top, outerwear) || null;
    const shoe = matchColor(top, shoes);

    setOutfit({ top, bottom, jacket, shoe });
  }

  useEffect(() => {
    pickOutfit();
  }, []);

  return { outfit, refresh: pickOutfit };
}
