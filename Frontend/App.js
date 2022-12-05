import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import PostScreen from './Screens/PostScreen/PostScreen';
import ProfileScreen from './Screens/ProfileScreen/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';



export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name='HomeScreen' 
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
         />
        <Stack.Screen 
        name='PostScreen' 
        component={PostScreen}
        options={{
          headerShown: false,
        }}
         />
        <Stack.Screen 
        name='ProfileScreen' 
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
         />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
