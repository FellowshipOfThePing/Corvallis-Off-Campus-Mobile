import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import MaterialTabs from "./app/navigation/MaterialTabs";
import Screen from "./app/components/Screen";

export default function App() {
  return (
    <>
      <NavigationContainer>
        <MaterialTabs />
      </NavigationContainer>
    </>
  );
}