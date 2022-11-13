import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";


/*
const initialState = {
  email : '',
  password : '',
};

const reducer = (user, action) => {
  switch (action.type){
    case 'change':{
      const { name, value } = action;
      return {...user, [name]: value};
    }
    case 'closedauth':{
      return{
        ...user,
        error: 'Google Auth Fechada!'
      };
    }<
    case 'error':{
      return{
        ...user,
      };
    }
    default:
      return {...state};
  }
};
*/


const LoginScreen = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "549033196869-f3m6urgh42k5rd7kqsdeapc2n1bpdk8p.apps.googleusercontent.com",
    // iosClientId: "",
    // androidClientId: "",
  });

  useEffect(() => {
    if(response?.type === "success"){
      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();
    }
  },[response, accessToken]);

  async function fetchUserInfo(){
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers:{Authorization: `Bearer ${accessToken}`}
    });
    response.json().then((data) => {
      setUser(data);
    });
  }

  const ShowUserInfo = () => {
    if(user){
      return(
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 35, fontWeight: 'bold', marginBottom:20}}>Bem vindo</Text>
          <Image source={{uri: user.picture}} style={{width: 100, height: 100, borderRadius: 50}}/>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{user.name}</Text>
        </View>
      )
    }
  }

  /*
  const authcontext = React.useContext(AuthContext);

  const {users, setUsers} = React.useState([]);
  const navigate = useNavigation();

  useEffect(() => {
    fetchData(setUsers)
  }, []);


  const LogIn = (authToken, userObject) => {
    AsyncStorageLib.setItem('Authorization', authToken);
    AsyncStorageLib.setItem('User', JSON.stringify(userObject));
    authcontext.dispatch({type: 'LOGIN'});
    navigate('settings/')
  };

  const handleCallbackResponse = (response) =>{
    let exists = false;
    const authToken = response.credential
    let userObject = jwt_decode(authToken);

    if(!exists){
      console.log(userObject)
      axios.post('http://localhost:8000/login', {
        'username' : userObject.name,
        'email' : userObject.email,
        'password' : userObject.password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      ).then((response) => {
        console.log(response)
        if(response.statusText === 'Created'){
          LogIn(authToken, userObject)
      }else{
        console.log(response.data)
      }
    }).catch((error) => {
      console.error(error.response)
      })
    }else{
      axios.put('http://localhost:8000/settings', {
        'description' : userObject.description,
        'image' : userObject.picture,
      },
        {
        headers: {
          'Content-Type': 'application/json',
        },
        }
      ).then((response) => {
        console.log(response)
        
        if(response.statusText === 'OK'){
          LogIn(authToken, userObject)
          }else{
            console.log(response.data)
          }
        })
      }
    }
  

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: '549033196869-f3m6urgh42k5rd7kqsdeapc2n1bpdk8p.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    })

    window.google.accounts.id.renderButton(
      document.getElementById('signInView'),
      { theme: 'outline', size: 'large', shape: 'circle', logo_alignment: 'center' },
    )
  }, [users])
*/


  return (
    <SafeAreaView style={styles.page}>
      <View name='logo_container' style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../../assets/Logo.png')}
        />
      </View>
      <View name='login_container' style={styles.container}>
        {user === null && 
        <>
          <Text style={styles.text}>Welcome</Text>
          <Text style={styles.text2}>Please Login</Text>
          <View name='button_container' style={styles.button}>
            <TouchableOpacity
              disabled={!request}
              onPress={() => {
                promptAsync({showInRecents: true});
              }}
              style={styles.button}
            >
              <Image source={require('../../assets/google_button.png')} style={{width: 300, height: 40}} />
            </TouchableOpacity>
          </View>
        </>
        }
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen

const styles = StyleSheet.create({
  page:{
    backgroundColor: 'white',
    height: '100%',
  },
  logo:{

    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  /*
  container: {
    flex: 1,
    backgroundColor: 'blue',
    //alignItems: 'center',
    justifyContent: 'center',
  },
  */
  button:{
    alignSelf: 'center',
    margin: 10,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  text:{
    fontWeight: 'bold',
    fontSize: 35,
    textAlign: 'center',
  },
  text2:{
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
  },
})