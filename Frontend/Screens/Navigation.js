import React from 'react'
import useAuthState  from "../Components/AuthContext/hooks/useAuthContextState";
import LoginScreen from './LoginScreen/LoginScreen';
import ProfileScreen from './ProfileScreen/ProfileScreen';
import SettingsScreen from './SettingsScreen/SettingsScreen';
import PostScreen from './PostScreen/PostScreen';
import HomeScreen from './HomeScreen/HomeScreen';
import MakePostScreen from './MakePostScreen/MakePostScreen';
import MakePostDisc from './MakePostDisc/MakePostDisc';
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
                <Screen name="HomeScreen" component={HomeScreen} />
                <Screen name="MakePostScreen" component={MakePostScreen} />
                <Screen name="ProfileScreen" component={ProfileScreen} />
                <Screen name="PostScreen" component={PostScreen} />
                <Screen name="SettingsScreen" component={SettingsScreen} />
                <Screen name="MakePostDisc" component={MakePostDisc}/>
              </>
            )}
        </Navigator>
      </NavigationContainer>
  )
}

export default Navigation

