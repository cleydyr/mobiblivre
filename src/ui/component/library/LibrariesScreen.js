import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, FAB } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { loadLibraries } from '../../../feature/library/librarySlice';
import { setLibrary } from '../../../feature/search/searchSlice';
import { resetStorage } from '../../../storage';
import AddButton from '../AddButton';
import LibraryList from './LibraryListView';
import NoLibrary from './NoLibraryView';

export default ({ navigation }) => {
  const dispatch = useDispatch();

  const libraries = useSelector(state => state.library.libraries);
  const loading = useSelector(state => state.loading.status);
  
  const handleLibraryPress = (library) => {
    dispatch(setLibrary(library));

    navigation.navigate('search-catalogue');
  }

  return (
    <>
      <View style={{
        flex: 1,
      }}>
        {
          loading.length
            ? <ActivityIndicator animating={true} />
            : libraries && libraries.length > 0
              ? <LibraryList {...{ libraries, onLibraryPress: handleLibraryPress }} />
              : <NoLibrary onCreateNewLibrary={() => navigation.navigate('add-library')} />
        }

      </View>
      <FAB
        icon="delete"
        onPress={() => {
          resetStorage();
          dispatch(loadLibraries);
        }}
        style={{
          position: 'absolute',
          margin: 16,
          left: 0,
          bottom: 0,
        }}
      />
      <AddButton onPress={() => navigation.navigate('add-library')} />
    </>
  );
}