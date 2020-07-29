import React, { useRef, useEffect } from "react";
import { Animated, View, StyleSheet } from "react-native";
import { Marker } from "react-native-maps";

import colors from "../config/colors";

function RadiatingMarker({ coordinate, onPress, title, size = 20 }) {
  const sizeAnim = useRef(new Animated.Value(size)).current;
  const radiusAnim = useRef(new Animated.Value(size / 2)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    radiate();
  }, []);

  const radiate = () => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(sizeAnim, {
          toValue: size * 3,
          duration: 1500,
          delay: 500,
        }),
        Animated.timing(radiusAnim, {
          toValue: size * 1.5,
          duration: 1500,
          delay: 500,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 1500,
          delay: 500,
        }),
      ])
    ).start();
  };

  return (
    <Marker
      coordinate={coordinate}
      title={title}
      onPress={onPress}
    >
      <View style={[styles.wrapper, { height: size * 3, width: size * 3 }]}>
        <Animated.View
          style={[
            styles.ring,
            {
              height: sizeAnim,
              width: sizeAnim,
              borderRadius: radiusAnim,
              opacity: opacityAnim,
              borderWidth: size / 5,
            },
          ]}
        />
        <View
          style={[
            styles.dot,
            { borderRadius: size / 2, height: size, width: size },
          ]}
        />
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    backgroundColor: colors.primary,
    position: "absolute",
  },
  ring: {
    borderColor: colors.primaryMarkerRing,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RadiatingMarker;