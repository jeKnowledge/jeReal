import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import UserPermissions from '../../Utilities/UserPermissions';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';


const SettingsScreen = () => {
  const navigation = useNavigation();

  state = {
    user: {
      username: '',
      email: '',
      password: '',
      avatar: null
    },
    errorMessage: null
  }

  handlePickAvatar = async () => {
    UserPermissions.getCameraPermission();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ user: { ...this.state.user, avatar: result.uri } });
    }
  };
  handleSubmitSettings = async () => {
    const { username, email, password, avatar } = this.state.user;

    axios
      .get('http://localhost:8000/profile/${id}/settings')
      .then((response) => {
        setProfileInfo(response.data[0])
        setPosts(response.data[1])
      })
      .catch((error) => {
        console.log(error)
      })
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
        <Text style={styles.text}>Update your Profile picture here</Text>
        <TouchableOpacity onPress={() => handlePickAvatar()}>
          <Image style={styles.profileImg} source={require('../../assets/plusCircle.png')}/>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Text style={styles.descriptionText}>Description</Text>
        <TextInput style={styles.description} placeholder='Update your description'/>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => handleSubmitSettings()}>
          <Image style={styles.submitButton} source={require('../../assets/submit.png')}/>
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
    flexDirection: 'row',
    justifyContent: 'center',
  },
  submitButton: {
    height: 100,
    width: 100,
    borderRadius: 10,
    resizeMode: 'contain',
    marginTop: 30,
  },
})