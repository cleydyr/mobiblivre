import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, List, TextInput } from 'react-native-paper';

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

      <TextInput
        label={"Palavra(s) chave(s)"}
        value={keywords}
        onChangeText={setKeywords}
        placeholder="exemplo: Harry Potter"
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
            ? 'Carregando'
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