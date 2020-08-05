import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import MaterialTabs from "../navigation/MaterialTabs";
import DrawerContent from "../screens/DrawerContent";
import LoginScreen from "../screens/LoginScreen";
import HomeNavigator from "./HomeNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
      <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props}/>}>
        <Drawer.Screen name="Home" component={HomeNavigator} />
        <Drawer.Screen name="Login" component={LoginScreen} />
      </Drawer.Navigator>
  );
}

export default DrawerNavigator;
