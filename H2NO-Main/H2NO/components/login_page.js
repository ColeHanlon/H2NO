import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CustomLoginButton from "./additional_files/custom_button";
import H2NOLogo from "../assets/H2NOLogo.png";
import { db, auth } from "../firebase";
import { doc, setDoc} from "firebase/firestore";
import * as TaskManager from 'expo-task-manager';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      // alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    console.log('token from login: ' + token);
    return token;
  }

  Notifications.addNotificationReceivedListener((notification) => {
    navigation.navigate('Lightbulb')
  })

  const TURN_OFF_LIGHTS = 'TURN OFF LIGHTS'

  TaskManager.defineTask(TURN_OFF_LIGHTS, ({data, error}) => {
    console.log('turning off lights in background');
  });

  Notifications.registerTaskAsync(TURN_OFF_LIGHTS);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("NavPage");
      }
    });

    return unsubscribe;
  }, []);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;

      })
      .then(() => {
        var res = '';
        //create user token
        setDoc(doc(db, "push_tokens", auth.currentUser.uid), {
          token: expoPushToken        
      });
      })
      .catch((error) => console.log(""));
  };

  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ paddingHorizontal: 25 }}>
          <View style={{ alignItems: "center" }}>
            <Image source={H2NOLogo} />
          </View>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "500",
              color: "#333",
              marginBottom: 30,
            }}
          >
            Login
          </Text>
          <View>
            <TextInput
              label={"Email"}
              icon={
                <MaterialIcons
                  name="email"
                  size={20}
                  color="#666"
                  style={{ marginRight: 5 }}
                />
              }
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              style={styles.input}
              placeholder="Email"
            />
          </View>

          <View>
            <TextInput
              label={"Password"}
              icon={
                <MaterialIcons
                  name="ios-lock-closed-outline"
                  size={20}
                  color="#666"
                  style={{ marginRight: 5 }}
                />
              }
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles.input}
              placeholder="Password"
            />
          </View>

          <CustomLoginButton label={"Login"} onPress={handleLogin} />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <Text>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Registration")}
            >
              <Text style={{ color: "#3F7A2D", fontWeight: "700" }}>
                {" "}
                Create Account
              </Text>
            </TouchableOpacity>

            
              
          </View>
          <View style={{ alignItems:"center" }}>
            <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                <Text style={{ color: "#3F7A2D", fontWeight: "700"}}>
                  Forgot Password?
                </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
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

export default LoginScreen;
