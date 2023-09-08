import React from 'react'
import { View, Text, Button, Image, ScrollView, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react';
import H2NOLogo from '../assets/H2NOLogo.png';

export default function RecyclePage({navigation}) {

    // Set default image
    const [image, setImage] = useState(require('../assets/H2NOLogo.png').uri);

    // Set image class
    const [objClass, setObjClass] = useState("~Classification will appear here!~");

    // Pick image from gallery
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [1,1],
        quality: 1,
        allowsEditing:true,
        base64: true,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        const imageb64 = `${result.assets[0].base64}`;
        var raw = JSON.stringify({"photo" : imageb64});
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        console.log('before post')
        setObjClass("Analyzing image!");

        fetch("http://192.168.86.244:5002/classify", requestOptions)
        .then(response => response.json())
        .then(result => setObjClass(result.Class))
        .catch(error => console.log('error', error));
        
        console.log('after post')
      }
    };

    // Take a photo
    const openCamera = async () => {
      // Ask the user for the permission to access the camera
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      
      if (permissionResult.granted === false) {
        alert("You have not allowed access to your camera!");
        return;
      }
      
      const result = await ImagePicker.launchCameraAsync(
        {aspect: [1,1],
        base64: true}
      );
      
      // Set the image that was taken
      if (!result.canceled) {
        setImage(result.assets[0].uri);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        const imageb64 = `${result.assets[0].base64}`;
        var raw = JSON.stringify({"photo" : imageb64});
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        console.log('before post')
        setObjClass("Analyzing image!");
        
        fetch("http://192.168.86.244:5002/classify", requestOptions)
        .then(response => response.json())
        .then(result => setObjClass("That is a "+result.Class))
        .catch(error => console.log('error', error));

        console.log("after fetch");
      }
    }

    return (
      <ScrollView style={{backgroundColor: '#fdfdf6'}}>
      <View style={{flex: 1, alignItems:'center', justifyContent: 'center'}}>
        <Text></Text>
        <Text></Text>
        <Text style={{fontSize: 28, fontFamily: 'Cochin', textAlign: "center", marginBottom: 5}}>Upload an image to learn how to recycle it!</Text> 
        <Image source={image ? { uri: image } : H2NOLogo} style={{width:320, height: 320}} />
        <Button style={{fontFamily: 'Cochin'}} title="Select Photo to Upload" onPress={pickImage}/>
        <Button title="Take a Photo" onPress={openCamera}/>
        <Text></Text>
        <Text></Text>
        <Text style={{fontSize: 25, 
        fontFamily: 'Cochin', 
        textAlign: 'center'}}>{objClass}</Text>
      </View>
      <View style={{flex: 1, alignItems:'center', justifyContent: 'center', marginVertical: 50}}>
        <Text style={{fontsize: 100, fontFamily: 'Cochin'}}>Learn more about recycling! Click the button below</Text>
        <Text></Text>
        <TouchableOpacity
            onPress={() => navigation.navigate("Recycling 101")}
            style={{marginVertial: 10, backgroundColor: "gray", padding: 10, borderRadius: 15, width: 150, alignSelf: "center", backgroundColor: "#5ce697"}}>
            <Text style={{color: "white", textAlign: "center"}}>Recycling 101</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    );
  }