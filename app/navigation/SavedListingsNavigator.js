import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SavedListingsScreen from "../screens/SavedListingsScreen";
import ListingDetailNavigator from "./ListingDetailNavigator";
import Avatar from "../components/Avatar";
import FilterButton from "../components/FilterButton";
import FilterModalScreen from "../screens/FilterModalScreen";
import ThemeContext from "../theme/context";

const Stack = createStackNavigator();

const SavedListingsNavigator = () => {
  const { colors, text } = useContext(ThemeContext);
  return (
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
            backgroundColor: colors.navHeaderBackground,
          },
          headerTitleStyle: {
            paddingBottom: 5,
            fontSize: 18,
            fontFamily: text.fontFamily,
          },
          headerTintColor: colors.navHeaderText,
          headerLeft: () => {
            return (
              <Avatar
                size={35}
                color={colors.navHeaderText}
                onPress={() => navigation.openDrawer()}
              />
            );
          },
          headerLeftContainerStyle: {
            paddingLeft: 10,
            paddingBottom: 10,
          },
          headerRight: () => {
            return (
              <FilterButton
                size={35}
                color={colors.navHeaderText}
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
      <Stack.Screen
        name="FilterScreen"
        component={FilterModalScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default SavedListingsNavigator;
