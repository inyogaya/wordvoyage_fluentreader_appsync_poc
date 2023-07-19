import React, { useState, useEffect } from 'react';
import { Text, View,StyleSheet,ScrollView,Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function Save() {
  const [fileContent, setFileContent] = useState('');
  const [contents, setContents] = useState('');

  // setContents
  const [filePath, setFilePath] = useState('');
  const [saved, setSaved] = useState(false);


  // useEffect(() => {
  //   const checkAndDeleteFiles = async () => {
  //     const dataFileExists = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'data.txt');
  //     const utterancesFileExists = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'utterances.json');
  //     const bookSentencesFileExists = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'book_sentences.json');
  //     const bookBlocks = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'book_blocks.json');

  //     if (bookBlocks.exists) {
  //       Alert.alert('File Found', 'The book_blocks.json file was found and deleted.');
  //       await FileSystem.deleteAsync(FileSystem.documentDirectory + 'book_blocks.json');
  //     } else {
  //       Alert.alert('File Not Found', 'The book_blocks.json file was not found.');
  //     }

  //     if (dataFileExists.exists) {
  //       Alert.alert('File Found', 'The data.txt file was found and deleted.');
  //       await FileSystem.deleteAsync(FileSystem.documentDirectory + 'data.txt');
  //     } else {
  //       Alert.alert('File Not Found', 'The data.txt file was not found.');
  //     }

  //     if (utterancesFileExists.exists) {
  //       Alert.alert('File Found', 'The utterances.json file was found and deleted.');
  //       await FileSystem.deleteAsync(FileSystem.documentDirectory + 'utterances.json');
  //     } else {
  //       Alert.alert('File Not Found', 'The utterances.json file was not found.');
  //     }

  //     if (bookSentencesFileExists.exists) {
  //       Alert.alert('File Found', 'The book_sentences.json file was found and deleted.');
  //       await FileSystem.deleteAsync(FileSystem.documentDirectory + 'book_sentences.json');
  //     } else {
  //       Alert.alert('File Not Found !', 'The book_sentences.json file was not found.');
  //     }

  //     if (!dataFileExists.exists && !utterancesFileExists.exists && !bookSentencesFileExists.exists) {
  //       console.log('No files to delete.');
  //     }
  //   };

  //   // checkAndDeleteFiles();
  //   console.log('delete done')
  // }, []);

  // useEffect(() => {
  //   // const chapterId = "chapter-1";
  //   const apiUrl = "https://api-beta.wordvoyage.com/static-book";

  //   fetch(`${apiUrl}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       // setChapterContent(data.content);
  //       console.log('content')
  //       // console.log(data.object.content);
  //       console.log(data.output[0].content);
  //     })
  //     .catch(error => console.error(error));
  // }, []);

  // useEffect(() => {

    
  //   const saveContent = async () => {
    
  //     const fileUri = FileSystem.documentDirectory + 'data.txt';
  //   setFilePath(fileUri);
  //   try {

     
  
  //     // let content = `Hey sir, i hope you are doing well today. Thanks, How are you. Good`
     
  //     content = content.replace(/[\n\t ]+/g, ' ').trim(); 

     
  //    await FileSystem.writeAsStringAsync(fileUri, content);
  //     console.log(`File saved to ${fileUri}`);
  //   } catch (error) {
  //     console.log(error);
  //   }


  //   await FileSystem.readAsStringAsync(fileUri)
  //     .then(content => {
  //       setFileContent(content);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
    
  //   };
  //   saveContent();
  //   console.log('save done')
    
  // }, []);


  useEffect(() => {
    // 
    async function fetchContentAndSaveToFile() {
      try {
        // Fetch data from API
        const response = await fetch('https://api-beta.wordvoyage.com/static-book');
        const data = await response.json();
        const content = data.output.content;
        // Extract content from output array
        
        // console.log(data.title)
        // console.log(data.author)
        // let content =`i am going to the market`
        // content = content.slice(0, -4);
        // console.log(content)
        // Save content to file
        const fileUri = FileSystem.documentDirectory + 'data.txt';
        await FileSystem.writeAsStringAsync(fileUri, content);
        console.log('Content saved to file:', fileUri);
        
        setSaved(true)
        alert('chapter saveds');
      } catch (error) {
        console.error('Error saving content to file:', error);
      }
    }

     fetchContentAndSaveToFile();
  }, []);
  return (<View style={{marginTop:50}}>
   <Text style={styles.savingText}>Saving chapter ...</Text>
    {saved && <Text style={styles.savedText}>Chapter saved saved successfully!</Text>}
  </View>)
  // (
  //   <ScrollView contentContainerStyle={styles.scrollViewContent}>
  //     <View style={styles.container}>
  //       <Text style={styles.title}>File Content</Text>
  //       <View style={styles.fileInfo}>
  //         <Text style={styles.filePath}>File path: {filePath}</Text>
  //         <Text style={styles.fileContent}>File content: {fileContent}</Text>
  //       </View>
  //     </View>
  //   </ScrollView>
  // );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  savingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  savedText: {
    fontSize: 16,
    color: 'green',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  fileInfo: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  filePath: {
    fontSize: 18,
    marginBottom: 10,
  },
  fileContent: {
    fontSize: 14,
    color: '#555',
    lineHeight: 24,
  },
});