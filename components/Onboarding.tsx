import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

interface OnboardingData {
  workStart: string;
  workEnd: string;
  breakFrequency: string;
  breakDuration: string;
}

const Onboarding: React.FC<{ onComplete: (data: OnboardingData) => void }> = ({ onComplete }) => {
  const [workStart, setWorkStart] = useState('');
  const [workEnd, setWorkEnd] = useState('');
  const [breakFrequency, setBreakFrequency] = useState('');
  const [breakDuration, setBreakDuration] = useState('');

  const handleSubmit = () => {
    onComplete({ workStart, workEnd, breakFrequency, breakDuration });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's set up your work schedule</Text>
      <TextInput
        style={styles.input}
        placeholder="Work start time (e.g. 09:00)"
        value={workStart}
        onChangeText={setWorkStart}
      />
      <TextInput
        style={styles.input}
        placeholder="Work end time (e.g. 17:00)"
        value={workEnd}
        onChangeText={setWorkEnd}
      />
      <TextInput
        style={styles.input}
        placeholder="Break frequency (minutes)"
        value={breakFrequency}
        onChangeText={setBreakFrequency}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Break duration (minutes)"
        value={breakDuration}
        onChangeText={setBreakDuration}
        keyboardType="numeric"
      />
      <Button title="Continue" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
});

export default Onboarding;
