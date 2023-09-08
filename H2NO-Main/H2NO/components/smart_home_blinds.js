import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import Slider from '@react-native-community/slider';

//this is the blinds component that will allow users to control their heater
export default function Blinds() {
    const [getRoomInformation, setRoomInformation] = useState([{label: "Living Room", value: "Living Room"}, {label: "Kitchen", value: "Kitchen"}, {label: "Bedroom 1", value: "Bedroom 1"},
                                                {label: "Bedroom 2", value: "Bedroom 2"}])
    const [getWindowInformation, setWindowInformation] = useState([{label: "North", value: "North"}, {label: "East", value: "East"}, {label: "South", value: "South"},
                                                {label: "West", value: "West"}])
    const [value1, setValue1] = useState(null);
    const [value2, setValue2] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [getH, setH] = useState(400)

    //custom app button component, takes in onPress, title, and styling
    //as params
    const AppButton = ({onPress, title, styling}) => (
      <TouchableOpacity onPress={onPress} style={styling}>
          <Text style={styles.appButtonText}>{title}</Text>
      </TouchableOpacity>
  )

    const renderLabel = (text, styling, value) => {
        if (value || isFocus) {
          return (
            <Text style={[styling, isFocus && { color: 'blue' }]}>
              {text}
            </Text>
          );
        }
        return null;
      };
    
    return (
        <View style={styles.container}>
            {renderLabel('Rooms', styles.label1, value1)}
            <Dropdown
                style={[styles.dropdown1, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={getRoomInformation}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={value1}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue1(item.value);
                    
          }}/>

            {renderLabel('Window', styles.label2, value2)}
            <Dropdown
                style={[styles.dropdown2, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={getWindowInformation}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={value2}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue2(item.value);
                    
          }}/>
          <View style={{
            position: 'absolute',
            top: 300,
            left: 280,
            transform: [{rotate: '90deg'}],
            }}>
            <Slider 
              step={1}
              style={styles.slider}
              value={getH}
              onValueChange={value => setH(value)}
              minimumValue={0}
              maximumValue={400}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              
            />
          </View>
          
          <View style={{
                    height: 400,
                    width: 240,
                    borderRadius: 5,
                    borderWidth: 2,
                    borderColor: 'black',
                    marginVertical: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute', 
                    top: 120,
                    left: 80
          }}></View>

          <View style={{
                    height: getH,
                    width: 240,
                    borderRadius: 5,
                    marginVertical: 40,
                    backgroundColor: '#61dafb',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute', 
                    top: 120,
                    left: 80
          }}></View>

        <AppButton title="Save Blind Height" styling={styles.setButton} onPress={() => alert("Blind height was saved!")}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
      flexDirection: "row"
    },
    setButton: {
      elevation: 8,
      backgroundColor: '#76DBF9',
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 17,
  
      position: 'absolute',
      top: 640,
      alignContent: 'center',
      left: 130
    },
    slider: {
      width: 200,
      height: 40,
      marginTop: 40,      
      
    },
    dropdown1: {
      width: 200,
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    dropdown2: {
        width: 200,
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
    icon: {
      marginRight: 5,
    },
    label1: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    label2: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 220,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });