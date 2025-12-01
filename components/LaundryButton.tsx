import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

export default function LaundryButton() {
  return (
    <TouchableOpacity style={styles.laundryButton}>
      <Image
        source={require('@/assets/images/laundry-basket.png')}
        style={styles.laundryIcon}
      />
      <Text style={styles.laundryText}>Laundry</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  laundryButton: {
    position: 'absolute',
    height: 110,
    width: 110,
    bottom: 25,
    right: 25,
    backgroundColor: '#522D80',
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
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
});
