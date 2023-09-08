import {
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity, 
    Image, 
    SafeAreaView, 
    ScrollView,
    RefreshControl
 } from 'react-native';
import React, { useState, useEffect, f } from 'react';
import { auth, db } from "../firebase";
import { doc, getDoc} from "firebase/firestore";

const turnLightsOn = async (value, id, ip, key) => {

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

    fetch("http://" + ip + "/api/" + key +"/lights/1/state", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

//page for smart home fan configurations
export default function Lightbulb({navigation}) {

//state for lights
const [bedroomLight, SetBedroomLight] = useState(false);
const [KitchenLight, SetKitchenLight] = useState(false);
const [LivingRoomLight, SetLivingRoomLight] = useState(false);
const [keyToIp, setIPToKey] = useState({});
const [keyToApiKey, setApiKeyToKey] = useState({});
var bedlight = true;
var temp = '';
var ip = '';
var key = '';
var nextLightKey = 4;
var newLight = (value, newIP, newKey, nextLightK) => {
    temp = value
    ip = newIP
    key = newKey
    nextLightKey = nextLightK   
};
var lightParam;
var lightKey;
var lightFunc = (Light, LightKey) => {
    lightParam = Light;
    lightKey = LightKey;
}
const [refreshing, setRefreshing] = React.useState(false);

async function getLightsFromDB() {
    const docRef = doc(db, "smart_home", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        var lightsArrayFromDB = docSnap.data().lights
        var lightsDict = {}
        var x = 50;
        var y = 50;
        var bulbHeight = 100;
        var bulbWidth = 100;
        var textFontSize = 24;
        if (lightsArrayFromDB != null) {
            for (var i = 0; i < lightsArrayFromDB.length; i++) {
                if (i % 2 == 0 && i > 0) {
                    x = 50
                    y += 200
                }
                var el = light(
                            {width: bulbWidth, height: bulbHeight, position: 'absolute', top: y, left: x}, 
                            {left: x + 5, top: y + 110, fontSize: 24, position: 'absolute'}, 
                            lightsArrayFromDB[i].Label,                             
                            lightsArrayFromDB[i].on,
                            lightsArrayFromDB[i].BridgeKey,
                            lightsArrayFromDB[i].BridgeIP,
                            lightsArrayFromDB[i].LightId            )

                lightsDict[lightsArrayFromDB[i].LightId] = el
                x += 200
            }
            setLights(lightsDict);
            updateLightsArray(getValues());
        }
        return lightsDict;    
    }
}

useEffect(() => {
    updateLightsArray(getValues());
  }, [lightsArray]);

const [lights, setLights] = useState('')

const [lightsArray, updateLightsArray] = useState(getValues());

const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
        setRefreshing(false);
      }, 1000); 
    getLightsFromDB();
  }, [lightsArray]);

const light = (bulbStyle, nameStyle, nameText, light, bridgeKey, IP, lightID) => {
    return (
        <View key={lightID}>
            <TouchableOpacity onPress={() => {
                navigation.navigate('EditLight', {
                    'lightFunc': lightFunc,
                    'lightKey': lightID,
                    'lights': lights,
                    'bulbStyle': bulbStyle,
                    'nameStyle': nameStyle,
                    'light': light,
                    'apiKey': bridgeKey,
                    'ipAddress': IP    ,
                    'nameText': nameText                });
                }}>
                <Image source={require('../assets/lighbulb.png')} style={bulbStyle}/>
            </TouchableOpacity>
            <Text style={nameStyle}>{nameText}</Text>
   
        </View>
    )
}


    function getValues() {
        return Object.values(lights);
    }

const MAIN_COMPONENT = (((lightsArray) => {
    if (lightsArray.length == 0) {
        return (
            <SafeAreaView style={styles.container}>
               <ScrollView
            refreshControl={
               <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
             }>
                    <Text style={{left: 165, top: 100}}>
                        Pull To Refresh
                    </Text>
                    <AppButton onPress={() => 
                   navigation.navigate("AddLight", {
                   'newLight': newLight,
                   'lenOfLights': lightsArray.length
                   })        
               } title="Add" styling={styles.roundButtonEmpty}></AppButton>
                </ScrollView>
            </SafeAreaView>
        )
    } else {
        return (
           <SafeAreaView style={styles.container}>
               <ScrollView
            refreshControl={
               <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
             }>
               <View>
               {lightsArray}
               </View>               
                </ScrollView>
                <AppButton onPress={() => 
                   navigation.navigate("AddLight", {
                   'newLight': newLight,
                   'lenOfLights': lightsArray.length
                   })        
               } title="Add" styling={styles.roundButton}></AppButton>
           </SafeAreaView>
        )}
    }
))

return (
    MAIN_COMPONENT(lightsArray)
)}

//custom app button component, takes in onPress, title, and styling
//as params
const AppButton = ({onPress, title, styling}) => (
<TouchableOpacity onPress={onPress} style={styling}>
    <Text style={styles.appButtonText}>{title}</Text>
</TouchableOpacity>
)

const styles = StyleSheet.create({
container: {
    flex: 1,
  },
roundButton: {
    width: 130,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#00d',  
    left: 150,
},
roundButtonEmpty: {
    width: 130,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#00d',  
    left: 150,
    top: 500
},
appButtonText: {
    fontSize: 25,
    color: "white"
}
})