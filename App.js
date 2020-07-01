import React from "react";

import FeedNavigator from "./app/navigation/FeedNavigator";
import navigationRef from "./app/navigation/rootNavigation";
import { NavigationContainer } from "@react-navigation/native";
import Browser from "./app/screens/Browser";

export default function App() {

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <FeedNavigator />
      </NavigationContainer>
    </>
    // <Browser 
    //   pageUrl="https://www.google.com"
    // />
  );
}
