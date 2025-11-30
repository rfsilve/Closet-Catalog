import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const FILTERS = ["All", "Top", "Bottom", "Outerwear", "Shoes"];

export default function WardrobeScreen() {
  const [allItems, setAllItems] = useState<any[]>([]);
  const [filter, setFilter] = useState("All");

  async function loadClothes() {
    const tops = JSON.parse((await AsyncStorage.getItem("tops")) || "[]");
    const bottoms = JSON.parse((await AsyncStorage.getItem("bottoms")) || "[]");
    const outer = JSON.parse((await AsyncStorage.getItem("outerwear")) || "[]");
    const shoes = JSON.parse((await AsyncStorage.getItem("shoes")) || "[]");

    setAllItems([...tops, ...bottoms, ...outer, ...shoes]);
  }

  useEffect(() => {
    loadClothes();
  }, []);

  const filtered =
    filter === "All"
      ? allItems
      : allItems.filter((i) => i.category === filter);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Wardrobe",
          headerBackTitle: "Back",
        }}
      />

      {/* FILTER BUTTONS */}
      <View style={styles.filterRow}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.filterButton, filter === f && styles.selectedFilter]}
          >
            <Text
              style={{
                color: filter === f ? "white" : "black",
                fontWeight: "bold",
              }}
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* GRID OF CLOTHES */}
      <ScrollView contentContainerStyle={styles.grid}>
        {filtered.map((item) => (
          <View key={item.id} style={styles.itemBox}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.label}>{item.category}</Text>
            <Text style={styles.color}>{item.color}</Text>
          </View>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#eee",
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
  },
  selectedFilter: {
    backgroundColor: "black",
  },
  grid: {
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  itemBox: {
    width: "30%",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#aaa",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 120,
  },
  label: {
    fontWeight: "bold",
    marginTop: 5,
  },
  color: {
    marginBottom: 5,
    color: "#555",
  },
});
