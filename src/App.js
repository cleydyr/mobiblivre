import { registerRootComponent } from "expo";
import * as React from "react";
import { View } from "react-native";
import { Provider } from "react-native-paper";
import { WithLibraryContext } from "./hook/useLibrariesStorage";
import LibraryScreen from "./ui/component/library/Screen";

export default function App() {
  return (
    <WithLibraryContext>
      <Provider>
        <View style={{
          flex: 1,
          marginTop: 32,
          paddingHorizontal: 16,
        }}>
          <LibraryScreen />
        </View>
      </Provider>
    </WithLibraryContext>
  );
}

registerRootComponent(App);