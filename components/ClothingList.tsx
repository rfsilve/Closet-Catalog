import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const ORDER = ["Top", "Bottom", "Outerwear", "Shoes"];

export default function ClothingList({ clothes }) {
  return (
    <View style={styles.list}>
      {ORDER.map((category) => {
        const item = clothes.find((c) => c && c.category === category);

        return (
          <View key={category} style={styles.box}>
            {item ? (
              <Image
                source={{ uri: item.image + "?t=" + Date.now() }}
                style={styles.image}
                resizeMode="cover"
              />
            ) : (
              <Text style={styles.placeholder}>{category}</Text>
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
