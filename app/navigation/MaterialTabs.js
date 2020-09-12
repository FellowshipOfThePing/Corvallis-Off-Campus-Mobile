import React, { useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import FeedNavigator from "./FeedNavigator";
import MapNavigator from "./MapNavigator";
import ThemeContext from "../theme/context";

const Tab = createBottomTabNavigator();

const MaterialTabs = () => {
  const { colors } = useContext(ThemeContext);
  return (
    <Tab.Navigator
      lazy={false}
      barStyle={{ backgroundColor: colors.navHeaderBackground }}
      tabBarOptions={{
        activeTintColor: colors.navHeaderText,
        inactiveTintColor: colors.navHeaderTextInactive,
        style: {
          backgroundColor: colors.navHeaderBackground,
          height: 90,
          justifyContent: "center",
          paddingHorizontal: 15,
        },
        labelStyle: {
          fontSize: 14,
        },
        tabStyle: {
          paddingVertical: 5,
        },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="google-maps"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MaterialTabs;
