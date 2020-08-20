import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SavedListingsScreen from "../screens/SavedListingsScreen";
import ListingDetailNavigator from "./ListingDetailNavigator";
import colors from "../config/colors";
import Avatar from "../components/Avatar";

const Stack = createStackNavigator();

const SavedListingsNavigator = () => (
  <Stack.Navigator
    mode="modal"
    screenOptions={{
      gestureResponseDistance: { vertical: 500 },
      gestureVelocityImpact: 0.6,
    }}
  >
    <Stack.Screen
      name="Saved Listings"
      component={SavedListingsScreen}
      options={({ navigation }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTitleStyle: {
          paddingBottom: 8,
          fontSize: 18,
        },
        headerTintColor: "#fff",
        headerLeft: () => {
          return <Avatar size={35} onPress={() => navigation.openDrawer()} />;
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
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default SavedListingsNavigator;
