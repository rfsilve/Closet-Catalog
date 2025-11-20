import { ImageBackground } from 'expo-image';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image,} from 'react-native';

import AddButton from '@/components/AddButton';
import ClothingList from '@/components/ClothingList';
import RerollButton from '@/components/RerollButton';
import LaundryButton from '@/components/LaundryButton';
import WardrobeButton from '@/components/WardrobeButton';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <AddButton />
      <ClothingList />
      <RerollButton />
      <LaundryButton />
      <WardrobeButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});