import { registerRootComponent } from "expo";
import * as React from "react";
import { Provider } from "react-native-paper";
import { WithLibraryContext } from "./hook/useLibrariesStorage";
import LibraryScreen from "./ui/component/library/Screen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <WithLibraryContext>
      <Provider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Bibiliotecas" component={LibraryScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </WithLibraryContext>
  );
}

registerRootComponent(App);