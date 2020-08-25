import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";

import colors from "../config/colors";

function MapButton({
  size = 44,
  onPress,
  style,
  iconName,
  iconColor,
  iconFamily = "Community",
  active = true,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { height: size, width: size, borderRadius: size / 2 },
        style,
        { opacity: active ? 1.0 : 0.4 },
      ]}
    >
      {iconFamily === "Community" && (
        <MaterialCommunityIcons
          name={iconName}
          size={size / 2 + 5}
          color={iconColor}
        />
      )}
      {iconFamily === "Material" && (
        <MaterialIcons name={iconName} size={size / 2 + 5} color={iconColor} />
      )}
      {iconFamily === "AntDesign" && (
        <AntDesign name={iconName} size={size / 2 + 5} color={iconColor} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderColor: colors.black,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MapButton;
