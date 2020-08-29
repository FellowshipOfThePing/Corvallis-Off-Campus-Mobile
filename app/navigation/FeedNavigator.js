import React, { useContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNetInfo } from "@react-native-community/netinfo";

import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailNavigator from "./ListingDetailNavigator";
import Avatar from "../components/Avatar";
import FilterButton from "../components/FilterButton";
import AnimatedHeaderTitle from "../components/AnimatedHeaderTitle";
import ThemeContext from "../theme/context";

const Stack = createStackNavigator();

const FeedNavigator = () => {
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
        name="Listings"
        component={ListingsScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.navHeaderBackground,
          },
          headerTitle: (props) => (
            <AnimatedHeaderTitle
              headerTitle="Listings"
              colors={colors.navHeaderBackground}
              bannerStyle={{ paddingBottom: 5 }}
              textStyle={{
                fontSize: 18,
                fontFamily: text.fontFamily,
              }}
            />
          ),
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
    </Stack.Navigator>
  );
};

export default FeedNavigator;
