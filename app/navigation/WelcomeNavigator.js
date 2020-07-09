import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AppNavigator from "./AppNavigator";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createStackNavigator();

const WelcomeNavigator = () => (
  <Stack.Navigator headerMode={"none"}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="AppNavigator" component={AppNavigator} />
  </Stack.Navigator>
);

export default WelcomeNavigator;
