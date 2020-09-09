import * as React from "react";
import { StatusBar } from "react-native";
import { useIsFocused } from "@react-navigation/native";

function FocusAwareStatusBar({ barStyle, backgroundColor, hidden = false }) {
  const isFocused = useIsFocused();

  return isFocused ? (
    <StatusBar
      barStyle={barStyle}
      backgroundColor={backgroundColor}
      animated
      hidden={hidden}
    />
  ) : null;
}

export default FocusAwareStatusBar;
