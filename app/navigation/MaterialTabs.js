import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import FeedNavigator from "./FeedNavigator";
import MapNavigator from "./MapNavigator";
import colors from "../config/colors";

const Tab = createMaterialBottomTabNavigator();

const MaterialTabs = () => {
  return (
    <Tab.Navigator shifting barStyle={{ backgroundColor: colors.primary }}>
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons name="home" color={color} size={25} />
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
              size={25}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MaterialTabs;
