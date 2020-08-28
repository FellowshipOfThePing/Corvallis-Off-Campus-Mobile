import React, { useContext } from "react";
import { Text, Platform, StyleSheet } from "react-native";
import ThemeContext from "../theme/context";

function AppText({ children, style, ...otherProps }) {
  const { colors } = useContext(ThemeContext);
  return (
    <Text style={[{ color: colors.dark }, styles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});

export default AppText;
