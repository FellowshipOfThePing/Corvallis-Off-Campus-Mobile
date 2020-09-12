import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";

function SavedSearchIndicator({ style, ref, darkMode }) {
  return (
    <View style={[styles.overlay, style]}>
      {!darkMode && (
        <LottieView
          ref={ref}
          autoPlay
          loop
          source={require("../../assets/animations/loading.json")}
        />
      )}
      {darkMode && (
        <LottieView
          ref={ref}
          autoPlay
          loop
          source={require("../../assets/animations/loading_white.json")}
        />
      )}
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
