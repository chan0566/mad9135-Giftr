import { StyleSheet, Button, FlatList, View, Text, SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function PeopleScreen() {
  const people = [
    {
      id: "d825796c-4fc1-4879-ad86-048ece613581",
      name: "Tom",
      dob: "2001-01-09",
    },
    {
      id: "b825796d-4fc1-4879-ad86-048ece613582",
      name: "Megan",
      dob: "2001-02-28",
    },
    {
      id: "a825796e-4fc1-4879-ad86-048ece613583",
      name: "Eric",
      dob: "2001-04-28",
    },
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text style={styles.header}>People List</Text>
        <FlatList
          data={people}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemGroup}>
              <Text>{item.name}</Text>
              <Text>{item.dob}</Text>
            </View>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
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
        fontWeight: 'bold',
      },
    itemGroup: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        },
  });
  