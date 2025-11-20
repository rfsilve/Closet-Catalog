import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

export default function RerollButton() {
  return (
    <TouchableOpacity style={styles.rerollButton}>
      <Image
        source={require('@/assets/images/reroll.png')}
        style={styles.rerollIcon}
      />
      <Text style={styles.rerollText}>Reroll</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
});
