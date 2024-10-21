import { StyleSheet, FlatList, View, Text, SafeAreaView, Image, Button, Modal, TouchableWithoutFeedback } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import PeopleContext from "../PeopleContext";

export default function GiftScreen({ route }) {
  const { item } = route.params;
  const navigation = useNavigation();
  const { people, removeGift } = useContext(PeopleContext);
  const person = people.find((person) => person.id === item.id);

  if (!person) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Text style={styles.noDataText}>No gifts found for this person.</Text>
          <Button title="Go Back" onPress={() => navigation.goBack()} />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
  
  const giftIdeas = Array.isArray(person.gifts) ? person.gifts : [];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        {item.photo && (
          <TouchableWithoutFeedback onPress={() => {
            setSelectedImage(item.photo);
            setModalVisible(true);
          }}>
            <Image source={{ uri: item.photo }} style={styles.imagePreview} />
          </TouchableWithoutFeedback>
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

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => {
            setModalVisible(false);
          }}>
            <View style={styles.modalContainer}>
              <Image source={{ uri: selectedImage }} style={styles.fullscreenImage} />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
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
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});