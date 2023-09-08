import React from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import H2NOLogo from '../assets/H2NOLogo.png';

export default function Recycle101Page({navigation}) {
    return (
      <ScrollView style={{backgroundColor: '#fdfdf6'}}>
      <View style={{flex: 1, alignItems:'center', justifyContent: 'center'}}>
      <Text></Text>
        <Text style={{fontSize: 30, fontFamily: 'Cochin'}}>Recycling 101 </Text> 
        <Text></Text>
        <Text style={{textAlign: 'center', fontFamily: 'Baskerville', fontSize: 18}}>Click on a category below to learn more about how to recycle items of those materials!</Text>
      </View>
      
      <Text></Text>
      <Text></Text>
      <TouchableOpacity
            onPress={() => navigation.navigate("Plastics")}
            style={{marginVertial: 10, backgroundColor: "gray", padding: 10, borderRadius: 15, width: 150, alignSelf: "center", backgroundColor: "#ed9fb8"}}>
            <Text style={{color: "white", textAlign: "center"}}>Plastics</Text>
      </TouchableOpacity>

      <Text></Text>

      <TouchableOpacity
            onPress={() => navigation.navigate("Aluminum")}
            style={{marginVertial: 10, backgroundColor: "gray", padding: 10, borderRadius: 15, width: 150, alignSelf: "center", backgroundColor: "#aad6e6"}}>
            <Text style={{color: "white", textAlign: "center"}}>Aluminum</Text>
      </TouchableOpacity>

      <Text></Text>

      <TouchableOpacity
            onPress={() => navigation.navigate("Paper & Cardboard")}
            style={{marginVertial: 10, backgroundColor: "gray", padding: 10, borderRadius: 15, width: 150, alignSelf: "center", backgroundColor: "#e7e887"}}>
            <Text style={{color: "white", textAlign: "center"}}>Paper and Cardboard</Text>
      </TouchableOpacity>

      <Text></Text>

      <TouchableOpacity
            onPress={() => navigation.navigate("Glass")}
            style={{marginVertial: 10, backgroundColor: "gray", padding: 10, borderRadius: 15, width: 150, alignSelf: "center", backgroundColor: "#5ce697"}}>
            <Text style={{color: "white", textAlign: "center"}}>Glass</Text>
      </TouchableOpacity>

      <Text></Text>

      <TouchableOpacity
            onPress={() => navigation.navigate("Electronics")}
            style={{marginVertial: 10, backgroundColor: "gray", padding: 10, borderRadius: 15, width: 150, alignSelf: "center", backgroundColor: "#bcaeeb"}}>
            <Text style={{color: "white", textAlign: "center"}}>Electronics</Text>
      </TouchableOpacity>

      <Text></Text>
      <Text></Text>
      <TouchableOpacity
            onPress={() => navigation.navigate("Recycle Item")}
            style={{marginVertial: 10, backgroundColor: "gray", padding: 10, borderRadius: 15, width: 150, alignSelf: "center", backgroundColor: "#f7db87"}}>
            <Text style={{color: "white", textAlign: "center"}}>Upload image to learn how to recycle</Text>
      </TouchableOpacity>
      <Text></Text>

      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image source={H2NOLogo} style={{width: 225, height: 225}}></Image>
      </View>

      <Text style={{textAlign: 'center'}}>Want to contact your county for more information?</Text>
      <Text></Text>
      <TouchableOpacity
            onPress={() => navigation.navigate("County Contacts")}
            style={{marginVertial: 10, backgroundColor: "gray", padding: 10, borderRadius: 15, width: 150, alignSelf: "center", backgroundColor: "#40acde"}}>
            <Text style={{color: "white", textAlign: "center"}}>County Contacts</Text>
      </TouchableOpacity>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>

      </ScrollView>
      
    );

  }