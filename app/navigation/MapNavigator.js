import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MapScreen from "../screens/MapScreen";
import ListingDetailNavigator from "./ListingDetailNavigator";
import Avatar from "../components/Avatar";

const Stack = createStackNavigator();

const MapNavigator = () => (
  <Stack.Navigator
    mode="modal"
    screenOptions={{
      gestureResponseDistance: { vertical: 500 },
      gestureVelocityImpact: 0.6,
    }}
  >
    <Stack.Screen
      name="MapScreen"
      component={MapScreen}
      options={({ navigation }) => ({
        headerShown: true,
        headerTransparent: true,
        headerTitleStyle: {
          paddingBottom: 8,
          fontSize: 18,
        },
        title: false,
        headerLeft: () => {
          return <Avatar size={35} color="black" onPress={() => navigation.openDrawer()} />;
        },
        headerLeftContainerStyle: {
          paddingLeft: 10,
          paddingBottom: 10,
        },
      })}
    />
    <Stack.Screen
      name="ListingDetailNavigator"
      component={ListingDetailNavigator}
      options={{
        headerShown: false
      }}
    />
  </Stack.Navigator>
);

export default MapNavigator;
