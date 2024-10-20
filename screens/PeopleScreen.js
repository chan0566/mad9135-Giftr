import { StyleSheet, Button, FlatList, View, Text, SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import PeopleContext from "../PeopleContext";
import { GestureHandlerRootView, Swipeable,} from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function PeopleScreen() {
  const navigation = useNavigation();
  const { people, removePerson } = useContext(PeopleContext);
  const sortedPeople = [...people].sort((a, b) => new Date(a.dob) - new Date(b.dob));

  const renderRightActions = (id) => (
    <TouchableOpacity
      onPress={() => removePerson(id)}
      style={styles.deleteButton}
    >
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      <View style={styles.itemGroup}>
        <Text>{item.name}</Text>
        <Text>{item.dob}</Text>
      </View>
    </Swipeable>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      <Text style={styles.header}>People List</Text>
      {people.length === 0 ? (
            <Text style={styles.noDataText}>No persons added yet.</Text>
          ) : (
            <FlatList
              data={sortedPeople}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
            />
          )}
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
    itemGroup: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
    },
    deleteButton: {
      backgroundColor: "red",
      justifyContent: "center",
      alignItems: "center",
      width: 80,
      height: "100%",
    },
    deleteText: {
      color: "#fff",
      fontWeight: "bold",
    },
    noDataText: {
      textAlign: 'center',
      fontSize: 18,
      color: 'gray',
      padding: 20,
    },
  });
  