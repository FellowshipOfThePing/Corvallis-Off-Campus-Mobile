import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function GoToMapButton({ size = 44, onPress, style, colors }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          height: size,
          width: size,
          borderRadius: size / 2,
          backgroundColor: colors.white,
          borderColor: colors.black,
        },
        style,
      ]}
    >
      <MaterialCommunityIcons
        name="google-maps"
        size={30}
        color={colors.primary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GoToMapButton;
