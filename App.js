// import * as React from 'react';
import React, {useState} from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Video, Audio } from 'expo-av';
import t from 'tcomb-form-native';
import { Amplify, Storage, Auth, graphqlOperation, API } from 'aws-amplify';
import awsconfig from './src/aws-exports';
// import { createRecording } from '../src/graphql/mutations';
import { createRecording } from './src/graphql/mutations';
// import {withAuthenticator, SignIn, SignUp, SignedOutMessage,Authenticator} from 'aws-amplify-react-native'
import {
  useAuthenticator,
  withAuthenticator,

  SignUp,
  Authenticator


} from '@aws-amplify/ui-react-native';
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

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button title="Sign Out" onPress={signOut} />;
}
// export default function App() {
function App() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [uris, setUris] = React.useState({});
  let [started, setStarted] = React.useState(false);
  let [results, setResults] = React.useState([]);
  const [sound, setSound] = React.useState();
  const [recording, setRecording] = React.useState();

  ///

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


      level: 'private',
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
            // userId: user.attributes.sub,
            // userName: user.username,
            // image: photo.fileName,
            // image:'tof'
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

  return (
    // <Authenticator.Provider>
    // <Authenticator>
    <View style={styles.containers}>
      <View style={styles.container}>

        {/* <SignedOutMessage/> */}
        <Text>   <SignOutButton />;</Text>


        {/* <SignUp/> */}

        {/* <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View> */}

        {/*  */}

        <Button title="Play Sound" onPress={playSound} />
        <View style={{ marginTop: 10 }}>
          <Button title="Stop Sound" onPress={stopSound} />
        </View>
        <Text>
          {'\n'}

        </Text>
        {/*  */}
        <View style={styles1.container}>
          <Button
            title={recording ? 'Stop Recording' : 'Start Recording'}
            onPress={recording ? stopRecording : startRecording}
          />
        </View>

        <View style={styles.addProductView}>
          <Form
            ref={(c) => setForm(c)}
            value={initialValues}
            type={User}
            options={options}
          />
          <Button title="Save" onPress={handleSubmit} />

        </View>
      </View>

    </View>

    // </Authenticator>
    // </Authenticator.Provider>
  );
}

export default withAuthenticator(App, {
  signUpConfig: {
    hiddenDefaults: ['phone_number'],
    // hiddenDefaults: ['email'],
    signUpFields: [{ key: 'phone_number', required: false }]
  }
})
// export default App

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