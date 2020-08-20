import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import DrawerContent from "../screens/DrawerContent";
import HomeNavigator from "./HomeNavigator";
import AuthNavigator from "./AuthNavigator";
import SavedListingsScreen from "../screens/SavedListingsScreen";
import SavedListingsNavigator from "./SavedListingsNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
      <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props}/>}>
        <Drawer.Screen name="Home" component={HomeNavigator} />
        <Drawer.Screen name="AuthNavigator" component={AuthNavigator} />
        <Drawer.Screen name="SavedListingsNavigator" component={SavedListingsNavigator} />
      </Drawer.Navigator>
  );
}

export default DrawerNavigator;
