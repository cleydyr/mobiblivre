import React from 'react';
import { View } from 'react-native';
import { List } from 'react-native-paper';

export default ({ libraries, onLibraryPress }) => {
  return (
    <View>
      {
        libraries.map(({ title, subtitle, id }) =>
          <List.Item
            description={subtitle}
            key={id}
            left={() => <List.Icon icon="book" />}
            onPress={() => onLibraryPress(id)}
            title={title}
          />
        )
      }
    </View>
  );
}