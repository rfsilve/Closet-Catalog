import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import AddButton from '@/components/AddButton';
import ClothingList from '@/components/ClothingList';
import RerollButton from '@/components/RerollButton';
import LaundryButton from '@/components/LaundryButton';
import WardrobeButton from '@/components/WardrobeButton';
import useOutfitPicker from '@/hooks/useOutfitPicker';
import { TouchableOpacity, Text } from 'react-native';

export default function HomeScreen() {
  const { outfit, refresh } = useOutfitPicker();

  return (
    <View style={styles.container}>
      <AddButton />
      <ClothingList clothes={outfit ? Object.values(outfit) : []} />
      <RerollButton onPress={refresh} />
      <LaundryButton />
      <WardrobeButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
});
