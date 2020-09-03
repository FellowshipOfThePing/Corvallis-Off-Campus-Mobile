import React from "react";
import LottieView from "lottie-react-native";
import { View, ActivityIndicator } from "react-native";

function SavedSearchIndicator({ loading = true, style, colors }) {
  return (
    <View style={style}>
      {loading && (
        <View
          style={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      )}

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
