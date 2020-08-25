import React from "react";
import LottieView from "lottie-react-native";
import { View, ActivityIndicator } from "react-native";
import colors from "../config/colors";

function SavedSearchIndicator({ loading = true, style }) {
  return (
    <View style={style}>
      {loading && <ActivityIndicator color={colors.primary} size="large" />}

      {!loading && (
        <LottieView
          autoPlay
          loop={false}
          source={require("../../assets/animations/checkmark.json")}
        />
      )}
    </View>
  );
}

export default SavedSearchIndicator;
