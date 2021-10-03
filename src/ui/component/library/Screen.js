import React, { useContext } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Title } from 'react-native-paper';
import { LibraryContext } from '../../../hook/useLibrariesStorage';
import AddButton from '../AddButton';
import LibraryList from './LibraryList';
import NoLibrary from './NoLibrary';

export default () => {
    const {libraries, loading} = useContext(LibraryContext);

    return (
        <View style={{
            flex: 1,
        }}>
            <Title>Bibliotecas</Title>

            {
                loading
                ? <ActivityIndicator animating={true} />
                : libraries && libraries.length > 0
                ? <LibraryList {...{libraries}} />
                : <NoLibrary />
            }

            <AddButton />
        </View>
    );
}