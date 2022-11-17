import { Button, StyleSheet, Text, TouchableOpacity, View , Image, SafeAreaView} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { NavigationContainerRefContext } from '@react-navigation/native'

const ProfileScreen = () => {

  const [ posts, setPosts] = useState([])
  const [ profileInfo, setProfileInfo] = useState([])
  const username = AsyncStorageLib.getItem('user')

  useEffect(() => {
    axios
      .get('http://localhost:8000/profile/${username}')
      .then((response) => {
        setProfileInfo(response.data[0])
        setPosts(response.data[1])
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])


  return (
    <SafeAreaView style={styles.page}>
      <View name='header_container' style={styles.header_container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Image style={styles.button} source={require('../../assets/back_arrow.png')}/>
        </TouchableOpacity>
        <Text style={styles.text}>Profile</Text>

        <TouchableOpacity style={styles.edit_profile_button}>
          <Text style={styles.button_text}>Settings</Text>
        </TouchableOpacity>
      </View>
      <View name='login_container' style={styles.profileImg_container}>
        <Image style={styles.profileImg} source={require('../../assets/defaultImage.png')}/>
        <Text style={styles.text}>My username {/*profileInfo.username || username */}</Text>
      </View>
      <View>
        <Text style={styles.bioText}>This is the user's description {/*profileInfo.description*/}</Text>
      </View>
      <View name='posts_container' style={styles.posts_container}>
        <Text style={styles.text}>Your Memories</Text>
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  page:{
    height : '100%',
    display: 'flex',
    backgroundColor: 'black',
    color: 'white',
  },
  header_container:{
    color : 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    height: 100,
  },
  text:{
    marginTop: 25,
    marginLeft: 5,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button:{
    color: 'white',
    height:30,
    width: 70,
    resizeMode: 'contain',
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 20,
    marginTop: 25,
  },
  edit_profile_button:{
    margin: 20,
    height: 30,
    width: 70,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  button_text:{
    color: 'black',
    fontSize: 15,
    paddingTop: 6,
    textAlign: 'center',

  },
  profileImg:{
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  profileImg_container:{
    alignItems: 'center',
  },
  posts_container:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bioText:{
    color: 'white',
    fontSize: 15,
    textAlign: 'left',
    marginLeft: 20,
    marginTop: 20,
  },
})