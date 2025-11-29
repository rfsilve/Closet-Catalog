import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AddButton from '@/components/AddButton';
import ClothingList from '@/components/ClothingList';
import RerollButton from '@/components/RerollButton';
import LaundryButton from '@/components/LaundryButton';
import WardrobeButton from '@/components/WardrobeButton';

export default function HomeScreen() {
  const [clothes, setClothes] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    async function loadClothes() {
      try {
        const saved = await AsyncStorage.getItem("clothes");
        if (saved) {
          const parsed = JSON.parse(saved);
          setClothes(parsed);
          pickRandomOutfit(parsed);
        }
      } catch (err) {
        console.log("Error loading clothes:", err);
      }
    }

    loadClothes();
  }, []);

  function pickRandomOutfit(list) {
    if (!list || list.length === 0) {
      setSelected([]);
      return;
    }

    const shuffled = [...list].sort(() => Math.random() - 0.5);
    const four = shuffled.slice(0, 4);
    setSelected(four);
  }

  function handleReroll() {
    pickRandomOutfit(clothes);
  }

  return (
    <View style={styles.container}>
      <AddButton />
      <ClothingList clothes={selected} />
      <RerollButton onPress={handleReroll} />
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
