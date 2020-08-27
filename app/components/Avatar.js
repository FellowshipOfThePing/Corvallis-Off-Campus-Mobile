import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Avatar({ size = 25, color, onPress }) {
  return (
    <>
      {onPress && (
        <TouchableOpacity onPress={onPress}>
          <MaterialCommunityIcons
            name="account-circle-outline"
            size={size}
            color={color}
          />
        </TouchableOpacity>
      )}
      {!onPress && (
        <View onPress={onPress}>
          <MaterialCommunityIcons
            name="account-circle-outline"
            size={size}
            color={color}
          />
        </View>
      )}
    </>
  );
}

export default Avatar;
