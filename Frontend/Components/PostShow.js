import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import tw from "tailwind-react-native-classnames";

const data = [
{
  id: "123",
  author: "João",
  image: "https://links.papareact.com/28w",
  screen: "DetailScreen",
  des: "Grande dia no espaço",
},
{
  id: "124",
  author: "Guilherme",
  image: "https://links.papareact.com/28w",
  screen: "DetailScreen",
  des: "Grande dia na escola",
},
{
  id: "125",
  author: "Edu",
  image: "https://links.papareact.com/28w",
  screen: "DetailScreen",
  des: "Grande dia na praia",
},
];

const PostShow = () => {

  

  return (
    <FlatList 
    data={data}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
        <TouchableOpacity style = {tw`pb-10`}>
            <View>
              <Text style ={tw`mt-1 text-white p-5 text-base font-semibold`}>{ item.author }</Text>
              <Image
              style={styles.post}
              source={{ uri: item.image }}/>
              <Text style ={tw`mt-1 text-white p-5 text-base font-semibold`}>{ item.des }</Text>
            </View>
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