import { Button, Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc} from "firebase/firestore";
import React, { useState } from 'react';

const turnLightsOn = async (value, id, ip, key, lightID, lightName) => {
    var myHeaders = new Headers();
    myHeaders.append("hue-application-key", key);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "on": value 
    });

    var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://" + ip + "/api/" + key +"/lights/" + id + "/state", requestOptions)
    .then(response => response.text())
    .then(result => {
        console.log(result);        
    })
    .catch(error => console.log('error', error));

    const docRef = doc(db, "smart_home", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    var lightsArrayFromDB = docSnap.data().lights;
    var newlightsArray = []
    for (var i = 0; i < lightsArrayFromDB.length; i++) {
        if (lightsArrayFromDB[i].LightId == lightID) {
            newlightsArray.push({
                    ID: auth.currentUser.uid,
                    LightId: lightsArrayFromDB[i].LightId,
                    BridgeIP: lightsArrayFromDB[i].BridgeIP,
                    BridgeKey: lightsArrayFromDB[i].BridgeKey,
                    Label: lightName,
                    on: value
            });
        } else {
            newlightsArray.push({
                    ID: auth.currentUser.uid,
                    LightId: lightsArrayFromDB[i].LightId,
                    BridgeIP: lightsArrayFromDB[i].BridgeIP,
                    BridgeKey: lightsArrayFromDB[i].BridgeKey,
                    Label: lightsArrayFromDB[i].Label,
                    on: lightsArrayFromDB[i].on
            });
        }
    }

    setDoc(doc(db, "smart_home", auth.currentUser.uid), {
        lights: newlightsArray
    })
}

const AppButton = ({onPress, title, styling}) => (
    <TouchableOpacity onPress={onPress} style={styling}>
        <Text style={{        
            fontSize: 18,
            color: "#fff",
            fontWeight: "bold",
            alignSelf: "center",
            textTransform: "uppercase"}}>{title}</Text>
    </TouchableOpacity>
)

export default function EditLight({navigation}) {    

    var key = navigation.getParam('lightKey');
    var status = navigation.getParam('light');
    var apiKey = navigation.getParam('apiKey');
    var ipAddress = navigation.getParam('ipAddress');
    var nameText = navigation.getParam('nameText');
    //get light from lights using key
    var [newName, setNewName] = useState('');

    return (
        <View>
            <TextInput placeholder='Edit light name:' onChangeText={setNewName}
            style={{    
                height: 40,
                margin: 12,
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,}}/>
            <Button onPress={() => {updateLight(newName, key)}} title='Update Name'/>

            <AppButton onPress={() => {turnLightsOn(true, 0, ipAddress, apiKey, key, nameText)}} title='Turn On' 
                styling={{elevation: 8,
                        backgroundColor: '#00d',
                        borderRadius: 10,
                        paddingVertical: 15,
                        paddingHorizontal: 10,
                        width: 150,
                        top: 15,
                        left: 230
                        }}
            />
            <AppButton onPress={() => {turnLightsOn(false, 0, ipAddress, apiKey, key, nameText)}} title='Turn Off'   
                styling={{elevation: 8,
                        backgroundColor: '#000',
                        borderRadius: 10,
                        paddingVertical: 15,
                        paddingHorizontal: 10,
                        width: 150,
                        top: -35,
                        left: 30
                        }}
            />

            <AppButton onPress={() => deleteLight(key)} title='Delete' 
                styling={{elevation: 8,
                        backgroundColor: '#d00',
                        borderRadius: 10,
                        paddingVertical: 15,
                        paddingHorizontal: 10,
                        width: 150,
                        top: 10,
                        left: 130
                        }}
            />

        <Text style={{top: 50, left: 140}}>
            Current Status: {status ? <Text>On</Text> : <Text>Off</Text>}
        </Text>
        </View>
    )

    async function updateLight(newName, key) {
        const docRef = doc(db, "smart_home", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        var lightsArrayFromDB = docSnap.data().lights;
        var newlightsArray = []
        for (var i = 0; i < lightsArrayFromDB.length; i++) {
            console.log(newName)
            if (lightsArrayFromDB[i].LightId == key) {
                newlightsArray.push({
                        ID: auth.currentUser.uid,
                        LightId: lightsArrayFromDB[i].LightId,
                        BridgeIP: lightsArrayFromDB[i].BridgeIP,
                        BridgeKey: lightsArrayFromDB[i].BridgeKey,
                        Label: newName,
                        on: lightsArrayFromDB[i].on,
                        RoomNameFromHue: lightsArrayFromDB[i].RoomNameFromHue
                });
            } else {
                newlightsArray.push({
                        ID: auth.currentUser.uid,
                        LightId: lightsArrayFromDB[i].LightId,
                        BridgeIP: lightsArrayFromDB[i].BridgeIP,
                        BridgeKey: lightsArrayFromDB[i].BridgeKey,
                        Label: lightsArrayFromDB[i].Label,
                        on: lightsArrayFromDB[i].on,
                        RoomNameFromHue: lightsArrayFromDB[i].RoomNameFromHue
                });
            }
        }

        console.log(key)
        console.log(newlightsArray);
        setDoc(doc(db, "smart_home", auth.currentUser.uid), {
            lights: newlightsArray
        })
        navigation.goBack();
    }

    async function deleteLight(key) {
        const docRef = doc(db, "smart_home", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
    
        var lightsArrayFromDB = docSnap.data().lights;
        var newlightsArray = []
        for (var i = 0; i < lightsArrayFromDB.length; i++) {
            if (lightsArrayFromDB[i].LightId != key) {
                newlightsArray.push({
                        ID: auth.currentUser.uid,
                        LightId: lightsArrayFromDB[i].LightId,
                        BridgeIP: lightsArrayFromDB[i].BridgeIP,
                        BridgeKey: lightsArrayFromDB[i].BridgeKey,
                        Label: lightsArrayFromDB[i].Label,
                        on: lightsArrayFromDB[i].on,
                        RoomNameFromHue: lightsArrayFromDB[i].RoomNameFromHue
                });
            }
        }
    
        console.log(key)
        console.log(newlightsArray);
        setDoc(doc(db, "smart_home", auth.currentUser.uid), {
            lights: newlightsArray
        })
        navigation.goBack();
    }
}

function getLightFromKey(lights, key) {
    return lights[key+""];
}

const lightFunction = (bulbStyle, nameStyle, nameText, offStyle, onStyle, light, room, key) => {
    return (
        <View key={key}>
            <TouchableOpacity onPress={() => {
                // console.log(room);
                }}>
                <Image source={require('../assets/lighbulb.png')} style={bulbStyle}/>
            </TouchableOpacity>
            <Text style={nameStyle}>{nameText}</Text>
        </View>
    )
}