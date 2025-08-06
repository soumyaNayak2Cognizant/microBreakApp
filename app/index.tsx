import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import Onboarding from "@/components/Onboarding";
import {
  generateBreakSchedule,
  getUserData,
  saveUserData,
} from "@/utils/schedule";

interface OnboardingData {
  workStart: string;
  workEnd: string;
  breakFrequency: string;
  breakDuration: string;
}

export default function HomeScreen() {
  const isDarkMode = useColorScheme() === "dark";
  const [onboarded, setOnboarded] = useState(false);
  const [userData, setUserData] = useState<OnboardingData | null>(null);

  useEffect(() => {
    (async () => {
      const storedData = await getUserData();
      if (storedData) {
        setUserData(storedData);
        setOnboarded(true);
      }
    })();
  }, []);

  const handleOnboardingComplete = async (data: OnboardingData) => {
    await saveUserData(data);
    setUserData(data);
    setOnboarded(true);
  };

  const handleReset = async () => {
    await saveUserData(null);
    setUserData(null);
    setOnboarded(false);
  };

  const breakScheduleRaw = userData
    ? generateBreakSchedule(
        userData.workStart,
        userData.workEnd,
        userData.breakFrequency,
        userData.breakDuration
      )
    : [];
  const breakSchedule: Array<{
    time: string;
    activity: string;
    duration: number;
    gif: string;
  }> = breakScheduleRaw.map((b) => ({
    time: b.time,
    activity: b.name,
    duration: b.duration,
    gif: b.gif,
  }));

  return (
    <View
      style={[styles.container, { backgroundColor: isDarkMode ? "#1D3D47" : "#F7FAFC" }]}
    >
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      {!onboarded ? (
        <Onboarding onComplete={handleOnboardingComplete} />
      ) : (
        <View style={styles.scheduleContainer}>
          <Text
            style={[styles.scheduleTitle, isDarkMode ? { color: "white" } : {}]}
          >
            Here is your break schedule:
          </Text>
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 24 }}>
            <View style={styles.timelineContainer}>
              {breakSchedule.map((item, i) => (
                <View key={i} style={styles.timelineItem}>
                  <View style={styles.timelineLeft}>
                    <View style={styles.timelineCircle} />
                    {i < breakSchedule.length - 1 && <View style={styles.timelineLine} />}
                  </View>
                  <View style={styles.timelineContent}>
                    <Image source={{ uri: item.gif }} style={styles.timelineGif} />
                    <Text style={[styles.time, isDarkMode ? { color: "white" } : {}]}>
                      {item.time}
                    </Text>
                    <Text
                      style={[styles.activity, isDarkMode ? { color: "white" } : {}]}
                    >
                      {item.activity}
                    </Text>
                    <Text
                      style={[styles.duration, isDarkMode ? { color: "white" } : {}]}
                    >
                      ({item.duration} min)
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>Reset Data</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    position: "absolute",
  },
  container: {
    flex: 1,
  },
  scheduleContainer: {
    flex: 1,
    padding: 16,
  },
  scheduleTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  timelineContainer: {
    marginVertical: 16,
    paddingLeft: 16,
  },
  timelineItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  timelineLeft: {
    alignItems: "center",
    width: 32,
    position: "relative",
  },
  timelineCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#4F8EF7",
    marginTop: 2,
    marginBottom: 2,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: "#4F8EF7",
    marginTop: 2,
  },
  timelineContent: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginLeft: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  timelineGif: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#eee",
  },
  resetButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#e74c3c",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  time: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  activity: {
    fontSize: 16,
    marginBottom: 2,
  },
  duration: {
    fontSize: 14,
    color: "#888",
  },
});
