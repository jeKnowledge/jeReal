import { Button, StyleSheet, Text, TouchableOpacity, View , Image, SafeAreaView, ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { NavigationContainerRefContext } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native';


const ProfileScreen = (props) => {
  const navigation = useNavigation();
  
  const [ posts, setPosts] = useState([])
  const [ profileInfo, setProfileInfo] = useState([])

  
  
 // recebe o username do perfil que está a ser visitado através das props
  //const username = props.username;
  const getIDFromStorage = async () => {
    const idls = await AsyncStorageLib.getItem("id");
    return idls;
  };
  

  
  useEffect(() => {
    getIDFromStorage().then((idls) => {
      console.log('id', idls);
      axios
        .get('https://5376-217-129-165-136.eu.ngrok.io/profile/' + idls + '/')
        .then((response) => {
          console.log(response.data)
          setPosts(response.data.posts)
          setProfileInfo(response.data.profile)
        })
        .catch((error) => {
          console.log(error)
        })
    })
  }, [])

  // get all the info from the post
  const fetchPost = async (postID) => {
    const response = await fetch('https://5376-217-129-165-136.eu.ngrok.io/post/${postID}', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    console.log(data)
    return data
  }

/*
  const posts = [
      {
        "id": 1,
        "user": "user1",
        "description": "Description 1",
        "image": "https://i.pinimg.com/originals/0c/0d/0d/0c0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d.jpg",
      },
      {
        "id": 2,
        "description": "Description 2",
        "image": "https://i.pinimg.com/originals/0c/0d/0d/0c0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d.jpg",
      },
      {
        "id": 2,
        "description": "Description 2",
        "image": "https://i.pinimg.com/originals/0c/0d/0d/0c0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d.jpg",
      },
      {
        "id": 2,
        "description": "Description 2",
        "image": "https://i.pinimg.com/originals/0c/0d/0d/0c0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d.jpg",
      },
      {
        "id": 2,
        "description": "Description 2",
        "image": "https://i.pinimg.com/originals/0c/0d/0d/0c0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d.jpg",
      },
      {
        "id": 2,
        "description": "Description 2",
        "image": "https://i.pinimg.com/originals/0c/0d/0d/0c0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d.jpg",
      },
      {
        "id": 2,
        "description": "Description 2",
        "image": "https://i.pinimg.com/originals/0c/0d/0d/0c0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d.jpg",
      },
      {
        "id": 2,
        "description": "Description 2",
        "image": "https://i.pinimg.com/originals/0c/0d/0d/0c0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d.jpg",
      },
      {
        "id": 2,
        "description": "Description 2",
        "image": "https://i.pinimg.com/originals/0c/0d/0d/0c0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d.jpg",
      },
    ];
*/
  return (
    <SafeAreaView style={styles.page}>
      <View name='header_container' style={styles.header_container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Image style={styles.button} source={require('../../assets/back_arrow.png')}/>
        </TouchableOpacity>
        <Text style={styles.text}>Profile</Text>

        <TouchableOpacity style={styles.edit_profile_button} onPress={() => navigation.navigate('SettingsScreen')}>
          <Text style={styles.button_text}>Settings</Text>
        </TouchableOpacity>
      </View>
      <View name='login_container' style={styles.profileImg_container}>
        <Image style={styles.profileImg} source={require('../../assets/defaultImage.png')}/>
        <Text style={styles.text}>{profileInfo.username}</Text>
      </View>
      <View>
        <Text style={styles.bioText}>{profileInfo.description}</Text>
      </View>
      <View name='container' style={styles.container}>
        <Text style={styles.text}>Your Memories</Text>
      </View>
      <ScrollView>
        <View name='posts_container' style={styles.posts_container}>
          {posts.map((post) => (
            <TouchableOpacity key={post.id} style={styles.posts_container} onPress={() => {fetchPost(post.id) , navigation.navigate('Post', {
              username: post.user,
              postID : post.id, 
              postImage : post.image,
              postDescription : post.description,
              postTime: post.time
            })}}>
              <Image style={styles.postImg} source={require('../../assets/defaultImage.png')}/>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
  container:{
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
  posts_container:{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
  },
  postImg:{
    width: 100,
    height: 100,
    resizeMode: 'contain',
    margin: 5,
  },
})