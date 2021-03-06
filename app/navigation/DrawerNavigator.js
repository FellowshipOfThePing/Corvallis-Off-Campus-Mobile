import React, { useContext } from "react";
import { Dimensions } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import AuthNavigator from "./AuthNavigator";
import DrawerContent from "../screens/DrawerContent";
import HomeNavigator from "./HomeNavigator";
import SavedListingsNavigator from "./SavedListingsNavigator";
import SavedSearchesNavigator from "./SavedSearchesNavigator";
import SettingsNavigator from "./SettingsNavigator";
import AuthContext from "../auth/context";

const Drawer = createDrawerNavigator();
const swipeBoundary = Dimensions.get("window").width;

const DrawerNavigator = () => {
  const { loggingOut } = useContext(AuthContext);
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerType="slide"
      edgeWidth={swipeBoundary}
      screenOptions={{
        gestureEnabled: loggingOut ? false : true,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeNavigator}
        options={{ swipeEnabled: false }}
      />
      <Drawer.Screen name="AuthNavigator" component={AuthNavigator} />
      <Drawer.Screen
        name="SavedListingsNavigator"
        component={SavedListingsNavigator}
        options={{ swipeEnabled: false }}
      />
      <Drawer.Screen
        name="SavedSearchesNavigator"
        component={SavedSearchesNavigator}
      />
      <Drawer.Screen name="SettingsNavigator" component={SettingsNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
