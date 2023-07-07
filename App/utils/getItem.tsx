import AsyncStorage from '@react-native-async-storage/async-storage';

const getItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      const data = JSON.parse(value);
      return data;
    }
    return [];
  } catch (e: any) {
    console.log(e.message);
    return [];
  }
};

export default getItem;
