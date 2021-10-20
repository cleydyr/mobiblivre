import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setLibrary } from '../../../feature/search/searchSlice';
import AddButton from '../AddButton';
import LibraryList from './LibraryListView';
import NoLibrary from './NoLibraryView';

export default ({ navigation }) => {
  const dispatch = useDispatch();

  const libraries = useSelector(state => state.library.libraries);

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
          libraries && libraries.length > 0
            ? <LibraryList {...{ libraries, onLibraryPress: handleLibraryPress }} />
            : <NoLibrary onCreateNewLibrary={() => navigation.navigate('add-library')} />
        }

      </View>

      <AddButton onPress={() => navigation.navigate('add-library')} />
    </>
  );
}