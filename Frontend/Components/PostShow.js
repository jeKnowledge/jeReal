import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import tw from "tailwind-react-native-classnames";


const PostShow = () => {

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
  

  return (
    <FlatList 
    data={data}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
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
    )}
    />
  );
};

export default PostShow

const styles = StyleSheet.create({
  post:{
    width:400, 
    height:400, 
    alignItems: 'center', 
    resizeMode: "contain",
  },
})