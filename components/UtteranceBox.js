import React, { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import { View, Text, StyleSheet, ScrollView, Image,TouchableOpacity } from 'react-native';

const UtteranceBox = ({navigation}) => {
  const [utterances, setUtterances] = useState([]);

  useEffect(() => {
    const loadUtterances = async () => {
      try {
        const fileUri = `${FileSystem.documentDirectory}utterances.json`;
        const fileContent = await FileSystem.readAsStringAsync(fileUri);
        console.log(fileContent);

        const parsedContent = JSON.parse(fileContent);
        setUtterances(parsedContent.utterances);
      } catch (error) {
        console.error(error);
      }
    };
    loadUtterances();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Utterances</Text>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {utterances.map((utterance, index) => (
          <View key={index} style={styles.utteranceBox}>
            <Text style={styles.utteranceText}>{utterance.utterance}</Text>
            <Text style={styles.numOfWordsText}>{utterance.num_of_words} words</Text>
          </View>
        ))}
      </ScrollView>
      <View style={{ width: '100%', marginTop: 0, marginBottom:0 }}> 
        <Image
          style={{ width: '100%' }}
          source={require("../images/record/line.png")}></Image>
      </View>

      <View style={{ marginTop: 5, marginBottom:18.5, flexDirection: 'row', alignItems: 'center', width: '80%' }}>

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
              source={require("../images/record/book-openy.png")}></Image>
          </TouchableOpacity>
        </View>
        <View style={{ width: '33%', alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => navigation.navigate("readSentences")}>
            <Image
              style={{}}
              source={require("../images/record/Profile.png")}></Image>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   paddingTop: 50,
  //   paddingHorizontal: 20,
  //   alignItems: 'center',
  //   backgroundColor: '#f7f7f7',
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollView: {
    width: '100%',
    height: 200, // Set the height of the ScrollView component
  },
  contentContainer: {
    flexGrow: 1, // Allow content to expand to fill the ScrollView component
  },
  utteranceBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  utteranceText: {
    fontSize: 18,
  },
  numOfWordsText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default UtteranceBox;