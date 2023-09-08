import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';

//page for smart home fan configurations
export default function Fan() {
    //state for fans
    const [BedroomFan, SetBedroomFan] = useState(false);
    const [KitchenFan, SetKitchenFan] = useState(false);
    const [LivingRoomFan, SetLivingRoomFan] = useState(false);
    
    return (
    <View>
        {/*  Fan pictures with their clickable components and captions */}
        <View >
            <TouchableOpacity onPress={() => {BedroomFan == false ? SetBedroomFan(true) : SetBedroomFan(false)}}>
                <Image source={require('../assets/fan.png')} style={{width: 100, height: 100, position: 'absolute', top: 50, left: 50}}/>
            </TouchableOpacity>
            <Text style={{left: 55, top: 160, fontSize: 24, position: 'absolute'}}>Bedroom</Text>
            {BedroomFan == false ? 
            <Text style={{left: 155, top: 172, height: 10, width: 10, backgroundColor: 'red', position: 'absolute'}}/> :
            <Text style={{left: 155, top: 172, height: 10, width: 10, backgroundColor: 'green', position: 'absolute'}}/>
            }            
        </View>
        <View>
            <TouchableOpacity onPress={() => {LivingRoomFan == false ? SetLivingRoomFan(true) : SetLivingRoomFan(false)}}>
                <Image source={require('../assets/fan.png')} style={{width: 100, height: 100, position: 'absolute', top: 250, left: 50}}/>
            </TouchableOpacity>
            <Text style={{left: 260, top: 160, fontSize: 24, position: 'absolute'}}>Kitchen</Text>
            {LivingRoomFan == false ? 
            <Text style={{left: 175, top: 370, height: 10, width: 10, backgroundColor: 'red', position: 'absolute'}}/> :
            <Text style={{left: 175, top: 370, height: 10, width: 10, backgroundColor: 'green', position: 'absolute'}}/>
            }
        </View>
        <View>
            <TouchableOpacity onPress={() => {KitchenFan == false ? SetKitchenFan(true) : SetKitchenFan(false)}}>
                <Image source={require('../assets/fan.png')} style={{width: 100, height: 100, position: 'absolute', top: 50, left: 250}}/>
            </TouchableOpacity>
            <Text style={{left: 40, top: 360, fontSize: 24, position: 'absolute'}}>Living Room</Text>
            {KitchenFan == false ? 
            <Text style={{left: 345, top: 172, height: 10, width: 10, backgroundColor: 'red', position: 'absolute'}}/> :
            <Text style={{left: 345, top: 172, height: 10, width: 10, backgroundColor: 'green', position: 'absolute'}}/>
            }
        </View>
        <AppButton onPress={() => alert("fan preferences saved!")} title="Save" styling={styles.roundButton}></AppButton>
    </View>
    )
}

//custom app button component, takes in onPress, title, and styling
//as params
const AppButton = ({onPress, title, styling}) => (
    <TouchableOpacity onPress={onPress} style={styling}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    roundButton: {
        width: 130,
        height: 130,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#00d',  
        left: 150,
        top: 600      
    },
    appButtonText: {
        fontSize: 25,
        color: "white"
    }
})