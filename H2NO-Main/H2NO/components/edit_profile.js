import {View, Text, TextInput, SafeAreaView, StyleSheet, Image} from "react-native";
import CustomLoginButton from "./additional_files/custom_button";
import H2NOLogo from "../assets/H2NOLogo.png";
import React, { useEffect, useState} from "react";
import { auth, db } from "../firebase";
import { updateEmail } from "firebase/auth";
import { doc, setDoc, getDoc, getDocs, where, collection, query, limit } from "firebase/firestore";

  export default function EditProfile(){
    const [fullName, setFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");

    const handleEdit = async () => {
      if(fullName == "" || age == "" || email == "" || userName == ""){
        alert("Please complete all fields")
        return;
      }

      for (var i = 0; i < age.length; i++) {
        if (!(age[i] >= "0" && age[i] <= "9")) {
          alert("Age must be a number!");
          return;
        }
      }
  
      for (var i = 0; i < fullName.length; i++) {
        if (!(fullName[i].match(/[a-z]/i) || fullName[i].match(/\s/))) {
          alert("Name must only include letters!");
          return;
        }
      }
  
      if(!userName.match(/^[a-zA-Z0-9]{1,15}$/)){
        alert("Username must only include letters and numbers (Up to 15 characters)")
        return;
      }
  
      var userTaken = false;
  
      const q = query(collection(db, "users"), where("UserName", "==", userName.toUpperCase()), limit(1));
  
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
        if(doc.data().ID != auth.currentUser.uid){
          alert("This Username is Already Taken!")
          userTaken = true;
          return;
        }
      });
  
      if(userTaken){
        return;
      }
      
      updateEmail(auth.currentUser, email).then(async () => {
        await setDoc(doc(db, "users", auth.currentUser.uid), {
          ID: auth.currentUser.uid,
          Age: age,
          Email: email,
          UserName: userName.toUpperCase(),
          UserNameRaw: userName,
          Name: fullName,
        });
      }).catch((error) => {
        alert("Could not update email!");
      });

      alert("Updated!");
    }

    const [fullNameInit, setFullNameInit] = useState("");
    const [userNameInit, setUserNameInit] = useState("");
    const [emailInit, setEmailInit] = useState("");
    const [ageInit, setAgeInit] = useState("");

    const onScreenLoad = async () => {
      const docRefUser = doc(db, "users", auth.currentUser.uid);
      const docSnapUser = await getDoc(docRefUser);
      if (docSnapUser.exists()) {
          setAgeInit(docSnapUser.data().Age);
          setFullNameInit(docSnapUser.data().Name)
          setEmailInit(docSnapUser.data().Email)
          setUserNameInit(docSnapUser.data().UserNameRaw)

          setAge(docSnapUser.data().Age);
          setFullName(docSnapUser.data().Name)
          setEmail(docSnapUser.data().Email)
          setUserName(docSnapUser.data().UserNameRaw)
      }
    };
  
    useEffect(() => {
      onScreenLoad();
    }, []);

    return (
      <SafeAreaView style={{ display:'flex', justifyContent: "center"}}>
      <View style={{display: 'flex', alignItems: 'center',justifyContent: 'center',}}>
        <Image
            source={H2NOLogo}
            style={{
              alignItems:"center",
              height: 250,
              width: 250,
              marginBottom: 10,
              marginTop: 10,
            }}
        />
          <Text
            style={{
              fontSize: 28,
              fontWeight: "500",
              color: "#333",
              marginBottom: 15,
            }}
          >
            Editing Profile
          </Text>
          
        </View>

       <View>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            defaultValue={'' + fullNameInit}
            onChangeText={(text) => setFullName(text)}
          />
        </View>

        <View>
          <TextInput
            style={styles.input}
            placeholder="Username"
            defaultValue={'' + userNameInit}
            onChangeText={(text) => setUserName(text)}
          />
        </View>

        <View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            defaultValue={'' + emailInit}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View>
          <TextInput
            style={styles.input}
            placeholder="Age"
            defaultValue={'' + ageInit}
            onChangeText={(text) => setAge(text)}
            keyboardType="numeric"
          />
        </View>

        <View style={{paddingHorizontal: 10}}>
        <CustomLoginButton label={"Update"} onPress={handleEdit}/>
        </View>
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
    },
  });
