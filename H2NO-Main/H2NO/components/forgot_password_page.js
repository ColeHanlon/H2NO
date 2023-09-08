import { TextInput, SafeAreaView, View, StyleSheet, Image, Text } from "react-native"
import CustomLoginButton from "./additional_files/custom_button";
import H2NOLogo from "../assets/H2NOLogo.png";
import { auth } from "../firebase";
import React, {useState} from "react";

export default function ForgotPasswordPage({navigation}){
  const [email, setEmail] = useState("");

  const handleReset = () => {
    auth.sendPasswordResetEmail(email)
    alert("Sent reset email, if account exists")
    navigation.goBack()
  };

    return(
        <SafeAreaView style={{flex:1, alignItems: 'center',justifyContent: 'center'}}>
          <View>
            <View style={{ alignItems: "center" }}>
            <Image source={H2NOLogo} />
             </View>
            <Text
            style={{
              fontSize: 28,
              fontWeight: "500",
              color: "#333",
              marginBottom: 30,
              alignItems:"center"
            }}
            >
            Enter email to reset password
            </Text>

            <TextInput
              keyboardType="email-address"
              style={styles.input}
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
            >   
             </TextInput>
             <CustomLoginButton label={"Send"} onPress={handleReset}/>

          </View>
        </SafeAreaView>
    )

    
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
