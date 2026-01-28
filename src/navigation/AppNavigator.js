import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';
import { DefaultTheme } from '@react-navigation/native';

import EventListScreen from '../screens/EventListScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import PhotoGalleryScreen from '../screens/PhotoGalleryScreen';
import PhotoViewerScreen from '../screens/PhotoViewerScreen';
import { LightTheme, DarkTheme } from '../utils/theme';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: isDark ? DarkTheme.background : LightTheme.background,
      card: isDark ? DarkTheme.card : LightTheme.card,
      text: isDark ? DarkTheme.textPrimary : LightTheme.textPrimary,
      border: isDark ? DarkTheme.border : LightTheme.border,
    },
  };
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="EventList"
          component={EventListScreen}
          options={{ title: 'Events' }}
        />
        <Stack.Screen
          name="EventDetails"
          component={EventDetailsScreen}
          options={{ title: 'Event Details' }}
        />
        <Stack.Screen
          name="PhotoGallery"
          component={PhotoGalleryScreen}
          options={{ title: 'Photos' }}
        />
        <Stack.Screen
          name="PhotoViewer"
          component={PhotoViewerScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
