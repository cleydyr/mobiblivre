import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Badge, Button, Card, Divider, Headline, Modal, Portal, Subheading, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, stopLoading } from '../../../../../feature/loading/loadingSlice';
import { loadMoreSearchResults, loadSearchResults } from '../../../../../feature/search/searchSlice';
import { openBibliographicRecord } from '../../../../../service/library';
import CatalogueSearchForm from './CatalogueSearchForm';
import CatalogueSearchListItem from './CatalogueSearchListItem';
import NoRecordsFoundView from './NoRecordsFoundView';
import RecordDetailsCard from './RecordDetailsCard';

const renderItem = (onListItemPress) => ({ item }) => {
  return <CatalogueSearchListItem {...item} onListItemPress={onListItemPress} />;
}

function keyExtractor(item) {
  return item.id.toString();
}

export default ({ navigation }) => {
  const dispatch = useDispatch();

  const {
    records,
    searchPerformed,
    library: { url, i18n },
  } = useSelector(state => state.search);

  const [isShowRecordCard, setShowRecordCard] = useState(false);
  const [cardData, setCardData] = useState({});
  const [cardCoverLoading, setCardCoverLoading] = useState(false);

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

  const onListItemPress = async (recordId) => {
    const owner = 'open-record';

    dispatch(startLoading(owner));

    const cardData = await openBibliographicRecord(url, recordId);

    setShowRecordCard(true);

    setCardData(cardData.data);

    dispatch(stopLoading(owner));
  }

  return (
    <>
      <Portal>
        <Modal visible={isShowRecordCard} onDismiss={() => setShowRecordCard(false)} >
          {isShowRecordCard && <RecordDetailsCard {...cardData} onBackPress={() => setShowRecordCard(false)} baseUrl={url} i18n={i18n} />}
        </Modal>
      </Portal>

      <CatalogueSearchForm
        onSearchSubmit={handleSearchSubmit}
        loading={loading.length}
      >
        {
          searchPerformed && !records.length
            ? <NoRecordsFoundView />
            : <FlatList
              style={styles.formField}
              data={records}
              renderItem={renderItem(onListItemPress)}
              keyExtractor={keyExtractor}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.8}
              maxToRenderPerBatch={8}
              ItemSeparatorComponent={Divider}
            />
        }
      </CatalogueSearchForm>
    </>
  );
}

const styles = StyleSheet.create({
  formField: {
    marginLeft: 8,
    marginRight: 8,
  }
});