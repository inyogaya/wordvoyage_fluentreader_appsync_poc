import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Text, Button, View, Image, TouchableOpacity, ImageBackground, TouchableWithoutFeedback, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
//import Voice from '@react-native-voice/voice';

//import { TouchableOpacity } from 'react-native';



export default function ForgotPassword({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [codeMessage, setCodeMessage] = useState('');



  const handleForgotPassword = async () => {
    if(loading)
    {
        return; // if loading stop the execution of the function
    }
    setLoading(true);

    try {
        console.log(username);
        // Alert.alert(username)
        
      const user = await Auth.forgotPassword(username);
      console.log(' code sent to your email');
      Alert.alert('Confirmation code sent to your email')
      navigation.navigate('f2')

      // console.log(user)
    } catch (error) {
        console.log(username);
        Alert.alert('Oops', error.message);
        if(username=='')
        {
          setCodeMessage(error.message)
        }
        else{
          setCodeMessage('This username does not exist in our database!')
        }
        
      console.log('error signing in', error);
    }

    setLoading(false);

  
  };

  return (

    <View style={styles.container} >

      <View style={{ width: '100%', marginTop: 70, marginLeft: 25 }}>

        <TouchableOpacity>
          <Image
            //style={{  marginTop: 190, width: 320}}
            //source={require("./images/record/Group 4.png")}
            //source={require("./images/Logo(2).png")}
            source={require("../images/record/Group.png")}>

          </Image>
        </TouchableOpacity>

      </View>


      <View style={{ marginTop: 20 }}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Forgot Password?</Text>
      </View>

      <View style={{ width: '90%', alignItems: 'flex-start', marginTop: 60, }}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Reset your Password</Text>


      </View>



      <View style={{ width: '90%', alignItems: 'flex-start', marginTop: 5 }}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 10 }}>{`Enter the email associated with your account and
we'll send an Email with instructions to reset your
password `}</Text>


      </View>

      <View style={{ alignContent: 'flex-start', width: '90%', marginTop:10 }}>


      <TextInput
style={styles.inputText}
autoCapitalize="none"
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

{codeMessage ? <Text style={{ color: 'red' }}>{codeMessage}</Text> : null}

        {/* <TextInput
          style={styles.inputText}

          onChangeText={text => setState({ email: text })} /> */}
      </View>
      
      <View style={{marginTop:7}}>
        <TouchableOpacity onPress={()=> navigation.navigate('login')}>
        <Text style={{color:'white'}}>Back to Sign In</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
       onPress={handleForgotPassword}
        style={styles.loginBtn}>
        <Text style={styles.loginText}>Send Instructions </Text>
      </TouchableOpacity>

      <View style={{ marginTop:100}}>
        <TouchableOpacity>
        <Text style={{color:'white'}}>Do you have an account?</Text>
        </TouchableOpacity>
      </View>

      
        <TouchableOpacity style={styles.signupBtn}>

        <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
        
        

   
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
    //flex: 1,
    display: 'flex',
    // flexDirection:"row",
    backgroundColor: '#34566A',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    //justifyContent: 'space-between',
    //bottom:30,

  },
  loginText: {

    fontWeight:'bold',

  },
  title: {
    //flex: 1,
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    //marginBottom: 90,
    //top:40
    //marginTop:80

  },
  loginBtn: {
    

    width: "90%",
    backgroundColor: "#FFCD00",
     borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 160,
   // borderColor:'red'
  },
  signupBtn: {
    

    width: "90%",
    //backgroundColor: "black",
     borderRadius: 5,
    // borderColor:'white',
    height: 50,
  //alignContent:'center',
  alignItems:'center',
  justifyContent:'center',
    marginTop: 10,
    //marginBottom: 10,
    borderColor: 'white',
    borderWidth: 2,

  },
  signupText:{
 color:'white',
 fontWeight:'bold'
   
    //borderRadius: 6,
   
   
    
    //textAlign: 'left'
  },

  //   inputText: {
  //     height: 50,
  //     //color: "white"
  //   },
  //   forgotAndSignUpText: {
  //     color: "white",
  //     fontSize: 11
  //   },
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
  yes_no_Btn: {
    //  display:flex,
    width: "25%",
    backgroundColor: "#FFCD00",
    // borderRadius: 19,
    height: 30,
    // alignItems: "center",
    //justifyContent: "center",
    //marginTop: 40,
    //marginBottom: '70%'
  },
});
// export default App;
