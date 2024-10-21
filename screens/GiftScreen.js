import { StyleSheet, Button, FlatList, View, Text, SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function GiftScreen({ route }) {
  const { item } = route.params;
  const navigation = useNavigation();

  // const { people, removePerson } = useContext(PeopleContext);
  // const sortedPeople = [...people].sort((a, b) => new Date(a.dob) - new Date(b.dob));

  // const renderItem = ({ item }) => (
  //     <View style={styles.itemGroup}>
  //       <View>
  //         <Text>{item.id}</Text>
  //         <Text>{item.name}</Text>
  //         <Text>{item.dob}</Text>
  //       </View>
  //     </View>
  // );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Gift ideas for {item.name}</Text>
      {/* <FlatList
        data={sortedPeople}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      /> */}
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
    itemGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
    },
    noDataText: {
      textAlign: 'center',
      fontSize: 18,
      color: 'gray',
      padding: 20,
    },
  });
  