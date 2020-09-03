import React, { useRef } from "react";
import { Animated } from "react-native";

import LottieView from "lottie-react-native";

function RefreshIndicator({ lottieRef, darkMode, opacity }) {
  return (
    <Animated.View
      style={{
        position: "absolute",
        width: "100%",
        height: 50,
        marginTop: 5,
        opacity,
      }}
    >
      <LottieView
        ref={lottieRef}
        source={
          darkMode
            ? require("../../assets/animations/house_roof_bounce_white.json")
            : require("../../assets/animations/house_roof_bounce_primary.json")
        }
      />
    </Animated.View>
  );
}

export default RefreshIndicator;
