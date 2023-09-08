import {StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import React, { useState } from 'react';

//this is the thermostat component that will allow users to control their thermostat
export default function Thermostat() {
  //temp for users thermostat, will get init state from database
  const [temp, setTemp] = useState(50);

  const [user, setUser] = useState("john doe");

  function getThermostatData() {
    fetch('https://developer-api.nest.com/devices/thermostats/device_id/is_online').
    then(res => res.json() ).
    then(json => {
      setUser(json[0].name);
    });
  }

   //custom app button component, takes in onPress, title, and styling
    //as params
    const AppButton = ({onPress, title, styling}) => (
      <TouchableOpacity onPress={onPress} style={styling}>
          <Text style={styles.appButtonText}>{title}</Text>
      </TouchableOpacity>
  )

  return (
    <View style={styles.parent}>
      <Text style={styles.tempDisplay}>{temp}</Text>
      {/* slider to adjust thermostat temp */}
      <Image source={require('../assets/ice-cubes.png')} style={{width: 40, height: 40, position: 'absolute', top: 95, left: -40}}/>
      <Slider 
        step={1}
        style={styles.slider}
        value={temp}
        onValueChange={value => setTemp(value)}
        minimumValue={0}
        maximumValue={100}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
      <Image source={require('../assets/flame.png')} style={{width: 40, height: 40, position: 'absolute', top: 95, left: 200}}/>
      {/* info for user based on their current temp and their energy usage */}
      <View style={styles.energyInfo}>
        <View>
          <Text style={styles.energyConsInfo}>{Math.round(420*temp*.01)} kW consumed this month</Text>
        </View>
        <View>
          <Text style={styles.energySavedInfo}>You could have saved {Math.round(40*temp*.01)} kW this month</Text>
          <Text style={styles.moneySavedInfo}>You could have saved ${Math.round(45*temp*.01)} this month</Text>
        </View>
      </View>
      {/* button to save temp to database and set temp of the thermostat */}
      <AppButton title="set temperature" styling={styles.setTempButton} onPress={() => alert("temperature saved!")}/>
    </View>
  );
}

//styles for component
var buttonBackgroundColor = "#76DBF9";

const styles = StyleSheet.create({
  slider: {
    width: 200,
    height: 40,
    marginTop: 40
  },

  parent: {
    flex: 1,
    position: 'relative',
    top: 50,
    left: 70
  },
  setTempButton: {
    elevation: 8,
    backgroundColor: buttonBackgroundColor,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 17,

    position: 'absolute',
    top: 450,
    alignContent: 'center',
    left: 40
  },
  tempDisplay: {
    fontSize: 50,
    position: 'relative',
    left: 75,
    top: 30
  },
  energyInfo: {
    position: 'relative',
    flex: 1,
    flexDirection: 'row',
    left: -60,
    top: 50,
    
  },
  energyConsInfo: {
    position: 'absolute',
    left: 10,
    flex: 1,
    width: 150,
    flexWrap: 'wrap',
  },
  energySavedInfo: {
    position: 'absolute',
    left: 175,
    flex: 1,
    width: 150,
    flexWrap: 'wrap',
  },
  moneySavedInfo: {
    position: 'relative',
    top: 70,
    left: 175,
    flex: 1,
    width: 150,
    flexWrap: 'wrap',
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
});