import React from "react";
import DrawerNavigator from "./app/navigation/DrawerNavigator";
import { NavigationContainer } from "@react-navigation/native";

import OfflineNotice from "./app/components/OfflineNotice";
import Screen from "./app/components/Screen";

export default function App() {
  return (
    <>
      <OfflineNotice />
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </>
  );
}
