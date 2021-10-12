import React from 'react';
import { View } from 'react-native';
import { List } from 'react-native-paper';

export default ({ libraries, onLibraryPress }) => {
  return (
    <View>
      {
        libraries.map(library => {
          const { title, subtitle, id } = library;

          return (
            <List.Item
              description={subtitle}
              key={id}
              left={() => <List.Icon icon="book" />}
              onPress={() => onLibraryPress(library)}
              title={title}
            />
          );
      })
    }
    </View>
  );
}