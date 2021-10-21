import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, List, Menu, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { deleteLibrary } from '../../../feature/library/librarySlice';

const LibraryMenu = ({ id }) => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button onPress={openMenu}>
            <Text style={{ fontSize: 24 }}>⋮</Text>
          </Button>
        }
      >
        <Menu.Item onPress={() => dispatch(deleteLibrary(id))} icon="trash-can" title="Remover" />
      </Menu>
    </View>
  );
}

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
              right={() => <LibraryMenu id={id} />}
              onPress={() => onLibraryPress(library)}
              title={title}
            />
          );
        })
      }
    </View>
  );
}