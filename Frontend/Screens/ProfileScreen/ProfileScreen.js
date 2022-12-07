import { Button, StyleSheet, Text, TouchableOpacity, View , Image, SafeAreaView, ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { NavigationContainerRefContext } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native';
import { SERVER_URL } from '@env';


const ProfileScreen = (props) => {
  const navigation = useNavigation();
  
  const [ posts, setPosts] = useState([])
  const [ profileInfo, setProfileInfo] = useState([])
  
  
 // recebe o username do perfil que está a ser visitado através das props
  //const {username} = props.route.params;
  
  const getIDFromProps = async () => {
    const {id} = props.route.params;
    return id;
  };
  
  
  useEffect(() => {
    getIDFromProps().then((id) => {
      console.log('id', id);
      axios
        .get('https://c271-2a01-11-320-18a0-2c7d-fdcb-def2-60d6.eu.ngrok.io/profile/' + id + '/')
        .then((response) => {
          //console.log(response.data)
          setPosts(response.data.posts)
          setProfileInfo(response.data.profile)
        })
        .catch((error) => {
          console.log(error)
        })
    })
  }, [])

  // decode the image uri in url
  const decodeUri = (uri) => {
    return decodeURIComponent(uri);
  }

  const profileURL = decodeUri(profileInfo.profileImg);
  const profileImgURL = profileURL.slice(1); 
  
  
  // get all the info from the post
  const fetchPost = async (postID) => {
    const response = await fetch('https://c271-2a01-11-320-18a0-2c7d-fdcb-def2-60d6.eu.ngrok.io/post/' + postID + '/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if(!response){
      return;
    }
    //console.log("response", response);

    const data = await response.json();

    if(response.status !== 200){
      setError(true);
      return;
    }

    console.log("data: ", data)
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

        <TouchableOpacity style={styles.edit_profile_button} onPress={() => navigation.navigate('SettingsScreen', {
          username: profileInfo.user,
          profileIMGURL: profileImgURL,
          profileDescription: profileInfo.description,
        })}>
          <Text style={styles.button_text}>Settings</Text>
        </TouchableOpacity>
      </View>
      <View name='login_container' style={styles.profileImg_container}>
        <Image style={styles.profileImg} source={{uri:profileImgURL}}/>
        <Text style={styles.text}>{profileInfo.user}</Text>
        <Text style={styles.textDate}>Joined on {profileInfo.date_joined}</Text>
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
            console.log('creation time: ', post.creationTime),
            
            //console.log('time: ', postTime),
            <TouchableOpacity key={post.pk} style={styles.posts_container} onPress={() => {fetchPost(post.pk) , navigation.navigate('PostScreen', {
              profileImgURL : profileImgURL,
              username: post.user,
              postID : post.pk, 
              postImage : post.image,
              postDescription : post.description,
              post_time: post.creationTime.slice(11,19),
            })}}>
              <Image style={styles.postImg} source={require('../../assets/defaultImage.png')}/>
            </TouchableOpacity>
          ),
          )}
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
  textDate:{
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
  },
})