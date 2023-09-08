import React, { useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, Image, Linking} from 'react-native'
import { useState } from 'react';
import { db } from "../firebase";
import { collection, getDocs, query} from "firebase/firestore";
import lilyLeft from '../assets/segolily.png';

export default function RecycleContactPage() {

    const [onLoadContacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);

    const onScreenLoad = async () => {
        var contacts = [];
    
        const q = query(collection(db, "recycle_contacts"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            contacts.push({
                name : doc.data().Name,
                email : doc.data().Email,
                phone : doc.data().Phone,
                county: doc.data().County
            });
        });

        setContacts(contacts);
        setFilteredContacts(contacts);
    };

    /* Update the list of contacts based on user input for county name */
    const filterContacts = (searchCounty) => {
        // The search bar is empty so just use the original contact list
        if (!searchCounty)
            setFilteredContacts(onLoadContacts);
        
        // Filter the contacts by county name
        else{
            const newContacts = onLoadContacts.filter( (item) => {
                return item.county.includes(searchCounty);
            });
            setFilteredContacts(newContacts);
        }
    }

    useEffect(() => {
        onScreenLoad();
    }, []);

    return(
        <View style={{marginBottom: 200}}>
            <View style={styles.titleStyle}>
                <Image source={lilyLeft} style={{width: 100, height: 125}}/>
                <Text style={styles.titleText}>
                    Utah State County Contacts
                </Text>
            </View>
            <TextInput 
                style={styles.input}
                onChangeText={(text) => filterContacts(text)}
                placeholder='Search by County Name'/>
            <FlatList 
            data={filteredContacts}
            renderItem={({item}) => 
                // Render each contact
                <View style={styles.item}>
                    <Text style={{fontSize: 22}}>{item.name}</Text>

                    {/* County */}
                    <Text style={{marginBottom: 5, fontStyle: 'italic'}}>{item.county}</Text>
                    <View style={{  borderBottomColor: 'black',
                                    borderBottomWidth: StyleSheet.hairlineWidth +1}}/>

                    {/* Email */}
                    <Text style={{fontSize: 18, left: 0, top: 0,  numberOfLines: 3}}>Email: 
                            <Text style={{color: '#4287f5'}} onPress={() => {Linking.openURL('mailto:'+item.email);}}> {item.email}</Text>
                    </Text>

                    {/* Phone number */}
                    <Text style={{fontSize: 18, left: 0}}>Phone Number: 
                            <Text style={{color: '#4287f5'}} onPress={() => {Linking.openURL('tel:'+item.phone);}}> {item.phone}</Text>
                    </Text>
                </View>}
            keyExtractor={(item) => item.name}/>
            <Text style={{marginBottom:30, marginTop: 30}}></Text>
        </View>
    )
};

const styles = StyleSheet.create({    
    container: {
        fontSize: '35px',
        color: '#000',
        position: 'relative',
        top: 300,
        alignContent: 'center',
        left: 175
    },
    item: {
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 15
      },
    titleText: {
        fontSize: 30, 
        fontFamily: 'Cochin', 
        alignSelf: 'center', 
        textAlign: 'left', 
        width: 250, 
        marginTop: 15,
        paddingVertical: 2,
        paddingLeft: 6.5
    },
    titleStyle: {
        flexDirection: 'row', 
        alignItems: 'center',
        marginLeft: 25,
        marginTop: 5
    },
    input: {
        marginTop: 20,
        marginHorizontal: 30,
        fontSize: 20,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 7,
        backgroundColor: '#fafafa',
        borderRadius: 5
    }
});