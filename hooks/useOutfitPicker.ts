import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const harmony: Record<string, string[]> = {
  red: ["black", "white", "gray"],
  blue: ["white", "gray", "tan"],
  green: ["white", "black", "brown"],
  black: ["red", "blue", "white", "green", "tan"],
  white: ["red", "blue", "green", "black", "tan"],
  tan: ["white", "black", "blue"],
  gray: ["white", "black", "red"]
};

function matchColor(base: any, options: any[]) {
  if (!base || options.length === 0) return null;
  const allowed = harmony[base.color] || [];
  return options.find(o => allowed.includes(o.color)) || null;
}

export default function useOutfitPicker() {
  const [outfit, setOutfit] = useState<any>(null);

  async function loadCategory(key: string) {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  async function pickOutfit() {
    const tops = await loadCategory("tops");
    const bottoms = await loadCategory("bottoms");
    const outerwear = await loadCategory("outerwear");
    const shoes = await loadCategory("shoes");

    if (!tops.length || !bottoms.length || !shoes.length) return;

    const top = tops[0];
    const bottom = matchColor(top, bottoms) || bottoms[0];
    const jacket = matchColor(top, outerwear) || outerwear[0] || null;
    const shoe = matchColor(top, shoes) || shoes[0];

    setOutfit({ top, bottom, jacket, shoe });
  }

  useEffect(() => {
    pickOutfit();
  }, []);

  return { outfit, refresh: pickOutfit };
}
