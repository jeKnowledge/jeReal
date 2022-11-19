import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import AsyncStorageLib from "@react-native-async-storage/async-storage";


const Post = (props) => {

  const navigation = useNavigation();
  
  const username = props.username
  const postDescription = props.postDescription
  const postImage = props.postImage
  const userID =props.userID

  const [comment, setComment] = React.useState('')

  const fetchMakeComment = async () => {
    const response = await fetch('http://localhost:8000/send_comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "comment": comment, 
        "postID": postID,
        "userID": user,
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
          <Text style={styles.text1}>Username</Text>
          <Text style={styles.text2}>{/*postMessage.time*/} 2h Late</Text>
        </View>
      </View>
      <View style={styles.image}>
        <Image style={styles.postImg} source={require('../../assets/defaultImage.png')}/>
      </View>
      <View style={styles.description_container}>
        <Text style={styles.user}>{/*postMessage.description*/}User 3</Text>
        <Text style={styles.description}>This is the description</Text>
      </View>
      <Separator/>
      <View style={styles.comment_button_container}>
        <TextInput style={styles.comment_input} onChangeText={setComment} value={comment} placeholder="Write a comment..."/>
        <TouchableOpacity style={styles.comment_button} onPress={fetchMakeComment}>
          <Image style={styles.submitImg} source={require('../../assets/comment.png')}/>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.comments}>
        <Text style={styles.textComment}>{/*{comments.user.username}: comments.comment*/}User1: Comment 1 caralho</Text>
        <Text style={styles.textComment}>{/*Comment*/}User1: Comment 2 puta</Text>
        <Text style={styles.textComment}>{/*Comment*/}User1: Comment 3 foda-se</Text>
        <Text style={styles.textComment}>{/*Comment*/}User1: Comment 4 espero que funcione pq isto é grande p caralho</Text>
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
  comments:{
    display: 'flex',
    flexDirection: 'column',
  },
  textComment:{
    color: 'white',
    fontSize: 17,
    marginLeft: 10,
  },
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