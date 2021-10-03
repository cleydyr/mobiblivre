import React from "react";
import { FAB } from "react-native-paper";

export default ({onPress}) => {
    return (
        <FAB
            icon="plus"
            onPress={onPress}
            style={{
                position: 'absolute',
                margin: 16,
                right: 0,
                bottom: 0,
            }}
        />);
}