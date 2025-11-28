import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync().catch(() => undefined);

export default function App() {
  useEffect(() => {
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };
    hideSplash();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'dark'} />
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Calorie Tracker' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
