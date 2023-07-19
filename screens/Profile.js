import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    TouchableOpacity, Image, ImageBackground, Switch
} from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import { CheckBox } from 'react-native-rapi-ui';
// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
const Profile = ({ navigation }) => {
    const onPressLogin = () => {
        // Do something about login operation
    };
    const onPressForgotPassword = () => {
        // Do something about forgot password operation
    };
    const onPressSignUp = () => {
        // Do something about signup operation
    };
    const [state, setState] = useState({
        email: '',
        password: '',

        //isSelected:'',
    })
    return (
        <View style={styles.container}>
            <View
                style={{
                    width: '100%',
                    flexDirection: 'column',
                    display: 'flex',
                    // flex:1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '29%',
                }}>
                <Image
                    style={{
                        marginTop: '2%',
                        marginBottom: '8%',
                        width: '80%',
                        height: '24.5%',resizeMode: 'contain'
                    }}
                    source={require('../images/Logo.png')}
                />
            </View>

            <Text style={{ color: 'white', fontWeight: 'bold' }}> `username`</Text>
            <View style={{ alignContent: 'flex-start', width: '90%', height: '48%' }}>
                <Text
                    style={{ fontWeight: '', color: 'white', marginTop: '2%', marginBottom: '1%', marginLeft: '2%' }}>
                    First name
                </Text>

                <TextInput
                    style={styles.inputText}
                    onChangeText={(text) => setState({ email: text })}
                    value="Whit"
                />

                <Text
                    style={{ fontWeight: '', color: 'white', marginTop: '2%', marginBottom: '1%', marginLeft: '2%' }}>
                    Last name
                </Text>

                <TextInput
                    style={styles.inputText}
                    onChangeText={(text) => setState({ email: text })}
                    value="Symmes"
                />

                <Text
                    style={{
                        backgroundColor: '',
                        color: 'white',
                        paddingTop: '8%',
                        paddingLeft: '30%',
                        paddingBottom: '2%',
                        fontWeight: 'bold',
                    }}>
                    Change Password
                </Text>

                <Text
                    style={{ fontWeight: '', color: 'white', marginTop: '2%', marginBottom: '1%', marginLeft: '2%' }}>
                    Current Password
                </Text>

                <TextInput
                    style={styles.inputText}
                    secureTextEntry
                    placeholder=""
                    placeholderTextColor="white"
                    onChangeText={(text) => setState({ password: text })}
                    value="123456789"
                />

                <Text
                    style={{ fontWeight: '', color: 'white', marginTop: '2%', marginBottom: '1%', marginLeft: '2%' }}>
                    New Password
                </Text>

                <TextInput
                    style={styles.inputText}
                    secureTextEntry
                    placeholder=""
                    placeholderTextColor="white"
                    onChangeText={(text) => setState({ password: text })}
                    value="123456789"
                />

                <Text
                    style={{ fontWeight: '', color: 'white', marginTop: '2%', marginBottom: '1%', marginLeft: '2%' }}>
                    Confirm New Password
                </Text>

                <TextInput
                    style={styles.inputText}
                    secureTextEntry
                    placeholder=""
                    placeholderTextColor="white"
                    onChangeText={(text) => setState({ password: text })}
                    value="123456789"
                />
            </View>

            <TouchableOpacity onPress={onPressLogin} style={styles.loginBtn}>
                <Text style={styles.loginText}>Save Changes </Text>
            </TouchableOpacity>

            <View style={{ width: '100%', marginTop: 15, }}>
        <Image
          style={{ width: '100%' }}
          source={require("../images/record/line.png")}></Image>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', width: wp('90%'),  height:hp('5%'), marginTop:0,  }}>

        <View style={{ width: wp('30%') }}>
          <TouchableOpacity onPress={() => navigation.navigate("bookshelves")}>
            <Image

              source={require("../images/record/bookshelf.png")}></Image>
          </TouchableOpacity>
        </View>
        <View style={{ width: wp('30%'), alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate("Utterances")}>
            <Image
              style={{}}
              source={require("../images/record/book-open.png")}></Image>
          </TouchableOpacity>
        </View>
        <View style={{ width: wp('30%'), alignItems: 'flex-end' }}>
          {/* <TouchableOpacity onPress={() => navigation.navigate("profile")}> */}
          <TouchableOpacity onPress={() => navigation.navigate("profile")}>
            <Image
              style={{}}
              source={require("../images/record/Profiley.png")}></Image>
          </TouchableOpacity>
        </View>

      </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#34566A',
        alignItems: 'center',
        // height: hp('100%'),
        // width: wp('100%'),
    },
    inputText: {
        // height: '6%',
        height: hp('3%'),
        color: 'white',
        backgroundColor: 'transparent',
        textAlign: 'left',
        paddingLeft: '2%',
        paddingRight: '2%',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
    },
    loginBtn: {
        // width: '90%',
        width:wp('90%'),
        borderRadius: 5,
        height: '8%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5%',
        backgroundColor: '#FFCD00',
    },
    loginText: {
        color: 'black',
        fontWeight: 'bold',
    },
});

export default Profile;