/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Scanner from './src/screens/Scanner';
import Generator from './src/screens/Generator';
import Camera from './src/screens/Camera';
import Readed from './src/screens/Readed';
import Whatsapp from './src/screens/Whatsapp';
import Splashscreen from './src/screens/Splashscreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Splashscreen'
        screenOptions={{headerShown:false}}
      >
        <Stack.Screen name='Splashscreen' component={Splashscreen} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Scanner' component={Camera} />
        <Stack.Screen name='Generator' component={Generator} />
        <Stack.Screen name='Readed' component={Readed} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
