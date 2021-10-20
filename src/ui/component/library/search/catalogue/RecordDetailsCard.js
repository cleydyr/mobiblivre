import React from "react";
import { ScrollView, View } from "react-native";
import { Button, Card, Divider, List, Text } from "react-native-paper";

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
    fields,
    onBackPress,
    baseUrl,
    i18n,
  }
) => {

  const uri = (attachments && attachments.length) ? (baseUrl + "/" + attachments[0].uri) : undefined;

  return (
    <Card>
      <ScrollView>
        <Card.Cover
          source={{ uri }}
          resizeMode="contain"
        />
        <Card.Content>
          <View>
            <View
              style={{
                marginTop: 8,
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
                <CardMetadata name="Disponíveis" value={holdings_available} />
                <CardMetadata name="Emprestados" value={holdings_lent} />
                <CardMetadata name="Reservados" value={holdings_reserved} />
              </View>

              <View>
                <CardMetadata name="Ano de Publicação" value={publication_year} />
                <CardMetadata name="Localização" value={shelf_location} />
                <CardMetadata name="ISBN" value={isbn} />
              </View>
            </View>
            <Divider />
            <List.Accordion
              title="Mais metadados"
              style={{
                backgroundColor: 'white',
                margin: -8
              }}
            >
              <View
                style={{
                  marginTop: 8,
                  marginBottom: 8,
                }}
              >
                {
                  fields.map((field, i) => {
                    return (
                      <View
                        key={i}
                        style={{
                          marginBottom: 8
                        }}
                      >
                        <CardMetadata name={i18n[`cataloging.tab.record.custom.field_label.biblio_${field.datafield}`].toUpperCase()} value={field.value} />
                      </View>
                    )
                  })
                }
              </View>
            </List.Accordion>
          </View>
        </Card.Content>
        <Card.Actions style={{ marginTop: 20 }}>
          <Button onPress={onBackPress}>Voltar</Button>
        </Card.Actions>
      </ScrollView>
    </Card>
  );
}