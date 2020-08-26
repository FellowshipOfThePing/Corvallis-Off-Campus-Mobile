import React from "react";
import { Dimensions } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import AuthNavigator from "./AuthNavigator";
import DrawerContent from "../screens/DrawerContent";
import HomeNavigator from "./HomeNavigator";
import SavedListingsNavigator from "./SavedListingsNavigator";
import SavedSearchesNavigator from "./SavedSearchesNavigator";
import SettingsScreen from "../screens/SettingsScreen";

const Drawer = createDrawerNavigator();
const swipeBoundary = (Dimensions.get("window").width / 3);

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerType="slide"
      edgeWidth={swipeBoundary}
    >
      <Drawer.Screen name="Home" component={HomeNavigator} />
      <Drawer.Screen name="AuthNavigator" component={AuthNavigator} />
      <Drawer.Screen
        name="SavedListingsNavigator"
        component={SavedListingsNavigator}
      />
      <Drawer.Screen
        name="SavedSearchesNavigator"
        component={SavedSearchesNavigator}
      />
      <Drawer.Screen 
        name="SettingsScreen"
        component={SettingsScreen}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
