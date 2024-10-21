import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import PeopleContext from "../PeopleContext";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import DatePicker from "react-native-modern-datepicker";

export default function AddPersonScreen() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const { addPerson } = useContext(PeopleContext);
  const navigation = useNavigation();

  const savePerson = () => {
    if (name && dob) {
      addPerson( name, dob);
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
          <View style={styles.dobRow}>
            <Text>Date of Birth</Text>
            <Text style={styles.selectedDate}>
              {dob ? dob : "Select a date"}
            </Text>
          </View>
          <DatePicker
            onSelectedChange={date => setDob(date)}
            options={{
              backgroundColor: '#ffffff',
              textHeaderColor: '#000',
            }}
            mode="calendar"
          />
        </View>
        <View style={styles.buttonRow}>
            <Button title="Cancel" onPress={() => navigation.goBack()} />
            <Button title="Save" onPress={savePerson} />
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
    dobRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    selectedDate: {
        padding: 10,
        fontSize: 16,
        color: 'gray',
      },
  });
  