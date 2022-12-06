import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import AsyncStorageLib from "@react-native-async-storage/async-storage";
//import useEffect
import { useEffect } from 'react'
//import axios
import axios from 'axios'
import { SERVER_URL } from '@env';


const PostScreen = (props) => {

  const navigation = useNavigation();

  //console.log('props', props)
  const {username, postDescription, postImage, post_time, postID, profileImgURL} = props.route.params

  const [comment, setComment] = React.useState('')
  
  const [comments_list, setCommentsList] = React.useState([])

  // get all commets from a post
  
  useEffect(() => {
    axios
      .get(SERVER_URL + '/get_comments/' + postID +'/')
      .then((response) => {
        //console.log(response.data)
        setCommentsList(response.data)
        console.log('comments_list: ', comments_list)
      })
      .catch((error) => {
        console.log(error)
      })  
  }, [])


  const fetchMakeComment = async () => {
    console.log('comment:', comment)
    const response = await fetch(SERVER_URL + '/send_comment/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "comment": comment, 
        "postID": postID,
        "author": username,
      })
    })
    console.log(JSON.stringify({
      "author": username,
      "postID": postID,
      "comment": comment, 
      }))
    const data = await response.json()
    console.log(data)

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
        <Image style={styles.profileImg} source={{uri:profileImgURL}}/>
        <View style={styles.username}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.postTime}>{post_time} Late</Text>
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
          <Image style={styles.submitImg} source={require('../../assets/comment.png')}/>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.comments}>
          {comments_list.map((comment) => (
            <View key={comment.pk} style={styles.comment}>
              <Text style={styles.text1}>{comment.author}: </Text>
              <Text style={styles.text2}>{comment.comment}</Text>
            </View>
            ))}
        </View>
      </ScrollView>
    </View>
  </SafeAreaView>
  )
}

export default PostScreen

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
  username:{
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
  },
  text1:{
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  text2:{
    color: 'white',
    fontSize: 15,
  },
  postTime:{
    color: 'white',
    fontSize: 15,
    marginTop: 5,
  },
  postImg:{
    margin: 10,
    width: 400,
    height: 350,
  },
  //--------------------------
  comment:{
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
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
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'column'
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
  scrollView: {
    marginTop: 10,
  }
})