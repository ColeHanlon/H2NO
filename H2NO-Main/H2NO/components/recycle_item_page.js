import { View, Text, TextInput, Image, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react';
import H2NOLogo from '../assets/H2NOLogo.png';
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc} from "firebase/firestore";

export default function RecycleItemPage({navigation}) {

    // Set default image
    const [image, setImage] = useState(require('../assets/H2NOLogo.png').uri);

    // Set default uri
    const [imageb64, setImageb64] = useState("");

    // Keep track if user has uploaded/taken a photo
    const [photoUploaded, setPhotoUploaded] = useState(false);

    // Set image class
    const [objClass, setObjClass] = useState("");

    /* Pick image from gallery */
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [1,1],
        quality: 1,
        allowsEditing:true,
        base64: true,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setImageb64(result.assets[0].base64);
        setPhotoUploaded(true);
      }
    };

    /* Take a photo */
    const openCamera = async () => {
      // Ask the user for the permission to access the camera
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert("You have not allowed access to your camera!", "");
        return;
      }
      
      const result = await ImagePicker.launchCameraAsync(
        {aspect: [1,1],
        base64: true}
      );
      
      // Set the image that was taken
      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setImageb64(result.assets[0].base64);
        setPhotoUploaded(true);
      }
    }

    /* Send image to Flask server to analyze the image */
    const analyzeImage = () => {
      if (photoUploaded)
      {
        setObjClass("Analyzing");
        setPlasticCode(-1);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
          
        // Setup the header for the fetch request
        var raw = JSON.stringify({"photo" : imageb64});
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        // Send the image base64 data to the server to be classified
        fetch("http://127.0.0.1:5003/classify", requestOptions)
        .then(response => response.json())
        .then(result => {
						const newClass = result.Class.trim('\n');
						setObjClass(newClass); 

						// Update the recycled item count for the user if their item is recyclable
						if (newClass == "Aluminum can" || newClass == "Glass Jar" || newClass == "Glass bottle" ) 
						{
							updateRecycleItemCount();
						}
		})
        .catch(error => console.log('error', error));
      }
	  
	  // User has not uploaded a photo yet
      else
      {
    	Alert.alert('Please upload or take a photo first!', "");
        return;
      }
    }
    
    // This is to keep track of the plastic code the user types
    const [plasticCode, setPlasticCode] = useState(-1);

	/* Update the plastic code and update the user's recycled item count if necessary */
	const updatePlasticCode = (codeNum) => {
		setPlasticCode(codeNum);
		if (codeNum == 1 || codeNum == 2)
			updateRecycleItemCount();
	}

	/* Updates the amount of items a user has recycled */
	const updateRecycleItemCount =  async() => {
		// Get the user's recycling information
		const docRef = doc(db, "recycled_items", auth.currentUser.uid);
      	const docSnap = await getDoc(docRef);
		var recycle_count = 1;

		// Increment the user's previous recycled item count
		if (docSnap.exists())
		{
			recycle_count = docSnap.data().NumRecycledItems + 1;
		}
		
		// Update the count in the database
		setDoc(doc(db, "recycled_items", auth.currentUser.uid), {
			ID: auth.currentUser.uid,
			NumRecycledItems: recycle_count
		});
	}

    /* The following variables hold the recycling information to be displayed */
    const aluminumCanSteps = <View>
                                <Text style={styles.header}>Steps to recycle:</Text>
                                <Text style={styles.smallHeader}>1. Rinse the can</Text>
                                <Text style={styles.smallHeader}>2. Put the can in any recycling bin</Text>
                                <Text></Text>
                                <Text style={styles.text}>Click the button below for more information about recycling aluminum in Utah</Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("Aluminum")}
                                    style={{marginVertial: 10, padding: 10, borderRadius: 15, width: 150, alignSelf: "center", backgroundColor: "#aad6e6"}}>
                                        <Text style={{color: "white", textAlign: "center"}}>Aluminum</Text>
                                </TouchableOpacity>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                            </View>

    const recyclablePlastic =   <View>
                                	<Text style={styles.smallHeader}>Great news! This plastic is recyclable!</Text>
                                    <Text></Text>
                                    <Text></Text>
                                    <Text style={styles.header}>Steps to Recycle:</Text>
                                    <Text style={styles.smallHeader}>1. Rinse the bottle</Text>
                                    <Text style={styles.smallHeader}>1b. If greasy, rinse with soap!</Text>
                                    <Text style={styles.smallHeader}>2. Put the bottle in any recycling bin</Text>
                                    <Text></Text>
                                    <Text style={styles.text}>Click the button below for more information about recycling plastic in Utah</Text>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate("Plastics")}
                                        style={{marginVertial: 10, padding: 10, borderRadius: 15, width: 150, alignSelf: "center", backgroundColor: "#ed9fb8"}}>
                                            <Text style={{color: "white", textAlign: "center"}}>Plastic</Text>
                                    </TouchableOpacity>
                                </View>

    const plasticBottle =   <View>
                                <Text style={styles.text}>Enter the plastic code on your bottle</Text>
                                <TextInput style={styles.input}
                                        textAlign='center'
                                        keyboardType='numeric'
                                        onChangeText={(text) => {updatePlasticCode(parseInt(text))}}
                                        />
                                <Text style={styles.text}>(Look for the number in this {`\u267A`} symbol on the item. If you cannot find it, the item is not recyclable)</Text>
								{/* Recycling information based on plastic classification */}
                                {(() => {
                                        if (isNaN(plasticCode) || plasticCode == -1)  return
                                        else if (plasticCode == 1 || plasticCode == 2) return recyclablePlastic
                                        else if (plasticCode >= 3 && plasticCode <= 7) return   <View>
                                                                                                        <Text style={styles.smallHeader}>Unfortunately, these plastics are not recyclable in Utah.</Text>
                                                                                                        <Text style={styles.smallHeader}>You can throw the item in the trash.</Text>
                                                                                                        <Text style={styles.text}>Click the button below for more information about recycling plastic in Utah</Text>
                                                                                                        <TouchableOpacity
                                                                                                            onPress={() => navigation.navigate("Plastics")}
                                                                                                            style={{marginVertial: 10, padding: 10, borderRadius: 15, width: 150, alignSelf: "center", backgroundColor: "#ed9fb8"}}>
                                                                                                                <Text style={{color: "white", textAlign: "center"}}>Plastic</Text>
                                                                                                        </TouchableOpacity>
                                                                                                </View>
                                        else return <Text style={styles.header}>Invalid plastic code number</Text>;
                                        })()}
                                <Text style={{marginBottom: 300}}></Text>
                            </View>

    const glassJar =    <View>
                            <Text style={{fontFamily: 'Cochin', textAlign: 'center', fontSize: 20, marginBottom: 20, marginHorizontal: 10}}>
                                    Glass is <Text style={{fontWeight:'bold'}}>not</Text> accepted in curbside recycling bins in Utah. However, Momentum Recycling has many glass collection bins around Utah Valley.</Text>
                            <Text style={styles.header}>Steps to recycle:</Text>
                            <Text style={styles.smallHeader}>1. Rinse the jar</Text>
                            <Text style={styles.smallHeader}>1b. Rinse with soap if greasy</Text>
                            <Text style={styles.smallHeader}>2. Bring the glass to a <Text style={{fontSize: 25, color: 'blue'}} 
                                  onPress={() => {Linking.openURL('https://utah.momentumrecycling.com/recycling-services-homes/#dropoff');}}>drop-off location</Text> near you!</Text>
                            <Text></Text>
                            <Text style={styles.text}>Click the button below for more information about recycling glass in Utah</Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Glass")}
                                style={{marginVertial: 10, padding: 10, borderRadius: 15, width: 150, alignSelf: "center", backgroundColor: "#5ce697"}}>
                                    <Text style={{color: "white", textAlign: "center"}}>Glass</Text>
                            </TouchableOpacity>
                            <Text style={{marginBottom: 30}}></Text>
                        </View>

    const glassBottle = <View>
                            <Text style={{fontFamily: 'Cochin', textAlign: 'center', fontSize: 20, marginBottom: 20, marginHorizontal: 10}}>
                                    Glass is <Text style={{fontWeight:'bold'}}>not</Text> accepted in curbside recycling bins in Utah. However, Momentum Recycling has many glass collection bins around Utah Valley.</Text>
                            <Text style={styles.header}>Steps to recycle:</Text>
                            <Text style={styles.smallHeader}>1. Rinse the bottle</Text>
                            <Text style={styles.smallHeader}>2. Bring the glass to a <Text style={{fontSize: 25, color: 'blue'}} 
                                  onPress={() => {Linking.openURL('https://utah.momentumrecycling.com/recycling-services-homes/#dropoff');}}>drop-off location</Text> near you!</Text>
                            <Text></Text>
                            <Text style={styles.text}>Click the button below for more information about recycling glass in Utah</Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Glass")}
                                style={{marginVertial: 10, backgroundColor: "gray", padding: 10, borderRadius: 15, width: 150, alignSelf: "center", backgroundColor: "#5ce697"}}>
                                    <Text style={{color: "white", textAlign: "center"}}>Glass</Text>
                            </TouchableOpacity>
                            <Text style={{marginBottom: 30}}></Text>
                        </View>

    const styrofoam =   <View>
                          <Text style={{fontFamily: 'Cochin', textAlign: 'center', fontSize: 20, marginBottom: 20, marginHorizontal: 10}}>
                              Due to how much air is in styrofoam, it is difficult to process for recycling and is therefore <Text style={{fontWeight: 'bold'}}>not recyclable</Text> in Utah and most places throughout the world.</Text>
                          <Text style={{fontFamily: 'Cochin', textAlign: 'center', fontSize: 20, marginBottom: 20, marginHorizontal: 10}}>However, Marko-Foam (a company in Utah) recycles bulk sized styrofoam!</Text>
                          <Text style={{fontFamily: 'Cochin', textAlign: 'center', fontSize: 20, marginBottom: 20, marginHorizontal: 10}}>Click <Text style={{fontSize: 25, color: 'blue'}} 
                                  onPress={() => {Linking.openURL('https://markofoam.com/');}}>here</Text> to learn more about Marko-Foam!</Text>
                        </View>

    
    /* Below is what the user will see */ 
    return (
      <ScrollView style={{backgroundColor: '#fdfdf6'}}>
      <View style={{flex: 1, alignItems:'center', justifyContent: 'center'}}>
        <Text></Text>
        <Text></Text>
        <Text style={{fontSize: 28, fontFamily: 'Cochin', textAlign: "center", marginBottom: 5}}>Upload an image of an item to learn how to recycle it!</Text> 
        <Image source={image ? { uri: image } : H2NOLogo} style={{width:320, height: 320}} />
        <Text></Text>

        {/* Buttons to upload or take a photo*/}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
                onPress={pickImage}
                style={{marginVertial: 15, padding: 5, borderRadius: 15, width: 100, alignSelf: "center", backgroundColor: "#3dbf4f"}}>
                    <Text style={{color: "white", textAlign: "center"}}>Select Photo to Upload</Text>
            </TouchableOpacity>
            <Text>   </Text>
            <TouchableOpacity
                onPress={openCamera}
                style={{marginVertial: 15, paddingVertical: 13.5, borderRadius: 15, width: 100, alignSelf: "center", backgroundColor: "#3dbf4f"}}>
                    <Text style={{color: "white", textAlign: "center"}}>Take a Photo</Text>
            </TouchableOpacity>
        </View>

        {/* Analyze image button */}
        <Text></Text>
        <TouchableOpacity style={styles.analyzeButton}
                          onPress={analyzeImage}>
            <Text style={{textAlign: 'center', color: 'white'}}>Analyze the recyclability of your item!</Text>
        </TouchableOpacity>
        <Text></Text>
      </View>

      {/* Recycling information will appear here once the item is classified */}
      <View>
                {(() => {
                    if (objClass == 'Aluminum can') return aluminumCanSteps
                    else if (objClass == "~Classification will appear here!~") return 
                    else if (objClass == "Plastic bottle") return plasticBottle
                    else if (objClass == "Glass Jar") return glassJar
                    else if (objClass == "Glass bottle") return glassBottle
                    else if  (objClass == "Styrofoam") return styrofoam
                    else if (objClass == "Analyzing") return <Text style={{fontSize: 30, fontFamily: 'Cochin', alignSelf: 'center', marginTop: 7}}>Analyzing image!</Text>
                    else return <Text style={{textAlign: 'center'}}></Text>;
                })()}
            </View>
      </ScrollView>
    );
  }

  const styles = StyleSheet.create({    
    header: {
        fontSize: 30, 
        fontFamily: 'Cochin', 
        alignSelf: 'center',
    },
    smallHeader : {
        fontSize: 25, 
        fontFamily: 'Cochin', 
        alignSelf: 'left',
        marginTop: 15,
        marginHorizontal: 7
    }, 
    text: {
        fontSize: 15, 
        textAlign: 'center',
        margin: 15,
        marginBottom: 5
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        width: 50,
        alignSelf: 'center'
      },
    button: {
      padding: 15,
      borderRadius: 15,
      width: 150,
      alignSelf: "center",
      backgroundColor: "#00C0E9",
    },
    analyzeButton: {
      padding: 15,
      borderRadius: 15,
      width: 275,
      alignSelf: "center",
      backgroundColor: "#00C0E9",
    }
});