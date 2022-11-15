import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';
import ProfileScreen from './Screens/ProfileScreen';
import SettingsScreen from './Screens/SettingsScreen';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAuthState  from "./Components/AuthContextState"; 
import React, {useReducer, useEffect, useContext} from 'react';

const {Navigator, Screen} = createNativeStackNavigator();



export default function App() {
/*
  const useAuth = useContext(AuthStateContext);
  console.log("hey" , useAuth.state);
  const userToken = useAuth.state.userToken;
*/
  const { token } = useAuthState()

  return (
    <NavigationContainer>
      <Navigator>
        {token ? (
          <>
            <Screen name="Login" component={LoginScreen} />
            <Screen name="Signup" component={SignupScreen} />
          </>
        ) : (
          <>
            <Screen name="Profile" component={ProfileScreen} />
            <Screen name="Settings" component={SettingsScreen} />
          </>
        )}
      </Navigator>
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
