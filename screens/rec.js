// import * as React from 'react';
import React, { useState } from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity, Image, Alert, ImageBackground, } from 'react-native';
import { Video, Audio } from 'expo-av';
import { CheckBox } from 'react-native-rapi-ui';
// import { CheckBoxBase, CheckBox } from '@react-native-community/checkbox';
import t from 'tcomb-form-native';
import { Amplify, Storage, Auth, graphqlOperation, API, } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
// import { createRecording } from '../src/graphql/mutations';
import { createRecording } from '../src/graphql/mutations';
// import {withAuthenticator, SignIn, SignUp, SignedOutMessage,Authenticator} from 'aws-amplify-react-native'
import {
    useAuthenticator,
    withAuthenticator,

    SignUp,
    Authenticator,
    useTheme,




} from '@aws-amplify/ui-react-native';
// import { AmplifyTheme } from '../AmplifyTheme';

import { ProgressBar } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
// import AmplifyTheme from 'aws-amplify-react-native/dist/AmplifyTheme';

// AmplifyTheme
import * as FileSystem from 'expo-file-system';

// import {
//   useAuthenticator,

// } from '@aws-amplify/ui-react-native';

Amplify.configure(awsconfig);
const Form = t.form.Form;
const User = t.struct({
    name: t.String,
    // price: t.Number,
    date: t.String,
    description: t.String,
});
const MyAppHeader = () => {
    const {
        tokens: { space, fontSizes },
    } = useTheme();


    return (
        <View>
            {/* <Text style={{ fontSize: fontSizes.xxxl, padding: space.xl }}>
        My Header
      </Text> */}
            <View style={{
                //backgroundColor:'blue',
                width: '100%',
                flexDirection: 'column',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

            }} >
                <Image style={{
                    marginTop: 0, marginBottom: 80, width: 250, height: 48, resizeMode: 'contain'
                }} source={require("../images/Logo.png")}></Image>
            </View>


            <View
                style={{ backgroundColor: 'transparent', width: '100%', height: 300, position: 'absolute', top: 250, zIndex: -1 }}>
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
};

function SignOutButton() {
    const { signOut } = useAuthenticator();

    return <Button title="Sign Out" onPress={signOut} />;



}



const MySignInFooter = () => {
    return (
        <View>







            <View style={{ width: '90%', marginLeft: 8, marginTop: 75, marginBottom: 20, flexDirection: 'row', }}>
                <CheckBox
                    //  value={isSelected}
                    //  onValueChange={setSelection}
                    style={{
                        alignSelf: 'center',
                        marginLeft: 30



                    }}
                />
                <Text style={{ color: 'white', margin: 5, fontWeight: 'bold' }} >Remember me</Text>
            </View>
        </View>



    )
};
// export default function App() {
function Rec({ navigation }) {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [uris, setUris] = React.useState({});
    let [started, setStarted] = React.useState(false);
    let [isLoading, setIsLoading] = React.useState(false);
    let [results, setResults] = React.useState([]);
    const [sound, setSound] = React.useState();
    const [recording, setRecording] = React.useState();

    ///
    const [utterances, setUtterances] = useState([]);

    const [fileDeletionFinished, setFileDeletionFinished] = useState(false);

    // let [started, setStarted] = useState(false);
    // let [results, setResults] = useState([]);
    const [, updateState] = useState();
    const [forceUpdateCount, setForceUpdateCount] = useState(0);
    const [saved, setSaved] = useState(false);
    //
    const [bookBlocks, setBookBlocks] = useState([]);
    const [bookText, setBookText] = useState('');
    const [progressPercent, setProgressPercent] = useState(0);
    const [showBlockCompare, setShowBlockCompare] = useState(false);
    const [showBookProgress, setShowBookProgress] = useState(false);
    const [lastBlock, setLastBlock] = useState(null);
    const [numbers, setNumbers] = useState(0);

    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [cover, setCover] = useState('')
    const today = new Date();
    const month = today.getMonth() + 1; // Add 1 because getMonth() returns 0-based index
    const day = today.getDate();
    const year = today.getFullYear();

    const dateString = `${month}/${day}/${year}`;

    const [lastRead, setLastRead] = useState(false);
    const [showRecord, setShowRecord] = useState(true);

    ////

    const [form, setForm] = useState(null);
    const [initialValues, setInitialValues] = useState({});
    const options = {
        auto: 'placeholders',
        fields: {
            description: {
                multiLine: true,
                stylesheet: {
                    ...Form.stylesheet,
                    textbox: {
                        ...Form.stylesheet.textbox,
                        normal: {
                            ...Form.stylesheet.textbox.normal,
                            height: 100,
                            textAlignVertical: 'top',
                        },
                    },
                },
            },
        },
    };
    ///// upload image ////
    const fetchImageUri = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        return blob;
    }
    const uploadFile = async (file) => {
        // const img = await fetchImageUri(file.uri);
        const img = await fetchImageUri(file);
        return Storage.put(`my-image-filename${Math.random()}.caf`, img, {
            metadata: {
                category: 'an audio',
                author: 'usernamemefire',
                description: 'A sample audio'
            },


            level: 'public',
            contentType: file.type,
            progressCallback(uploadProgress) {
                console.log('PROGRESS--', uploadProgress.loaded + '/' + uploadProgress.total);
            }
        })
            .then((res) => {
                Storage.get(res.key)
                    .then((result) => {
                        // console.log('RESULT --- ', result);
                        let awsImageUri = result.substring(0, result.indexOf('?'))
                        console.log('RESULT AFTER REMOVED URI --', awsImageUri)
                        Alert.alert('Recording uploaded successfully to the cloud');
                        setIsLoading(false)
                    })
                    .catch(e => {
                        console.log(e);
                    })
            }).catch(e => {
                console.log(e);
            })
    }
    ////end upload img ////


    async function startRecording() {
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            console.log('Starting recording..');
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            setRecording(recording);
            console.log('Recording started');
            setStarted(true);
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        console.log('Recording stopped and stored at', uri);
        setUris(uri);
        uploadFile(uri)
        setStarted(false);

    }
    const playSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
            //  require('./assets/Hello.mp3')
            { uri: uris },
            { shouldPlay: true }

        );
        sound.setVolumeAsync(1.0)// by default it is maximum 1.0. so no need to add this line
        setSound(sound);

        await sound.playAsync();
    }

    const stopSound = async () => {
        await sound.stopAsync()
    }

    React.useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    const handleSignOut = async () => {
        Auth.signOut()
            .then(() => {
                console.log('User signed out');
                navigation.navigate('login');
            })
            .catch((error) => console.log('Error signing out: ', error));
    };

    const handleSubmit = async () => {
        try {
            const value = await form.getValue();
            console.log('value: ', value);
            const user = await Auth.currentAuthenticatedUser();
            console.log(user)
            //   if (photo) {
            //     const response = await fetch(photo.uri);
            //     const blob = await response.blob();
            //     console.log('FileName: \n');
            //     await Storage.put(photo.fileName, blob, {
            //       contentType: 'image/jpeg',
            //     });
            //   }
            const response = await API.graphql(
                graphqlOperation(createRecording, {
                    input: {
                        name: value.name,
                        // price: value.price.toFixed(2),
                        date: value.date,
                        description: value.description,
                        userId: user.attributes.sub,
                        userName: user.username,
                        // image: photo.fileName,
                        image: 'tof'
                    },
                }),
            );
            console.log('Response :\n');
            console.log(response);
            //   navigation.navigate('Home');
        } catch (e) {
            console.log(e.message);
        }
    };

    let record = (
        <View style={{ height: Platform.OS === 'ios' ? '42.29%' : hp('31.29%'), marginTop: '0%', alignContent: 'center', alignItems: 'center', paddingBottom: '0%', paddingTop: '0%', }}>
         
            {!started ? (
                <TouchableOpacity style={{ marginLeft: 0 }} onPress={startRecording}>
                    <Image style={{ resizeMode: 'contain', }} source={require("../images/record/Round.png")} />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={stopRecording}>
                    <Image style={{ resizeMode: 'contain' }} source={require("../images/record/gifr.gif")} />
                </TouchableOpacity>
            )}

            {/* {showBlockCompare && <BookProgress />}  */}
            {/* android */}
            <View style={{ marginTop: Platform.OS === 'ios' ? '6.72%' : 5, }}>
                <Text style={{ marginLeft: '6.94%', marginBottom: '0.33%', fontWeight: 'bold', fontSize: 15, color: 'white' }}>Reading Assignment for {dateString}</Text>
                <View style={{ marginTop: '0.2%', marginBottom: '19.33%', marginLeft: '5.56%', flexDirection: 'row', alignItems: 'center', width: '90%' }}>
                    <View style={{ width: '90%' }}>
                        <ProgressBar progress={progressPercent / 100} color='#FFCD00' style={{ height: '35.39%', justifyContent: 'center', }} />
                    </View>
                    <View style={{ width: '13%', alignItems: 'flex-end', paddingBottom: '4%' }}>
                        <Text style={{ color: 'white' }}>{progressPercent}% </Text>
                    </View>
                </View>

                
            </View>

            <TouchableOpacity onPress={handleSignOut}>
                <Text style={{ color: 'green' }}> please sign out</Text>

            </TouchableOpacity>

            {/* 
        <ScrollView style={{
          alignContent: 'flex-start',
          width: '90%',
          maxHeight: 90, // Set a maximum height for the box
          borderWidth: 1, // Set the width of the border
          alwaysBounceVertical: true, // Add alwaysBounceVertical property to show scrollbar
        }}>
          <Text>{results}</Text>
        </ScrollView> */}
        </View>
    );




    return (




        // <View style={styles.containers}>

        //     <View style={styles.container}>



        //         {/* <Text>   <SignOutButton />;</Text> */}

        //         <TouchableOpacity onPress={handleSignOut}>
        //             <Text style={{ color: 'green' }}> please sign out</Text>

        //         </TouchableOpacity>

        //         {/*  */}

        //         <Button title="Play Sound" onPress={playSound} />
        //         <View style={{ marginTop: 10 }}>
        //             <Button title="Stop Sound" onPress={stopSound} />
        //         </View>
        //         <Text>
        //             {'\n'}

        //         </Text>
        //         {/*  */}
        //         <View style={styles1.container}>
        //             <Button
        //                 title={recording ? 'Stop Recording' : 'Start Recording'}
        //                 onPress={recording ? stopRecording : startRecording}
        //             />
        //         </View>

        //         <View style={styles.addProductView}>
        //             <Form
        //                 ref={(c) => setForm(c)}
        //                 value={initialValues}
        //                 type={User}
        //                 options={options}
        //             />
        //             <Button title="Save" onPress={handleSubmit} />

        //         </View>
        //     </View>

        // </View>

        <View style={styles3.container} >
             
             

            {showBlockCompare && <BlockCompare />}
            {/* normally margintop is 50 but for  android  we made it 10 */}
            <View style={{ width: wp('100%'), height: hp('3.78%'), marginTop: Platform.OS === 'ios' ? '7%' : '5%', marginLeft: '6.94%', flexDirection: 'row', marginRight: '6.94%', marginBottom: 20, }}>


                <View style={{ width: wp('50%'), paddingLeft: '4.17%', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => {

                        handleReset();


                    }}>

                        <Image style={{ marginLeft: 0, width: 40, height: 60, marginTop: 0, }}

                            source={{ uri: cover }}


                        />

                    </TouchableOpacity>

                </View>


                {lastBlock ? (
                    <View style={{ width: wp('50%'), alignItems: 'flex-end', paddingRight: '4.17%', justifyContent: 'center', }}>
                        {/* <TouchableOpacity onPress={() => navigation.navigate("lastreadblock")}> */}
                        <TouchableOpacity onPress>
                            <Image
                                style={{ width: 50, height: 50, resizeMode: 'contain' }}

                                source={require("../images/record/lastmatched.png")}>

                            </Image>
                        </TouchableOpacity>

                    </View>
                ) : (
                    <Text>.</Text>
                )}


            </View>






            {!lastRead && record}

            {lastRead &&
                <View style={styles3.box}>
                    <ScrollView style={styles3.box1}>

                        <View style={{ flexDirection: 'row' }}>



                            <TouchableOpacity style={{ paddingTop: '5%' }} onPress>
                                <Image source={require("../images/record/close.png")} />
                            </TouchableOpacity>

                            <Text style={styles3.title}>You left off here:</Text>


                        </View>
                        {lastBlock ? (
                            <View>
                                <Text style={styles3.blockNumber}> {lastBlock.block}.</Text>

                            </View>
                        ) : (
                            <Text>No blocks matched</Text>
                        )}
                    </ScrollView>
                </View>
            }




            {/* to be hidden when last match pressed */}

            {/*  the margintop here is normally 20 but for  android  should be 0 */}
            <View style={{ width: wp('90%'), alignItems: 'center', marginBottom: 1, marginTop: Platform.OS === 'ios' ? '2%' : 90, height: Platform.OS === 'ios' ? hp('30%') : hp('25%'), justifyContent: 'center', }}>

                <Image
                    style={{ width: wp('80%'), height: hp('30%'), resizeMode: 'contain', flex: 1 }}

                    source={require("../images/record/ontr.png")}>

                </Image>

            </View>
            {/* </View> */}
            {/* android */}
            <View style={{ marginTop: 6, height: Platform.OS === 'ios' ? hp('2%') : hp('2.5%'), }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>{title}</Text>
            </View>

            <View style={{ marginTop: 5, marginBottom: '5%', }}>
                <Text style={{ color: 'white' }}>By {author}</Text>
            </View>

            {/* <TouchableOpacity onPress={handleSignOut}>
                <Text style={{ color: 'blue', }}>  sign out</Text>

            </TouchableOpacity> */}






            {/* normal margin top is 30 but for android phone is 0 */}
            <View style={{ width: '100%', marginTop: Platform.OS === 'ios' ? 15 : 0, }}>
                <Image
                    style={{ width: '100%' }}
                    source={require("../images/record/line.png")}></Image>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', width: wp('90%'), height: hp('5%'), marginTop: 0, }}>

                <View style={{ width: wp('30%') }}>
                    <TouchableOpacity onPress={handleSignOut}>
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
                            source={require("../images/record/Profile.png")}></Image>
                    </TouchableOpacity>
                </View>

            </View>









        </View>


    );
}

export default Rec;
// export default withAuthenticator(App, {
//   signUpConfig: {
//     hiddenDefaults: ['phone_number'],
//     // hiddenDefaults: ['email'],
//     signUpFields: [{ key: 'phone_number', required: false }]
//   }
// })

const styles = StyleSheet.create({
    addProductView: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 10,
        height: 'auto',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: '#ecf0f1',
        marginTop: 50,

    },
    containers: {
        flex: 1,
        // display: 'flex',
        // flexDirection:"row",
        backgroundColor: '#34566A',

        alignItems: 'center',
        //justifyContent: 'space-between',
        //bottom:30,

    },
    video: {
        alignSelf: 'center',
        width: 350,
        height: 100,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: '#ecf0f1',
        padding: 10,
    },
});

