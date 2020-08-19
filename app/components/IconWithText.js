import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import AppText from "./AppText";
import colors from "../config/colors";

function IconWithText({
  iconName,
  iconSize = 20,
  color = colors.medium,
  quantity,
  textValue,
  visible,
}) {
  if (!visible) {
    return null;
  }

  const windowWidth = useWindowDimensions().width;
  let iconSizeOverride;
  if (windowWidth < 500) {
    iconSizeOverride = Math.round((iconSize * windowWidth) / 500);
  }

  return (
    <>
      <FontAwesome5
        name={iconName}
        size={iconSize || iconSizeOverride}
        color={color}
        style={styles.icon}
      />
      <AppText style={styles.iconText}>
        {quantity} {textValue}
      </AppText>
    </>
  );
}

export default IconWithText;

const styles = StyleSheet.create({
  iconText: {
    marginHorizontal: 9,
    fontSize: 15,
  },
  icon: {},
});
