import React, { useEffect, useState } from 'react';
import { View, Text, Alert, uses } from 'react-native';
import * as FileSystem from 'expo-file-system';
import Save from './Save';
import BookSentencesRead from './BookSentencesRead';

const CleanAppStorage = () => {

  const [showBlockCompare, setShowBlockCompare] = useState(false);
  const [fileDeletionFinished, setFileDeletionFinished] = useState(false);


  useEffect(() => {
    const checkAndDeleteFiles = async () => {
      setShowBlockCompare(true)
      const dataFileExists = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'data.txt');
      const utterancesFileExists = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'utterances.json');
      const bookSentencesFileExists = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'book_sentences.json');
      const bookBlocks = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'book_blocks.json');

      if (bookBlocks.exists) {
        Alert.alert('File Found', 'The book_blocks.json file was found and deleted.');
        console.log('book_blocks.json deleted')
        await FileSystem.deleteAsync(FileSystem.documentDirectory + 'book_blocks.json');
      } else {
        Alert.alert('File Not Found', 'The book_blocks.json file was not found.');
      }

      if (dataFileExists.exists) {
        Alert.alert('File Found', 'The data.txt file was found and deleted.');
        console.log('data.txt deleted')
        await FileSystem.deleteAsync(FileSystem.documentDirectory + 'data.txt');
      } else {
        Alert.alert('File Not Found', 'The data.txt file was not found.');
      }

      if (utterancesFileExists.exists) {
        Alert.alert('File Found', 'The utterances.json file was found and deleted.');
        console.log('utterances.json deleted')
        await FileSystem.deleteAsync(FileSystem.documentDirectory + 'utterances.json');
      } else {
        Alert.alert('File Not Found', 'The utterances.json file was not found.');
      }

      if (bookSentencesFileExists.exists) {
        Alert.alert('File Found', 'The book_sentences.json file was found and deleted.');
        console.log('book_sentences.json deleted')
        await FileSystem.deleteAsync(FileSystem.documentDirectory + 'book_sentences.json');
      } else {
        Alert.alert('File Not Found !', 'The book_sentences.json file was not found.');

      }

      if (!dataFileExists.exists && !utterancesFileExists.exists && !bookSentencesFileExists.exists) {
        console.log('No files to delete.');

      }
      setFileDeletionFinished(true);
    };

    checkAndDeleteFiles();
  }, [showBlockCompare]);


  //

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
      .catch(error => console.log('inside last match readblocks'));
  };

  useEffect(() => {
    readBookBlocks();
  }, );
  //
  return (
    <View style={{ marginTop: 190 }}>
      <Text>Checking for and deleting files ...</Text>
      {showBlockCompare && fileDeletionFinished && <Save />}
      {/* {showBlockCompare && <Save/>} */}
      {/* {showBlockCompare && <BookSentencesRead/>} */}
      {/* {showBlockCompare && <BlockCompare />} */}
    </View>
  );
};

export default CleanAppStorage;
