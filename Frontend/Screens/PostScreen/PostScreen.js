import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { useEffect, useRef, useState } from 'react';



const PostScreen = () => {
  
  const navigation = useNavigation();

  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();


  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  }else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if(photo) {
    let postPic = () => {
      shareAsync(photo.uri).then(() => navigation.navigate('HomeScreen', {}));
    };

    return (
      <SafeAreaView style={styles.page}>

        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }}/>

        <View style={styles.preview_buttons_container}>

          <TouchableOpacity onPress={() => setPhoto(undefined)}>
            <Image style={styles.discard_button} source={require('../../assets/discard.png')}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={postPic}>
            <Text style={styles.post_button}>POST</Text>
          </TouchableOpacity>

        </View>

      </SafeAreaView>
    );

  }




  return (
    <SafeAreaView style={styles.page}>
      <Camera style={styles.camera} ref={cameraRef}/>
      <View style={styles.button_container}>
        <TouchableOpacity onPress={takePic}>
          <Image style={styles.pic_button} source={require('../../assets/camera.png')}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default PostScreen

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