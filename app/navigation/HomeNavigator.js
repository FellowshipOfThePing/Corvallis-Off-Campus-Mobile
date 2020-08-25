import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MaterialTabs from "./MaterialTabs";
import FilterModalScreen from "../screens/FilterModalScreen";

const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen
      name="MaterialTabs"
      component={MaterialTabs}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="FilterScreen"
      component={FilterModalScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default HomeNavigator;
