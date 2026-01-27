import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { events } from '../data/events';

export default function EventListScreen() {
    const navigation = useNavigation();

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.card}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('EventDetails', { event: item })}
            >
                <Text style={styles.eventName}>{item.name}</Text>
                <Text style={styles.eventCode}>{item.code}</Text>
            </TouchableOpacity>
        );
    };
    return (
        <View style={styles.container}>
            {events.length === 0 ? (
                <View style={styles.center}>
                    <Text style={styles.emptyText}>No events available</Text>
                </View>
            ) : (
                <FlatList
                    data={events}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContent}
                />
            )}

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
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 10,
        backgroundColor: '#f5f5f5',
        marginBottom: 14,
    },
    eventName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 6,
    },
    eventCode: {
        fontSize: 14,
        color: '#666',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#777',
    },
});

