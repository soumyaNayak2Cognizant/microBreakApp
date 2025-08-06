import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { saveUserData, generateBreakSchedule } from './utils/schedule';
import Onboarding from './components/Onboarding';

interface OnboardingData {
  workStart: string;
  workEnd: string;
  breakFrequency: string;
  breakDuration: string;
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [onboarded, setOnboarded] = useState(false);
  const [userData, setUserData] = useState<OnboardingData | null>(null);

  const handleOnboardingComplete = async (data: OnboardingData) => {
    await saveUserData(data);
    setUserData(data);
    setOnboarded(true);
  };

  const breakSchedule: Array<{ time: string; activity: string; duration: number }> = userData
    ? generateBreakSchedule(
        userData.workStart,
        userData.workEnd,
        userData.breakFrequency,
        userData.breakDuration
      )
    : [];

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {!onboarded ? (
        <Onboarding onComplete={handleOnboardingComplete} />
      ) : (
        <View>
          <Text>Here is your break schedule:</Text>
          {breakSchedule.map((b: { time: string; activity: string; duration: number }, i: number) => (
            <Text key={i}>{b.time} - {b.activity} ({b.duration} min)</Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
