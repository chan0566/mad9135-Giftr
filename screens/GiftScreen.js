import { StyleSheet, FlatList, View, Text, SafeAreaView, Image, Button } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import PeopleContext from "../PeopleContext";

export default function GiftScreen({ route }) {
  const { item } = route.params;
  const navigation = useNavigation();
  const { people, removeGift } = useContext(PeopleContext);
  const person = people.find((person) => person.id === item.id);
  const giftIdeas = person ? person.gifts : [];

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        {item.photo && (
          <Image source={{ uri: item.photo }} style={styles.imagePreview} />
        )}
        <Button
          title="Delete"
          onPress={() => {
            removeGift(person.id, item.name);
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Gift ideas for {item.name}</Text>
        {giftIdeas.length > 0 ? (
          <FlatList
            data={giftIdeas}
            keyExtractor={(item) => item.name}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={styles.row}
          />
        ) : (
          <Text style={styles.noDataText}>No gift ideas available</Text>
        )}
        <Button title="Add Gift" onPress={() => navigation.navigate("Add Gift", { item })} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 28,
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  itemContainer: {
    width: '48%',
    margin: '1%',
    alignItems: 'center',
  },
  itemName: {
    marginBottom: 5,
    textAlign: 'center',
  },
  imagePreview: {
    width: '100%',
    height: undefined,
    aspectRatio: 2 / 3,
    resizeMode: 'cover', 
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'gray',
    padding: 20,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
});