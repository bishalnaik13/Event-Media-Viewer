import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function EventDetailsScreen({ route }) {
  const { event } = route.params;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>{event.name}</Text>
      <Text style={styles.eventCode}>{event.code}</Text>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('PhotoGallery', {
            event,
          })
        }
      >
        <Text style={styles.buttonText}>View Photos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  eventName: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 6,
  },
  eventCode: {
    fontSize: 14,
    color: '#666',
    marginBottom: 32,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 10,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

