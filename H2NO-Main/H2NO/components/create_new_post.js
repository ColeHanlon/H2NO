import { TextInput, View, Image} from 'react-native';
import { useState } from 'react';
import { auth, db } from "../firebase";
import { collection, addDoc} from "firebase/firestore";
import H2NOLogo from "../assets/H2NOLogo.png";
import CustomButton from './additional_files/custom_button';
export default function CreateNewPostPage({navigation}) {
const [post, setPost] = useState('');

async function pushPostToDB() {
    const decRef = await addDoc(collection(db, 'posts'), {
        FullName: auth.currentUser.email,
        Date: new Date(),
        Body: post, 
        uid: auth.currentUser.uid
    });
    navigation.goBack();

}

 return (
    <View style={{ paddingHorizontal: 25 }}>
          <View style={{ alignItems: "center" }}>
            <Image source={H2NOLogo} />
          </View>
        <TextInput placeholder='Enter new post here...'
        style={{
            height: 200,
            margin: 12,
            borderWidth: 1,
            borderRadius: 10,
            padding: 10
            }}
        multiline={true}
        onChangeText={(value) => setPost(value)}/>

        <CustomButton onPress={() => pushPostToDB()} label={"Post"}></CustomButton>
    </View>
 )
}