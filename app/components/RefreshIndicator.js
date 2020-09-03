import React from "react";
import { View } from "react-native";

import LottieView from "lottie-react-native";

function RefreshIndicator({ lottieRef }) {
  return (
    <View style={{ position: "absolute", width: "100%", height: 70 }}>
      <LottieView
        ref={lottieRef}
        source={require("../../assets/animations/loading.json")}
      />
    </View>
  );
}

export default RefreshIndicator;
