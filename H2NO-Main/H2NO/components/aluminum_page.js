import React from 'react'
import { View, Text, Image, ScrollView, StyleSheet, Linking} from 'react-native'
import red_can from '../assets/red_can.png';
import orange from '../assets/orange_can.png';
import blue_yellow from '../assets/blue_yellowcan.png';

export default function AluminumPage() {
    return(
    <ScrollView style={{backgroundColor: '#fdfdf6'}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Text></Text>
            <Text style={styles.header}>Recycling Aluminum</Text>
            <Text></Text>
            
            <Text style={styles.text}>Aluminum used to be one of the most valuable materials on Earth. So valuable 
                that the United States put a 100 ounce pyramid of solid aluminum atop the Washington Monument.</Text>
            
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image source={red_can} style={{width: 25, height: 25}}></Image>
            </View>

            <Text style={styles.text}>Currently <Text style={{fontWeight: 'bold'}}>65%</Text> of aluminum in the United States
                is recycled! Recycling aluminum can save <Text>95%</Text> of energy required to make the same amount of aluminum from
                its virgin source. So recycling aluminum makes a big difference in energy saved!</Text>

            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image source={orange} style={{width: 25, height: 25}}></Image>
            </View>
            
            <Text style={styles.text}>Recycling aluminum is so beneficial that there are even companies that will pay you to bring them aluminum.
                The company <Text style={{fontSize: 15, textAlign: 'center', margin: 10, color: 'blue'}} 
                    onPress={() => {Linking.openURL('https://umw.com/household-scrap/');}}>Utah Metal Works</Text> will take your aluminum along with other
                    non-ferrous metals and pay you on the spot!</Text>

            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image source={blue_yellow} style={{width: 25, height: 25}}></Image>
            </View>
            
            <Text style={styles.text}>Luckily aluminum is pretty widely accepted in street recycling bins in Utah, so feel free to toss your cans in 
                after rinsing them out!</Text>

            <Text></Text>
            <Text style={styles.header}>What do to before recycling:</Text>
            <Text></Text>
            <Text style={styles.whatTodoSteps}>1.  Rinse the item</Text>
            <Text style={styles.whatTodoSteps}>2.  Dry the item</Text>
            <Text style={styles.whatTodoSteps}>3a.  Put the item in the recyle bin</Text>
            <Text style={styles.whatTodoSteps}>3b.  Bring the item somewhere to be recycled for you</Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
        </View>
      </ScrollView>
    )
};

const styles = StyleSheet.create({    
    header: {
        fontSize: 30, 
        fontFamily: 'Cochin', 
        alignSelf: 'center'
    },
    text: {
        fontSize: 15, 
        textAlign: 'justify',
        margin: 15,
        marginBottom: 5
    },
    whatTodoSteps : {
        fontSize: 20, 
        textAlign: 'justify',
        margin: 10,
        fontFamily: 'Cochin'
    }
});