import React from 'react';
import { View } from "react-native";
import { Avatar, Button, Headline, Subheading, Title } from "react-native-paper";

export default ({ onOkPress }) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        alignItems: 'center',
        margin: 32,
      }}
    >
      <Avatar.Icon size={144} icon="server-network-off" style={{
        backgroundColor: 'lightgrey',
        margin: 16
      }} />

      <Headline style={{ textAlign: 'center', padding: 8}}>Não foi possível obter uma resposta válida deste servidor.</Headline>
      <Subheading style={{ textAlign: 'center' }}>Verifique o endereço digitado e tente novamente</Subheading>
      <Button
        style={{
          alignSelf: 'flex-end',
          margin: 8,
        }}
        onPress={onOkPress}
      >
        Ok
      </Button>
    </View>
  );
}