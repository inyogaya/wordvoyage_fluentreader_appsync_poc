import React, { useEffect, useState } from 'react';
import { View, Text, ProgressViewIOS } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { ProgressBar } from 'react-native-paper';
const BookProgress = () => {
  
  const [bookBlocks, setBookBlocks] = useState([]);
  const [bookText, setBookText] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);
  const today = new Date();
  const month = today.getMonth() + 1; // Add 1 because getMonth() returns 0-based index
  const day = today.getDate();
  const year = today.getFullYear();
  const dateString = `${month}/${day}/${year}`;


  useEffect(() => {
    // Read book blocks data from file system
    FileSystem.readAsStringAsync(
      `${FileSystem.documentDirectory}book_blocks.json`,
      { encoding: FileSystem.EncodingType.UTF8 }
    )
      .then((json) => {
        if (json) {
          const blocks = JSON.parse(json);
          setBookBlocks(blocks);
        }
      })
      .catch((error) =>
      console.log('error in bookprogress')
      //  console.error(error)
       );
  }, []);

  useEffect(() => {
    
    // Read book text data from file system
    FileSystem.readAsStringAsync(
      `${FileSystem.documentDirectory}data.txt`,
      { encoding: FileSystem.EncodingType.UTF8 }
    )
      .then((text) => {
        if (text) {
          setBookText(text);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    // Calculate the total number of words in the book text
    const totalWords = bookText.split(' ').length;

    // Calculate the total number of words in read blocks
    const readWords = bookBlocks.reduce(
      (acc, block) => (block.read === 1 ? acc + block.num_of_words : acc),
      0
    );

    // Calculate the progress percentage
    const percent = Math.round((readWords / totalWords) * 100);
    setProgressPercent(percent);
  }, [bookText, bookBlocks]);

  return (
    // <View style={{ marginTop: 5, backgroundColor: '#34566A' }}>
    //     <Text style={{ marginLeft: 25, marginBottom: 10, fontWeight: 'bold', fontSize: 18, color: 'white' }}>Reading Assignment for </Text>
    //     <View style={{ marginTop: 10, marginBottom: 20, marginLeft: 20, flexDirection: 'row', alignItems: 'center', width: '80%' }}>
    //       <View style={{ width: '90%' }}>
    //         <ProgressBar progress={progressPercent / 100} color='#FFCD00' style={{ height: 15, justifyContent: 'center', }} />
    //       </View>
    //       <View style={{ width: '20%', alignItems: 'flex-end', }}>
    //         <Text style={{ color: 'white' }}>{progressPercent}% </Text>
    //       </View>
    //     </View>
    //   </View>

    <View style={{ marginTop: 70, backgroundColor: '#34566A' }}>
        <Text style={{ marginLeft: 25, marginBottom: 10, fontWeight: 'bold', fontSize: 18, color: 'white' }}>Reading Assignment for {dateString}</Text>
        <View style={{ marginTop: 10, marginBottom: 20, marginLeft: 20, flexDirection: 'row', alignItems: 'center', width: '80%' }}>
          <View style={{ width: '90%' }}>
            <ProgressBar progress={progressPercent / 100} color='#FFCD00' style={{ height: 15, justifyContent: 'center', }} />
          </View>
          <View style={{ width: '13%', alignItems: 'flex-end', }}>
            <Text style={{ color: 'white' }}>{progressPercent}% </Text>
          </View>
        </View>
      </View>
  );
};

export default BookProgress;
