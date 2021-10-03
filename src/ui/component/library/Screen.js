import React from 'react';
import { View } from 'react-native';
import { Title } from 'react-native-paper';
import NoLibrary from './NoLibrary';

export default ({libraries}) => {
    if (!libraries || libraries.length == 0) {
        return (
            <View style={{
                flex: 1,
            }}>
                <Title>Bibliotecas</Title>
                <NoLibrary />
            </View>
        );
    }
}