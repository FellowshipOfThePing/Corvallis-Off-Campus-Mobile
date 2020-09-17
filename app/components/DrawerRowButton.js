import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import AppText from "../components/AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function DrawerRowButton({ text, icon, color, onPress, style, colors }) {
  return (
    <TouchableOpacity delayPressIn={0} style={[styles.rowButton, style]} onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={32} color={color ? color : colors.dark} />
      <AppText style={styles.rowButtonText}>{text}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  rowButton: {
    alignItems: "center",
    flexDirection: "row",
    height: "33%",
    paddingLeft: 15,
  },
  rowButtonText: {
    paddingLeft: 10,
  },
});

export default DrawerRowButton;
