import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { events } from '../data/events';

export default function EventListScreen() {
    const navigation = useNavigation();

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('EventDetails', {event: item})}
            >
                <Text style={styles.eventName}>{item.name}</Text>
                <Text style={styles.eventCode}>{item.code}</Text>
            </TouchableOpacity>
        );
    };
    return (
        <View style={styles.container}>
            <FlatList
                data={events}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listContent: {
        padding: 16,
    },
    card: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#f2f2f2',
        marginBottom: 12,
    },
    eventName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    eventCode: {
        fontSize: 14,
        color: '#555',
    },
});

