import React, { useState, useEffect } from 'react';
// import { FileSystem } from 'expo-file-system';
import * as FileSystem from 'expo-file-system';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const UtterancesDisplay = ({ navigation }) => {
  // const [utterances, setUtterances] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    const loadUtterances = async () => {
      try {
        const fileUri = `${FileSystem.documentDirectory}utterances.json`;
        const fileUri2 = `${FileSystem.documentDirectory}book_sentences.json`;

        const fileUri4 = `${FileSystem.documentDirectory}data.txt`;
        const fileUri5 = `${FileSystem.documentDirectory}book_blocks.json`;
        // const content = await FileSystem.readAsStringAsync(fileUri2);

        const content = await FileSystem.readAsStringAsync(fileUri5);

        console.log('fileUri:', fileUri5);
        console.log('fileContent:', content);

        ////
        // await FileSystem.deleteAsync(fileUri); //deleting utterances.json
        // const contentt = await FileSystem.readAsStringAsync(fileUri);
        // console.log('fileContent:', contentt);
        // console.log('fileUri:', fileUri);
        // ///
        // await FileSystem.deleteAsync(fileUri2); // deleting book_sentences.json
        // const content2 = await FileSystem.readAsStringAsync(fileUri2);
        // console.log('fileContent:', content2);
        // console.log('fileUri:', fileUri2);
        // ///
        // await FileSystem.deleteAsync(fileUri4); // deleting data.txt
        // const conten4 = await FileSystem.readAsStringAsync(fileUri4);
        // console.log('fileContent:', content4);
        // console.log('fileUri:', fileUri4);

        // const content = await FileSystem.readAsStringAsync(fileUri);
        setContent(content);

        // const fileUri = FileSystem.documentDirectory + 'book_sentences.json';
        // const content = await FileSystem.readAsStringAsync(fileUri);
        // setUtterances(fileContent);

        // const parsedContent = JSON.parse(fileContent);
        // setUtterances(parsedContent);


      } catch (error) {
        console.error(error);
      }
    };
    loadUtterances();
  }, []);

  return (

    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Collecting book blocks...</Text>
        <Text style={styles.content}>{content}</Text>
      </ScrollView>
      <View style={{ width: '100%', marginTop: 318.5, marginBottom: 0 }}>
        <Image
          style={{ width: '100%' }}
          source={require("../images/record/line.png")}></Image>
      </View>

      <View style={{ marginTop: 5, marginBottom: 19.5, flexDirection: 'row', alignItems: 'center', width: '80%' }}>

        <View style={{ width: '33%' }}>
          <TouchableOpacity onPress={() => navigation.navigate("bookshelves")}>
            <Image

              source={require("../images/record/bookshelf.png")}></Image>
          </TouchableOpacity>
        </View>
        <View style={{ width: '33%', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate("record")}>
            <Image
              style={{}}
              source={require("../images/record/book-open.png")}></Image>
          </TouchableOpacity>
        </View>
        <View style={{ width: '33%', alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => navigation.navigate("readSentences")}>
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
  scrollViewContent: {
    flexGrow: 1,
  },
  contentContainer: {
    flexGrow: 1, // Allow content to expand to fill the ScrollView component
  },
  scrollView: {
    width: '100%',
    height: 800, // Set the height of the ScrollView component
  },
  // container: {
  //   flex: 1,
  //   paddingHorizontal: 20,
  //   backgroundColor: 'white',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
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
    marginTop: 50,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: 'white'
  },
});
export default UtterancesDisplay;
