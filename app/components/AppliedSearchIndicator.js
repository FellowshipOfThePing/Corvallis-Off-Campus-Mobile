import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";

function SavedSearchIndicator({ style }) {
  return (
    <View style={[styles.overlay, style]}>
      <LottieView
        autoPlay
        loop
        source={require("../../assets/animations/loading.json")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 1,
    opacity: 0.8,
  },
});

export default SavedSearchIndicator;
