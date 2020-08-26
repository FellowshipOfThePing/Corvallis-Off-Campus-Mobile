import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import AppText from "./AppText";
import colors from "../config/colors";

function Button({
  title,
  color = colors.black,
  onPress,
  textSize = 18,
  textColor = colors.white,
  style,
}) {
  return (
    <TouchableOpacity
      style={[styles.container, style, { backgroundColor: color }]}
      onPress={onPress}
    >
      <AppText
        style={[styles.text, { color: textColor, fontSize: textSize }]}
      >
        {title}
      </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    width: "100%"
  },
  text: {
    color: colors.white,
    textTransform: "uppercase",
    fontWeight: "bold",
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});

export default Button;
