import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import PeopleContext from "../PeopleContext";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";

export default function AddPersonScreen() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const { addPerson } = useContext(PeopleContext);
  const navigation = useNavigation();

  const savePerson = () => {
    if (name && dob) {
      addPerson(name, dob);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.header} >Add a Person</Text>
        <View style={styles.itemGroup}>
            <Text>Person's Name</Text>
            <TextInput style={styles.itemInput} value={name} onChangeText={setName} />
        </View>
        <View style={styles.itemGroup}>
            <Text>Date of Birth</Text>
            <TextInput style={styles.itemInput} value={dob} onChangeText={setDob} />
        </View>
        <View style={styles.buttonRow}>
            <Button title="Save" onPress={savePerson} />
            <Button title="Cancel" onPress={() => navigation.goBack()} />
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
  