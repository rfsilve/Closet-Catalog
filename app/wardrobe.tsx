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
  Alert,
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

  async function deleteItem(id: string, category: string) {
    let key = "";
    if (category === "Top") key = "tops";
    if (category === "Bottom") key = "bottoms";
    if (category === "Outerwear") key = "outerwear";
    if (category === "Shoes") key = "shoes";
    if (!key) return;

    const stored = JSON.parse((await AsyncStorage.getItem(key)) || "[]");
    const newArr = stored.filter((item: any) => item.id !== id);
    await AsyncStorage.setItem(key, JSON.stringify(newArr));
    setAllItems((prev) => prev.filter((item) => item.id !== id));
  }

  function confirmDelete(id: string, category: string) {
    Alert.alert("Delete item", "Are you sure you want to delete this item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteItem(id, category),
      },
    ]);
  }

  const filtered = filter === "All" ? allItems : allItems.filter((i) => i.category === filter);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Wardrobe",
          headerBackTitle: "Back",
        }}
      />

      <View style={styles.filterRow}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.filterButton, filter === f && styles.selectedFilter]}
          >
            <Text style={{ color: filter === f ? "white" : "black", fontWeight: "bold" }}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {filtered.map((item) => (
          <View key={item.id} style={styles.itemBox}>
            <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
            <Text style={styles.label}>{item.category}</Text>
            <Text style={styles.color}>{item.color}</Text>

            <TouchableOpacity
              onPress={() => confirmDelete(item.id, item.category)}
              style={styles.deleteButton}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
            </TouchableOpacity>
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
    justifyContent: "flex-start",
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
  deleteButton: {
    backgroundColor: "red",
    width: "100%",
    paddingVertical: 8,
    alignItems: "center",
    marginTop: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
