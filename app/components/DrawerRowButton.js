import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import AppText from "../components/AppText";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function DrawerRowButton({ text, icon, color = colors.black, onPress, style }) {
  return (
    <TouchableOpacity style={[styles.rowButton, style]} onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={32} color={color} />
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
