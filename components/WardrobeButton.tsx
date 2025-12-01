import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function WardrobeButton() {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.wardrobeButton}
      onPress={() => router.push('/wardrobe')}
    >
      <Image
        source={require('@/assets/images/wardrobe.png')}
        style={styles.wardrobeIcon}
      />
      <Text style={styles.wardrobeText}>Wardrobe</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wardrobeButton: {
    position: 'absolute',
    height: 110,
    width: 110,
    bottom: 25,
    left: 25,
    backgroundColor: '#522D80',
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
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
