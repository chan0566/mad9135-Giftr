import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Button } from "react-native";
import PeopleScreen from "./screens/PeopleScreen";
import AddPersonScreen from "./screens/AddPersonScreen";
import GiftScreen from "./screens/GiftScreen";
import AddGiftScreen from "./screens/AddGiftScreen";

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
                    <Button title="Add Person" onPress={() => navigation.navigate("Add Person")} />
                ),
            })} 
        />
        <Stack.Screen name="Add Person" component={AddPersonScreen} />
        <Stack.Screen 
            name="Gifts" 
            component={GiftScreen} 
            options={({ navigation }) => ({
              headerRight: () => (
                  <Button title="Add Gift" onPress={() => navigation.navigate("Add Gift")} />
                ),
            })} 
        />
        <Stack.Screen name="Add Gift" component={AddGiftScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}