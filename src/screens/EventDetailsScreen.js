import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { LightTheme, DarkTheme } from '../utils/theme';


export default function EventDetailsScreen({ route }) {
  const { event } = route.params;
  const navigation = useNavigation();

  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? DarkTheme : LightTheme;
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>{event.name}</Text>
      <Text style={styles.eventCode}>{event.code}</Text>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('PhotoGallery', {
            event,
          })
        }
      >
        <Text style={styles.buttonText}>View Photos</Text>
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: theme.background,
    },
    eventName: {
      fontSize: 22,
      fontWeight: '600',
      marginBottom: 6,
      color: theme.textPrimary,
    },
    eventCode: {
      fontSize: 14,
      color: theme.textSecondary,
      marginBottom: 32,
    },
    button: {
      paddingVertical: 16,
      borderRadius: 10,
      backgroundColor: theme.buttonBackground,
      alignItems: 'center',
    },
    buttonText: {
      color: theme.buttonText,
      fontSize: 16,
      fontWeight: '500',
    },
  });

