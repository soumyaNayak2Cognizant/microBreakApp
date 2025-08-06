import React, { useState } from 'react';
import { Image } from 'expo-image';
import { Platform, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import Onboarding from '@/components/Onboarding';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { generateBreakSchedule, saveUserData } from '@/utils/schedule';

interface OnboardingData {
  workStart: string;
  workEnd: string;
  breakFrequency: string;
  breakDuration: string;
}

export default function HomeScreen() {
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
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {!onboarded ? (
        <Onboarding onComplete={handleOnboardingComplete} />
      ) : (
        <View>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title" style={isDarkMode ? { color: 'white' } : {}}>Welcome!</ThemedText>
            <HelloWave />
          </ThemedView>
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle" style={isDarkMode ? { color: 'white' } : {}}>Step 1: Try it</ThemedText>
            <ThemedText style={isDarkMode ? { color: 'white' } : {}}>
              Edit <ThemedText type="defaultSemiBold" style={isDarkMode ? { color: 'white' } : {}}>app/(tabs)/index.tsx</ThemedText> to see changes.
              Press{' '}
              <ThemedText type="defaultSemiBold" style={isDarkMode ? { color: 'white' } : {}}>
                {Platform.select({
                  ios: 'cmd + d',
                  android: 'cmd + m',
                  web: 'F12',
                })}
              </ThemedText>{' '}
              to open developer tools.
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle" style={isDarkMode ? { color: 'white' } : {}}>Step 2: Explore</ThemedText>
            <ThemedText style={isDarkMode ? { color: 'white' } : {}}>
              {`Tap the Explore tab to learn more about what's included in this starter app.`}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle" style={isDarkMode ? { color: 'white' } : {}}>Step 3: Get a fresh start</ThemedText>
            <ThemedText style={isDarkMode ? { color: 'white' } : {}}>
              {`When you're ready, run `}
              <ThemedText type="defaultSemiBold" style={isDarkMode ? { color: 'white' } : {}}>npm run reset-project</ThemedText> to get a fresh{' '}
              <ThemedText type="defaultSemiBold" style={isDarkMode ? { color: 'white' } : {}}>app</ThemedText> directory. This will move the current{' '}
              <ThemedText type="defaultSemiBold" style={isDarkMode ? { color: 'white' } : {}}>app</ThemedText> to{' '}
              <ThemedText type="defaultSemiBold" style={isDarkMode ? { color: 'white' } : {}}>app-example</ThemedText>.
            </ThemedText>
          </ThemedView>
          <View>
            <Text style={isDarkMode ? { color: 'white' } : {}}>Here is your break schedule:</Text>
            {breakSchedule.map((b, i) => (
              <Text key={i} style={isDarkMode ? { color: 'white' } : {}}>
                {b.time} - {b.activity} ({b.duration} min)
              </Text>
            ))}
          </View>
        </View>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
  },
});
