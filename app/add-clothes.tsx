import React, { useState } from 'react';
import { View, Text, Button, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack } from 'expo-router';

const VALID_COLORS = [
  "red", "orange", "yellow", "green", "blue", "purple",
  "brown", "black", "white", "gray", "pink", "beige", "tan"
];

export default function AddClothesScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [material, setMaterial] = useState("");

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  async function saveItem() {
    if (!image || !category || !VALID_COLORS.includes(color.toLowerCase())) {
      alert("Please fill out everything correctly.");
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      image,
      category,
      color: color.toLowerCase(),
      material,
    };

    let key = "";
    if (category === "Top") key = "tops";
    if (category === "Bottom") key = "bottoms";
    if (category === "Outerwear") key = "outerwear";
    if (category === "Shoes") key = "shoes";

    if (!key) {
      alert("Invalid category.");
      return;
    }

    const existing = await AsyncStorage.getItem(key);
    const arr = existing ? JSON.parse(existing) : [];
    arr.push(newItem);
    await AsyncStorage.setItem(key, JSON.stringify(arr));

    alert("Saved!");
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Add Clothes",
          headerBackTitle: "Back",
        }}
      />

      <View style={styles.container}>
        <Text style={styles.title}>Add New Clothing</Text>

        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          {image ? (
            <Image source={{ uri: image }} style={styles.preview} />
          ) : (
            <Text style={{ color: "black" }}>Select Image</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>Category</Text>
        <View style={styles.categoryRow}>
          {["Outerwear", "Top", "Bottom", "Shoes"].map((c) => (
            <TouchableOpacity
              key={c}
              style={[styles.categoryButton, category === c && styles.selected]}
              onPress={() => setCategory(c)}
            >
              <Text style={styles.categoryText}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Color</Text>
        <TextInput
          placeholder="Enter a color"
          placeholderTextColor="#888"
          style={styles.input}
          value={color}
          onChangeText={setColor}
        />

        {!VALID_COLORS.includes(color.toLowerCase()) && color.length > 0 && (
          <Text style={{ color: "red" }}>Invalid color</Text>
        )}

        <Text style={styles.label}>Material</Text>
        <TextInput
          placeholder="e.g., cotton, denim"
          placeholderTextColor="#888"
          style={styles.input}
          value={material}
          onChangeText={setMaterial}
        />

        <Button title="Save Clothing Item" onPress={saveItem} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "black" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20, color: "white" },
  imagePicker: {
    height: 200,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  preview: { width: "100%", height: "100%", borderRadius: 10 },
  label: { fontWeight: "bold", marginTop: 10, color: "white" },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    color: "white",
    borderColor: "white",
  },
  categoryRow: { flexDirection: "row", gap: 10, marginVertical: 10 },
  categoryButton: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
  },
  selected: { backgroundColor: "#4CAF50" },
  categoryText: { color: "#000" },
});
