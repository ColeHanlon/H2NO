import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  RefreshControl
} from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import { BarChart } from "react-native-chart-kit";
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  doc,
  getDoc
} from "firebase/firestore";
import { LogBox } from "react-native";

const WaterScreen = ({ navigation }) => {
  LogBox.ignoreAllLogs();
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
      width: 175,
      alignSelf: "center",
      backgroundColor: "#00C0E9",
    },
    buttonText: {
      color: "white",
      textAlign: "center",
    },
    head: {
      height: 30,
      backgroundColor: "#00C0E9",
    },
  });

  const chartConfig = {
    backgroundGradientFrom: "#000000",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#00C0E9",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  const [onLoadWeather, setWeather] = useState([]);

  const [onLoadUsage, setUsage] = useState({
    labels: ["Showers", "Laundry", "Dishes", "Lawn"],
    datasets: [
      {
        data: [0, 0, 0, 0],
      },
    ],

  });

  const [onLoadTotal, setTotal] = useState(0);

  const onScreenLoad = async () => {
    var dataWeather = [];

    const q = query(
      collection(db, "combined_weather"),
      orderBy("DayNum", "asc")
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      dataWeather.push([doc.data().Day, doc.data().Type, doc.data().Regions]);
    });
    setWeather(dataWeather);

    const docRefUser = doc(db, "water_usage", auth.currentUser.uid);
    const docSnapUser = await getDoc(docRefUser);
    if (docSnapUser.exists()) {
      const docRefAvg = doc(db, "average_usage", "averages");
      const docSnapAvg = await getDoc(docRefAvg);

      var dishVal =
        (docSnapUser.data().DishLoads / docSnapAvg.data().DishAvg) * 5;
      var laundryVal =
        (docSnapUser.data().LaundryLoads / docSnapAvg.data().LaundryAvg) * 5;
      var lawnVal =
        (docSnapUser.data().MinutesWater / docSnapAvg.data().LawnAvg) * 5;
      var showerVal =
        ((docSnapUser.data().ShowerCount * docSnapUser.data().ShowerLength) /
          docSnapAvg.data().ShowerAvg) *
        5;

      const barGraphData = {
        labels: ["Showers", "Laundry", "Dishes", "Lawn"],
        datasets: [
          {
            data: [showerVal, laundryVal, dishVal, lawnVal],
          },
        ],
        legend: ["Usage"],
      };

      setUsage(barGraphData);
    }


    var totalLevel = 0;

    const q2 = query(collection(db, "reservoir_levels"),  orderBy("Date", "desc"), limit(36));

    const querySnapshot2 = await getDocs(q2);

    querySnapshot2.forEach((doc) => {
      if(!isNaN(doc.data().Level)){
        totalLevel += parseInt(doc.data().Level);
      }
      }
    );
    setTotal(totalLevel);
  };

  useEffect(() => {
    onScreenLoad();
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    onScreenLoad();
    setRefreshing(false);
  }, []);

  //this component is the water page that will display all of the water
  return (
    
      <ScrollView 
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      >
          <Text style={styles.title}>Water Data</Text>
          <Separator />
          <Text style={styles.subtitle}>Water Levels</Text>
          <Text style={{textAlign: "center", paddingTop: 10}}>
            Current Total Water: {onLoadTotal} Acre feet
          </Text>
          <Separator />
          <Text style={{textAlign: "center", paddingBottom: 10, paddingTop: 10}}>
            View water levels across Utah reservoirs
          </Text>

          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("WaterMap")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Go to Water Map</Text>
            </TouchableOpacity>
          </View>
          <Separator />
          <Text style={styles.subtitle}>Upcoming Water</Text>
          <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
              <Row data={["Day", "Weather", "Counties"]} style={styles.head} />
              <Rows data={onLoadWeather} />
            </Table>
          </View>
          <Separator />
          <Text style={styles.subtitle}>My Usage</Text>
          <View style={{alignItems: 'center'}}>
            <BarChart
              data = {onLoadUsage}
              width={300}
              height={220}
              yAxisLabel=""
              chartConfig={chartConfig}
              fromZero = {true}
              fromNumber = {10}
            />
          </View>

          {/* Used to create space */}
          <Text></Text>

          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditWaterUse")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Edit Water Usage</Text>
            </TouchableOpacity>
          </View>
          <Separator />
      </ScrollView>
  
  );
};

export default WaterScreen;
