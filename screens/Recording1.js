import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, TextInput, Text, Button, View, Image, TouchableOpacity, ImageBackground, TouchableWithoutFeedback, NativeModules, Alert, SafeAreaView, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ProgressBar } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
// import {ProgressView} from "@react-native-community/progress-view";


import * as FileSystem from 'expo-file-system';

// import Voice from '@react-native-voice/voice';
import UtteranceBox from '../components/UtteranceBox';
import BookProgress from '../components/BookProgress';
import BlockCompare from '../components/BlockCompare';
import LastReadBlock from '../components/LastReadBlock';
// import BookShelves from './BookShelves';
// import HomeScreen from './HomeScreen';

// BookShelves

export default function Recording1({ navigation }) {

  const { height, width } = Dimensions.get('window');

  const [state, setState] = useState({
    email: '',
    password: '',
    //isSelected:'',
  })
  const [utterances, setUtterances] = useState([]);

  const [fileDeletionFinished, setFileDeletionFinished] = useState(false);

  let [started, setStarted] = useState(false);
  let [results, setResults] = useState([]);
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

  const handleLastRead = () => {
    setLastRead(!lastRead);


    // setShowRecord(true)
  };

  const clear = () => {
    setResults([]);
  };

  const checkAndDeleteFiles = async () => {
    setShowBlockCompare(true)
    const dataFileExists = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'data.txt');
    const utterancesFileExists = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'utterances.json');
    const bookSentencesFileExists = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'book_sentences.json');
    const bookBlocks = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'book_blocks.json');

    if (bookBlocks.exists) {
      // Alert.alert('File Found', 'The book_blocks.json file was found and deleted.');
      console.log('book_blocks.json deleted')
      await FileSystem.deleteAsync(FileSystem.documentDirectory + 'book_blocks.json');
    } else {
      // Alert.alert('File Not Found', 'The book_blocks.json file was not found.');
    }

    if (dataFileExists.exists) {
      // Alert.alert('File Found', 'The data.txt file was found and deleted.');
      console.log('data.txt deleted')
      await FileSystem.deleteAsync(FileSystem.documentDirectory + 'data.txt');
    } else {
      // Alert.alert('File Not Found', 'The data.txt file was not found.');
    }

    if (utterancesFileExists.exists) {
      // Alert.alert('File Found', 'The utterances.json file was found and deleted.');
      console.log('utterances.json deleted')
      await FileSystem.deleteAsync(FileSystem.documentDirectory + 'utterances.json');
    } else {
      // Alert.alert('File Not Found', 'The utterances.json file was not found.');
    }

    if (bookSentencesFileExists.exists) {
      // Alert.alert('File Found', 'The book_sentences.json file was found and deleted.');
      console.log('book_sentences.json deleted')
      await FileSystem.deleteAsync(FileSystem.documentDirectory + 'book_sentences.json');
    } else {
      // Alert.alert('File Not Found !', 'The book_sentences.json file was not found.');

    }

    if (!dataFileExists.exists && !utterancesFileExists.exists && !bookSentencesFileExists.exists) {
      console.log('No files to delete.');

    }
    setFileDeletionFinished(true);
  };

  // checkAndDeleteFiles();


 



  //

  // React.useEffect(() => {
  //   // Read book blocks data from file system
  //   FileSystem.readAsStringAsync(
  //     `${FileSystem.documentDirectory}book_blocks.json`,
  //     { encoding: FileSystem.EncodingType.UTF8 }
  //   )
  //     .then((json) => {
  //       if (json) {
  //         const blocks = JSON.parse(json);
  //         setBookBlocks(blocks);
  //       }
  //     })
  //     .catch((error) => console.error(error));

  //   // Read book text data from file system
  //   FileSystem.readAsStringAsync(
  //     `${FileSystem.documentDirectory}data.txt`,
  //     { encoding: FileSystem.EncodingType.UTF8 }
  //   )
  //     .then((text) => {
  //       if (text) {
  //         setBookText(text);
  //       }
  //     })
  //     .catch((error) => console.error(error));
  // }, []);

  // React.useEffect(() => {
  //   setProgressPercent(calculateProgressPercent(bookText, bookBlocks));
  // }, [bookText, bookBlocks]);

  useEffect(() => {
    calculateProgressPercent();
    console.log('percentage updated')
  }, [numbers]);

  // useEffect(() => {
  //    calculateProgressPercent();
  //   setProgressPercent(calculateProgressPercent());
  //   console.log('outside');
  // }, []);
  //
  const [showExternalComponent, setShowExternalComponent] = useState(false);
  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, []);

  //
  useEffect(() => {
    async function fetchContentAndSaveToFile() {
      try {
        // Fetch data from API
        const response = await fetch('https://api-beta.wordvoyage.com/static-book');
        const data = await response.json();

        // Extract content from output array
        // const content = data.output.content;
        // const img=data.cover;

        // console.log(data.cover)
        // setCover('hi')
        // content = content.slice(0, -4);
        // console.log(content)
        console.log(data.title.slice(0, -4))
        console.log(data.author)
        setCover(data.cover)
        setAuthor(data.author);
        setTitle(data.title.slice(0, -4))
        let content = `i am going to the market`

        // console.log(content)
        // Save content to file

        // const fileUri = FileSystem.documentDirectory + 'data.txt';
        // await FileSystem.writeAsStringAsync(fileUri, content);
        // console.log('Content saved to file:', fileUri);
      } catch (error) {
        console.error('Error retrieving the books title and author', error);
      }
    }
    fetchContentAndSaveToFile();
  }, []);

  //


  const handlePress = async () => {
    setShowBlockCompare(false);
    setNumbers(numbers+1)

    await stopSpeechToText();
    setResults([]);
    // await loadUtterances();
    // await processUtterances();
    await readBookBlocks()
    setBookBlocks([...utterances])
    updateState({});


    await calculateProgressPercent();
    // alert(percent)
    // setProgressPercent(progressPercent);
  };

  const handleReset = async () => {
    // setShowBlockCompare(false);

    setProgressPercent(0) // we reinitialize the progress percent that is been displayed to 0 after the reset button has been pressed
    await checkAndDeleteFiles()
    setNumbers(numbers+1)
    // alert(numbers)
    // setFileDeletionFinished(true)
    // if (fileDeletionFinished) {
    try {
      // Fetch data from API
      const response = await fetch('https://api-beta.wordvoyage.com/static-book');
      const data = await response.json();
      const content = data.output.content;
      // Extract content from output array

      // console.log(data.title)
      // console.log(data.author)
      // let content = `i am going to the market`
      // content = content.slice(0, -4);
      // console.log(content)
      // Save content to file
      const fileUri = FileSystem.documentDirectory + 'data.txt';
      await FileSystem.writeAsStringAsync(fileUri, content);
      console.log('Content saved to file:', fileUri);

      setSaved(true)
      Alert.alert('Reading Session Reset Complete');
    } catch (error) {
      console.error('Error saving content to file:', error);
    }
    // }
    // if(fileDeletionFinished)
    // {
    //   await fetchContentAndSaveToFile()
    //   console.log('saving')
    // }


    // await stopSpeechToText();
    // await loadUtterances();
    // await processUtterances();

    // navigation.navigate('cleanStorage')
    await readBookBlocks()
    setBookBlocks([...utterances])
    updateState({});
  


    await calculateProgressPercent();
   
    // await calculateProgressPercent();
  };

  const startSpeechToText = async () => {

    //
    // if (Platform.OS === 'android') {
    //   const { SpeechRecognizer } = NativeModules;
    //   SpeechRecognizer.setParameters({
    //     'android.speech.extra.DICTATION_MODE': true,
    //     'android.speech.extra.PARTIAL_RESULTS': true,
    //     'android.speech.extras.SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS': 6000,
    //     'android.speech.extras.SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS':4000,
    //     'android.speech.extras.SPEECH_INPUT_MINIMUM_LENGTH_MILLIS':10000
    //   });
    // }


    //
    setResults([]); // this fixes the issue of the results picking and saving the previous spoken speech when nothing is said
    await Voice.start("en-US");
    setStarted(true);
  };



  // const stopSpeechToText = async () => {
  //   await Voice.stop();
  //   setStarted(false);

  //   saveSpeechToJSON();
  //   calculateProgressPercent();

  // };

  const stopSpeechToText = async () => {
    await Voice.stop();
    // await Voice.start("en-US");
    setStarted(false);
    setResults([]); // added and to be deleted
    await saveSpeechToJSON();
    //   await compareBlocks();
    //  await calculateProgressPercent();
    // calculateProgressPercent();

    setShowBlockCompare(true);
    // return  <BlockCompare/>
    //  await readBookBlocks()

  };

  // const onSpeechResults = (result) => {
  //   // setResults(result.value);
  //   setResults(result.value.slice(0, 1));
  // };

  //

  const onSpeechResults = (result) => {
    console.log('result on speech results')
    console.log(result)

    if (result && result.value && result.value.length > 0) { // check if recognized speech is non-empty
      setResults(result.value.slice(0, 1));
    }
  };
  //

  const onSpeechError = (error) => {
    console.log(error);
  };
  //

  const saveSpeechToJSON = async () => {


    const utterances = results.join(' ');
    const num_of_words = utterances.split(' ').length; // calculate the number of words
    console.log(utterances);
    const path = FileSystem.documentDirectory + 'utterances.json';
    try {
      const file = await FileSystem.readAsStringAsync(path);
      const data = JSON.parse(file);
      data.utterances.push({ utterance: utterances, num_of_words: num_of_words }); // add num_of_words to the object
      await FileSystem.writeAsStringAsync(path, JSON.stringify(data));
    } catch (error) {
      const data = { utterances: [{ utterance: utterances, num_of_words: num_of_words }] }; // add num_of_words to the object
      await FileSystem.writeAsStringAsync(path, JSON.stringify(data));
    }
    // setResults('')
  };


  ///

  const loadUtterances = async () => {
    try {
      const json = await FileSystem.readAsStringAsync(`${FileSystem.documentDirectory}utterances.json`, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      if (json) {
        setUtterances(JSON.parse(json).utterances);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function processUtterances() {
    console.log('processing')
    /// load utterances:

    try {
      const json = await FileSystem.readAsStringAsync(`${FileSystem.documentDirectory}utterances.json`, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      if (json) {
        setUtterances(JSON.parse(json).utterances);
      }
    } catch (error) {
      console.error(error);
    }
    ////

    if (utterances.length > 0) {
      try {
        const data = await FileSystem.readAsStringAsync(
          `${FileSystem.documentDirectory}data.txt`
        );
        const words = data.split(" ");
        const totalWords = words.length;

        const blocks = [];
        let startIndex = 0;
        for (const utterance of utterances) {
          console.log(utterances)
          const numWords = utterance.num_of_words;
          const remainingWords = totalWords - startIndex;
          let blockEndIndex = startIndex + Math.min(numWords, remainingWords);
          const blockWords = words.slice(startIndex, blockEndIndex);
          const blockText = blockWords.join(" ");

          blocks.push({
            block: blockText,
            num_of_words: numWords,
            read: 0,
            similarityScore: 0,
          });

          startIndex = blockEndIndex;

          if (startIndex >= totalWords) {
            alert("no blocks will be created anymore as all the words have been extracted from the book");
            break;
          }
        }

        // await FileSystem.writeAsStringAsync(
        //   `${FileSystem.documentDirectory}book_blocks.json`,
        //   JSON.stringify(blocks)
        // );
        try {
          console.log(JSON.stringify(blocks));
          await FileSystem.writeAsStringAsync(
            `${FileSystem.documentDirectory}book_blocks.json`,
            JSON.stringify(blocks)
          );
          console.log("File saved successfully blockcompare!");
        } catch (error) {
          console.log("Error saving file:", error);
        }

        // the following code is to compare blocks and utterances
        for (let i = 0; i < blocks.length && i < utterances.length; i++) {
          const block = blocks[i];
          const utterance = utterances[i];
          const utteranceWords = utterance.utterance.split(" ");
          let numMatches = 0;
          for (const word of utteranceWords) {
            if (block.block.toLowerCase().includes(word.toLowerCase())) {
              numMatches++;
            }
          }
          const similarityScore = numMatches / utterance.num_of_words;
          block.similarityScore = similarityScore;
          if (similarityScore > 0.5) {
            block.read = 1;
          }
        }

        await FileSystem.writeAsStringAsync(
          `${FileSystem.documentDirectory}book_blocks.json`,
          JSON.stringify(blocks)
        );

        // setBookBlockData(blocks);

        // setBlocksFileSaved(true); 

      } catch (error) {
        console.log(error);
      }
    }
  }





  ///


  const calculateProgressPercent = async () => {
    try {
      // Read book blocks data from file system
      const blocksJson = await FileSystem.readAsStringAsync(
        `${FileSystem.documentDirectory}book_blocks.json`,
        { encoding: FileSystem.EncodingType.UTF8 }
      );
      // console.log('inside calculate')
      const blocks = JSON.parse(blocksJson);
      // setBookBlocks(blocks);

      // Read book text data from file system
      const text = await FileSystem.readAsStringAsync(
        `${FileSystem.documentDirectory}data.txt`,
        { encoding: FileSystem.EncodingType.UTF8 }
      );
      // setBookText(text);

      // Calculate the total number of words in the book text
      const totalWords = text.split(' ').length;

      // Calculate the total number of words in read blocks
      const readWords = blocks.reduce(
        (acc, block) => (block.read === 1 ? acc + block.num_of_words : acc),
        0
      );

      // Calculate the progress percentage
      const percent = Math.round((readWords / totalWords) * 100);


      // console.log('in percentage function')
      // console.log(percent);
      // console.log('in percentage function')
      setProgressPercent(percent);
      updateState({});

      console.log('inside calculate progress ')
      return percent;
      // setProgressPercent(percent);
    } catch (error) {
      updateState({});
      console.log('inside calculate progress error')
      console.log(error)


      // console.error(error);
    }
  };






  const readBookBlocks = async () => {
    await FileSystem.readAsStringAsync(`${FileSystem.documentDirectory}book_blocks.json`, {
      encoding: FileSystem.EncodingType.UTF8,
    })
      .then(json => {
        if (json) {
          const blocks = JSON.parse(json);
          const reversedBlocks = blocks.slice().reverse(); // reverse the blocks array to find the last block first
          const lastMatchedBlock = reversedBlocks.find(block => block.read === 1);
          if (lastMatchedBlock) {
            setLastBlock(lastMatchedBlock);

          }
        }
      })
      .catch(error => { console.log('inside last match readblocks'), setLastBlock(null); });
  };

  useEffect(() => {
    readBookBlocks();
  }, [lastRead]);
  //
  // display last read block



  //recording screen variable

  let record = (
    <View style={{ height: Platform.OS === 'ios' ? '42.29%' :  hp('31.29%'),marginTop:'0%', alignContent: 'center', alignItems: 'center', paddingBottom:'0%',paddingTop:'0%',  }}>
      {!started ? (
        <TouchableOpacity style={{ marginLeft: 0 }} onPress={startSpeechToText}>
          <Image style={{resizeMode: 'contain',}} source={require("../images/record/Round.png")} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handlePress}>
          <Image style={{resizeMode: 'contain'}} source={require("../images/record/gifr.gif")} />
        </TouchableOpacity>
      )}

      {/* {showBlockCompare && <BookProgress />}  */}
{/* android */}
      <View style={{ marginTop: Platform.OS === 'ios' ? '6.72%' : 5, }}>
        <Text style={{ marginLeft: '6.94%', marginBottom: '0.33%', fontWeight: 'bold', fontSize: 15, color: 'white' }}>Reading Assignment for {dateString}</Text>
        <View style={{ marginTop: '0.2%', marginBottom: '19.33%', marginLeft: '5.56%', flexDirection: 'row', alignItems: 'center', width: '90%' }}>
          <View style={{ width: '90%' }}>
            <ProgressBar  progress={progressPercent / 100} color='#FFCD00' style={{ height: '35.39%', justifyContent: 'center', }} />
          </View>
          <View style={{ width: '13%', alignItems: 'flex-end', paddingBottom: '4%' }}>
            <Text style={{ color: 'white' }}>{progressPercent}% </Text>
          </View>
        </View>
      </View>

   

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

    <View style={styles.container} >
        
      {showBlockCompare && <BlockCompare />}
      {/* normally margintop is 50 but for  android  we made it 10 */}
      <View style={{ width: wp('100%'), height: hp('3.78%'),  marginTop: Platform.OS === 'ios' ? '7%' : '5%', marginLeft: '6.94%', flexDirection: 'row', marginRight: '6.94%',marginBottom:20,  }}>

        {/* <View style={{  width: '50%', paddingLeft: 15,justifyContent:'center' }}>
          <TouchableOpacity >
            <Image

              source={require("../images/record/Group.png")}>

            </Image>
          </TouchableOpacity>

        </View> */}
        {/* <Image style={{marginLeft: 20, width: 65, height:80, marginTop:0}}
          
               source={{uri: cover}}
           

             /> */}
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
          <View style={{ width: wp('50%'), alignItems: 'flex-end', paddingRight: '4.17%', justifyContent: 'center' ,  }}>
            {/* <TouchableOpacity onPress={() => navigation.navigate("lastreadblock")}> */}
            <TouchableOpacity onPress={handleLastRead}>
              <Image
                style={{ width: 50, height: 50, resizeMode: 'contain'}}

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
      <View style={styles.box}>
        <ScrollView style={styles.box1}>

        <View style={{ flexDirection: 'row' }}>



          <TouchableOpacity style={{ paddingTop: '5%' }} onPress={handleLastRead}>
            <Image source={require("../images/record/close.png")} />
          </TouchableOpacity>

          <Text style={styles.title}>You left off here:</Text>


        </View>
        {lastBlock ? (
          <View>
            <Text style={styles.blockNumber}> {lastBlock.block}.</Text>

          </View>
        ) : (
          <Text>No blocks matched</Text>
        )}
        </ScrollView>
      </View>
      }




      {/* to be hidden when last match pressed */}

      {/*  the margintop here is normally 20 but for  android  should be 0 */}
      <View style={{  width: wp('90%'), alignItems: 'center', marginBottom: 1, marginTop: Platform.OS === 'ios' ? '2%' : 90,  height:Platform.OS === 'ios' ? hp('30%') : hp('25%'), justifyContent:'center', }}>

        <Image
          style={{ width: wp('80%'), height: hp('30%'),resizeMode: 'contain', flex:1}}

          source={require("../images/record/ontr.png")}>

        </Image>

      </View>
      {/* </View> */}
      {/* android */}
      <View style={{ marginTop: 6, height:Platform.OS === 'ios' ? hp('2%') : hp('2.5%'),   }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>{title}</Text>
      </View>

      <View style={{ marginTop: 5, marginBottom:'5%',  }}>
        <Text style={{ color: 'white' }}>By {author}</Text>
      </View>








      {/* normal margin top is 30 but for android phone is 0 */}
      <View style={{ width: '100%',  marginTop: Platform.OS === 'ios' ? 15 : 0, }}>
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
              source={require("../images/record/Profile.png")}></Image>
          </TouchableOpacity>
        </View>

      </View>









    </View>

  );
}
const styles = StyleSheet.create({
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

    height:  Platform.OS === 'ios' ? '42.29%' :  hp('31.29%')
  },
  box1: {

    marginTop:'15%',
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
// export default App;
