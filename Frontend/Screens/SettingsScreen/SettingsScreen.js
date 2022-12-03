import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import UserPermissions from '../../Utilities/UserPermissions';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import  useAuthDispatch  from '../../Components/AuthContext/hooks/useAuthContextDispatch';
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { SERVER_URL } from '@env';

const SettingsScreen = (props) => {
  const navigation = useNavigation();
  const { logout } = useAuthDispatch();

  //console.log('props', props)
  const {username , profileIMGURL, profileDescription} = props.route.params
  
  state = {
    user: {
      username: username,
      email: '',
      password: '',
      avatar: profileIMGURL,
    },
    errorMessage: null
  }

  const [image, setImage] = React.useState(null);

  if (image == null) {
    setImage(profileIMGURL)
  }

  const [description, setDescription] = React.useState('');
/*
  handlePickAvatar = async () => {
    UserPermissions.getCameraPermission();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.cancelled) {
      console.log('assets: ', result.uri)
      setImage(result.uri);
    }
  };
*/
  handleSubmitSettings = async () => {
    try {
      const response = await fetch(SERVER_URL + '/settings/' + state.user.username + '/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          description: description,
        })
      })

      if (response.status === 200) {
        navigation.navigate('ProfileScreen');
        alert('Profile updated successfully');
      } else {
        alert('Something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    await AsyncStorageLib.clear();
    logout();
  };


  const Separator = () => {
    return <View style={styles.separator} />
  };

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.backButton} source={require('../../assets/back_arrow.png')}/>
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings</Text>
      </View>
      <Separator/>
      <View style={styles.header2}>
        <Text style={styles.text}>Update your profile description here</Text>
        <Image style={styles.profileImg} source={{uri: image}}/>
      </View>
      <View style={styles.body}>
        <Text style={styles.descriptionText}>Description</Text>
        <TextInput style={styles.description}
          placeholder={profileDescription}
          onChangeText={newDescription => setDescription(newDescription)}
          defaultValue={description}/>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => handleSubmitSettings()}>
          <Image style={styles.submitButton} source={require('../../assets/submit.png')}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={() => handleLogout()}>
          <Text style={styles.textButton}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}


export default SettingsScreen

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    backgroundColor: 'black',
    height: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
  },
  header2: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 40,
    marginLeft: 80,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
  profileImg: {
    height: 80,
    width: 80,
    borderRadius: 60,
    resizeMode: 'contain',
    marginTop: 20,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
  },
  descriptionText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 40,
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
  description: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: 'lightgray',
    height: 100,
    width: 350,
    borderRadius: 10,
    textAlign: 'center',
  },
  backButton: {
    height: 40,
    width: 40,
    borderRadius: 50,
    resizeMode: 'contain',
    marginTop: 30,
    marginLeft: 10,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submitButton: {
    height: 100,
    width: 100,
    borderRadius: 10,
    resizeMode: 'contain',
    marginTop: 30,
  },
  logoutButton: {
    height: 50,
    width: 100,
    borderRadius: 10,
    marginTop: 30,
    color: 'black',
    backgroundColor: 'white',
  },
  textButton: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
})