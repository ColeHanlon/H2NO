import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Linking} from 'react-native';
import glass from '../assets/glass.png';

export default function GlassPage() {
    return(
    <ScrollView style={{backgroundColor: '#fdfdf6'}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{fontSize: 30, alignSelf:'center', fontFamily: 'Cochin'}}>Recycling Glass</Text>
            <Text style={styles.text}>Glass, the perfect material for a nice cold drink and a great material to recycle.
                        Created from extreme heat and natural materials, glass is 100% recyclable. </Text>
            <Text style={styles.text}>Despite being 100% recyclable, only about <Text style={{fontWeight: 'bold'}}>one-third</Text> of glass is recycled in the US. Recycling glass helps
                reduce the need for raw materials to make new glass. Recycled glass is crushed and pulverized into a product called 
                <Text style={{fontStyle:'italic'}}> Glass Cullet</Text> which can be used in many different ways.</Text>

            <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: 15}}>
                <Image source={glass} style={{width: 141, height: 90}}></Image>
            </View>

            <Text style={styles.smallHeader}>Some Uses for Glass Cullet</Text>
            <Text style={{fontSize: 20, fontFamily: 'Cochin', alignSelf: 'left', marginLeft: 25, marginBottom: 5}}>
                {`\u25CD`} Fiberglass manufacturing</Text>
            <Text style={{fontSize: 20, fontFamily: 'Cochin', alignSelf: 'left', marginLeft: 25, marginBottom: 5}}>
                {`\u25CD`} Glass container manufacturing</Text>
            <Text style={{fontSize: 20, fontFamily: 'Cochin', alignSelf: 'left', marginLeft: 25, marginBottom: 5}}>
                {`\u25CD`} Flux/Binder in ceramics and bricks</Text>
            <Text style={{fontSize: 20, fontFamily: 'Cochin', alignSelf: 'left', marginLeft: 25, marginBottom: 45}}>
                {`\u25CD`} Filler in paint</Text>

            <Text style={styles.smallHeader}>Recycling Glass in Utah</Text>
            <Text style={styles.text}>Unfortunately, most curbside recycling bins in Utah do not accept glass.
                                      Luckily, some stores accept glass items and will send them to a facility for you.
                                      The following stores recycle glass:</Text>
            <Text style={styles.bullets}>{`\u2022`} Whole Foods</Text>
            <Text style={styles.bullets}>{`\u2022`} Target</Text>
            <Text></Text>
            <Text style={styles.text}>Another great service for recycling glass in Utah is Momentum Recycling. 
                                      They are a full-service zero waste company offering comprehensive recycling 
                                      collection services to organizations and residences along the Wasatch Front.
                                      </Text>
            <Text style={styles.text}>Look at <Text style={{fontSize: 15, textAlign: 'center', margin: 10, color: 'blue'}} 
                  onPress={() => {Linking.openURL('https://utah.momentumrecycling.com/recycling-services-homes/#dropoff');}}>this map</Text> to find a 
                  recycling drop-off location near you! If you would like to signup for recycling services, click 
                  <Text style={{fontSize: 15, textAlign: 'center', margin: 10, color: 'blue'}} 
                  onPress={() => {Linking.openURL('https://utah.momentumrecycling.com/sign-up-for-a-curbside-glass-recycling-bin/');}}> here!</Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text style={styles.header}>What do to before recycling:</Text>
            <Text></Text>
            <Text style={styles.whatTodoSteps}>1.  Rinse the item</Text>
            <Text style={styles.whatTodoSteps}>2.  Remove lids and caps</Text>
            <Text style={styles.whatTodoSteps}>3.  Bring the item somewhere to be recycled for you</Text>
            <Text style={{marginBottom: 20}}></Text>
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
    smallHeader : {
        fontSize: 25, 
        fontFamily: 'Cochin', 
        alignSelf: 'left',
        marginLeft: 15,
        marginBottom: 10
    }, 
    text: {
        fontSize: 15, 
        textAlign: 'justify',
        margin: 15,
        marginBottom: 5
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