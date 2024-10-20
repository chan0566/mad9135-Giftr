import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Button } from "react-native";
import PeopleScreen from "./screens/PeopleScreen";
import AddPersonScreen from "./screens/AddPersonScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
            name="People" 
            component={PeopleScreen} 
            options={({ navigation }) => ({
                headerRight: () => (
                    <Button title="Add Person" onPress={() => navigation.navigate("AddPerson")} />
                ),
            })} 
        />
        <Stack.Screen name="AddPerson" component={AddPersonScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}