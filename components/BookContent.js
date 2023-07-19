import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function BookContent() {
  const [bookSentences, setBookSentences] = useState([]);

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const sentences = await FileSystem.readAsStringAsync(`${FileSystem.documentDirectory}/book_sentences.json`);
        const bookSentencesCopy = JSON.parse(sentences);

        // Add the "read" property to each sentence and set its initial value to 0
        const bookSentencesWithRead = bookSentencesCopy.map((sentence) => {
          return { ...sentence, read: 0 };
        });

        // Read the utterances from the utterances.json file
        const utterancesContent = await FileSystem.readAsStringAsync(`${FileSystem.documentDirectory}/utterances.json`);
        const utterances = JSON.parse(utterancesContent).utterances;

        // Update the "read" property of each sentence if a similar utterance is found
        bookSentencesWithRead.forEach((sentence, index) => {
          const similarityScore = getSimilarityScore(utterances, sentence.sentence);

          if (similarityScore > 0.65) {
            bookSentencesWithRead[index].read = 1;
          } else {
            bookSentencesWithRead[index].read = 0;
          }
        });

        // Write the updated sentences to the book_sentences.json file
        await FileSystem.writeAsStringAsync(`${FileSystem.documentDirectory}/book_sentences.json`, JSON.stringify(bookSentencesWithRead));

        setBookSentences(bookSentencesWithRead);
      } catch (err) {
        console.log(err);
      }
    };

    loadFiles();
  }, []);

  const calculateSimilarityScore = (bookSentencesWithRead, utterances) => {
    const updatedBookSentences = bookSentencesWithRead.map((sentence) => {
      const { id, sentence: originalSentence, num_of_words } = sentence;
      const similarityScore = getSimilarityScore(utterances, originalSentence);
      const read = similarityScore > 0 ? 1 : 0;
      return { id, sentence: originalSentence, num_of_words, read };
    });
    return updatedBookSentences;
  };
  
  const getSimilarityScore = (utterances, sentence) => {
    let highestScore = 0;
    if (Array.isArray(utterances)) {
      utterances.forEach((utterance) => {
        const s1 = utterance.toLowerCase().trim();
        const s2 = sentence.toLowerCase().trim();
        const m = s1.length;
        const n = s2.length;
        const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));
        for (let i = 0; i <= m; i++) {
          for (let j = 0; j <= n; j++) {
            if (i === 0) dp[i][j] = j;
            else if (j === 0) dp[i][j] = i;
            else if (s1.charAt(i - 1) === s2.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1];
            else dp[i][j] = 1 + Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]);
          }
        }
        const score = 1 - dp[m][n] / Math.max(m, n);
        highestScore = Math.max(highestScore, score);
    });
  }
  return highestScore;
};


return (
  <View style={{flex:1, marginTop:80}}>
    <Text>Book Sentences:</Text>
    {bookSentences.map((sentence) => (
      <Text key={sentence.id}>
        {sentence.id}. {sentence.sentence} (Read: {sentence.read})
      </Text>
    ))}
  </View>
);
}