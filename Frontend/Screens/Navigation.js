import React from 'react'
import useAuthState  from "../Components/AuthContext/hooks/useAuthContextState";
import LoginScreen from './LoginScreen/LoginScreen';
import ProfileScreen from './ProfileScreen/ProfileScreen';
import SettingsScreen from './SettingsScreen/SettingsScreen';
import PostScreen from './PostScreen/PostScreen';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const {Navigator, Screen} = createNativeStackNavigator();


const Navigation = () => {
    const { token } = useAuthState();
  return (
      <NavigationContainer>
        <Navigator screenOptions={{headerShown: false}}>
          {!token ? (
              <>
                <Screen name="LoginScreen" component={LoginScreen} />
              </>
            ) : (
              <>
                <Screen name="ProfileScreen" component={ProfileScreen} />
                <Screen name="PostScreen" component={PostScreen} />
                <Screen name="SettingsScreen" component={SettingsScreen} />
              </>
            )}
        </Navigator>
      </NavigationContainer>
  )
}

export default Navigation

