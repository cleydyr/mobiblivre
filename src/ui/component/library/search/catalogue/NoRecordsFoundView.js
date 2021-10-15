import React from 'react';
import { View } from "react-native";
import { Avatar, Headline } from "react-native-paper";

export default () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
      }}
    >
      <Avatar.Icon size={144} icon="book-remove" style={{
        backgroundColor: 'rgba(52, 52, 52, 0.2)',
        margin: 16
      }} />
      <Headline style={{ textAlign: 'center' }}>Nenhum resultado encontrado</Headline>
    </View>
  );
}