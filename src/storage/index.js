import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  libraries: []
};

export async function getStoredData() {
  const rawData = await AsyncStorage.getItem('@mobiblivre');

  return JSON.parse(rawData) || initialState;
}

export async function setStoredData(data) {
  return AsyncStorage.setItem('@mobiblivre', JSON.stringify(data));
}

export async function resetStorage() {
  return AsyncStorage.removeItem('@mobiblivre');
}