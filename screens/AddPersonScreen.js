import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";

export default function AddPersonScreen() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");

  return (
    <View>
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
            <Button title="Save" />
            <Button title="Cancel" />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
        fontSize: 28,
        padding: 10,
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
  