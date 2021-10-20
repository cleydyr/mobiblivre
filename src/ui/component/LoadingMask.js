import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 0, 255, 0)'
      }}
    >
      <ActivityIndicator animating={true} />
    </View>
  );
}