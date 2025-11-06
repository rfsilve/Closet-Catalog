import { ImageBackground } from 'expo-image';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image,} from 'react-native';

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

      {/* Add Reroll Button and Image */}
      <TouchableOpacity style={styles.rerollButton}>
        <Image
          source={require('../../assets/images/reroll.png')}
          style={styles.rerollIcon}
        />
        <Text style={styles.rerollText}>Reroll</Text>
      </TouchableOpacity>

      {/* Add Laundry Button and Image */}
      <TouchableOpacity style={styles.laundryButton}>
        <Image
          source={require('../../assets/images/laundry-basket.png')}
          style={styles.laundryIcon}
        />
        <Text style={styles.laundryText}>Laundry</Text>
      </TouchableOpacity>

      {/* Add Wardrobe Button and Image */}
      <TouchableOpacity style={styles.wardrobeButton}>
        <Image
          source={require('../../assets/images/wardrobe.png')}
          style={styles.wardrobeIcon}
        />
        <Text style={styles.wardrobeText}>Wardrobe</Text>
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
    top: 60,
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
  rerollButton: {
    position: 'absolute',
    height: 90,
    width: 90,
    bottom: 25,
    alignSelf: 'center',
    backgroundColor: '#f32121ff',
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rerollText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  rerollIcon: {
    width: 60,
    height: 60,
    marginBottom: 2,
    tintColor: 'white',
  },
  laundryButton: {
    position: 'absolute',
    height: 110,
    width: 110,
    bottom: 25,
    right: 25,
    backgroundColor: '#109130ff',
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  laundryText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  laundryIcon: {
    width: 70,
    height: 70,
    marginBottom: 4,
    tintColor: 'white',
  },
  wardrobeButton: {
    position: 'absolute',
    height: 110,
    width: 110,
    bottom: 25,
    left: 25,
    backgroundColor: '#109130ff',
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  wardrobeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  wardrobeIcon: {
    width: 70,
    height: 70,
    marginBottom: 4,
    tintColor: 'white',
  },
});
