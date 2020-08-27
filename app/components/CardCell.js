import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import AppText from "../components/AppText";
import ThemeContext from "../config/context";

function CardCell({
  style,
  iconName,
  iconSize,
  iconColor,
  leftValue,
  rightValue,
  endingText = "",
  changed,
}) {
  const { colors } = useContext(ThemeContext);
  return (
    <View style={[style, changed ? { backgroundColor: colors.primary } : null]}>
      <FontAwesome5
        name={iconName}
        size={iconSize}
        color={changed ? colors.white : iconColor}
      />
      <AppText
        style={[styles.cellText, changed ? { color: colors.white } : null]}
      >
        {leftValue} - {rightValue} {endingText}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  cellText: {
    fontSize: 15,
    paddingTop: 8,
  },
});

export default CardCell;
