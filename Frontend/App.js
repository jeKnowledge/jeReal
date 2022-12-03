import React from 'react';
import { AuthContextProvider } from './Components/AuthContext';
import Navigation from './Screens/Navigation';





export default function App() {
  /*
   {token ? (
          <>
            <Screen name="Login" component={LoginScreen} />
          </>
        ) : (
          <>
            <Screen name="Profile" component={ProfileScreen} />
            <Screen name="Settings" component={SettingsScreen} />
          </>
        )}
  
 <Screen name="ProfileScreen" component={ProfileScreen} />
 <Screen name="Post" component={Post} />
 <Screen name="SettingsScreen" component={SettingsScreen} />
*/


  return (
    <AuthContextProvider>
      <Navigation/>
    </AuthContextProvider>
  );
}

