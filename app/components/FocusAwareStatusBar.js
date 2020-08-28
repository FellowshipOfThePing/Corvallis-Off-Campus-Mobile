import * as React from "react";
import { StatusBar } from "react-native";
import { useIsFocused } from "@react-navigation/native";

function FocusAwareStatusBar({ barStyle, backgroundColor }) {
  const isFocused = useIsFocused();

  return isFocused ? (
    <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
  ) : null;
}

export default FocusAwareStatusBar;