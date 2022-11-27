import { StyleSheet, Text, View, Image, TouchableOpacity, Alert} from 'react-native'
import React, { useReducer, useEffect, useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import useAuthDispatch from '../../Components/AuthContext/hooks/useAuthContextDispatch';
import AsyncStorageLib from "@react-native-async-storage/async-storage";


/*
GoogleSignin.configure({
  expoClientId: '549033196869-f3m6urgh42k5rd7kqsdeapc2n1bpdk8p.apps.googleusercontent.com',
  offlineAccess: true,
  hostedDomain: 'jeknowledge.com',
});
*/
const initialState = {
  userInfo: null,
};


const reducer = (state, action) => {
  switch (action.type) {
    case "change": {
      const { key, value } = action;
      return { ...state, [key]: value };
    }
    default:
      return { ...state };
  }
};



const LoginScreen = ({navigation}) => {
  const { login } = useAuthDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);


  
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId:'549033196869-f3m6urgh42k5rd7kqsdeapc2n1bpdk8p.apps.googleusercontent.com',
    androidClientId:'',
    iosClientId:'',
  })

  const handleGoogleSignup = async () => {
    promptAsync();
  };

  const fetchGoogleLogin = async () => {
    const { id_token } = response.params;
    console.log("token", id_token);
    try {
      // Dúvida -> este fetch é o request para a API?
      const response = await fetch('https://5376-217-129-165-136.eu.ngrok.io/login_register_google/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: id_token
          })
      })
      if(!response){
        return;
      }
      console.log("response", response);

      const data = await response.json();
      console.log("Google OAuth Final Token", data);
      if(response.status !== 200){
        setError(true);
        return;
      }
      
      const { key, user} = data;
      console.log("key", key);
      console.log("user", user);

      console.log("user", user);
     //const token = key.slice(2, key.length -1);

      await AsyncStorageLib.setItem('token', key);
      await AsyncStorageLib.setItem('id', user.pk.toString());
      await AsyncStorageLib.setItem('username', user.username);
      await AsyncStorageLib.setItem('email', user.email);
      await AsyncStorageLib.setItem('userProfilePicture', user.profileImg);
      login(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (response?.type === "success") {
      fetchGoogleLogin();
      //console.log(response)
    }
  }, [response]);

/*
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.initialState.userInfo = userInfo;

      // send the user info to the backend
      const response = await fetch('http://localhost:8000/login_register_google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: userInfo.idToken
          })
      })
      if(!response){
        return;
      }
      console.log("response", response);

      const data = await response.json();
      console.log("Google OAuth Final Token", data);
      if(response.status !== 200){
        setError(true);
        return;
      }
      
      const { key, user} = data;

      const token = key.slice(2, key.length -1);

      await AsyncStorageLib.setItem('token', token);
      await AsyncStorageLib.setItem('username', userInfo.user.name);
      await AsyncStorageLib.setItem('email', userInfo.user.email);
      await AsyncStorageLib.setItem('userProfilePicture', userInfo.user.photo);
      
    } catch (error) {
      Alert.alert('Error', error.message);
      
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Cancelado pelo usuário');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Operação em andamento');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Play Services não disponível ou atualizado');
      } else {
        Alert.alert('Erro desconhecido');
      }
      
    }
  };

*/
  return (
    <SafeAreaView style={styles.page}>
      <View name='logo_container' style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../../assets/jeReal.png')}
        />
      </View>
      <View name='login_container' style={styles.login_container}>
        <>
          <Text style={styles.text}>Welcome</Text>
          <Text style={styles.text2}>Please Login</Text>
          <View name='button_container' style={styles.button}>
            <TouchableOpacity
              disabled={!request}
              onPress={handleGoogleSignup} 
              style={styles.button}
            >
              <Image source={require('../../assets/google_button.png')} style={{width: 300, height: 40}} />
            </TouchableOpacity>
          </View>
        </>
      </View>
      <View style={styles.jek_container}>
        <Text style={styles.text3}>By</Text>
        <Image style={styles.logo2} source={require('../../assets/Jek_logo.png')} />
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen

const styles = StyleSheet.create({
  page:{
    display: 'flex',
    backgroundColor: 'black',
    height: '100%',
  },
  logo:{

    width: 100,
    height: 100,
    resizeMode: 'contain',
  },

  login_container:{
    flex: 1,
    alignItems: 'center',
  },

  button:{
    alignSelf: 'center',
    marginTop: 30,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  text:{
    fontWeight: 'bold',
    color: 'white',
    fontSize: 35,
    textAlign: 'center',
    marginBottom: 50,
  },
  text2:{
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: 'gray',
    marginTop: 50,
  },
  text3:{
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
    marginTop: 65,
  },
  logo2:{
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  jek_container:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginRight: 20,
  },
})