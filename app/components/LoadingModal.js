import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

function LoadingModal({ style, colors }) {
  return (
    <View
      style={[styles.container, { backgroundColor: colors.white }, style]}
      pointerEvents="none"
    >
      <ActivityIndicator animating={true} size="large" color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.9,
    borderRadius: 15,
  },
});

export default LoadingModal;
