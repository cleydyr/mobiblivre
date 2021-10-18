import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, HelperText, Switch, Text, TextInput } from "react-native-paper";
import { URL } from "react-native-url-polyfill";

export default ({ onSave, onCancel }) => {
  const [url, setURL] = useState('');
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setShowPassword] = useState(false);
  const [isValidUrl, setValidUrl] = useState(true);
  const toggleAuthenticated = () => setAuthenticated(!isAuthenticated);
  const toggleShowPassword = () => setShowPassword(!isShowPassword);

  const validateUrl = () => {
    try {
      const goodURL = new URL(url);

      return (goodURL.protocol === 'http:' || goodURL.protocol === 'https:')
    }
    catch (e) { console.log(e) }

    return false;
  }

  const onSavePress = () => {
    if (validateUrl()) {
      onSave({ url, isAuthenticated, userName, password });
    }
    else {
      setValidUrl(false);
    }
  }

  const onChangeText = (text) => {
    setValidUrl(true);

    setURL(text);
  }

  return (
    <View
      style={{
        flex: 1,
        margin: 16,
      }}>

      <View
        style={styles.formField}
      >
      <TextInput
        error={!isValidUrl}
        label="URL*"
        onChangeText={onChangeText}
        placeholder="exemplo: https://minhabiblioteca.biblivre.cloud"
        value={url}
      />
      <HelperText type="error" visible={!isValidUrl} >
        URL inválida!
      </HelperText>
      </View>
      <View style={
        [
          styles.formField,
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
          }
        ]
      }>
        <Text style={[
          {
            fontWeight: "600",
            fontSize: 20,
          }]}>Necessita autenticação</Text>
        <Switch value={isAuthenticated} onValueChange={toggleAuthenticated} />
      </View>

      {
        isAuthenticated
        && <>
          <TextInput
            label="Usuário*"
            value={userName}
            onChangeText={setUserName}
            style={styles.formField}
          />
          <TextInput
            label="Senha*"
            value={password}
            secureTextEntry={!isShowPassword}
            onChangeText={setPassword}
            right={<TextInput.Icon name={`eye${isShowPassword ? "-off" : ""}`} onPress={toggleShowPassword} />}
            style={styles.formField}
          />
        </>
      }

      <View style={
        [
          styles.formField,
          {
            flexDirection: 'row',
            justifyContent: "flex-end",
          }
        ]}>
        <Button style={styles.formField} mode="outlined" onPress={onCancel} >Cancelar</Button>
        <Button style={styles.formField} mode="contained" onPress={onSavePress} >Salvar</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formField: {
    marginBottom: 16,
  }
});
