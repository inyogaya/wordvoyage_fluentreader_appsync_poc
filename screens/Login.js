import React, { useState,useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity, Image, ImageBackground, Switch, Button, Alert
  
} from 'react-native';

import { Amplify, Storage, Auth, graphqlOperation, API, } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
Amplify.configure(awsconfig);
import { CheckBox } from 'react-native-rapi-ui';
// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
// import { Auth } from 'aws-amplify';

async function signIn() {
  try {
    console.log(username);
    Alert.alert(username)
    const user = await Auth.signIn(username, password);
    console.log('signed in')
  } catch (error) {
    console.log('error signing in', error);
  }

  try {
    console.log(username);
    Alert.alert(username)
    await Auth.signOut();
    console.log('signed out')
  } catch (error) {
    console.log('error signing out: ', error);
  }
}



const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const schoolIDRef = useRef(null);
  const usernameRef = useRef(null);

//   const [state, setState] = useState({
//     email: '',
//     password: '',
//     schoolID:'',
//     username:''

//     //isSelected:'',
//   })

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading]=useState(false);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [username, setUsername] = useState("");
  // const [schoolID, setSchoolID] = useState("");
  // Validate email address format using a regular expression
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password format (minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number)
const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  return passwordRegex.test(password);
};

// Validate school ID format (must be a string of 6 digits)
const isValidSchoolID = (schoolID) => {
  const schoolIDRegex = /^\d{6}$/;
  return schoolIDRegex.test(schoolID);
};
// Validate username format (must be between 4-20 characters, can only contain letters, numbers, and underscores)
const isValidUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;
  return usernameRegex.test(username);
};
  
  const onPressForgotPassword = () => {
    // Do something about forgot password operation
  };
  const onPressSignUp = () => {
    // Do something about signup operation
  };

  const handleSignIn = async () => {
    if(loading)
    {
        return; // if loading stop the execution of the function
    }
    setLoading(true);

    try {
        console.log(username);
        Alert.alert(username)
        
      const user = await Auth.signIn(username, password);
      console.log(' you are signed in');
      console.log(user)
    } catch (error) {
        console.log(username);
        Alert.alert('Oops', error.message)
      console.log('error signing in', error);
    }

    setLoading(false);

    ///////
    try {
      await Auth.signOut();
      console.log('you are signed out');
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };
  const handleBlur = () => {
    TextInput.blur();
  };
  return (

    <View style={styles.container} >

      <View style={{
        //backgroundColor:'blue',
        width: '100%',
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

      }} >
        <Image style={{
          marginTop: 40, marginBottom: 60, width: 250, height: 48, resizeMode:'contain'
        }} source={require("../images/Logo.png")}></Image>
      </View>

      <View style={{ alignContent: 'flex-start', width: '90%', }}>
{/* 
        <Text style={{ fontWeight: 'bold', color: "white", marginTop: 7, marginBottom: 4 }}>School ID</Text>


        <TextInput
          style={styles.inputText}
        
          autoCapitalize="none"

          onChangeText={text => setState({ schoolID: text })} />


        <Text style={{ fontWeight: 'bold', color: "white", marginTop: 7, marginBottom: 4 }}>Username</Text> */}


        {/* <TextInput
          style={styles.inputText}
          autoCapitalize="none"
          // secureTextEntry
          placeholder=""
          placeholderTextColor=""
          value={username}
          onChangeText={text => setState({ username: text })} />

        <Text style={{ fontWeight: 'bold', color: "white", marginTop: 7, marginBottom: 4 }}>Password</Text>


        <TextInput
          style={styles.inputText}
          autoCapitalize="none"
          secureTextEntry
          placeholder=""
          placeholderTextColor="white"
          value={password}

          onChangeText={text => setState({ password: text })} /> */}
  <Text style={{ fontWeight: 'bold', color: "white", marginTop: 7, marginBottom: 4 }}>username</Text>
<TextInput
style={styles.inputText}
autoCapitalize="none"
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

<Text style={{ fontWeight: 'bold', color: "white", marginTop: 7, marginBottom: 4 }}>password </Text>
      <TextInput
      style={styles.inputText}
      autoCapitalize="none"
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      {/* <Button
        title="Sign In"
        onPress={handleSignIn}
      /> */}


      </View>
      <View style={{
        //backgroundColor: 'black',
        width: '90%', alignItems: 'flex-end',
        marginTop: 5
      }}>
        <TouchableOpacity
          onPress={onPressForgotPassword}>

          <Text style={styles.forgotAndSignUpText}>Forgot Password?</Text>

        </TouchableOpacity>
      </View>

      <View style={{ width: '90%', marginLeft: 8, marginTop: 75, marginBottom: 20, flexDirection: 'row', }}>
        <CheckBox
          //  value={isSelected}
          //  onValueChange={setSelection}
          style={{
            alignSelf: 'center'



          }}
        /><Text style={{ color: 'white', margin: 5, fontWeight: 'bold' }} >Remember me</Text>
      </View>
      {/* <TouchableOpacity
        onPress={handleSignIn}
        style={styles.loginBtn}>
        <Text style={styles.loginText}>Log In to Word Voyage </Text>
      </TouchableOpacity> */}
{loading ? (
       <TouchableOpacity
       onPress={handleSignIn}
       style={styles.loginBtn}>
       <Text style={styles.loginText}>Loading ...</Text>
     </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={handleSignIn}
          style={styles.loginBtn}>
          <Text style={styles.loginText}>Log In to Word Voyage</Text>
        </TouchableOpacity>
      )}
      <View
        style={{ backgroundColor: 'transparent', width: '100%', height: 300, position: 'absolute', top: 360, zIndex: -1 }}>
        <ImageBackground
          resizeMode="contain"
          //resizeMode="contain"
          style={{
            height: 500,
            width: 400,
            opacity: 0.3

          }}

          source={require("../images/Vector@2x.ios.png")}
        >
        </ImageBackground>
      </View>
    </View>

  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',

    backgroundColor: '#34566A',
    alignItems: 'center',
    justifyContent: 'center',
    //borderColor : '#fff' 


  },
  title: {
    fontWeight: "bold",
    fontSize: 50,
    color: "white",
    marginBottom: 40,
    top: 0

  },

  inputText: {
    // display:'flex',

    height: 45,
    width: '100%',
    color: "white",
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 6,
    //textAlign: 'left'

  },
  forgotAndSignUpText: {
    color: "white",
    fontSize: 15,


  },
  loginBtn: {


    width: "90%",
    backgroundColor: "#FFCD00",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {

    fontWeight: 'bold',
  },
});
export default Login;
