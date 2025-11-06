import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Add Clothes button */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addText}>Add Clothes</Text>
      </TouchableOpacity>

      {/* Placeholder clothing list */}
      <View style={styles.clothingList}>
        {['Outwear', 'Top', 'Bottom', 'Accessory'].map((item, index) => (
          <View key={index} style={styles.clothingItem}>
            <Text style={styles.placeholderText}>{item}</Text>
          </View>
        ))}
      </View>

      {/* Add Repick Button */}
      <TouchableOpacity style={styles.repickButton}>
        <Text style={styles.repickText}>Repick</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  addButton: {
    position: 'absolute',
    height: 100,
    width: 130,
    left: 20,
    top: 100,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 33,
    textAlign: 'center',
  },
  clothingList: {
    marginTop: 200,
    gap: 10,
    alignItems: 'center',
  },
  clothingItem: {
    width: 140,
    height: 125,
    borderWidth: 1,
    borderColor: '#000000ff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    color: '#666',
  },
  repickButton: {
    position: 'absolute',
    height: 75,
    width: 100,
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#f32121ff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  repickText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
});
