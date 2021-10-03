import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function getStoredData() {
    return AsyncStorage.getItem('@mobiblivre');
}