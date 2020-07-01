import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

import Screen from "../components/Screen";

function Browser({ route }) {
  return (
    <Screen>
      <WebView source={{ uri: route.params.url }} style={{ marginTop: 20 }} />
    </Screen>
  );
}

export default Browser;
