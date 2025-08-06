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
      ...suggestActivity(),
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
    { name: 'Stretch your legs', gif: 'https://media.tenor.com/2uyENRqaO6IAAAAM/leg-stretch.gif' },
    { name: 'Drink water', gif: 'https://media.tenor.com/1v1QwQvQwQwAAAAM/drink-water.gif' },
    { name: 'Look away from the screen', gif: 'https://media.tenor.com/2QwQwQvQwQwAAAAM/look-away.gif' },
    { name: 'Take deep breaths', gif: 'https://media.tenor.com/1QwQwQvQwQwAAAAM/deep-breath.gif' },
    { name: 'Walk around', gif: 'https://media.tenor.com/2QwQwQvQwQwAAAAM/walk-around.gif' },
    { name: 'Do a quick meditation', gif: 'https://media.tenor.com/1QwQwQvQwQwAAAAM/meditation.gif' },
    { name: 'Do 5 squats', gif: 'https://media.tenor.com/1QwQwQvQwQwAAAAM/squats.gif' },
    { name: 'Shoulder rolls', gif: 'https://media.tenor.com/2QwQwQvQwQwAAAAM/shoulder-rolls.gif' },
    { name: 'Neck stretches', gif: 'https://media.tenor.com/1QwQwQvQwQwAAAAM/neck-stretch.gif' },
    { name: 'Hand stretches', gif: 'https://media.tenor.com/2QwQwQvQwQwAAAAM/hand-stretch.gif' },
    { name: 'Listen to a song', gif: 'https://media.tenor.com/1QwQwQvQwQwAAAAM/listen-music.gif' },
    { name: 'Smile!', gif: 'https://media.tenor.com/2QwQwQvQwQwAAAAM/smile.gif' },
  ];
  return activities[Math.floor(Math.random() * activities.length)];
}
