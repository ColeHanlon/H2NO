import { View, Text, Image, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native"
import VerticalBarGraph from '@chartiful/react-native-vertical-bar-graph'
import React, { useState } from 'react';

//homepage for sprinklers smart home
//this page will allow you to control sprinkler settings as well as get sprinkler settings
export default function Sprinklers() {
    const [getWaterData, setWaterData] = useState([200, 450, 280, 800, 990, 430, 500])
    const [getMonthlyWaterData, setMonthlyWaterData] = useState(90)
    const [getWaterSavedData, setWaterSavedData] = useState(25)
    const [getSprinklerScheduleData, setSprinklerScheduleData] = useState([10, 10, 15, 20, 20, 10, 15])
    const [getNewSprinklerScheduleData, setNewSprinklerScheduleData] = useState([0, 0, 25, 0, 35, 0, 10])

    //custom app button component, takes in onPress, title, and styling
    //as params
    const AppButton = ({onPress, title, styling}) => (
        <TouchableOpacity onPress={onPress} style={styling}>
            <Text style={styles.appButtonText}>{title}</Text>
        </TouchableOpacity>
    )

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={{fontSize: 32, top: 50, left: 120}}>Sprinklers</Text>
                    <Image source={require('../assets/sprinkler.png')} style={{width: 40, height: 40, position: 'absolute', top: 50, left: 260}}/>
                </View>
                <View>
                    <VerticalBarGraph
                        data={getWaterData}
                        labels={['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Satur', 'Sun']}
                        width={350}
                        height={225}
                        barRadius={10}
                        barColor="blue"
                        barWidthPercentage={0.65}
                        baseConfig={{
                            hasXAxisBackgroundLines: true,
                            xAxisLabelStyle: {
                            position: 'right',
                            }
                        }}
                        style={{
                            paddingVertical: 10,
                            top: 100,
                            left: 30
                        }}
                        />
                </View>
                <View style={{flex: 1}}>
                    <Text style={{fontSize: 20, position: 'relative', top: 150, left: 30, width: 325, flexWrap: 'wrap'}}>
                        {'\u2022 ' + getMonthlyWaterData + ' gallons of water were used this month'}
                    </Text>
                    <Text style={{fontSize: 20, position: 'relative', top: 175, left: 30, width: 325, flexWrap: 'wrap'}}>
                        {'\u2022 You could have used ' + getWaterSavedData + ' less gallons of water this month and gotten similiar results.'}
                    </Text>
                    <Text style={{fontSize: 20, position: 'relative', top: 200, left: 30, width: 325, flexWrap: 'wrap'}}>
                        {'\u2022 We\'ve created a new schedule for your system using relevant information you\'ve provided as well as other important variables and have come up with a plan that will allow you to save water and money whilst still getting similar results in your landscaping.'}
                    </Text>
                    <Text style={{textDecorationLine: 'underline', position: 'absolute', top: 550, left: 30, fontSize: 22}}>
                        Old schedule below:
                    </Text>
                    <VerticalBarGraph
                        data={getSprinklerScheduleData}
                        labels={['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Satur', 'Sun']}
                        width={300}
                        height={150}
                        barRadius={10}
                        barColor="blue"
                        barWidthPercentage={0.65}
                        baseConfig={{
                            hasXAxisBackgroundLines: true,
                            xAxisLabelStyle: {
                            position: 'right',
                            }
                        }}
                        style={{
                            paddingVertical: 10,
                            top: 280,
                            left: 30
                        }}
                        />
                    <Text style={{textDecorationLine: 'underline', position: 'absolute', top: 800, left: 30, fontSize: 22}}>
                        New schedule below:
                    </Text>
                    <VerticalBarGraph
                        data={getNewSprinklerScheduleData}
                        labels={['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Satur', 'Sun']}
                        width={300}
                        height={150}
                        barRadius={10}
                        barColor="blue"
                        barWidthPercentage={0.65}
                        baseConfig={{
                            hasXAxisBackgroundLines: true,
                            xAxisLabelStyle: {
                            position: 'right',
                            }
                        }}
                        style={{
                            paddingVertical: 10,
                            top: 360,
                            left: 30
                        }}
                        />
                    <TouchableOpacity style={{top: 400, left: 120, backgroundColor: "blue", width: 150, height: 60, borderRadius: 50}} 
                        onPress={() => alert("data was saved to database!")}>
                        <Text style={{left: 15, top: 10, color: 'white', fontSize: 17}}>Set New Water Schedule</Text>
                        <Image source={require('../assets/drop.png')} style={{width: 20, height: 27, position: 'absolute', top: 28, left: 100}}/>
                    </TouchableOpacity>
                </View>                
            </SafeAreaView>
        </ScrollView>        
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      marginHorizontal: 25,
      height: 1450
    },
})