const styles3 = StyleSheet.create({
    container: {
        flex: 1,
        // display: 'flex',
        // flexDirection:"row",
        backgroundColor: '#34566A',
        height: hp('100%'),
        width: wp('100%'),
        alignItems: 'center',
        //justifyContent: 'space-between',
        //bottom:30,

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
        //backgroundColor:'green',
        height: 70,
        width: '100%',
        color: "white",
        borderColor: 'yellow',
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

    title: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 10,
        paddingLeft: '30%',
        textDecorationLine: 'underline',

    },

    blockNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    read: {
        fontSize: 14,
        marginBottom: 5,
    },
    similarityScore: {
        fontSize: 14,
        marginBottom: 5,
    },

    title: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 10,
        paddingLeft: '30%',
        textDecorationLine: 'underline',

    },
    box: {

        // marginTop:'15%',
        paddingLeft: 5,
        paddingBottom: '10%',


        // backgroundColor: "#D9D9D9",
        borderRadius: 5,
        // padding: 10,
        width: wp('90%'),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,


        // flexGrow: 1,

        height: Platform.OS === 'ios' ? '42.29%' : hp('31.29%')
    },
    box1: {

        marginTop: '15%',
        paddingLeft: 5,
        paddingBottom: '10%',


        backgroundColor: "#D9D9D9",
        borderRadius: 10,
        // padding: 10,
        width: wp('90%'),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,



        flexGrow: 1,

        // height: hp('50.29%')
    },
    blockNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});