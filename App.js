import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './Component/SplashScreen';
import HomeScreen from './Component/HomeScreen';
import Details from './Component/Details';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SplashScreen" options={{ headerShown: false }} component={SplashScreen} />
        <Stack.Screen name="HomeScreen" options={{ headerShown: false }} component={HomeScreen} />
        <Stack.Screen name="Details" options={{ headerShown: false }} component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
