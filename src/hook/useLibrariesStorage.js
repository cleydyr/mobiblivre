import React, { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadLibraries } from "../feature/library/librarySlice";
import {
  useFonts,
  WorkSans_300Light,
  WorkSans_400Regular,
  WorkSans_700Bold,
} from '@expo-google-fonts/work-sans';
import LoadingMask from "../ui/component/LoadingMask";
import { Dimensions, View } from "react-native";

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

  const { width, height } = Dimensions.get("window");

  return (
    <>
      {children}
      {
        !loading.length ||
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height,
            width,
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, 0.7)'
          }}
        >
          <LoadingMask />
        </View>
      }
    </>
  );
}