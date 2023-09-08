import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import H2NOLogo from "../assets/H2NOLogo.png";

//this component is the smart page that will display all of the smart
//home devices
export default function SmartHomePage({navigation}) {
    const Separator = () => <View style={styles.separator} />;

    return (
        <ScrollView>
        <View style={{ paddingHorizontal: 25 }}>
          <View style={{ alignItems: "center" }}>
            <Image source={H2NOLogo} />
          </View>
          </View>
          <Text style={styles.title}>Smart Home</Text>
          <Separator />
          <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Lightbulb")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Lights</Text>
          </TouchableOpacity>
        </View>
        <Separator />

        <Separator />
          <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Thermostat")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Thermostat</Text>
          </TouchableOpacity>
        </View>
        <Separator />


        <Separator />
          <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Fan")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Fans</Text>
          </TouchableOpacity>
        </View>
        <Separator />

        <Separator />
          <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Sprinklers")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sprinklers</Text>
          </TouchableOpacity>
        </View>
        <Separator />

        <Separator />
          <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Heater")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Heater</Text>
          </TouchableOpacity>
        </View>
        <Separator />

        <Separator />
          <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Blinds")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Blinds</Text>
          </TouchableOpacity>
        </View>
        <Separator />

        <Separator />
          <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("AirCooler")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>AirCooler</Text>
          </TouchableOpacity>
        </View>
        <Separator />
      </ScrollView>
    );
}

//styles for smart home page
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
        backgroundColor: "#3F7A2D",
      },
      buttonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
      },
      signOutButton: {
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