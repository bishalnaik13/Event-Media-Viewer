const dummyPhotos = [
    { id: '1', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb' },
    { id: '2', url: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d' },
    { id: '3', url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee' },
    { id: '4', url: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff' },
    { id: '5', url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba' },
    { id: '6', url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470' },
];

import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';

const NUM_COLUMNS = 3;
const SCREEN_WIDTH = Dimensions.get('window').width;
const IMAGE_SIZE = SCREEN_WIDTH / NUM_COLUMNS - 16;

export default function PhotoGalleryScreen() {
    const renderItem = ({ item }) => {
        return (
            <Image
                source={{ uri: item.url }}
                style={styles.image}
            />
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={dummyPhotos}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                numColumns={NUM_COLUMNS}
                showsVerticalScrollIndicator={false}
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
});
