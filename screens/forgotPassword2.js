import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, setState, Alert } from 'react-native';

import { Auth } from 'aws-amplify';

export default function ForgotPassword2({ navigation }) {
  const [username, setUsername] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetCodeSent, setResetCodeSent] = useState(false);
  const [resetCodeConfirmed, setResetCodeConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [codeMessage, setCodeMessage] = useState('');
  const handleSendResetCode = async () => {
    try {
      await Auth.forgotPassword(username);
      setResetCodeSent(true);
      console.log(' code sent to your email');
      Alert.alert('Confirmation code sent to your email')
    } catch (error) {
      setErrorMessage(error.message);
      console.log(username);
      Alert.alert('Oops', error.message);
      if (username == '') {
        setCodeMessage(error.message)
      }
      else {
        setCodeMessage('This username does not exist in our database!')
      }

    }
  };

  const handleConfirmResetCode = async () => {
    // try {
    //   await Auth.forgotPasswordSubmit(username, resetCode, newPassword);
    //   setResetCodeConfirmed(true);

    //   Alert.alert('Your password was successfully changed!');
    //   setCodeMessage('Your password was successfully changed!')
    //   navigation.navigate('login')

    // } catch (error) {
    //   setErrorMessage(error.message);
    // }

    try {

      await Auth.forgotPasswordSubmit(
        username,
        resetCode,
        "1111"
      );
    } catch (error) {
      console.log(error.message)
      if (
        error.message ===
        "Invalid verification code provided, please try again."
      ) {
        // Ask valid code again
        Alert.alert('please provide the right code')
      } else {
        setResetCodeConfirmed(true);
        navigation.navigate('f3', { paramCode: resetCode, paramUser: username })
        // If the error message is not Invalid verification code error
        // then move to the next step: get a new password from the user
      }
    }

  };

  if (resetCodeSent && resetCodeConfirmed) {
    return (
      <View>
        <Text>Password reset successful!</Text>
      </View>
    );
  } else if (resetCodeSent) {
    return (
      // <View style={{marginTop:300}}>
      //   <TextInput
      //     placeholder="Reset code"
      //     value={resetCode}
      //     onChangeText={setResetCode}
      //   />
      //   <TextInput
      //     placeholder="New password"
      //     secureTextEntry={true}
      //     value={newPassword}
      //     onChangeText={setNewPassword}
      //   />
      //   <Button
      //     title="Confirm reset code"
      //     onPress={handleConfirmResetCode}
      //   />
      //   {errorMessage ? (
      //     <Text style={{ color: 'red' }}>{errorMessage}</Text>
      //   ) : null}
      // </View>

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
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>verification</Text>
        </View>

        <View style={{ width: '90%', alignItems: 'flex-start', marginTop: 60, }}>
          {/* <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Enter the verification code</Text> */}


        </View>


{/* 
        <View style={{ width: '90%', alignItems: 'flex-start', marginTop: 5 }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 10 }}>{`Your new password should be different from the
previous used password`}</Text>


        </View> */}

        <View style={{ alignContent: 'flex-start', width: '90%', marginTop: 10 }}>

          <Text style={{ fontWeight: 'bold', color: "white", marginTop: 7, marginBottom: 9 }}>Enter the verification code</Text>


          <TextInput
            style={styles.inputText}
            autoCapitalize="none"
            placeholder="Code"
            secureTextEntry={true}
            value={resetCode}
            onChangeText={setResetCode}
          />

<Text style={{ fontWeight: '', color: "white", marginTop: 1, marginBottom: 9, marginLeft:30 }}>
  If you don't receive a code, 
  <TouchableOpacity style={{  paddingLeft: 5, paddingRight: 5,}}>
    <Text style={{ color: '#FFCD00' }}>Resend</Text>
  </TouchableOpacity>
</Text>

          {/* <Text style={{ fontWeight: 'bold', color: "white", marginTop: 12, marginBottom: 4 }}>New Password</Text>


          <TextInput
      style={styles.inputText}
      autoCapitalize="none"
        placeholder="Password"
        secureTextEntry={true}
        value={newPassword}
        onChangeText={setNewPassword}
      /> */}
        </View>
        {errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}


        <TouchableOpacity
          onPress={handleConfirmResetCode}
          style={styles.loginBtn}>
          <Text style={styles.loginText}> Send </Text>
        </TouchableOpacity>

        {codeMessage ? <Text style={{ color: 'green' }}>{codeMessage}</Text> : null}

        <View style={{ marginTop: 100 }}>
          <TouchableOpacity>
            <Text style={{ color: 'white' }}>Do you have an account?</Text>
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
  } else {
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

        <View style={{ alignContent: 'flex-start', width: '90%', marginTop: 10 }}>


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

        <View style={{ marginTop: 7 }}>
          <TouchableOpacity onPress={() => navigation.navigate('login')}>
            <Text style={{ color: 'white' }}>Back to Sign In</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleSendResetCode}
          style={styles.loginBtn}>
          <Text style={styles.loginText}>Send Instructions </Text>
        </TouchableOpacity>

        <View style={{ marginTop: 100 }}>
          <TouchableOpacity>
            <Text style={{ color: 'white' }}>Do you have an account?</Text>
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

    fontWeight: 'bold',

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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    //marginBottom: 10,
    borderColor: 'white',
    borderWidth: 2,

  },
  signupText: {
    color: 'white',
    fontWeight: 'bold'

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

// export default ForgotPassword2;