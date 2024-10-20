import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PeopleScreen from './screens/PeopleScreen';
import AddPersonScreen from './screens/AddPersonScreen';
import AppNavigator from './AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.screen}>
        <AppNavigator />
      </View>
  </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
  screen: {
    flex: 1,
  },
});
