import React from "react";

import FeedNavigator from "./app/navigation/FeedNavigator";
import { NavigationContainer } from "@react-navigation/native";

import { View, StyleSheet } from "react-native";
import Screen from "./app/components/Screen";
import Example from "./app/components/CardBottomSheet";
import AppleMusic from "./app/components/AppleMusic";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import WelcomeNavigator from "./app/navigation/WelcomeNavigator";
import MapScreen from "./app/screens/MapScreen";
import RadiatingMarker from "./app/components/RadiatingMarker";

export default function App() {
  return (
    <>
      <NavigationContainer>
        <WelcomeNavigator />
      </NavigationContainer>
    </>
  );
}
