import React from "react";

import FeedNavigator from "./app/navigation/FeedNavigator";
import { NavigationContainer } from "@react-navigation/native";
import Screen from "./app/components/Screen";
import MapScreen from "./app/screens/MapScreen";
import ExplorerScreen from "./app/screens/ExplorerScreen";

export default function App() {
  return (
    <>
      {/* <NavigationContainer>
        <FeedNavigator />
      </NavigationContainer> */}
      {/* <MapScreen /> */}
      <ExplorerScreen />
    </>
  );
}
