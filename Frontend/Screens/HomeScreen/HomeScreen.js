import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import PostShow from '../../Components/PostShow'
import { useNavigation } from '@react-navigation/native'; 
import AsyncStorageLib from "@react-native-async-storage/async-storage";

/*function MakePostShow(props) {
  return(
    <View>
        <PostShow/>
    </View>
  );
}
function MakePost(props) {
  return(
    <View style = {styles.make_post}>
      <TouchableOpacity style={styles.post_button} onPress={() => navigation.navigate('PostScreen', {})}>
        <Text style={styles.post_button_text}>Faça um post</Text>
      </TouchableOpacity>
    </View>
  );
}
function ShowPost(props) {
  const postDay = props.postDay;
  if (postDay) {
    return <MakePostShow/>;
  }else {
    return <MakePost/>;
  }
}*/


const HomeScreen = () => {

  const navigation = useNavigation();
  // get username from storage

  const getIDFromStorage = async () => {
    const id = await AsyncStorageLib.getItem("id");
    return id;
  };

  return (
    <SafeAreaView style ={styles.page}>
      <View style = {styles.header_container}>
        <Text style ={styles.text}>JeReal</Text>
        <TouchableOpacity style={styles.profile_button} onPress={() => navigation.navigate('ProfileScreen', {
          id: getIDFromStorage(),
        })}>
          <Text style={styles.profile_button_text}>Profile</Text>
        </TouchableOpacity>
      </View>
      <View>
          <PostShow/>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen

const styles = StyleSheet.create({
  page:{
    height : '100%',
    display: 'flex',
    backgroundColor: 'black',
  },
  header_container:{
    color : 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'black',
  },
  profile_button:{
    height: 30,
    width: 70,
    borderRadius: 10,
    paddingRight: 20,
    paddingTop: 10,
  },
  profile_button_text:{
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text:{
    fontWeight: 'bold',
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
    paddingLeft: 150,
  },
  make_post:{
    alignItems: 'center',
    paddingTop: 280,
  },
  post_button:{
    backgroundColor: 'white',
    height: 45,
    width: 220,
    borderRadius: 10,
    alignItems: 'center',
    paddingLeft: 2,
    paddingTop: 4,
  },
  post_button_text:{
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',

  },
})