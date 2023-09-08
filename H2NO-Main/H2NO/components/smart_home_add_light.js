import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import react from 'react';
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc} from "firebase/firestore";
import { Dropdown } from 'react-native-element-dropdown';

//create light component
const light = (bulbStyle, nameStyle, nameText, offStyle, onStyle, light, room, key) => {
    return (
        <View key={key}>
            <TouchableOpacity onPress={() => {
                // console.log(room);
                navigation.navigate('EditLight', {
                    'lightFunc': lightFunc,
                    'lightKey': key,
                    'lights': lights,
                    'bulbStyle': bulbStyle,
                    'onStyle': onStyle,
                    'offStyle': offStyle,
                    'nameStyle': nameStyle,
                    'light': light,
                    'room': room,    
                    'apiKey': key,
                    'ipAddress': ip                
                });
                }}>
                <Image source={require('../assets/lighbulb.png')} style={bulbStyle}/>
            </TouchableOpacity>
            <Text style={nameStyle}>{nameText}</Text>
   
        </View>
    )
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

//This page allows users to add hue smart lights to their smart home
export default function AddLight({navigation}) {
    const [newLabel, setNewLabel] = react.useState('');
    const [IPAddress, SetIPAddress] = react.useState('IP Address');
    const [bridgeKey, SetBridgeKey] = react.useState('Bridge Key');
    const [isFocus, setIsFocus] = useState(false);
    const [getLights, setLights] = useState([{label: 'desk lamp', value: 'desk lamp'}])
    const [lightSelected, setLightSelected] = useState('');
    var newLight = navigation.getParam('newLight');
    var lenOfLights = navigation.getParam('lenOfLights');

    //get local ip address of bridge on local network
function getLocalIP() {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://discovery.meethue.com/", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log('result: ' + JSON.stringify(result))
            if (JSON.stringify(result).length > 2) {
                SetIPAddress(JSON.stringify(result));
                // SetIPAddress(IPAddress.substring(IPAddress.indexOf('internalipaddress') + 'internalipaddress'.length+3, IPAddress.indexOf('port')-3)+"");
                console.log(IPAddress);
            } else {
                SetIPAddress('No Bridge Found');
            }
        })
        .catch(error => {
            console.log('error', error)
            
        });
        alert('Press Bridge button now')
}

function getBridgeKey() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "devicetype": "app_name#instance_name",
      "generateclientkey": true
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://" + IPAddress + "/api", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        var res = JSON.stringify(result);
        var key = res.substring(res.indexOf('username')+'username'.length+5, res.indexOf('clientkey')-5);
        SetBridgeKey(key);
      })
      .catch(error => {
        console.log('error', error);        
      });
}

    async function FindLights() {
        var myHeaders = new Headers();
        myHeaders.append("hue-application-key", bridgeKey);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };

        fetch("https://" + IPAddress + "/clip/v2/resource/device", requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log(result);
            for (var i = 0; i < result.data.length; i++) {
                setLights({...getLights, label: result.data[i].metadata.name, value: result.data[i].metadata.name})
            }
          })
          .catch(error => {
            console.log('error', error)
          });
    }

    
    //add light
    async function AddLight() {
        if (newLabel.length > 0) {
        var newIP = IPAddress.substring(IPAddress.indexOf('internalipaddress') + 'internalipaddress'.length+3, IPAddress.indexOf('port')-3)+"";
        var newKey = bridgeKey+"";
        var newlight = light({   
                    width: 100, height: 100, position: 'absolute', top: 450, left: 50}, 
                    {left: 65, top: 560, fontSize: 24, position: 'absolute'}, 
                    newLabel,                                                         
                    {left: newLabel.length+140, top: 575, height: 10, width: 10, backgroundColor: 'red', position: 'absolute'}, 
                    {left: (newLabel.length*5)+140, top: 575, height: 10, width: 10, backgroundColor: 'green', position: 'absolute'},
                    true,
                    newLabel,            
                    lenOfLights + 1                
                    )    
        console.log(newlight)
        newLight(newlight, newIP, newKey, lenOfLights + 1);
        console.log(auth.currentUser.uid);
        const docRef = doc(db, "smart_home", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            // if user already has smart home data
            var lightsArrayFromDB = docSnap.data().lights != null ? docSnap.data().lights : [];
            var maxID = 0;
            for (var i = 0; i < lightsArrayFromDB.length; i++) {
                if (lightsArrayFromDB[i].LightId > maxID) {
                    maxID = lightsArrayFromDB[i].LightId
                }
            }
            console.log('room name from hue: ' + lightSelected);
            lightsArrayFromDB.push({
                        ID: auth.currentUser.uid,
                        LightId: maxID+1,
                        BridgeIP: newIP,
                        BridgeKey: newKey,
                        Label: newLabel,
                        on: false,
                        RoomNameFromHue: lightSelected
            });
            setDoc(doc(db, "smart_home", auth.currentUser.uid), {
                lights: lightsArrayFromDB
            })

        } else {
            //if user does not have smart home data        
            setDoc(doc(db, "smart_home", auth.currentUser.uid), {
                lights: [
                    {
                        ID: auth.currentUser.uid,
                        LightId: lenOfLights+1,
                        BridgeIP: newIP,
                        BridgeKey: newKey,
                        Label: newLabel,
                        on: false,
                        RoomNameFromHue: lightSelected
                    }
                ]                
            });
        }
        navigation.goBack();
        } else {
            alert("label name cannot be blank");
        }  
    }

    return (
        <View>
            {/* {console.log(lights)} */}
            <TextInput placeholder='Enter new lights label:' onChangeText={setNewLabel}
            style={{    
                height: 40,
                margin: 12,
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,}}/>
            <AppButton onPress={() => {getLocalIP()}} title='Find Bridge' 
            styling={{elevation: 8,
                    backgroundColor: '#00d',
                    borderRadius: 10,
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    width: 150,
                    top: 15,
                    left: 130
                    }}
            />
            <Text style={{
                height: 40,
                margin: 12,
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                top: 30
            }}>{
            IPAddress.substring(IPAddress.indexOf('internalipaddress') + 'internalipaddress'.length+3, IPAddress.indexOf('port')-3)
            }</Text>
            <AppButton onPress={() => {getBridgeKey()}} title='Get Key' 
            styling={{elevation: 8,
                    backgroundColor: '#00d',
                    borderRadius: 10,
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    width: 150,
                    top: 45,
                    left: 130
                }}  
            />
            <Text style={{
                height: 40,
                margin: 12,
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                top: 70
            }}>{bridgeKey}</Text>

            <AppButton onPress={() => AddLight()} title='Save' 
                styling={{elevation: 8,
                    backgroundColor: '#00d',
                    borderRadius: 10,
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    width: 150,
                    top: 300,
                    left: 130
                }}  
            />

            <AppButton onPress={() => FindLights()} title='Find Lights' 
                styling={{elevation: 8,
                    backgroundColor: '#00d',
                    borderRadius: 10,
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    width: 150,
                    top: 30,
                    left: 130
                }}  
            />

            <Dropdown
                style={[styles.dropdown2, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={getLights}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={lightSelected}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setLightSelected(item.value);
                    
            }}/>

        </View>
    );
}
const styles = StyleSheet.create({
    dropdown2: {
        top: 50,
        left: 110,
        width: 200,
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    placeholderStyle: {
        fontSize: 16,
      },
    selectedTextStyle: {
        fontSize: 16,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
    iconStyle: {
        width: 20,
        height: 20,
      },
})