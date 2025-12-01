import { useRouter } from 'expo-router';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function AddButton() {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.addButton} onPress={() => router.push('/add-clothes')}>
      <Text style={styles.addText}>Add Clothes</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    height: 100,
    width: 130,
    left: 20,
    top: 60,
    backgroundColor: '#522D80',
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
});
