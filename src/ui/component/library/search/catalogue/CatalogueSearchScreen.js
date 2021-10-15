import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ActivityIndicator, Card, Divider, Headline, Modal, Portal, Subheading } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { loadMoreSearchResults, loadSearchResults } from '../../../../../feature/search/searchSlice';
import { openBibliographicRecord } from '../../../../../service/library';
import CatalogueSearchForm from './CatalogueSearchForm';
import CatalogueSearchListItem from './CatalogueSearchListItem';
import NoRecordsFoundView from './NoRecordsFoundView';

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
    library: { url },
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
    setShowRecordCard(true);
    
    const cardData = await openBibliographicRecord(url, recordId);

    setCardData(cardData.data);
  }

  console.log(`render search screen with ${records.length} records`);
  console.log(`loading: ${loading}`);
  console.log(`searchPerformed: ${searchPerformed}`);

  return (
    <>
      <Portal>
        <Modal visible={isShowRecordCard} onDismiss={() => setShowRecordCard(false)} >
          <Card>
            <Card.Cover
              source={{ uri: cardData.attachments && cardData.attachments.length && url + cardData.attachments[0].uri }}
              defaultSource={{uri: "resources/images/logo.png"}}
              resizeMode="contain"
            />
            <Card.Content>
              <Headline>{cardData.title}</Headline>
              <Subheading>{cardData.author}</Subheading>
            </Card.Content>
          </Card>
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