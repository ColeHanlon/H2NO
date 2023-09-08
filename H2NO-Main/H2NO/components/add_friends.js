import {View, Text, TextInput, SafeAreaView, TouchableOpacity, StyleSheet, Image, FlatList} from "react-native";
import CustomRemoveButton from "./additional_files/custom_button";
import H2NOLogo from "../assets/H2NOLogo.png";
import React, { useEffect, useState} from "react";
import { auth, db } from "../firebase";
import { collection, where, query, getDocs, addDoc, deleteDoc, doc} from "firebase/firestore";
import CustomAddButton from "./additional_files/custom_add_button";

const Separator = () => <View style={styles.separator} />;
const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.title, {color: textColor, fontSize: 20}]}>{item.title}</Text>
  </TouchableOpacity>
);

 const AddFriends = ({navigation}) => {
  const [onLoadFriends, setFriends] = useState(null);
  
  const onScreenLoad = async () => {
    var friends = [];
    const q = query(collection(db, "friendships"), where("Base", "==", auth.currentUser.uid));

    const querySnapshot = await getDocs(q);
    var friendIds = [];
      querySnapshot.forEach((doc) => {
        friendIds.push(doc.data().Friend);
    });
    
    let i = 0;

    while (i < friendIds.length) {
      const q = query(collection(db, "users"), where("ID", "==", friendIds[i]));
      const querySnapshot2 = await getDocs(q);
      var friendName = '';

      querySnapshot2.forEach((doc) => {
        friendName = doc.data().UserNameRaw;
      });
      friends.push({
        id: friendIds[i],
        title: friendName
      });
      i++;
    }

    setFriends(friends);
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

  const [friend, setFriend] = useState("");

  const handleAdd = async () => {
    const q = query(collection(db, "users"), where("UserName", "==", friend.toUpperCase()));

    const querySnapshot = await getDocs(q);
    var friendExists = false;
    var friendId = 0;
    var friendName = '';
    querySnapshot.forEach((doc) => {
      friendId = doc.data().ID;
      friendExists = true;
      friendName = doc.data().UserNameRaw;
    });

    if(!friendExists){
      alert("This friend does not exist!");
      return;
    }

    const q2 = query(collection(db, "friendships"), where("Base", "==", auth.currentUser.uid),  where("Friend", "==", friendId));

    const querySnapshot2 = await getDocs(q2);
    var friendshipExists = false;
    querySnapshot2.forEach((doc) => {
      friendshipExists = true;
    });

    if(friendshipExists){
      alert("You already have this friend!");
      return;
    }
    if(friendId == auth.currentUser.uid){
      alert("You cannot add yourself as a friend");
      return;
    }
    if(friendExists){
      const res = await addDoc(collection(db, "friendships"), {
        Base: auth.currentUser.uid,
        Friend: friendId
      });
      onLoadFriends.push({
        id: friendId,
        title: friendName
      })
      setSelectedId(friendId);
      alert("Friend added!")
    }
  }

  const handleRemove = async () => {  
    const q = query(collection(db, "users"), where("UserName", "==", friend.toUpperCase()));

    const querySnapshot = await getDocs(q);
    var friendExists = false;
    var friendId = 0;
    querySnapshot.forEach((doc) => {
      friendId = doc.data().ID;
      friendExists = true;
    });

    if(!friendExists){
      alert("This friend does not exist!");
      return;
    }

    const q2 = query(collection(db, "friendships"), where("Base", "==", auth.currentUser.uid),  where("Friend", "==", friendId));

    const querySnapshot2 = await getDocs(q2);
    var friendshipExists = false;
    var friendshipId = 0;
    querySnapshot2.forEach((doc) => {
      friendshipExists = true;
      friendshipId = doc.id;
    });

    if(!friendshipExists){
      alert("You do not have this friend!");
      return;
    }
    if(friendId == auth.currentUser.uid){
      alert("You cannot remove yourself as a friend");
      return;
    }
    if(friendExists){
      const res = await deleteDoc(doc(db, "friendships", friendshipId));
      deleteItemById(friendId);
      setSelectedId(null);
      alert("Friend removed!")
    }
  };

    deleteItemById = id => {
      const filteredData = onLoadFriends.filter(item => item.id !== id);
      setFriends(filteredData);
    }

    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{display: 'flex', alignItems: 'center',justifyContent: 'center',}}>
        <Image
            source={H2NOLogo}
            style={{
              alignItems:"center",
              height: 120,
              width: 120,
              marginBottom: 10,
              marginTop: 10,
            }}
        />
        </View>
        
        <View style={{display: 'flex', alignItems: 'center',justifyContent: 'center',}}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={(text) => setFriend(text)}
            />
        </View>


          <View style={{paddingHorizontal: 25, flexDirection: 'row', marginHorizontal: 20, justifyContent: 'space-around',}}>
            <CustomAddButton label={"Add"} onPress={handleAdd} />
            <CustomRemoveButton label={"Remove"} onPress={handleRemove}/> 
          </View>

          <Separator/>

          <View style= {{display: 'flex', alignItems: 'center',justifyContent: 'center',}}>
             <Text style={{fontSize: 24, fontWeight: "500",
              color: "#333",
              marginBottom: 10, marginTop: 10
            }}
             >
                Friends
            </Text>
          </View>
              <FlatList
                data={onLoadFriends}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={selectedId}
              />
      </SafeAreaView>
    );
  }

  export default AddFriends;
  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
      width: 350
    },
    container: {
      flex: 1,
    },
    item: {
      backgroundColor: '#00C0E9',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 15
    },
    title: {
      fontSize: 32,
    },
    separator: {
      marginVertical: 8,
      marginHorizontal: 15,
      borderBottomColor: "#737373",
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
  });


