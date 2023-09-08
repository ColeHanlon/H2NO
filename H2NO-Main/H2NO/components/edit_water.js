import React, { useState, Component, useEffect } from "react";
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
import CheckBox from "expo-checkbox";
import H2NOLogo from "../assets/H2NOLogo.png";
import Ionicons from "react-native-vector-icons/Ionicons";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc} from "firebase/firestore";

const EditWater = ({ navigation }) => {
  const Separator = () => <View style={styles.separator} />;

  const styles = StyleSheet.create({
    separator: {
      marginVertical: 8,
      borderBottomColor: "#737373",
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    checkboxContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: "center",
    },
    button: {
      backgroundColor: "gray",
      padding: 20,
      borderRadius: 15,
      width: 175,
      alignSelf: "center",
      backgroundColor: "#00C0E9",
    },
    buttonText: {
      color: "white",
      textAlign: "center",
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
    },
  });

  const [memberCount, setMemberCount] = useState(0);
  const [showerCount, setShowerCount] = useState(0);
  const [showerLength, setShowerLength] = useState(0);
  const [brushTeeth, setBrushTeeth] = useState(true);
  const [laundryLoads, setLaundryLoads] = useState(0);
  const [dishLoads, setDishes] = useState(0);
  const [daysWatering, setDaysWater] = useState(0);

  const handleSave = async () => {
      if(isNaN(memberCount)){
        alert("Invalid Total Household Members!")
        return
      }
      if(isNaN(showerCount)){
        alert("Invalid Showers Per Day!")
        return
      }
      if(isNaN(showerLength)){
        alert("Invalid Average Shower Length!")
        return
      }
      if(isNaN(laundryLoads)){
        alert("Invalid Laundy Loads Per Day!")
        return
      }
      if(isNaN(dishLoads)){
        alert("Invalid Dishes Loads Per Day!")
        return
      }
      if(isNaN(daysWatering)){
        alert("Invalid Minutes Watering Lawn Each Day!")
        return
      }

      const querySnapshot =  await getDoc(doc(db, "average_usage", "averages"));

      var dishAvg = querySnapshot.data().DishAvg
      var showerAvg = querySnapshot.data().ShowerAvg
      var laundryAvg = querySnapshot.data().LaundryAvg
      var lawnAvg = querySnapshot.data().LawnAvg
      var usageCount = querySnapshot.data().UsageCount

      const docRef = doc(db, "water_usage", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        dishAvg = (((dishAvg * usageCount) - docSnap.data().DishLoads) + dishLoads) / usageCount
        showerAvg = (((showerAvg * usageCount) - (docSnap.data().ShowerCount * docSnap.data().ShowerLength)) + (showerCount * showerLength)) / usageCount
        laundryAvg = (((laundryAvg * usageCount) - docSnap.data().LaundryLoads) + laundryLoads) / usageCount
        lawnAvg = (((lawnAvg * usageCount) - docSnap.data().MinutesWater) + daysWatering) / usageCount

        setDoc(doc(db, "average_usage", "averages"), {
          DishAvg: dishAvg,
          LaundryAvg: laundryAvg,
          LawnAvg: lawnAvg,
          ShowerAvg: showerAvg,
          UsageCount: usageCount
        });
      } else {
        dishAvg = ((dishAvg * usageCount) + dishLoads) / (usageCount + 1) 
        showerAvg = ((showerAvg * usageCount) + (showerCount * showerLength)) / (usageCount + 1) 
        laundryAvg = ((laundryAvg * usageCount) + laundryLoads) / (usageCount + 1) 
        lawnAvg = ((lawnAvg * usageCount) + daysWatering) / (usageCount + 1) 
        usageCount++;

        setDoc(doc(db, "average_usage", "averages"), {
          DishAvg: dishAvg,
          LaundryAvg: laundryAvg,
          LawnAvg: lawnAvg,
          ShowerAvg: showerAvg,
          UsageCount: usageCount
        });
      }
    
    setDoc(doc(db, "water_usage", auth.currentUser.uid), {
      ID: auth.currentUser.uid,
      HouseholdMembers: memberCount,
      ShowerCount: showerCount,
      ShowerLength: showerLength,
      RunningWaterTeeth: brushTeeth,
      LaundryLoads: laundryLoads,
      DishLoads: dishLoads,
      MinutesWater: daysWatering
    });

    navigation.goBack()
  };

  const [memberCountInit, setMemberCountInit] = useState(0);
  const [showerCountInit, setShowerCountInit] = useState(0);
  const [showerLengthInit, setShowerLengthInit] = useState(0);
  const [laundryLoadsInit, setLaundryLoadsInit] = useState(0);
  const [dishLoadsInit, setDishesInit] = useState(0);
  const [daysWateringInit, setDaysWaterInit] = useState(0);

  const onScreenLoad = async () => {
    const docRefUser = doc(db, "water_usage", auth.currentUser.uid);
    const docSnapUser = await getDoc(docRefUser);
    if (docSnapUser.exists()) {
        setMemberCountInit(docSnapUser.data().HouseholdMembers);
        setShowerCountInit(docSnapUser.data().ShowerCount);
        setShowerLengthInit(docSnapUser.data().ShowerLength);
        setBrushTeeth(docSnapUser.data().RunningWaterTeeth);
        setLaundryLoadsInit(docSnapUser.data().LaundryLoads);
        setDishesInit(docSnapUser.data().DishLoads);
        setDaysWaterInit(docSnapUser.data().MinutesWater)
    }
  };

  useEffect(() => {
    onScreenLoad();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}
      >
        <View style={{ alignItems: "center" }}></View>
        <Image
          source={H2NOLogo}
          resizeMode={"cover"}
          style={{
            alignSelf: "center",
            width: 200,
            height: 200,
          }}
        />
        <Text
          style={{
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            alignSelf: "center"
          }}
        >
          Edit Your Water Usage
        </Text>
        <Separator />
        <View>
          <Text>Total Household Members</Text>
          <TextInput
            label={"Total Household Members"}
            icon={
              <Ionicons
                name="person-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            style={styles.input}
            defaultValue={'' + memberCountInit}
            onChangeText={(text) => setMemberCount(parseInt(text))}
            keyboardType="numeric"
          />
        </View>
        <Separator />
        <View>
        <Text>Showers Per Day (Individuals)</Text>
          <TextInput
            label={"Showers Per Day (Individuals)"}
            icon={
              <Ionicons
                name="person-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            style={styles.input}
            defaultValue={'' + showerCountInit}
            onChangeText={(text) => setShowerCount(parseInt(text))}
            keyboardType="numeric"
          />
        </View>
        <Separator />
        <View>
          <Text>Average Shower Length (Minutes)</Text>
          <TextInput
            label={"Average Shower Length (Minutes)"}
            icon={
              <Ionicons
                name="person-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            style={styles.input}
            defaultValue={'' + showerLengthInit}
            onChangeText={(text) => setShowerLength(parseInt(text))}
            keyboardType="numeric"
          />
        </View>
        <Separator />
        <View >
          <Text style={styles.label}>
            Do you turn off the water while brushing teeth?
          </Text>

          <CheckBox
            value={brushTeeth}
            onValueChange={setBrushTeeth}
            style={styles.checkbox}
          />
        </View>
        <Separator />
        <View>
          <Text>Laundry Loads Per Day</Text>
          <TextInput
            label={"Laundry Loads Per Day"}
            icon={
              <Ionicons
                name="person-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            style={styles.input}
            defaultValue={'' + laundryLoadsInit}
            onChangeText={(text) => setLaundryLoads(parseFloat(text))}
            keyboardType="numeric"
          />
        </View>
        <Separator />
        <View>
          <Text>Dishes Loads Per Day</Text>
          <TextInput
            label={"Dishes Loads Per Day"}
            icon={
              <Ionicons
                name="person-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            style={styles.input}
            defaultValue={'' + dishLoadsInit}
            onChangeText={(text) => setDishes(parseFloat(text))}
            keyboardType="numeric"
          />
        </View>
        <Separator />
        <View>
          <Text>Minutes Watering Lawn Each Day</Text>
          <TextInput
            label={"Minutes Watering Lawn Each Day"}
            icon={
              <Ionicons
                name="person-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            style={styles.input}
            defaultValue={'' + daysWateringInit}
            onChangeText={(text) => setDaysWater(parseFloat(text))}
            keyboardType="numeric"
          />
        </View>
        <Separator />
        <View>
          <TouchableOpacity
            onPress={() => handleSave()}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
        <Text></Text>
        <Text></Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: "#3F7A2D", fontWeight: "700", fontSize: 18 }}>
              {" "}
              Exit
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditWater;
