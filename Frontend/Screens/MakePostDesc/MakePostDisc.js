import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';




const MakePostDisc = () => {
  
  const navigation = useNavigation();

  const fetchMakePost = async () => {
    console.log('post:', post)
    const response = await fetch('https://c271-2a01-11-320-18a0-2c7d-fdcb-def2-60d6.eu.ngrok.io/send_post/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "user": user, 
        "image": image,
        "description": description,
        "creationTime": creationTime,
        "lateTime": lateTime,
      })
    })
    console.log(JSON.stringify({
        "user": user, 
        "image": image,
        "description": description,
        "creationTime": creationTime,
        "lateTime": lateTime,
      }))
    const data = await response.json()
    console.log(data)

  }
  

    return (
      <SafeAreaView style={styles.page}>

        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }}/>

        <View style={styles.body}>
            <Text style={styles.descriptionText}>Description</Text>
            <TextInput style={styles.description}
            placeholder={Description}
             onChangeText={newDescription => setDescription(newDescription)}
            defaultValue={description}/>
        </View>

        <View style={styles.preview_buttons_container}>

          <TouchableOpacity onPress={() => navigation.navigate('MakePostScreen')}>
            <Image style={styles.discard_button} source={require('../../assets/back_arrow.png')}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={fetchMakePost}>
            <Text style={styles.post_button}>POST</Text>
          </TouchableOpacity>

        </View>

      </SafeAreaView>
    );

  }


export default MakePostDisc

const styles = StyleSheet.create({
  page:{
    height : '100%',
    display: 'flex',
    backgroundColor: 'black',
  },
  camera:{
    marginTop: 20,
    height: 650,
    width: 350,
    alignItems: 'center',
    alignSelf: 'center' ,
    justifyContent: 'center',
  },
  button_container:{
    color : 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    paddingLeft: 130,
    marginTop: 5,
  },
  pic_button:{
    backgroundColor: 'black',
    color: 'white',
    height:70,
    width: 80,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 20,
    marginTop: 20,
  },
  preview:{
    marginTop: 20,
    height: 650,
    width: 350,
    alignItems: 'center',
    alignSelf: 'center' ,
    justifyContent: 'center',
  },
  preview_buttons_container:{
    color : 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    marginTop: 5,
    marginRight: 50,
  },
  discard_button:{
    backgroundColor: 'black',
    color: 'white',
    height: 70,
    width: 80,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 20,
    marginTop: 20,
  },
  post_button:{
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 33,
  },
})