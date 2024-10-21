import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import PeopleContext from "../PeopleContext";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import CameraComponent from "../components/CameraComponent";

export default function AddGiftScreen({ route }) {
  const { item } = route.params;
  const [giftName, setGiftName] = useState("");
  const { addGift } = useContext(PeopleContext);
  const navigation = useNavigation();
  const [photo, setPhoto] = useState(null);

  const saveGift = () => {
    if (giftName) {
      const gift = { name: giftName, photo };
      console.log("Adding gift", gift);
      addGift(item.id, gift);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.header} >Ideas for {item.name}</Text>
        <View style={styles.itemGroup}>
            <Text>Gift Name</Text>
            <TextInput style={styles.itemInput} value={giftName} onChangeText={setGiftName} />
        </View>
        <View style={styles.cameraGroup}>
          <CameraComponent setPhoto={setPhoto} />
        </View>
        <View style={styles.buttonRow}>
            <Button title="Cancel" onPress={() => navigation.goBack()} />
            <Button title="Save" onPress={saveGift} />
        </View>
    </View>
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
    itemGroup: {
        paddingVertical: 10,
        paddingHorizontal: 20,
      },
    itemInput: {
        borderBottomWidth: 1,
        borderColor: 'lightblue',
        padding: 10,
        marginVertical: 10,
      },
    cameraGroup: {
        flex: 1,
        padding: 20,
      },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        marginBottom: 20,
      },
  });
  