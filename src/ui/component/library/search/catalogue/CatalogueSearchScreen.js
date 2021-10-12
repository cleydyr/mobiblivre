import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Avatar, Headline } from 'react-native-paper';
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

  const {
    records,
    searchPerformed
  } = useSelector(state => state.search);

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
  console.log(`loading: ${loading}`);
  console.log(`searchPerformed: ${searchPerformed}`);

  return (
    <CatalogueSearchForm
      onSearchSubmit={handleSearchSubmit}
      loading={loading.length}
    >
      {
        searchPerformed && !records.length
          ? <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 8,
              }}
            >
                <Avatar.Icon size={144} icon="book-remove" style={{
                  backgroundColor: 'rgba(52, 52, 52, 0.2)',
                  margin: 16
                }}/>
              <Headline style={{textAlign: 'center'}}>Nenhum resultado encontrado</Headline>
            </View>
          : <FlatList
              style={styles.formField}
              data={records}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.8}
              maxToRenderPerBatch={8}
            />
      }
    </CatalogueSearchForm>
  );
}

const styles = StyleSheet.create({
  formField: {
    margin: 8,
  }
});