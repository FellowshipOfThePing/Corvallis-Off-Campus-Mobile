import React from "react";
import { StyleSheet, TouchableOpacity, Animated } from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";

import colors from "../config/colors";
import { View } from "react-native-animatable";

function MapButton({
  size = 44,
  onPress,
  style,
  iconName,
  iconColor,
  iconFamily = "Community",
  opacity,
}) {
  return (
    <Animated.View style={{ opacity: opacity }}>
      <TouchableOpacity
        onPress={onPress}
        style={[{ height: size, width: size, borderRadius: size / 2 }, style]}
      >
        {iconFamily === "Community" && (
          <MaterialCommunityIcons
            name={iconName}
            size={size / 2 + 5}
            color={iconColor}
          />
        )}
        {iconFamily === "Material" && (
          <MaterialIcons
            name={iconName}
            size={size / 2 + 5}
            color={iconColor}
          />
        )}
        {iconFamily === "AntDesign" && (
          <AntDesign name={iconName} size={size / 2 + 5} color={iconColor} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

export default MapButton;
