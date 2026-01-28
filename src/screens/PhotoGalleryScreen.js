import {
    View,
    FlatList,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    Text,
    Pressable,
    useColorScheme
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import { Image as ExpoImage } from 'expo-image';
import { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { LightTheme, DarkTheme } from '../utils/theme';
import { fetchPhotos } from '../services/unsplashService';

const NUM_COLUMNS = 3;
const SCREEN_WIDTH = Dimensions.get('window').width;
const IMAGE_SIZE = SCREEN_WIDTH / NUM_COLUMNS - 16;

function FadeInView({ children }) {
    const opacity = useSharedValue(0);

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 250 });
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <Animated.View style={animatedStyle}>
            {children}
        </Animated.View>
    );
}


export default function PhotoGalleryScreen({ route }) {
    const { event } = route.params || {};
    const navigation = useNavigation();

    const scheme = useColorScheme();
    const theme = scheme === 'dark' ? DarkTheme : LightTheme;
    const styles = createStyles(theme);


    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState(event?.name || '');


    useEffect(() => {
        loadPhotos();
    }, []);

    const loadPhotos = async () => {
        if (loading) return;
        try {
            setLoading(true);
            const newPhotos = await fetchPhotos(
                page,
                20,
                event?.name
            );
            setPhotos((prev) => [...prev, ...newPhotos]);
            setPage((prev) => prev + 1);
        } catch (err) {
            setError('Unable to load photos. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => {
        const index = photos.findIndex((p) => p.id === item.id);

        return (
            <FadeInView>
                <Pressable
                    onPress={() =>
                        navigation.navigate('PhotoViewer', {
                            photos,
                            initialIndex: index < 0 ? 0 : index,
                        })
                    }
                >
                    <ExpoImage
                        source={{ uri: item.urls.small }}
                        style={styles.image}
                        contentFit="cover"
                        transition={150}
                        cachePolicy="disk"
                    />
                </Pressable>
            </FadeInView>
        );
    };
    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }
    if (!loading && photos.length === 0) {
        return (
            <View style={styles.center}>
                <Text>No photos found</Text>
            </View>
        );
    }



    return (
        <View style={styles.container}>
            <FlatList
                data={photos}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                numColumns={NUM_COLUMNS}
                showsVerticalScrollIndicator={false}
                onEndReached={loadPhotos}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loading ? <ActivityIndicator size="small" /> : null}
            />
        </View>
    );
}

const createStyles = (theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 8,
            paddingTop: 8,
            backgroundColor: theme.background,
        },
        image: {
            width: IMAGE_SIZE,
            height: IMAGE_SIZE,
            margin: 4,
            borderRadius: 10,
            backgroundColor: theme.border,
        },
        center: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        errorText: {
            color: '#cc0000',
            fontSize: 14,
        },
    });

