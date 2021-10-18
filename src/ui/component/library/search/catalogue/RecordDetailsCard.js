import React from "react";
import { View } from "react-native";
import { Button, Card, Divider, IconButton, Text } from "react-native-paper";
import {
  useFonts,
  WorkSans_100Thin,
  WorkSans_200ExtraLight,
  WorkSans_300Light,
  WorkSans_400Regular,
  WorkSans_500Medium,
  WorkSans_600SemiBold,
  WorkSans_700Bold,
  WorkSans_800ExtraBold,
  WorkSans_900Black,
  WorkSans_100Thin_Italic,
  WorkSans_200ExtraLight_Italic,
  WorkSans_300Light_Italic,
  WorkSans_400Regular_Italic,
  WorkSans_500Medium_Italic,
  WorkSans_600SemiBold_Italic,
  WorkSans_700Bold_Italic,
  WorkSans_800ExtraBold_Italic,
  WorkSans_900Black_Italic,
} from '@expo-google-fonts/work-sans';

const CardMetadata = ({ name, value }) => {
  return (
    <View
      style={{
        marginTop: 8,
      }}
    >
      <Text
        style={{
          fontFamily: 'WorkSans_300Light',
          fontSize: 15,
          opacity: 0.6
        }}
      >
        {name}
      </Text>
      <Text
        style={{
          fontFamily: 'WorkSans_300Light',
          fontSize: 17,
        }}
      >
        {value}
      </Text>
    </View>
  );
}

export default (
  {
    attachments,
    title,
    author,
    holdings_available,
    holdings_lent,
    holdings_reserved,
    publication_year,
    shelf_location,
    isbn,
    onBackPress,
    baseUrl
  }
) => {
  let [fontsLoaded] = useFonts({
    WorkSans_100Thin,
    WorkSans_200ExtraLight,
    WorkSans_300Light,
    WorkSans_400Regular,
    WorkSans_500Medium,
    WorkSans_600SemiBold,
    WorkSans_700Bold,
    WorkSans_800ExtraBold,
    WorkSans_900Black,
    WorkSans_100Thin_Italic,
    WorkSans_200ExtraLight_Italic,
    WorkSans_300Light_Italic,
    WorkSans_400Regular_Italic,
    WorkSans_500Medium_Italic,
    WorkSans_600SemiBold_Italic,
    WorkSans_700Bold_Italic,
    WorkSans_800ExtraBold_Italic,
    WorkSans_900Black_Italic,
  });

  return (
    <Card>
      <Card.Cover
        source={{ uri: attachments ? attachments.length && baseUrl + attachments[0].uri : undefined }}
        resizeMode="contain"
      />
      <Card.Content>
        <View>
          <View
            style={{
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                color: '#232F34',
                fontFamily: 'WorkSans_700Bold',
                fontSize: 21,
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                color: '#232F34',
                fontFamily: 'WorkSans_400Regular',
                fontSize: 17,
              }}
            >
              {author}
            </Text>
          </View>
          <Divider />
          <View
            style={{
              marginTop: 8,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 8,
            }}
          >
            <View>
              <CardMetadata name="Ano de Publicação" value={publication_year} />
              <CardMetadata name="Localização" value={shelf_location} />
              <CardMetadata name="ISBN" value={isbn} />
            </View>
            <View>
              <CardMetadata name="Disponíveis" value={holdings_available} />
              <CardMetadata name="Emprestados" value={holdings_lent} />
              <CardMetadata name="Reservados" value={holdings_reserved} />
            </View>
          </View>
        </View>
        <Divider />
      </Card.Content>
      <Card.Actions style={{ marginTop: 20 }}>
        <Button onPress={onBackPress}>Voltar</Button>
        <Button style={{ marginRight: 8 }}>Mostrar mais</Button>
      </Card.Actions>
    </Card>
  );
}