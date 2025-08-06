import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUserData = async (data: any) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(data));
  } catch (e) {
    // handle error
  }
};

export const getUserData = async () => {
  try {
    const value = await AsyncStorage.getItem('userData');
    return value ? JSON.parse(value) : null;
  } catch (e) {
    return null;
  }
};

export const generateBreakSchedule = (workStart: string, workEnd: string, breakFrequency: string, breakDuration: string) => {
  // Simple schedule generator
  const start = parseTime(workStart);
  const end = parseTime(workEnd);
  const freq = parseInt(breakFrequency, 10);
  const dur = parseInt(breakDuration, 10);
  let breaks = [];
  let current = start;
  while (current + freq * 60 <= end) {
    breaks.push({
      time: formatTime(current + freq * 60),
      duration: dur,
      activity: suggestActivity(),
    });
    current += freq * 60;
  }
  return breaks;
};

function parseTime(time: string) {
  const [h, m] = time.split(':').map(Number);
  return h * 3600 + m * 60;
}

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

function suggestActivity() {
  const activities = [
    'Stretch your legs',
    'Drink water',
    'Look away from the screen',
    'Take deep breaths',
    'Walk around',
    'Do a quick meditation',
  ];
  return activities[Math.floor(Math.random() * activities.length)];
}
