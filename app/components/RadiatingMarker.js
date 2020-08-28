import React, { useRef, useEffect, useContext } from "react";
import { Animated, View, StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
import ThemeContext from "../theme/context";

function RadiatingMarker({ coordinate, onPress, title, size = 20 }) {
  const sizeAnim = useRef(new Animated.Value(size)).current;
  const radiusAnim = useRef(new Animated.Value(size / 2)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const { colors } = useContext(ThemeContext);

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
      flat
      anchor={{ x: 0.5, y: 0.5 }}
    >
      <View style={[styles.wrapper, { height: size * 3, width: size * 3 }]}>
        <Animated.View
          style={[
            styles.ring,
            {
              borderColor: colors.primaryMarkerRing,
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
            {
              borderRadius: size / 2,
              height: size,
              width: size,
              backgroundColor: colors.primary,
            },
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
    position: "absolute",
  },
  ring: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RadiatingMarker;
