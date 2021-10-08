import { registerRootComponent } from "expo";
import * as React from "react";
import { Provider } from "react-native-paper";
import { WithLibraryContext } from "./hook/useLibrariesStorage";
import LibrariesScreen from "./ui/component/library/LibrariesScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddLibraryScreen from "./ui/component/library/NewLibraryScreen";
import store from './store';
import { Provider as ReduxProvider, useDispatch } from "react-redux";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ReduxProvider store={store}>
      <WithLibraryContext>
        <Provider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="list-library">
              <Stack.Screen name="list-library" component={LibrariesScreen} options={{ title: 'Bibliotecas' }} />
              <Stack.Screen name="add-library" component={AddLibraryScreen} options={{ title: 'Adicionar Biblioteca' }} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </WithLibraryContext>
    </ReduxProvider>
  );
}

registerRootComponent(App);