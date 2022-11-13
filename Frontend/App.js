import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';
import ProfileScreen from './Screens/ProfileScreen';
import SettingsScreen from './Screens/SettingsScreen';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const {Navigator, Screen} = createNativeStackNavigator();



export default function App() {


  return (
    <NavigationContainer>
      <Navigator>
            <Screen name="Login" component={LoginScreen} />
            <Screen name="Signup" component={SignupScreen} />
            <Screen name="Profile" component={ProfileScreen} />
            <Screen name="Settings" component={SettingsScreen} />
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
