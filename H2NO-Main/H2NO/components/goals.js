import {Text, TextInput, SafeAreaView, Dimensions} from 'react-native';
import {ProgressChart } from 'react-native-chart-kit';
import React, { useState, Component, useEffect } from "react";
import CustomSaveButton from './additional_files/custom_button';
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc} from "firebase/firestore";
   
const GoalsPage = ({navigation}) => {
    const [disposal, setDisposal] = useState(0);
    const [water, setWater] = useState(0);
    const [disposalData, setDisposalData] = useState(0);
    const [waterData, setWaterData] = useState(0);
    
    const [progressRingData, setProgressRingData] = useState({
        labels: ["Items", "Water"], // optional
        data: [0.0,0.0]
      });

    async function pushPostToDB() {
        const decRef = await setDoc(doc(db, 'goals', auth.currentUser.uid), {
            uid: auth.currentUser.uid,
            disposal: disposal,
            water: water
        });
        navigation.goBack();
    }
    
    const onScreenLoad = async () => {
        const docRefUser = doc(db, "water_usage", auth.currentUser.uid);
        const docSnapUser = await getDoc(docRefUser); 
        if (docSnapUser.exists()) {
          const docRefAvg = doc(db, "average_usage", "averages");
          const docSnapAvg = await getDoc(docRefAvg);
    
          var dishVal =
            (docSnapUser.data().DishLoads / docSnapAvg.data().DishAvg);
          var laundryVal =
            (docSnapUser.data().LaundryLoads / docSnapAvg.data().LaundryAvg);
          var lawnVal =
            (docSnapUser.data().MinutesWater / docSnapAvg.data().LawnAvg);
          var showerVal =
            ((docSnapUser.data().ShowerCount * docSnapUser.data().ShowerLength) /
              docSnapAvg.data().ShowerAvg);
        }
        
        var averageUsage = ((dishVal + laundryVal + lawnVal + showerVal) / 4) * 100;
        
        const docRefUser1 = doc(db, "goals", auth.currentUser.uid);
        const docSnapUser1 = await getDoc(docRefUser1);
        const docRef = doc(db, "recycled_items", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        var waterProgressValue = 0; 
        var waterDataDB = 0;
        var disposalDataDB = 0;
        var recycleCount = docSnap.data().NumRecycledItems;


        if (docSnapUser1.exists()) {
            waterDataDB = docSnapUser1.data().water;
            disposalDataDB = docSnapUser1.data().disposal;
        }

        if(averageUsage <= waterDataDB ) {
            waterProgressValue = 100;
        }
        else if((averageUsage - waterDataDB ) >= 100){
            waterProgressValue = 0;
        }
        else{
            waterProgressValue = averageUsage - waterDataDB;
        }

        const data = {
            labels: ["Items", "Water"], // optional
            data: [recycleCount / disposalDataDB, waterProgressValue / 100]
        };

        setProgressRingData(data);
      };

      useEffect(() => {
        onScreenLoad();
      }, []);

    return( 
        <SafeAreaView style={{display: 'flex', alignItems: 'center',justifyContent: 'center', marginTop: 50}}>
        <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Weekly Goals</Text>
            <ProgressChart
                data={progressRingData}
                width={Dimensions.get('window').width-35}
                height={250}
                chartConfig={{
                    backgroundColor: '#1cc910',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 192, 233, ${opacity})`,      
                }}
            ></ProgressChart>
            
            <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Number of items you want to dispose per week?</Text>
            <TextInput placeholder='Enter number of items'
             style={{
                height: 50,
                width: 200,
                margin: 12,
                borderWidth: 1,
                borderRadius: 10,
                padding: 10
            }}
            keyboardType="numeric"
            onChangeText={(text) => setDisposal(parseFloat(text))}></TextInput>

         <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Percentage of water you want to save compared to the average usage?</Text>
            <TextInput placeholder='Enter amount of water in %'
             style={{
                height: 50,
                width: 200,
                margin: 12,
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
            }}
            keyboardType="numeric"
            onChangeText={(text) => setWater(parseFloat(text))}
             ></TextInput>

            <CustomSaveButton onPress={() => pushPostToDB()} label={"Save"}></CustomSaveButton>
        </SafeAreaView>
    );

}
export default GoalsPage;