import React from 'react';
import { View } from 'react-native';
import { Button, Headline } from 'react-native-paper';

export default ({handleCreateNewLibrary}) => {
    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Headline>Nenhuma biblioteca cadastrada</Headline>
            <Button mode="contained" onPress={handleCreateNewLibrary} >
                Cadastrar nova biblioteca
            </Button>
        </View>
    );
}