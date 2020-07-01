import React from "react";

import FeedNavigator from "./app/navigation/FeedNavigator";
import { NavigationContainer } from "@react-navigation/native";
import Screen from "./app/components/Screen";

export default function App() {
  return (
    <>
      <NavigationContainer>
        <FeedNavigator />
      </NavigationContainer>
    </>
  );
}
