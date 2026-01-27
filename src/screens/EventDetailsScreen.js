import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
export default function EventDetailsScreen({ route }) {
  const { event } = route.params;
return (
    <View style={styles.container}>
      <Text style={styles.eventName}>{event.name}</Text>
      <Text style={styles.eventCode}>{event.code}</Text>
<TouchableOpacity style={styles.button}>
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
    marginBottom: 8,
  },
  eventCode: {
    fontSize: 16,
    color: '#555',
    marginBottom: 24,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

