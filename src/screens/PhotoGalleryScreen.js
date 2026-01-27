import {
    View,
    FlatList,
    Image,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    Text
} from 'react-native';
import { useEffect, useState } from 'react';

import { fetchPhotos } from '../services/unsplashService';

const NUM_COLUMNS = 3;
const SCREEN_WIDTH = Dimensions.get('window').width;
const IMAGE_SIZE = SCREEN_WIDTH / NUM_COLUMNS - 16;

export default function PhotoGalleryScreen() {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadPhotos();
    }, []);

    const loadPhotos = async () => {
        if (loading) return;
        try {
            setLoading(true);
            const newPhotos = await fetchPhotos(page);
            setPhotos((prev) => [...prev, ...newPhotos]);
            setPage((prev) => prev + 1);
        } catch (err) {
            setError('Unable to load photos. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <Image
                source={{ uri: item.urls.small }}
                style={styles.image}
            />
        );
    };
    if (error) {
        return (
            <View style={styles.center}>
                <Text>{error}</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        backgroundColor: '#fff',
    },
    image: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        margin: 4,
        borderRadius: 8,
        backgroundColor: '#e0e0e0',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
