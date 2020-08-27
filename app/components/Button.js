import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, Platform } from "react-native";

import AppText from "./AppText";
import ThemeContext from "../config/context";

function Button({ title, color, onPress, textSize = 18, textColor, style }) {
  const { colors } = useContext(ThemeContext);
  return (
    <TouchableOpacity
      style={[
        styles.container,
        style,
        { backgroundColor: color ? color : colors.black },
      ]}
      onPress={onPress}
    >
      <AppText
        style={[
          styles.text,
          { color: textColor ? textColor : colors.white, fontSize: textSize },
        ]}
      >
        {title}
      </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    width: "100%",
  },
  text: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});

export default Button;
