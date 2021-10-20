import React, { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadLibraries } from "../feature/library/librarySlice";
import {
  useFonts,
  WorkSans_300Light,
  WorkSans_400Regular,
  WorkSans_700Bold,
} from '@expo-google-fonts/work-sans';
import AppLoading from "expo-app-loading";
import LoadingMask from "../ui/component/LoadingMask";
import { View } from "react-native";

export const LibraryContext = createContext();

export const WithLibraryContext = ({ children }) => {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.loading.status);

  useEffect(() => {
    dispatch(loadLibraries);
  }, []);

  const [fontsLoaded] = useFonts({
    WorkSans_300Light,
    WorkSans_400Regular,
    WorkSans_700Bold,
  });

  if (!fontsLoaded) {
    return <LoadingMask />
  }

  return (
    <>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: 'pink',
          position: 'absolute',
        }}
      >
        <LoadingMask />
      </View>
      {children}
    </>
  );
}