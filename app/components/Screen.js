import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Constants from "expo-constants";

function Screen({ children, style, noBottom = false, noTop = false }) {
  if (!noBottom && !noTop) {
    return (
      <SafeAreaView style={[styles.screen, style]}>
        <View style={[{ flex: 1 }, style]}>{children}</View>
      </SafeAreaView>
    );
  } else {
    return (
      <View style={[{ flex: 1 }, style]}>
        <View style={[{ flex: 1 }, style]}>{children}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
});

export default Screen;
