import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Room at the top for future features */}
      <View style={styles.topSpace}></View>

      {/* Add Clothes button */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addText}>+ Add Clothes</Text>
      </TouchableOpacity>

      {/* Placeholder clothing list */}
      <ScrollView contentContainerStyle={styles.clothingList}>
        {['Headwear', 'Outwear', 'Top', 'Bottom', 'Shoes'].map((item, index) => (
          <View key={index} style={styles.clothingItem}>
            <Text style={styles.placeholderText}>{item}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  topSpace: {
    height: 80, // space at top for later features
  },
  addButton: {
    position: 'absolute',
    left: 20,
    top: 100,
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    zIndex: 1,
  },
  addText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  clothingList: {
    marginTop: 160,
    paddingBottom: 40,
  },
  clothingItem: {
    borderWidth: 1,
    borderColor: '#000000ff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    color: '#666',
  },
});
