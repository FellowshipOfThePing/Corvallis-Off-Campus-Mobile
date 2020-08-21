import React, { useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import colors from "../config/colors";

function Heart({ saved, onPress, size = 35 }) {
  const handleOnPressLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    onPress();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={1} onPress={() => handleOnPressLike()}>
        <FontAwesome
          style={styles.icon}
          name={saved ? "heart" : "heart-o"}
          size={size}
          color={saved ? colors.primary : colors.black}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default React.memo(Heart);
