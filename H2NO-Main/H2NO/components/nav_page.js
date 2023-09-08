import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import H2NOLogo from "../assets/H2NOLogo.png";
import { auth } from "../firebase";

const NavScreen = ({ navigation }) => {
const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 25,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitle: {
    textAlign: "center",
    marginVertical: 8,
    fontSize: 20,
    fontWeight: "bold",
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 30
  },
  button: {
    backgroundColor: "gray",
    padding: 20,
    borderRadius: 15,
    width: 250,
    alignSelf: "center",
    backgroundColor: "#00C0E9",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  Buttons: {
      backgroundColor: "gray",
      padding: 20,
      borderRadius: 15,
      width: 100,
      alignSelf: "center",
      backgroundColor: "#3F7A2D",
    },
  head: {
    height: 30,
    backgroundColor: "#00C0E9",
  },
});


  const handleSignOut = () => {
      auth.signOut()
      .then(() => {
          navigation.replace("Login")
      })
      .catch((error) => alert(error.message));
  }


  return (
    <ScrollView>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: "center" }}>
          <Image source={H2NOLogo} />
        </View>
        </View>
        <Text style={styles.title}>Home</Text>
        <Separator />
        <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Social")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Social Feed</Text>
        </TouchableOpacity>
      </View>
      <Separator />

      <Separator />
        <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("SmartHome")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Smart Home</Text>
        </TouchableOpacity>
      </View>
      <Separator />

      <Separator />
        <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("WaterData")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Water Data</Text>
        </TouchableOpacity>
      </View>
      <Separator />

      <Separator />
        <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Recycling 101")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Recycling</Text>
        </TouchableOpacity>
      </View>
      <Separator />

      <Separator />
        <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Friends")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Friends</Text>
        </TouchableOpacity>
      </View>
      <Separator />

      <Separator />
        <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Goals")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Goals</Text>
        </TouchableOpacity>
      </View>
      <Separator />

      <View style={{paddingHorizontal: 25, flexDirection: 'row', marginHorizontal: 20, justifyContent: 'space-evenly',}}>
        <TouchableOpacity style={styles.Buttons}  onPress={() => navigation.navigate("EditProfile")}>
            <Text style={styles.buttonText}>Profile</Text>
          </TouchableOpacity>
          
        <TouchableOpacity onPress={handleSignOut} style={styles.Buttons}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <Separator />
    </ScrollView>
  );
}
;

export default NavScreen;
