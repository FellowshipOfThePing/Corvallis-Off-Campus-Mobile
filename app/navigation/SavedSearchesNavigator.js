import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SavedListingsScreen from "../screens/SavedListingsScreen";
import ListingDetailNavigator from "./ListingDetailNavigator";
import colors from "../config/colors";
import defaultStyles from "../config/styles";
import Avatar from "../components/Avatar";
import SavedSearchesScreen from "../screens/SavedSearchesScreen";

const Stack = createStackNavigator();

const SavedSearchesNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      gestureResponseDistance: { vertical: 500 },
      gestureVelocityImpact: 0.6,
    }}
  >
    <Stack.Screen
      name="Saved Searches"
      component={SavedSearchesScreen}
      options={({ navigation }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTitleStyle: {
          paddingBottom: 8,
          fontSize: 18,
          fontFamily: defaultStyles.text.fontFamily,
          fontWeight: "bold"
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
  </Stack.Navigator>
);

export default SavedSearchesNavigator;
