import {Text, View, StyleSheet, StatusBar, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { db, auth } from "../firebase";
import { collection, getDocs, query, orderBy, limit, where } from "firebase/firestore";

  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
      <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
      <Text style={{color: textColor}}>{item.date}</Text>
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth +1,
        }}
      />
      <Text style={{fontSize: 18, left: 0, top: 0,  numberOfLines: 3}}>{item.body}</Text>

    </TouchableOpacity>
  );
 
  function convertDate(date) {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth()+1).toString();
    var dd  = date.getDate().toString();

    var mmChars = mm.split('');
    var ddChars = dd.split('');

    return (mmChars[1]?mm:"0"+mmChars[0])  + '/' + (ddChars[1]?dd:"0"+ddChars[0]) + '/' + yyyy;
  }

const SocialPage = ({navigation}) => {
    const [onLoadPosts, setPosts] = useState([]);
  
    const onScreenLoad = async () => {
      var posts = [];
  
      const q = query(collection(db, "posts"), orderBy("Date", "desc"));
  
      const postsSnapshot = await getDocs(q);
      var friends = new Set();
      const friendships = collection(db, 'friendships');
      const docSnap = await getDocs(friendships);
      docSnap.forEach(doc => {
        if (doc.data().Base == auth.currentUser.uid) {
          friends.add(doc.data().Friend)
        }        
      })
      postsSnapshot.forEach((doc) => {     
        if (doc.data().uid != null) {          
          friends.forEach(value => {
            console.log(value + ', ' + doc.data().uid + ' -> ' + (value === doc.data().uid)); 
            if (value === doc.data().uid) {
              posts.push({
                id: doc.id,
                title: doc.data().FullName == null ? '' : doc.data().FullName,
                body: doc.data().Body,
                date: doc.data().Date == null ? "" : convertDate(doc.data().Date.toDate())
              });
            }
          }) 
        }             
      });
  
      setPosts(posts);
    };

    useEffect(() => {
      onScreenLoad();
    }, []);

    const [selectedId, setSelectedId] = useState();

    const renderItem = ({item}) => {
        const backgroundColor = item.id === selectedId ? '#3F7A2D' : '#00C0E9';
        const color = item.id === selectedId ? 'white' : 'black';
        return (
        <Item
            item={item}
            onPress={() => setSelectedId(item.id)}
            backgroundColor={backgroundColor}
            textColor={color}
        />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
        <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Social Feed</Text>
            <TouchableOpacity onPress={() => navigation.navigate("CreateNewPost")} style={{display: 'flex', alignItems: 'flex-end',}}>
                <Ionicons name = "create-outline" style={{fontSize:40, paddingRight: 10}}></Ionicons>
            </TouchableOpacity>
      
            <Text style={{textAlign:'right', paddingRight: 18}}>Post</Text>
                
            <FlatList
                data={onLoadPosts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={selectedId}             
            /> 
         </SafeAreaView>
  );
}

export default SocialPage;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      style:{numberOfLines: 1}
      },
    item: {
      padding: 15,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 15
    },
    title: {
      fontSize: 22,
    },

  });
