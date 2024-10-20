import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PeopleScreen from './screens/PeopleScreen';
import AddPersonScreen from './screens/AddPersonScreen';

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navBar}>
        <Text style={styles.header}>People</Text>
        <View style={styles.buttonWrapper} >
          <Button title="Add Person" onPress={() => alert("Adding person")} />
        </View>
      </View>
      <View style={styles.screen}>
        {/* <PeopleScreen /> */}
        <AddPersonScreen />
      </View>
    </SafeAreaView>
  </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
  safeArea: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    position: 'relative',
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
  },
  buttonWrapper: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
