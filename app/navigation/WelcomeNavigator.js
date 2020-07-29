import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialTabs from "./MaterialTabs";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createStackNavigator();

const WelcomeNavigator = () => (
  <Stack.Navigator headerMode={"none"}>
    <Stack.Screen name="MaterialTabs" component={MaterialTabs} />
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
  </Stack.Navigator>
);

export default WelcomeNavigator;
