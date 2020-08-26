import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";

import colors from "../config/colors";

function ActivityIndicator({ visible = false, style }) {
  if (!visible) return null;

  return (
    <View style={[styles.overlay, style]}>
      <LottieView
        autoPlay
        loop
        source={require("../../assets/animations/timer.json")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    backgroundColor: colors.white,
    height: "100%",
    width: "100%",
    zIndex: 1,
    opacity: 0.8,
  },
});

export default ActivityIndicator;
