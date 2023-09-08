import React from 'react'
import { View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import paper from '../assets/paper.png';
import dontRecycle from '../assets/dontrecycle.png';
import doRecycle from '../assets/dorecycle.png';

export default function PaperPage() {
    return(
    <ScrollView style={{backgroundColor: '#fdfdf6'}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Text></Text>
            <Text style={styles.header}>Recycling Paper & Cardboard</Text>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image source={paper} style={{width: 150, height: 32}}></Image>
            </View>
            <Text style={styles.text}>Recycling paper is probably what most people are familiar with since most curbside recycling accepts paper.
            However, there are some things that most people do not know when it comes to recycling paper and cardboard items.</Text>
            
            <Text style={styles.smallHeader}>Common Paper Recycling Mistakes</Text>
            <View style={styles.bulletStyle}>
                    <Image source={dontRecycle} style={styles.bulletIcon}/>
                    <Text style={styles.bulletText}>Paper that you peel stickers from</Text>
            </View>
            <View style={styles.bulletStyle}>
                    <Image source={dontRecycle} style={styles.bulletIcon}/>
                    <Text style={styles.bulletText}>Pizza boxes</Text>
            </View>
            <View style={styles.bulletStyle}>
                    <Image source={dontRecycle} style={styles.bulletIcon}/>
                    <Text style={styles.bulletText}>Glossy paper</Text>
            </View>
            <View style={styles.bulletStyle}>
                    <Image source={dontRecycle} style={styles.bulletIcon}/>
                    <Text style={styles.bulletText}>Shredded paper</Text>
            </View>
            <View style={styles.bulletStyle}>
                    <Image source={dontRecycle} style={styles.bulletIcon}/>
                    <Text style={styles.bulletText}>Paper with food waste on it</Text>
            </View>
            <View style={styles.bulletStyle}>
                    <Image source={dontRecycle} style={styles.bulletIcon}/>
                    <Text style={styles.bulletText}>Paper coffee cups</Text>
            </View>
            <View style={styles.bulletStyle}>
                    <Image source={dontRecycle} style={styles.bulletIcon}/>
                    <Text style={styles.bulletText}>Paper towels, napkins, tissue paper, toilet paper</Text>
            </View>
            <View style={styles.bulletStyle}>
                    <Image source={dontRecycle} style={styles.bulletIcon}/>
                    <Text style={styles.bulletText}>Thermal paper receipts</Text>
            </View>
            <Text style={{fontSize: 25, fontFamily: 'Cochin', alignSelf: 'left', margin: 15, marginBottom: 5}}>Why they can't be recycled</Text>
            <Text style={styles.bullets}>{`\u2023`} The item(s) is contaminated by food, grease, etc.</Text>
            <Text style={styles.bullets}>{`\u2022`} The item(s) contains plastic coating</Text>
            <Text style={styles.bullets}>{`\u2022`} The item contains fibers that are too small to be recycled again</Text>

            <Text></Text>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image source={paper} style={{width: 150, height: 32}}></Image>
            </View>
            <Text></Text>

            <Text style={styles.smallHeader}>Common Recyclable Paper Items</Text>
            <View style={styles.bulletStyle}>
                    <Image source={doRecycle} style={styles.bulletIcon}/>
                    <Text style={styles.bulletText}>Newspaper</Text>
            </View>
            <View style={styles.bulletStyle}>
                    <Image source={doRecycle} style={styles.bulletIcon}/>
                    <Text style={styles.bulletText}>Mail envelopes</Text>
            </View>
            <View style={styles.bulletStyle}>
                    <Image source={doRecycle} style={styles.bulletIcon}/>
                    <Text style={styles.bulletText}>Cardboard boxes</Text>
            </View>
            <View style={styles.bulletStyle}>
                    <Image source={doRecycle} style={styles.bulletIcon}/>
                    <Text style={styles.bulletText}>Cereal boxes</Text>
            </View>
            <View style={styles.bulletStyle}>
                    <Image source={doRecycle} style={styles.bulletIcon}/>
                    <Text style={styles.bulletText}>Magazines</Text>
            </View>
            <View style={styles.bulletStyle}>
                    <Image source={doRecycle} style={styles.bulletIcon}/>
                    <Text style={styles.bulletText}>Paper cartons (But don't flatten!)</Text>
            </View>

            <Text style={{fontSize: 20, textAlign: 'justify', margin: 15, marginBottom: 20, fontFamily: 'Cochin'}}>
                Paper is very easy to recycle, yet very easy to be contaminated. When recycling paper just be cautious
                of what you are putting into your recycling bin! If it isn't clean, throw it in the trash.</Text>

            <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: 70}}>
                <Image source={paper} style={{width: 150, height: 32}}></Image>
            </View>
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
        margin: 15
    }, 
    text: {
        fontSize: 15, 
        textAlign: 'justify',
        margin: 15,
        marginBottom: 5
    },
    bulletStyle: {
        marginLeft:20, 
        flexDirection: 'row', 
        alignItems: 'center',
        marginBottom: 10
    },
    bulletIcon : {
        width:30,
        height:30
    },
    bulletText : {
        marginLeft: 10
    },
    whatTodoSteps : {
        fontSize: 20, 
        textAlign: 'justify',
        margin: 10,
        fontFamily: 'Cochin'
    },
    bullets : {
        fontSize: 15, 
        textAlign: 'justified',
        marginLeft: 20,
        marginBottom: 7
    }
});