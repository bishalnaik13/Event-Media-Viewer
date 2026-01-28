import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    useColorScheme
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { LightTheme, DarkTheme } from '../utils/theme';
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

    const scheme = useColorScheme();
    const theme = scheme === 'dark' ? DarkTheme : LightTheme;
    const styles = createStyles(theme);



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
                placeholderTextColor={theme.textSecondary}
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

const createStyles = (theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        listContent: {
            padding: 16,
        },
        card: {
            paddingVertical: 16,
            paddingHorizontal: 16,
            borderRadius: 10,
            backgroundColor: theme.card,
            marginBottom: 14,
        },
        eventName: {
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 6,
            color: theme.textPrimary,
        },
        eventCode: {
            fontSize: 14,
            color: theme.textSecondary,
        },
        center: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        emptyText: {
            fontSize: 16,
            color: theme.textSecondary,
        },
        searchInput: {
            height: 44,
            borderRadius: 10,
            paddingHorizontal: 14,
            backgroundColor: theme.input,
            marginBottom: 12,
            fontSize: 16,
            color: theme.textPrimary,
        },
    });


