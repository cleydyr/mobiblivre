import React, { memo } from "react";
import { View } from "react-native";
import { Badge, List } from "react-native-paper";

const ListItem = (props) => {
  const { id, author, title, holdings_available, onListItemPress } = props;

  return (
    <View
      style={{
        flexDirection: 'row',
      }}
    >
      <View
        style={{
          flex: 2,
          justifyContent: 'center',
        }}
      >
        <Badge size={24} style={{alignSelf: 'center', backgroundColor: 'darkviolet' }}>{holdings_available}</Badge>
      </View>
      <View
        style={{
          flex: 14,
        }}
      >
        <List.Item
          style={{
            marginLeft: -8,
          }}
          description={author}
          title={title}
          onPress={() => onListItemPress(id)}
        />
      </View>

    </View>
  );
}

export default memo(ListItem, (prevProps, nextProps) => prevProps.author === nextProps.author && prevProps.title === nextProps.title);