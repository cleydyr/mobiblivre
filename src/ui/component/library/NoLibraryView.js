import React from 'react';
import { View } from 'react-native';
import { Button, Headline } from 'react-native-paper';

export default ({onCreateNewLibrary}) => {
    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Headline>Nenhuma biblioteca cadastrada</Headline>
            <Button mode="contained" onPress={onCreateNewLibrary} >
                Cadastrar nova biblioteca
            </Button>
        </View>
    );
}