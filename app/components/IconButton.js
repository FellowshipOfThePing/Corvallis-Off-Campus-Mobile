import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function IconButton({ size = 44, onPress, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { height: size, width: size, borderRadius: size / 2 },
        style,
      ]}
    >
      <MaterialCommunityIcons name="google-maps" size={30} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.light,
    borderColor: colors.dark,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IconButton;
