import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as FileSystem from 'expo-file-system';

const BlockCompare = () => {
  const [utterances, setUtterances] = useState([]);
  const [bookBlockData, setBookBlockData] = useState([]);
  const [blocksFileSaved, setBlocksFileSaved] = useState(false);

  useEffect(() => {
    FileSystem.readAsStringAsync(`${FileSystem.documentDirectory}utterances.json`, {
      encoding: FileSystem.EncodingType.UTF8,
    })
      .then(json => {
        if (json) {
          setUtterances(JSON.parse(json).utterances);
        }
      })
      .catch(error => console.error(error));
  }, []);

  
  useEffect(() => {
    async function processUtterances() {
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
  
          setBookBlockData(blocks);

          setBlocksFileSaved(true); 

        } catch (error) {
          console.log(error);
        }
      }
    }
  
    processUtterances();
  }, [utterances]);
  
  // useEffect(() => {
  //   FileSystem.readAsStringAsync(`${FileSystem.documentDirectory}book_blocks.json`, {
  //     encoding: FileSystem.EncodingType.UTF8,
  //   })
  //     .then(json => {
  //       if (json) {
  //         setBookBlockData(JSON.parse(json));
  //       }
  //     })
  //     .catch(error => console.log('inside blockCompare')
  //       //  console.error(error)
  //     );
  // }, []);
  useEffect(() => {
    if (blocksFileSaved) {
      async function readBookBlocksFile() {
        try {
          console.log('read well')
          const json = await FileSystem.readAsStringAsync(`${FileSystem.documentDirectory}book_blocks.json`, {
            encoding: FileSystem.EncodingType.UTF8,
          });
          if (json) {
            setBookBlockData(JSON.parse(json));
          }
        } catch (error) {
          console.log("Error reading book blocks file:", error);
        }
      }
  
      readBookBlocksFile();
    }
  }, [blocksFileSaved]);

  return null;
  //  (
  //   <View style={{ marginTop: 190 }}>
  //     <Text>Book Block Data:</Text>
  //     {bookBlockData.map((blockData, index) => (
  //       <Text key={index}>
  //         {blockData.block} - read: {blockData.read} - similarity score: {blockData.similarityScore}
  //       </Text>
  //     ))}
  //   </View>
  // );
};

export default BlockCompare;
