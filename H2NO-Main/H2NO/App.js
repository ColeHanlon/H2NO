import * as React from 'react';
import { View } from 'react-native';
import Navigator from './routes/homestack';
import * as TaskManager from 'expo-task-manager';
import { useState, useEffect, useRef } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

//this is the main component, which all other app components will branch off of
export default function App() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}
  
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
    
      return token;
    }

    Notifications.addNotificationReceivedListener((notification) => {
      // navigation.navigate('Lightbulb')
    })

    const TURN_OFF_LIGHTS = 'TURN OFF LIGHTS'

    TaskManager.defineTask(TURN_OFF_LIGHTS, ({data, error}) => {
      console.log('turning off lights in background');
    });

    Notifications.registerTaskAsync(TURN_OFF_LIGHTS);

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);

  return (
    <View style={{flex: 1}}>
    {/* <WaterPage></WaterPage> */}
    {/* <SmartHomePage></SmartHomePage> */}
    {/* <LoginPage></LoginPage> */}
    {/* <RegistrationPage></RegistrationPage> */}
    {/* <HomePage></HomePage> */}
    <Navigator/>
  </View>

    // navigation drawer, p.s. order matters
    // <NavigationContainer>    
    //   <Drawer.Navigator initialRouteName="Home">
    //       <Drawer.Screen name="Home" component={HomePage}/>
    //       <Drawer.Screen name="Smart Home" component={SmartHomePage}/>
    //       <Drawer.Screen name="Water" component={WaterPage}/>
    //       <Drawer.Screen name="Reycling" component={RecyclePage}/>
    //     </Drawer.Navigator>
    // </NavigationContainer> 
  );
}

// const styles = StyleSheet.create({
//   container: {
//         // backgroundColor: '#fff',
//       }
//     });
