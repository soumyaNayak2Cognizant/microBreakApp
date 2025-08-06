import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

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
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);

  const handleStartConfirm = (date: Date) => {
    setWorkStart(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    setStartPickerVisible(false);
  };
  const handleEndConfirm = (date: Date) => {
    setWorkEnd(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    setEndPickerVisible(false);
  };

  const handleSubmit = () => {
    onComplete({ workStart, workEnd, breakFrequency, breakDuration });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's set up your work schedule</Text>
      <View style={styles.row}>
        <MaterialIcons name="access-time" size={24} color="#4F8EF7" style={styles.icon} />
        {Platform.OS === 'web' ? (
          <input
            type="time"
            style={{ ...styles.timeInput, height: 40 }}
            value={workStart}
            onChange={e => setWorkStart(e.target.value)}
          />
        ) : (
          <TouchableOpacity style={styles.timeInput} onPress={() => setStartPickerVisible(true)}>
            <Text style={styles.timeText}>{workStart || 'Work start time (e.g. 09:00)'}</Text>
          </TouchableOpacity>
        )}
        {Platform.OS !== 'web' && (
          <DateTimePickerModal
            isVisible={isStartPickerVisible}
            mode="time"
            onConfirm={handleStartConfirm}
            onCancel={() => setStartPickerVisible(false)}
          />
        )}
      </View>
      <View style={styles.row}>
        <MaterialIcons name="access-time" size={24} color="#4F8EF7" style={styles.icon} />
        {Platform.OS === 'web' ? (
          <input
            type="time"
            style={{ ...styles.timeInput, height: 40 }}
            value={workEnd}
            onChange={e => setWorkEnd(e.target.value)}
          />
        ) : (
          <TouchableOpacity style={styles.timeInput} onPress={() => setEndPickerVisible(true)}>
            <Text style={styles.timeText}>{workEnd || 'Work end time (e.g. 17:00)'}</Text>
          </TouchableOpacity>
        )}
        {Platform.OS !== 'web' && (
          <DateTimePickerModal
            isVisible={isEndPickerVisible}
            mode="time"
            onConfirm={handleEndConfirm}
            onCancel={() => setEndPickerVisible(false)}
          />
        )}
      </View>
      <View style={styles.row}>
        <MaterialIcons name="repeat" size={24} color="#4F8EF7" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Break frequency (minutes)"
          value={breakFrequency}
          onChangeText={setBreakFrequency}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.row}>
        <MaterialIcons name="timer" size={24} color="#4F8EF7" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Break duration (minutes)"
          value={breakDuration}
          onChangeText={setBreakDuration}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F7FAFC',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#4F8EF7',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    marginRight: 10,
  },
  timeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#fff',
  },
  timeText: {
    color: '#333',
    fontSize: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4F8EF7',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#4F8EF7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default Onboarding;
