import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, Text, Button, View, Image, TouchableOpacity, ImageBackground, TouchableWithoutFeedback, ScrollView } from 'react-native';
import * as FileSystem from 'expo-file-system';
const BookShelves = ({ navigation }) => {
    const [lastBlock, setLastBlock] = useState(null);
  
    // useEffect(() => {
    //     FileSystem.readAsStringAsync(`${FileSystem.documentDirectory}book_blocks.json`, {
    //         encoding: FileSystem.EncodingType.UTF8,
    //     })
    //         .then(json => {
    //             if (json) {
    //                 const blocks = JSON.parse(json);
    //                 const reversedBlocks = blocks.slice().reverse(); // reverse the blocks array to find the last block first
    //                 const lastMatchedBlock = reversedBlocks.find(block => block.read === 1);
    //                 if (lastMatchedBlock) {
    //                     setLastBlock(lastMatchedBlock);
    //                 }
    //             }
    //         })
    //         .catch(error => console.error(error));
    // }, []);
  
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'column',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '15%',
         
          }}>
          <Image
            style={{ marginTop: '10%', width: '85%',resizeMode: 'contain' }}
            source={require('../images/Logo(2).png')}
          />
        </View>
  
        {/* <Text style={styles.title}>You left off there:</Text> */}
        {/* <ScrollView contentContainerStyle={styles.scrollViewContent}> */}
  
        {/* </ScrollView>  */}
  
        <View style={{ width: '100%', alignItems: 'center', marginTop: '15%' }}>
          <Image
            style={{ width: '90%', height: '75%',resizeMode: 'contain' }}
            source={require('../images/Bookshelves.png')}
          />
        </View>
  
        <View style={{ width: '100%', marginTop: '0%' }}>
          <Image style={{ width: '100%' }} source={require('../images/record/line.png')} />
        </View>
        <View
          style={{
            marginTop: '1%',
            flexDirection: 'row',
            alignItems: 'center',
            width: '80%',
            height: '4%',
            // flex:1

           
          }}>
          <View style={{ width: '33%' }}>
            <TouchableOpacity onPress={() => navigation.navigate('bookshelves')}>
              <Image source={require('../images/record/yellowbook.png')} />
            </TouchableOpacity>
          </View>
          <View style={{ width: '33%', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.navigate('rec')}>
              <Image source={require('../images/record/book-open.png')} />
            </TouchableOpacity>
          </View>
          <View style={{ width: '33%', alignItems: 'flex-end' }}>
            <TouchableOpacity onPress={() => navigation.navigate('readSentences')}>
              <Image source={require('../images/record/Profile.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      backgroundColor: '#34566A',
      height: '100%',
      width: '100%',
      alignItems: 'center',
    },
    title: {
      fontSize: 15,
      fontWeight: 'bold',
      marginBottom: '4%',
      marginTop: '2%',
      paddingLeft: '30%',
      textDecorationLine: 'underline',
    },
    box: {
      paddingLeft: '1%',
      paddingBottom: '10%',
      backgroundColor: '#D9D9D9',
      borderRadius: 5,
      width: '90%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      marginTop: '15%',
      flexGrow: 1,
      maxHeight: '40%',
    },
    blockNumber: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: '4%',
    },
    read: {
      fontSize: 14,
      marginBottom: '2%',
    },
    similarityScore: {
      fontSize: 14,
      marginBottom: '2%',
    },
  });
  
  export default BookShelves;