import React, { useEffect,useState } from 'react';
import { Text, View,ScrollView } from 'react-native';
// import { FileSystem } from 'expo-file-system';
import * as FileSystem from 'expo-file-system';


export default function BookSentencesRead() {

    const [content, setContent] = useState('');
  useEffect(() => {
    const getData = async () => {
        try {
          const content = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'data.txt');
          const cleanedContent = content.replace(/[\n\t ]+/g, ' ').trim();
          const sentences = cleanedContent.split('.').map((sentence, index) => {
            return {
              id: index + 1,
              sentence: sentence.trim(),
              num_of_words: sentence.trim().split(' ').length
            }
          }).filter(sentence => sentence.sentence !== '');
          console.log(sentences);
          const jsonData = JSON.stringify(sentences);
          await FileSystem.writeAsStringAsync(
            FileSystem.documentDirectory + 'book_sentences.json',
            jsonData,
            { encoding: FileSystem.EncodingType.UTF8, mode: FileSystem.MODE_TRUNCATE } // Add the MODE_TRUNCATE option
          );
        } catch (error) {
          console.error(error);
        }
      };
      

    //       await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'book_sentences.json', jsonData);
    //     //   setBookSentences(sentences);
    //     } catch (error) {
    //       console.error(error);
    //     //   setBookSentences([]);
    //     }
    //   };
      getData();
    //

    const readData = async () => {
        try{
        const fileUri = FileSystem.documentDirectory + 'book_sentences.json';
        const content = await FileSystem.readAsStringAsync(fileUri);
        setContent(content);
        }catch(error)
        {console.log(error);
        }
      };
      readData();
      //
  }, []);

  return (
    <View style={{flex:1, marginTop:80}}>
      <Text>Collecting sentences from data.txt and storing them in book_sentences.json...</Text>

   
      {/* <Text>{content}</Text> */}
      <ScrollView style={{width: '100%',
    height: 200,}}>
      <Text>{content}</Text>
    </ScrollView>
    
    </View>
  );
}
