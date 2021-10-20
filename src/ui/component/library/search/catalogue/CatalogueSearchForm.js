import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Searchbar } from 'react-native-paper';

export default (
  {
    loading,
    onSearchSubmit,
    children
  }
) => {
  const [keywords, setKeywords] = useState('');

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>

      <Searchbar
        onChangeText={setKeywords}
        placeholder="exemplo: Harry Potter"
        value={keywords}
        style={[
          styles.formField,
          {
          }
        ]}
      />

      {children}

      <Button
        mode="contained"
        onPress={() => onSearchSubmit(keywords)}
        style={styles.formField}
        loading={loading}
      >
        {
          loading
            ? 'Carregando mais resultados'
            : keywords
              ? 'Buscar'
              : 'Listar Todos'
        }
      </Button>

    </View>
  );
}

const styles = StyleSheet.create({
  formField: {
    margin: 8,
  }
});