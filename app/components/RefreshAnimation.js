import React from "react";
import { StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

function RefreshAnimation({ refreshingHeight }) {
  return (
    <LottieView
      autoPlay
      loop
      source={require("../../assets/animations/loading.json")}
      style={[styles.lottieView, { height: refreshingHeight }]}
    />
  );
}

const styles = StyleSheet.create({
  lottieView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
});

export default RefreshAnimation;
