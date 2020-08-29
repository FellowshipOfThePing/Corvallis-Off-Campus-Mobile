import React, { useContext } from "react";
import { Text, Platform, StyleSheet } from "react-native";
import ThemeContext from "../theme/context";

function AppText({ children, style, ...otherProps }) {
  const { colors, text } = useContext(ThemeContext);
  return (
    <Text style={[text, style]} {...otherProps}>
      {children}
    </Text>
  );
}

export default AppText;
