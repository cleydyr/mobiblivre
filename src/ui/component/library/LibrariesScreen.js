import React, { useContext } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, FAB } from 'react-native-paper';
import { LibraryContext } from '../../../hook/useLibrariesStorage';
import { resetStorage } from '../../../storage';
import AddButton from '../AddButton';
import LibraryList from './LibraryList';
import NoLibrary from './NoLibrary';

export default ({navigation}) => {
    const {libraries, loading} = useContext(LibraryContext);

    return (
      <>
        <View style={{
            flex: 1,
        }}>
            {
                loading
                ? <ActivityIndicator animating={true} />
                : libraries && libraries.length > 0
                ? <LibraryList {...{libraries}} />
                : <NoLibrary onCreateNewLibrary={() => navigation.navigate('add-library')} />
            }
            
        </View>
        <FAB
            icon="delete"
            onPress={resetStorage}
            style={{
                position: 'absolute',
                margin: 16,
                left: 0,
                bottom: 0,
            }}
        />
        <AddButton onPress={() => navigation.navigate('add-library')}/>
      </>
    );
}