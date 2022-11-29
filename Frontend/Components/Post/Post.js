import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import AsyncStorageLib from "@react-native-async-storage/async-storage";
//import useEffect
import { useEffect } from 'react'
//import axios
import axios from 'axios'


const Post = (props) => {

  const navigation = useNavigation();

  console.log('props', props)
  
  const username = props.navigation.route.params.username
  console.log('username', username)
  const postDescription = props.navigation.route.params.postDescription
  console.log('postDescription', postDescription)
  const postImage = props.navigation.route.params.postImage
  console.log('postImage', postImage)
  const postTime = props.navigation.route.params.postTime
  console.log('postTime', postTime)
  //const postID = props.navigation.route.params.postID
  //console.log('postID', postID)

  const [comment, setComment] = React.useState('')
  
  const [comments_list, setCommentsList] = React.useState([])

  // get all commets from a post
  
  useEffect(() => {
    axios
      .get('https://5376-217-129-165-136.eu.ngrok.io/get_comments/' + postID +'/')
      .then((response) => {
        console.log(response.data)
        setCommentsList(response.data)
      })
      .catch((error) => {
        console.log(error)
      })  
  }, [])


  const fetchMakeComment = async () => {
    const response = await fetch('https://5376-217-129-165-136.eu.ngrok.io/send_comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "comment": comment, 
        "postID": postID,
        "auhtor": user,
      })
    })
    const data = await response.json()
    console.log(data)

    Alert.alert('Já funfa!')
  }
  
  const Separator = () => {
    return <View style={styles.separator} />
  };

  return (
    <SafeAreaView style={styles.page}>
    <View style={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Image style={styles.closeButton} source={require('../../assets/closeButton.png')}/>
        </TouchableOpacity>
      </View>
      <Separator/>
      <View style={styles.header2}>
        <Image style={styles.profileImg} source={require('../../assets/defaultImage.png')}/>
        <View style={styles.username}>
          <Text style={styles.text1}>{username}</Text>
          <Text style={styles.text2}>{postTime}Late</Text>
        </View>
      </View>
      <View style={styles.image}>
        <Image style={styles.postImg} source={require('../../assets/defaultImage.png')}/>
      </View>
      <View style={styles.description_container}>
        <Text style={styles.user}>{username}</Text>
        <Text style={styles.description}>{postDescription}</Text>
      </View>
      <Separator/>
      <View style={styles.comment_button_container}>
        <TextInput style={styles.comment_input} onChangeText={setComment} value={comment} placeholder="Write a comment..."/>
        <TouchableOpacity style={styles.comment_button} onPress={fetchMakeComment}>
          <Image style={styles.submitImg} source={require('../../assets/defaultImage.png')}/>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.comments}>
          {comments_list.map((comment) => (
            <View key={comment.id} style={styles.comments}>
              <Text style={styles.text1}>{comment.author.username}</Text>
              <Text style={styles.text2}>{comment.comment}</Text>
            </View>
            ))}
      </ScrollView>
    </View>
  </SafeAreaView>
  )
}

export default Post

const styles = StyleSheet.create({
  page:{
    backgroundColor: 'black',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  header2:{
    display: 'flex',
    flexDirection: 'row',
  },
  profileImg:{
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 50,
    margin: 10,
  },
  username:{
    display: 'flex',
    displayDirection: 'column',
    justifyContent: 'space-between',
  },
  text1:{
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
  text2:{
    color: 'white',
    fontSize: 15,
    marginBottom: 10,
  },
  postImg:{
    margin: 10,
    width: 400,
    height: 350,
  },
  //--------------------------
  comments:{
    display: 'flex',
    flexDirection: 'column',
  },
  textComment:{
    color: 'white',
    fontSize: 17,
    marginLeft: 10,
  },
  //--------------------------
  comment_button_container:{
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  comment_button:{
    marginRight: 10,
  },
  submitImg:{
    width: 30,
    height: 30,
    borderRadius: 50,
    resizeMode: 'contain',
  },
  closeButton:{
    width: 30,
    height: 30,
    borderRadius: 50,
    resizeMode: 'contain',
    marginTop: 10,
    marginLeft: 10,
  },
  header:{
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  separator: {
    marginTop: 15,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  comment_input:{
    width: 300,
    height: 30,
    backgroundColor: 'lightgray',
    borderRadius: 50,
    marginRight: 25,
    marginLeft: 20,
    padding: 5,
  },
  description:{
    color: 'white',
    fontSize: 15,
    marginLeft: 10,
  },
  comments:{
    marginTop: 10,
    marginBottom: 10,
  },
  description_container:{
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  user:{
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
})