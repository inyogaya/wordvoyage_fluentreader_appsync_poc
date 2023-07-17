import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Text, Button, View, Image, TouchableOpacity, ImageBackground, TouchableWithoutFeedback,setState } from 'react-native';
import { useEffect, useState } from 'react';
//import Voice from '@react-native-voice/voice';

//import { TouchableOpacity } from 'react-native';



export default function ForgotPassword3() {




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
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>New password</Text>
            </View>

            <View style={{ width: '90%', alignItems: 'flex-start', marginTop: 60, }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Reset your Password</Text>


            </View>



            <View style={{ width: '90%', alignItems: 'flex-start', marginTop: 5 }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 10 }}>{`Your new password should be different from the
previous used password`}</Text>


            </View>

            <View style={{ alignContent: 'flex-start', width: '90%', marginTop: 10 }}>

                <Text style={{ fontWeight: 'bold', color: "white", marginTop: 7, marginBottom: 4 }}>code</Text>


                <TextInput
                    style={styles.inputText}

                    onChangeText={text => setState({ email: text })} />

                <Text style={{ fontWeight: 'bold', color: "white", marginTop: 12, marginBottom: 4 }}>New Password</Text>


                <TextInput
                    style={styles.inputText}

                    onChangeText={text => setState({ email: text })} />
            </View>


            
                <TouchableOpacity
                    // onPress={onPressLogin}
                    style={styles.loginBtn}>
                    <Text style={styles.loginText}>Reset Password </Text>
                </TouchableOpacity>

            





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
        marginTop: 190,
        //marginBottom: 160,
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
