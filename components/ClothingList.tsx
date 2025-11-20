import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ClothingList() {
  return (
    <View style={styles.clothingList}>
      {['Outwear', 'Top', 'Bottom', 'Accessory'].map((item, index) => (
        <View key={index} style={styles.clothingItem}>
          <Text style={styles.placeholderText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  clothingList: {
    marginTop: 150,
    gap: 10,
    alignItems: 'center',
  },
  clothingItem: {
    width: 160,
    height: 130,
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
});
