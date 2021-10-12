import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadMoreSearchResults, loadSearchResults } from '../../../../../feature/search/searchSlice';
import CatalogueSearchForm from './CatalogueSearchForm';
import CatalogueSearchListItem from './CatalogueSearchListItem';

function renderItem({
  item: {
    author,
    title,
  }
}) {
  return <CatalogueSearchListItem title={title} author={author} />
}

function keyExtractor(item) {
  return item.id.toString();
}

export default ({ navigation }) => {
  const dispatch = useDispatch();

  const records = useSelector(state => state.search.records);

  const loading = useSelector(state => state.loading.status);

  const handleSearchSubmit = (keywords) => {
    dispatch(loadSearchResults(keywords));
  }

  const handleLoadMore = () => {
    if (loading.length) {
      return;
    }

    dispatch(loadMoreSearchResults)
  }

  console.log(`render search screen with ${records.length} records`);

  return (
    <CatalogueSearchForm
      onSearchSubmit={handleSearchSubmit}
      loading={loading.length}
    >
      <FlatList
        style={styles.formField}
        data={records}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.8}
        maxToRenderPerBatch={8}
      />
    </CatalogueSearchForm>
  );
}

const styles = StyleSheet.create({
  formField: {
    margin: 8,
  }
});