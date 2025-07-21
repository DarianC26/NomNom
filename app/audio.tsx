import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import Voice from '@react-native-community/voice';

export default function ContinuousVoiceRecognition() {
  const [started, setStarted] = useState(false);
  const [results, setResults] = useState([]);  // Stores recognized texts

  useEffect(() => {
    // Setup event handlers
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechError = onSpeechErrorHandler;

    return () => {
      // Cleanup
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStartHandler = () => {
    console.log('Speech recognition started');
  };

  const onSpeechResultsHandler = (e) => {
    // e.value is an array of transcriptions (usually 1 item)
    console.log('Speech results:', e.value);
    if (e.value && e.value.length > 0) {
      // Append the latest recognized phrase
      setResults(prev => [...prev, e.value[0]]);
    }
  };

  const onSpeechEndHandler = () => {
    console.log('Speech recognition ended');

    // Auto-restart for continuous listening
    if (started) {
      Voice.start('en-US').catch(console.error);
    }
  };

  const onSpeechErrorHandler = (e) => {
    console.error('Speech recognition error:', e.error);

    // Handle errors like no speech detected or network issues
    // Optionally restart listening
    if (started) {
      Voice.start('en-US').catch(console.error);
    }
  };

  const startListening = async () => {
    setResults([]);
    setStarted(true);
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const stopListening = async () => {
    setStarted(false);
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title={started ? 'Stop Listening' : 'Start Listening'}
        onPress={started ? stopListening : startListening}
      />

      <ScrollView style={styles.resultsContainer}>
        {results.map((text, index) => (
          <Text key={index} style={styles.resultText}>{text}</Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop:300 },
  resultsContainer: { marginTop: 20, backgroundColor: '#eee', padding: 10, borderRadius: 6 },
  resultText: { fontSize: 16, marginVertical: 2 },
});
