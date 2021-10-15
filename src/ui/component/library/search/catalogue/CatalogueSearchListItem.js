import React, { memo } from "react";
import { List } from "react-native-paper";

const ListItem = ({ author, title }) => {
  return (
    <List.Item
      description={author}
      title={title}
    />
  );
}

export default memo(ListItem, (prevProps, nextProps) => prevProps.author === nextProps.author && prevProps.title === nextProps.title);