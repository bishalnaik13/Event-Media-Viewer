import { Image, Dimensions, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');
export default function ZoomableImage({ imageUrl }) {
  const scale = useSharedValue(1);
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
      <Animated.View style={styles.container}>
        <Animated.Image
          source={{ uri: imageUrl }}
          style={[styles.image, animatedStyle]}
          resizeMode="contain"
        />
      </Animated.View>
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
});

