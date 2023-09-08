import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomRegisterButton from "./additional_files/custom_button";
import H2NOLogo from "../assets/H2NOLogo.png";
import { auth, db } from "../firebase";
import { doc, setDoc, getDocs, where, collection, query, limit } from "firebase/firestore";
import {  sendEmailVerification } from "firebase/auth";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("NavPage");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = async () => {
    if(fullName == "" || password == "" || passwordConfirm == "" || age == "" || email == "" || userName == ""){
      alert("Please complete all fields")
      return;
    }
    if (!(password === passwordConfirm)) {
      alert("Passwords do not match!");
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
        alert("This Username is Already Taken!")
        userTaken = true;
        return;
    });

    if(userTaken){
      return;
    }    


    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (userCredentials) => {
        const user = userCredentials.user;
        await setDoc(doc(db, "users", user.uid), {
          ID: user.uid,
          Name: fullName,
          Age: age,
          UserNameRaw: userName,
          UserName: userName.toUpperCase(),
          Email: email
        });

        sendEmailVerification(user)
        .then(() => {
          alert("Email verification sent!")
        });
      })
      .catch((error) => alert(error.message));


  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}
      >
        <View style={{ alignItems: "center" }}></View>
        <Image
          source={H2NOLogo}
          style={{
            height: 150,
            width: 150,
            left: 90,
            marginBottom: 10,
            marginTop: 10,
          }}
        />
        <Text
          style={{
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            left: 110,
            marginBottom: 15,
          }}
        >
          Register
        </Text>

        <View>
          <TextInput
            label={"Full Name"}
            icon={
              <Ionicons
                name="person-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={(text) => setFullName(text)}
          />
        </View>

        <View>
          <TextInput
            label={"Email"}
            icon={
              <Ionicons
                name="person-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        
        <View>
          <TextInput
            label={"Username"}
            icon={
              <Ionicons
                name="person-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            style={styles.input}
            placeholder="Username"
            value={userName}
            onChangeText={(text) => setUserName(text)}
          />
        </View>

        <View>
          <TextInput
            label={"Password"}
            icon={
              <Ionicons
                name="person-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>

        <View>
          <TextInput
            label={"Confirm Password"}
            icon={
              <Ionicons
                name="person-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            style={styles.input}
            placeholder="Confirm Password"
            value={passwordConfirm}
            onChangeText={(text) => setPasswordConfirm(text)}
            secureTextEntry={true}
          />
        </View>

        <View>
          <TextInput
            label={"Age (Must be 13 and above)"}
            icon={
              <Ionicons
                name="person-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            style={styles.input}
            placeholder="Age (Must be 13 and above)"
            value={age}
            onChangeText={(text) => setAge(text)}
            keyboardType="numeric"
          />
        </View>

        <CustomRegisterButton label={"Register"} onPress={handleSignUp} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: "#3F7A2D", fontWeight: "700" }}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});

export default RegisterScreen;
