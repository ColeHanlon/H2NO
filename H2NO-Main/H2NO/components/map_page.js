import { StyleSheet} from "react-native";
import MapView, { PROVIDER_GOOGLE, Heatmap } from "react-native-maps";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy, limit} from "firebase/firestore";

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 600,
    width: 300,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 25,
  },
});

const MapPage = () => {
  const [onLoadReservoirs, setReservoirs] = useState([
    {
      latitude: 0.0,
      longitude: 0.0,
      weight: 0,
    },
  ]);

  const onScreenLoad = async () => {
    var dataLevels = [];

    const q = query(collection(db, "reservoir_levels"),  orderBy("Date", "desc"), limit(36));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      if(!isNaN(doc.data().Level)){
        dataLevels.push({
          latitude: parseFloat(doc.data().Latitude),
          longitude: parseFloat(doc.data().Longitude),
          weight: parseFloat(doc.data().Level),
        });
      }
    });

    setReservoirs(dataLevels);
  };
  useEffect(() => {
    onScreenLoad();
  }, []);

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={{
        latitude: 39.52,
        longitude: -111.5937,
        latitudeDelta: 4.5,
        longitudeDelta: 4.5,
      }}
      mapType="standard"
    >
      <Heatmap
        region={{
          latitude: 39.52,
          longitude: -111.5937,
          latitudeDelta: 4.5,
          longitudeDelta: 4.5,
        }}
        points={onLoadReservoirs}
        radius={50}
        gradient={{
          colors: ["#94D0FF", "#45ADFF", "#008FFF"],
          startPoints: [0.01, 0.5, 1],
          colorMapSize: 256,
        }}
      ></Heatmap>
    </MapView>
  );
};

export default MapPage;
