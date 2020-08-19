import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import colors from "../config/colors";

function LoadingModal() {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    opacity: 0.9,
    borderRadius: 15,
  },
});

export default LoadingModal;
