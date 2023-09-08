import React from 'react'
import { View, Text, Image, ScrollView, StyleSheet, Linking} from 'react-native'
import pet from '../assets/pet1.png';
import hdpe from '../assets/hdpe2.png';
import pvc from '../assets/pvc3.png';
import ldpe from '../assets/ldpe4.png';
import pp from '../assets/pp5.png';
import ps from '../assets/ps6.png';
import other from '../assets/other7.png';
import okToRecycle from '../assets/binRecyclable.png';
import takeSomewhere from '../assets/orangeRecycle.png';
import cantRecycle from '../assets/yellowrecycle.png';

export default function PlasticPage() {
    return(
    <ScrollView style={{backgroundColor: '#fdfdf6'}}>
        <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#fdfdf6', marginBottom: 30}}>
            <Text style={styles.header}>Recycling Plastics</Text>
            <Text style={styles.header}>in Utah</Text>
            <Text></Text>
            <Text style={styles.text}>There is currently an abundance of plastics on the Earth. Whether it be in your hand, in the ocean, or in your garbage can, plastic is everwhere.</Text>
            
            <Text style={styles.text}>The first thing to know about recycling plastics is that each plastic has an number associated with it. The number describes what type of plastic an item is made out of. These numbers will determine how the plastics
                can be recycled.
            </Text>
            <Text style={styles.text}>Below are brief descriptions of the plastic identification numbers.</Text>
            
            {/* This section is for the chart of plastic codes*/}
            <View style={{borderColor: '#000000', borderWidth: 1, margin: 5}}>
                <View style={styles.plasticCodes}>
                    <Image source={pet} style={styles.plasticImage}/>
                    <Text style={styles.plasticCodeText}>PET or PETE - clear, hard plastic; often single use</Text>
                </View>
                <View style={styles.plasticCodes}>
                    <Image source={hdpe} style={styles.plasticImage}/>
                    <Text style={styles.plasticCodeText}>HDPE - hard plastic, not as transparent as PET</Text>
                </View>
                <View style={styles.plasticCodes}>
                    <Image source={pvc} style={styles.plasticImage}/>
                    <Text style={styles.plasticCodeText}>PVC - frequently used for vinyl and pipes</Text>
                </View>
                <View style={styles.plasticCodes}>
                    <Image source={ldpe} style={styles.plasticImage}/>
                    <Text style={styles.plasticCodeText}>LDPE - soft flexible plastics; plastic bags</Text>
                </View>
                <View style={styles.plasticCodes}>
                    <Image source={pp} style={styles.plasticImage}/>
                    <Text style={styles.plasticCodeText}>PP - yogurt containers, medicine bottles, straws</Text>
                </View>
                <View style={styles.plasticCodes}>
                    <Image source={ps} style={styles.plasticImage}/>
                    <Text style={styles.plasticCodeText}>Polystyrene (PS) - aka Styrofoam! The devil</Text>
                </View>
                <View style={styles.plasticCodes}>
                    <Image source={other} style={styles.plasticImage}/>
                    <Text style={styles.plasticCodeText}>PC - Other Plastics, the most difficult to recycle</Text>
                </View>
            </View>
            <Text></Text>
            <View style={styles.plasticCodes}>
                    <Image source={okToRecycle} style={styles.plasticImage}/>
                    <Text style={styles.plasticCodeText}>These plastics can be placed in recycle bins</Text>
            </View>
            <View style={styles.plasticCodes}>
                <Image source={takeSomewhere} style={styles.plasticImage}/>
                <Text style={styles.plasticCodeText}>These plastics can be taken to a store/facility</Text>
            </View>
            <View style={styles.plasticCodes}>
                <Image source={cantRecycle} style={styles.plasticImage}/>
                <Text style={styles.plasticCodeText}>These plastics cannot be recycled in Utah</Text>
            </View>

            <Text style={styles.text}>Of the seven different types of plastics above, usually<Text style={{fontWeight:'bold'}}> only plastics 
            #1 & #2 are recyclable</Text> in most places around the US. Sadly, this is also the case <Text style={{fontWeight: 'bold'}}>in Utah</Text>.</Text>

            <Text style={styles.text}>Although the city might not accept certain plastics in your curbside recycling bin, 
                                       you may be able to take it to a store that will recycle it for you. The following stores
                                       take plastic bags and recycle them for you:</Text>
            <Text style={styles.bullets}>{`\u2022`} Smith's</Text>
            <Text style={styles.bullets}>{`\u2022`} Whole Foods</Text>
            <Text style={styles.bullets}>{`\u2022`} Target</Text>
            <Text style={styles.bullets}>{`\u2022`} Walmart</Text>
            <Text></Text>
            <Text></Text>
            <Text style={styles.header}>Recycle Utah</Text>
            <Text style={styles.text}>Recyle Utah, a recycling center in Park City, accepts many types of materials. This includes those pesky plastics 
               aren't accepted in your curbside recycling bin.</Text>
            <Text style={{fontSize: 15, textAlign: 'center', margin: 10, color: 'blue'}} 
                  onPress={() => {Linking.openURL('https://recycleutah.org/');}}>
                (Click here to learn more about Recycle Utah!)</Text>
            
            
            <Text style={styles.text}>When you go to throw your plastic items in the recycling bin, 
            be sure to check the number on the item before tossing it in!</Text>
            <Text></Text>
            <Text></Text>
            <Text style={styles.header}>What do to before recycling:</Text>
            <Text></Text>
            <Text style={styles.whatTodoSteps}>1.  Check the recycle number</Text>
            <Text style={styles.whatTodoSteps}>2.  Rinse the item</Text>
            <Text style={styles.whatTodoSteps}>3.  Dry the item</Text>
            <Text style={styles.whatTodoSteps}>4a.  Put the item in a recyle bin</Text>
            <Text style={styles.whatTodoSteps}>4b.  Bring the item somewhere to be recycled for you</Text>
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
        margin: 15
    },
    plasticCodes: {
        marginLeft:20, 
        flexDirection: 'row', 
        alignItems: 'center',
        marginBottom: 10
    },
    plasticImage : {
        width:40,
        height:40
    },
    plasticCodeText : {
        marginLeft: 10
    },
    whatTodoSteps :{
        fontSize: 20, 
        textAlign: 'justified',
        margin: 10,
        fontFamily: 'Cochin'
    },
    bullets : {
        fontSize: 15, 
        textAlign: 'justified',
        marginLeft: 100
    }
});