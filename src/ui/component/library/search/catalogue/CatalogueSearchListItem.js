import React, { memo } from "react";
import { View } from "react-native";
import { Badge, Text, TouchableRipple } from "react-native-paper";

const ListItem = (props) => {
  const { id, author, title, holdings_available, onListItemPress } = props;

  return (
    <TouchableRipple
      onPress={() => onListItemPress(id)} e
    >
      <View
        style={{
          height: 72,
        }}
      >
        <View
          style={{
            marginLeft: 16,
            marginTop: 16,
            marginRight: 16,
            position: 'absolute'
          }}
        >
          <Badge size={40} style={{ alignSelf: 'center', backgroundColor: '#018786' }}>{holdings_available}</Badge>
        </View>
        <View
          style={{
            marginLeft: 72,
          }}
        >
          <View
            style={{
              position: 'absolute',
              height: 32,
              top: 16,
              paddingRight: 16,
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                color: '#232F34',
                fontFamily: 'WorkSans_600SemiBold',
                fontSize: 16,
              }}
            >
              {title}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                color: '#232F34',
                fontFamily: 'WorkSans_400Regular',
                fontSize: 14,
                opacity: 0.7,
              }}
            >
              {author}
            </Text>
          </View>
          <View
            style={{
              height: 20,
            }}
          >

          </View>
        </View>

      </View>
    </TouchableRipple>
  );
}

export default memo(ListItem, (prevProps, nextProps) => prevProps.author === nextProps.author && prevProps.title === nextProps.title);