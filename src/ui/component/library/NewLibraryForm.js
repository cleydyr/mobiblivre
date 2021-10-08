import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Switch, Text, TextInput } from "react-native-paper";

export default ({onSave, onCancel}) => {
  const [url, setURL] = useState('');
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setShowPassword] = useState(false);

  const toggleAuthenticated = () => setAuthenticated(!isAuthenticated);
  const toggleShowPassword = () => setShowPassword(!isShowPassword);

  return (
    <View
      style={{
        flex: 1,
      }}>

      <TextInput
        label="URL*"
        value={url}
        onChangeText={setURL}
        placeholder="exemplo: https://minhabiblioteca.biblivre.cloud"
        style={styles.formField}
      />

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
        <Button style={styles.formField} mode="contained" onPress={() => onSave({url, isAuthenticated, userName, password})} >Salvar</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formField: {
    margin: 16,
  }
});
