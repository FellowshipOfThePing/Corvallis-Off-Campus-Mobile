import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import AuthNavigator from "./AuthNavigator";
import DrawerContent from "../screens/DrawerContent";
import HomeNavigator from "./HomeNavigator";
import SavedListingsNavigator from "./SavedListingsNavigator";
import SavedSearchesNavigator from "./SavedSearchesNavigator";
import colors from "../config/colors";
import defaultStyles from "../config/styles";
import Avatar from "../components/Avatar";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerContent {...props} />}
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
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
