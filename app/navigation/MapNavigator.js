import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MapScreen from "../screens/MapScreen";
import ListingDetailNavigator from "./ListingDetailNavigator";

const Stack = createStackNavigator();

const MapNavigator = () => (
  <Stack.Navigator
    mode="modal"
    screenOptions={{
      headerShown: false,
      gestureResponseDistance: { vertical: 500 },
      gestureVelocityImpact: 0.6,
    }}
  >
    <Stack.Screen
      name="MapScreen"
      component={MapScreen}
    />
    <Stack.Screen
      name="ListingDetailNavigator"
      component={ListingDetailNavigator}
    />
  </Stack.Navigator>
);

export default MapNavigator;
