import React, { memo } from "react";
import { View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";

const ListItem = (props) => {
  const { id, author, title, holdings_available, onListItemPress } = props;

  return (
    <TouchableRipple
      onPress={() => onListItemPress(id)}
    >
      <View
        style={{
          height: 64
        }}
      >
        <View
          style={{
            marginLeft: 16,
            marginRight: 16,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 28,
              alignItems: 'flex-end'
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                color: '#232F34',
                fontFamily: 'WorkSans_600SemiBold',
                fontSize: 16,
                flex: 1
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                color: '#232F34',
                fontFamily: 'WorkSans_400Regular',
                fontSize: 14,
                opacity: 0.5,
                paddingLeft: 28,
              }}
            >
              {holdings_available} disp.
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
            }}
          >
            <Text
              style={{
                color: '#232F34',
                fontFamily: 'WorkSans_400Regular',
                fontSize: 14,
                opacity: 0.7,
              }}>{author}</Text>
          </View>
        </View>

      </View>
    </TouchableRipple>
  );
}

export default memo(ListItem, (prevProps, nextProps) => prevProps.author === nextProps.author && prevProps.title === nextProps.title);