import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function GoToMapButton({ size = 44, onPress, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { height: size, width: size, borderRadius: size / 2 },
        style,
      ]}
    >
      <MaterialCommunityIcons name="google-maps" size={30} color={colors.primary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GoToMapButton;