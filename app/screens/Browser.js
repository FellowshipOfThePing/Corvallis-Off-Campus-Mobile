import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

import Screen from "../components/Screen";
import FocusAwareStatusBar from "../components/FocusAwareStatusBar";
import ThemeContext from "../theme/context";

function Browser({ route }) {
  const { darkMode } = useContext(ThemeContext);
  return (
    <Screen>
      <FocusAwareStatusBar
        barStyle={darkMode ? "light-content" : "dark-content"}
        backgroundColor="#6a51ae"
      />
      <WebView source={{ uri: route.params.url }} />
    </Screen>
  );
}

export default Browser;
