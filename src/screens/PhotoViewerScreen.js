import { View, FlatList, Dimensions, StyleSheet } from 'react-native';
import { useRef } from 'react';

import ZoomableImage from '../components/ZoomableImage';

const { width, height } = Dimensions.get('window');

export default function PhotoViewerScreen({ route }) {
    const { photos, initialIndex } = route.params;
    const flatListRef = useRef(null);

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={photos}
                horizontal
                pagingEnabled
                initialScrollIndex={initialIndex}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <ZoomableImage imageUrl={item.urls.full} />
                )}
                getItemLayout={(_, index) => ({
                    length: width,
                    offset: width * index,
                    index,
                })}
            />
        </View>
    );
}
