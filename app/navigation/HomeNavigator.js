import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MaterialTabs from "./MaterialTabs";
import FilterModal from "../components/FilterModal";

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
      component={FilterModal}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default HomeNavigator;
