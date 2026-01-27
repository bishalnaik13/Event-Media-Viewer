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
import { useNavigation } from '@react-navigation/native';

import { fetchPhotos } from '../services/unsplashService';

const NUM_COLUMNS = 3;
const SCREEN_WIDTH = Dimensions.get('window').width;
const IMAGE_SIZE = SCREEN_WIDTH / NUM_COLUMNS - 16;

export default function PhotoGalleryScreen() {
    const navigation = useNavigation();
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
                onTouchEnd={() =>
                    navigation.navigate('PhotoViewer', {
                        photos,
                        initialIndex: photos.findIndex((p) => p.id === item.id),
                    })
                }
            />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
        paddingTop: 8,
        backgroundColor: '#fff',
    },
    image: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        margin: 4,
        borderRadius: 10,
        backgroundColor: '#e0e0e0',
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
