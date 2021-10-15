import React, { memo } from "react";
import { List } from "react-native-paper";

const ListItem = (props) => {
  const {id, author, title, onListItemPress } = props;

  console.log(props);

  return (
    <List.Item
      style={{
        marginLeft: -8,
      }}
      description={author}
      title={title}
      left={props => <List.Icon icon="book" />}
      onPress={() => onListItemPress(id)}
    />
  );
}

export default memo(ListItem, (prevProps, nextProps) => prevProps.author === nextProps.author && prevProps.title === nextProps.title);