import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailNavigator from "./ListingDetailNavigator";
import colors from "../config/colors";
import defaultStyles from "../config/styles";
import Avatar from "../components/Avatar";
import FilterButton from "../components/FilterButton";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator
    mode="modal"
    screenOptions={{
      gestureResponseDistance: { vertical: 500 },
      gestureVelocityImpact: 0.6,
    }}
  >
    <Stack.Screen
      name="Listings"
      component={ListingsScreen}
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
        headerTintColor: colors.white,
        headerLeft: () => {
          return <Avatar size={35} onPress={() => navigation.openDrawer()} />;
        },
        headerLeftContainerStyle: {
          paddingLeft: 10,
          paddingBottom: 10,
        },
        headerRight: () => {
          return (
            <FilterButton
              size={35}
              onPress={() => navigation.navigate("FilterScreen")}
            />
          );
        },
        headerRightContainerStyle: {
          paddingRight: 10,
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

export default FeedNavigator;
