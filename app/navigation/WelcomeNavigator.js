import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AppNavigator from "./AppNavigator";
import MaterialTabs from "./MaterialTabs";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createStackNavigator();

const WelcomeNavigator = () => (
  <Stack.Navigator headerMode={"none"}>
    <Stack.Screen name="Welcome" component={MaterialTabs} />
    <Stack.Screen name="AppNavigator" component={AppNavigator} />
  </Stack.Navigator>
);

export default WelcomeNavigator;
