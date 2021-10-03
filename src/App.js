import { registerRootComponent } from "expo";
import * as React from "react";
import { View } from "react-native";
import { Provider } from "react-native-paper";
import LibraryScreen from "./ui/component/library/Screen";

export default function App() {
  return (
    <Provider>
        <View style={{
          flex: 1,
          marginTop: 32,
          paddingHorizontal: 24
        }}>
          <LibraryScreen />
        </View>
    </Provider>
  );
}

registerRootComponent(App);