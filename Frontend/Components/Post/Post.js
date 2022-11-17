import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native'
import React from 'react'

const Post = () => {


  return (
    <SafeAreaView style={styles.page}>
    <View style={styles.page}>
      <View style={styles.header}>
        <Image style={styles.profileImg} source={require('../../assets/defaultImage.png')}/>
        <View style={styles.username}>
          <Text style={styles.text1}>Username</Text>
          <Text style={styles.text2}>{/*postMessage.time*/} 2h Late</Text>
        </View>
      </View>
      <View style={styles.image}>
        <Image style={styles.postImg} source={require('../../assets/defaultImage.png')}/>
      </View>
      <View style={styles.comments}>
        <Text style={styles.textComment}>{/*{comments.user.username}: comments.comment*/}Comment 1 caralho</Text>
        <Text style={styles.textComment}>{/*Comment*/}Comment 2 puta</Text>
        <Text style={styles.textComment}>{/*Comment*/}Comment 3 foda-se</Text>
        <Text style={styles.textComment}>{/*Comment*/}Comment 4 espero que funcione pq isto é grande para caralho</Text>
      </View>
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
  header:{
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
    height: 400,
    resizeMode: 'contain',
  },
  comments:{
    display: 'flex',
    flexDirection: 'column',
  },
  textComment:{
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
})