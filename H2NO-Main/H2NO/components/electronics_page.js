import React from 'react'
import { View, Text, Image, ScrollView, StyleSheet} from 'react-native'
import lightning from '../assets/lightning.png';

export default function ElectronicsPage() {
    return(
    <ScrollView style={{backgroundColor: '#fdfdf6'}}>
        <View style={{flex: 1, alignItems:'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 30, fontFamily: 'Cochin'}}>Recycling Electronics</Text>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 7}}>
                <Image source={lightning} style={{width: 40, height: 40}}></Image>
        </View>
        <Text style={styles.text}>As humans, we produce around 40 million tons of electronic waste every year. 
                                  To put that into perspective, that would be like throwing away 800 laptops every second.
                                  Of those millions of tons of waste, only 12.5% of E-waste is recycled.</Text>
        <Text style={styles.text}>Many electronics, such as cellphones and other devices, contain precious metals inside of them. 
                                  The United States alone throws away cellphones with $60 million worth of gold and silver yearly.</Text>
        <Text style={styles.text}>Another reason it is important to recycle electronics is because they contain toxic compounds such
                                  as lead, mercury, etc. When electronics are sent to landfills, these toxic compounds can leach into
                                  the soil and water supplies. When electronics are incinerated, these toxic compounds can contaminate
                                  our air.</Text>
        <Text style={styles.text}>To prevent these harmful things from happening and to save these resources, 
        
                                  <Text style={{fontWeight: 'bold'}}> electronics should be 
                                  taken to a facility be properly disposed of.</Text></Text>
        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 7}}>
                <Image source={lightning} style={{width: 40, height: 40}}></Image>
        </View>
        <Text></Text>
        <Text></Text>
        <Text style={styles.header}>Where to recycle in Utah:</Text>
        <Text></Text>
        <Text style={styles.whatTodoSteps}>{`\u29BE`} Best Buy  (Most electronics)</Text>
        <Text style={styles.whatTodoSteps}>{`\u29BE`} Lowe's (Lightbulbs, rechargeable batteries, cellphones)</Text>
        <Text style={styles.whatTodoSteps}>{`\u29BE`} Home Depot  (Rechargeable batteries)</Text>
        <Text></Text>
        <Text></Text>
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
    whatTodoSteps :{
        fontSize: 20, 
        textAlign: 'justified',
        marginLeft: 30,
        marginRight: 30,
        fontFamily: 'Cochin'
    }
});