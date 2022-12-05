import { StyleSheet,SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.page}>
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen', {})}>
        <View>
          <Text style={styles.text}>ProfileScreen</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView> 
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  page:{
    backgroundColor: 'black',
  },
  text:{
    color: 'white',
    fontSize: 40, 
    padding: 30,
  },
})