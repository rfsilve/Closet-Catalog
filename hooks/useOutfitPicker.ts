import { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const harmony: Record<string, string[]> = {
  red: ["black", "white", "gray", "blue"],
  orange: ["white", "black", "brown"],
  yellow: ["white", "gray", "blue"],
  green: ["white", "black", "brown", "beige"],
  blue: ["white", "gray", "tan", "black"],
  purple: ["white", "black", "gray"],
  brown: ["white", "beige", "tan"],
  black: ["red", "blue", "white", "green", "tan", "pink"],
  white: ["red", "blue", "green", "black", "tan", "pink", "purple"],
  gray: ["white", "black", "red", "blue"],
  pink: ["white", "gray", "blue"],
  beige: ["white", "brown", "tan"],
  tan: ["white", "black", "blue", "beige"],
};

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function pickDifferent<T>(array: T[], previous: T | null): T {
  if (array.length === 0) return null;
  if (array.length === 1) return array[0];

  let newItem = array[Math.floor(Math.random() * array.length)];

  // keep picking until it’s different
  while (previous && newItem.id === previous.id) {
    newItem = array[Math.floor(Math.random() * array.length)];
  }

  return newItem;
}

function matchColor(base: any, options: any[]) {
  if (!base || options.length === 0) return null;
  const allowed = harmony[base.color] || [];
  const strictMatch = options.find((o) => allowed.includes(o.color));
  if (strictMatch) return strictMatch;
  return options[Math.floor(Math.random() * options.length)];
}

export default function useOutfitPicker() {
  const [outfit, setOutfit] = useState<any>(null);
  const lastOutfitRef = useRef<any>(null);

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

    const last = lastOutfitRef.current;

    // GUARANTEED new shirt & pants
    const top = pickDifferent(tops, last?.Top || null);
    const bottom = pickDifferent(bottoms, last?.Bottom || null);

    // Outerwear & Shoes behave normally (matching first, random fallback)
    const jacket =
      matchColor(top, outerwear) ||
      outerwear[Math.floor(Math.random() * outerwear.length)] ||
      null;

    const shoe =
      matchColor(top, shoes) ||
      shoes[Math.floor(Math.random() * shoes.length)];

    const newOutfit = {
      Top: top,
      Bottom: bottom,
      Outerwear: jacket,
      Shoes: shoe,
    };

    lastOutfitRef.current = newOutfit;
    setOutfit(newOutfit);
  }

  useEffect(() => {
    pickOutfit();
  }, []);

  return { outfit, refresh: pickOutfit };
}
