import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import PeopleContext from "../PeopleContext";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import CameraComponent from "../components/CameraComponent";

export default function AddGiftScreen({ route }) {
  const { item } = route.params;
  const [giftName, setGiftName] = useState("");
  const { AddGift } = useContext(PeopleContext);
  const navigation = useNavigation();
  const [photo, setPhoto] = useState(null);

  const saveGift = () => {
    if (giftName) {
      AddGift(giftName, photo);
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
        <View style={styles.itemGroup}>
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
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
      },
  });
  