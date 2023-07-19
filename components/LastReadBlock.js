import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, Text, Button, View, Image, TouchableOpacity, ImageBackground, TouchableWithoutFeedback, ScrollView } from 'react-native';
import * as FileSystem from 'expo-file-system';
import Recording1 from '../screens/Recording1';
import UtteranceBox from '../components/UtteranceBox';
import BookProgress from '../components/BookProgress';
import BlockCompare from '../components/BlockCompare';
// import { withNavigation } from 'react-navigation';
// import LastReadBlock from '../components/LastReadBlock';


// Recording1

const LastReadBlock = ({ navigation }) => {
    const [lastBlock, setLastBlock] = useState(null);

    const [lastRead, setLastRead] = useState(false);
 
  
    const handleLastRead = () => {
      setLastRead(!lastRead);
  
    
      // setShowRecord(true)
    };

    // const navigation = useNavigation();

    function handlePress() {
      navigation.navigate("record");
    }

    useEffect(() => {
        FileSystem.readAsStringAsync(`${FileSystem.documentDirectory}book_blocks.json`, {
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
            .catch(error => console.error(error));
    }, []);

    return (

        <ScrollView style={styles.box}>
            {/* <Button title="Pop to root" onPress={() => navigation.navigate('record')} />
            <Button title="Pop" onPress={() => navigation.pop()} /> */}
            <View style={{flexDirection:'row'}}>
                
            {/* <Button color="white" title="<-" onPress={() => navigation.navigate('bookshelves')} /> */}
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

     


        // <View style={styles.container}>
        //     <View style={{ width: '100%', height: 30, marginTop: 60, marginLeft: 25, flexDirection: 'row', marginRight: 25 }}>

        //         <View style={{ width: '50%', paddingLeft: 15, justifyContent: 'center' }}>
        //             <TouchableOpacity onPress={() => navigation.navigate("cleanStorage")}>
        //                 <Image

        //                     source={require("../images/record/book-icon.png")}>

        //                 </Image>
        //             </TouchableOpacity>

        //         </View>

        //         <View style={{ width: '50%', alignItems: 'flex-end', paddingRight: 15, justifyContent: 'center' }}>
        //             <TouchableOpacity onPress={() => navigation.navigate("lastreadblock")}>
        //                 <Image
        //                     style={{ width: 50, height: 50 }}

        //                     source={require("../images/record/lastmatched.png")}>

        //                 </Image>
        //             </TouchableOpacity>

        //         </View>

        //         <View style={{ width: '100%', marginTop: 30 }}>
        //             <Image
        //                 style={{ width: '100%' }}
        //                 source={require("../images/record/line.png")}></Image>
        //         </View>

        //     </View>
        //     {/* <Text style={styles.title}>You left off there:</Text> */}
        //     {/* <ScrollView contentContainerStyle={styles.scrollViewContent}> */}
        //     <ScrollView style={styles.box}>
        //         <Text style={styles.title}>You left off there:</Text>
        //         {lastBlock ? (
        //             <View>
        //                 <Text style={styles.blockNumber}> {lastBlock.block}</Text>
        //                 {/* <Text style={styles.read}>Read: {lastBlock.read}</Text> */}
        //                 {/* <Text style={styles.similarityScore}>Similarity Score: {lastBlock.similarityScore}</Text> */}
        //             </View>
        //         ) : (
        //             <Text>No blocks matched</Text>
        //         )}
        //     </ScrollView>
        //     {/* </ScrollView>  */}

        //     <View style={{ width: '90%', alignItems: 'center', marginTop: 50 }}>

        //         <Image
        //             style={{ width: '80%' }}

        //             source={require("../images/record/onTrack.png")}>

        //         </Image>

        //     </View>

        //     <View style={{ width: '100%', marginTop: 100 }}>
        //         <Image
        //             style={{ width: '100%' }}
        //             source={require("../images/record/line.png")}></Image>
        //     </View>
        //     <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', width: '80%' }}>

        //         <View style={{ width: '33%' }}>
        //             <TouchableOpacity onPress={() => navigation.navigate("delimitSentences")}>
        //                 <Image

        //                     source={require("../images/record/bookshelf.png")}></Image>
        //             </TouchableOpacity>
        //         </View>
        //         <View style={{ width: '33%', alignItems: 'center' }}>
        //             <TouchableOpacity onPress={() => navigation.navigate("Utterances")}>
        //                 <Image
        //                     style={{}}
        //                     source={require("../images/record/book-open.png")}></Image>
        //             </TouchableOpacity>
        //         </View>
        //         <View style={{ width: '33%', alignItems: 'flex-end' }}> 
        //             <TouchableOpacity onPress={() => navigation.navigate("readSentences")}>
        //                 <Image
        //                     style={{}}
        //                     source={require("../images/record/Profile.png")}></Image>
        //             </TouchableOpacity>
        //         </View>

        //     </View>
        // </View>
    );
};

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
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 10,
        paddingLeft: '30%',
        textDecorationLine: 'underline',

    },
    box: {

        // marginTop:200,
        marginBottom:103.5,
        paddingLeft: 5,
        paddingBottom: '10%',


        backgroundColor: "#D9D9D9",
        borderRadius: 5,
        // padding: 10,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

        marginTop: 90,
        flexGrow: 1,
        maxHeight: 200
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
    closeButton: {
        backgroundColor: 'grey',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignSelf: 'flex-end',
      },
      closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },
});

export default LastReadBlock;;
