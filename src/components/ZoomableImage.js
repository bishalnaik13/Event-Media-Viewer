import { Dimensions, StyleSheet, ActivityIndicator, View } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import { useState } from 'react';

const { width, height } = Dimensions.get('window');

export default function ZoomableImage({ imageUrl }) {
  const scale = useSharedValue(1);
  const [loading, setLoading] = useState(true);
  const pinchGesture = Gesture.Pinch()

    .onUpdate((e) => {
      scale.value = e.scale;
    })
    .onEnd(() => {
      scale.value = 1;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <GestureDetector gesture={pinchGesture}>
      <View style={styles.container}>
        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}
        <Animated.View style={[styles.imageWrapper, animatedStyle]}>
          <ExpoImage
            source={{ uri: imageUrl }}
            style={styles.image}
            contentFit="contain"
            cachePolicy="disk"
            onLoadEnd={() => setLoading(false)}
          />
        </Animated.View>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  image: {
    width,
    height,
  },
  loader: {
    position: 'absolute',
    zIndex: 10,
  },
  imageWrapper: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

