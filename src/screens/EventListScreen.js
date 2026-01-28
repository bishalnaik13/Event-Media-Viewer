import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    TextInput
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { events } from '../data/events';

function FadeInView({ children, style }) {
    const opacity = useSharedValue(0);

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 300 });
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <Animated.View style={[style, animatedStyle]}>
            {children}
        </Animated.View>
    );
}


export default function EventListScreen() {
    const navigation = useNavigation();

    const [searchText, setSearchText] = useState('');
    const filteredEvents = events.filter((event) =>
        event.name.toLowerCase().includes(searchText.toLowerCase()) ||
        event.code.toLowerCase().includes(searchText.toLowerCase())
    );

    const renderItem = ({ item }) => {
        return (
            <FadeInView>
                <TouchableOpacity
                    style={styles.card}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('EventDetails', { event: item })}
                >
                    <Text style={styles.eventName}>{item.name}</Text>
                    <Text style={styles.eventCode}>{item.code}</Text>
                </TouchableOpacity>
            </FadeInView>
        );
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search events by name or code"
                value={searchText}
                onChangeText={setSearchText}
                style={styles.searchInput}
                autoCorrect={false}
            />

            {filteredEvents.length === 0 ? (
                <View style={styles.center}>
                    <Text style={styles.emptyText}>No matching events available</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredEvents}
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
    searchInput: {
        height: 44,
        borderRadius: 10,
        paddingHorizontal: 14,
        backgroundColor: '#f2f2f2',
        marginBottom: 12,
        fontSize: 16,
    },

});

