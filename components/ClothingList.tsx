import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CATEGORIES = ["Outwear", "Top", "Bottom", "Shoes"];

export default function ClothingList() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    loadClothes();
  }, []);

  async function loadClothes() {
    const stored = await AsyncStorage.getItem("clothes");
    const arr = stored ? JSON.parse(stored) : [];
    setItems(arr);
  }

  function getItemForCategory(category: string) {
    // Just return the FIRST item in that category for now
    return items.find((item) => item.category === category) || null;
  }

  return (
    <View style={styles.list}>
      {CATEGORIES.map((cat) => {
        const clothingItem = getItemForCategory(cat);

        return (
          <View key={cat} style={styles.box}>
            {clothingItem ? (
              <Image
                source={{ uri: clothingItem.image }}
                style={styles.image}
                resizeMode="cover"
              />
            ) : (
              <Text style={styles.placeholder}>{cat}</Text>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 150,
    gap: 10,
    alignItems: "center",
  },
  box: {
    width: 140,
    height: 130,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    overflow: "hidden",
  },
  placeholder: {
    fontSize: 18,
    color: "#666",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});