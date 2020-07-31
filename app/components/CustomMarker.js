import React, { useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { Marker } from "react-native-maps";

import colors from "../config/colors";

const CustomMarker = ({ coordinate, onPress, selected, size = 10 }) => {
  const sizeAnim = useRef(new Animated.Value(size)).current;
  const radiusAnim = useRef(new Animated.Value(size / 2)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (selected) {
      radiate.start();
    } else {
      radiate.stop();
    }
  }, [selected])

  const radiate = Animated.loop(
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
    );

  return (
    <Marker
      tracksViewChanges={selected ? true : false}
      coordinate={coordinate}
      onPress={onPress}
      flat
      anchor={{ x: 0.5, y: 0.5 }}
    >
      <TouchableOpacity>
        <View style={[styles.wrapper, { height: size * 3, width: size * 3 }]}>
        <Animated.View
          style={[
            styles.ring,
            {
              height: selected ? sizeAnim : 0,
              width: selected ? sizeAnim : 0,
              borderRadius: selected ? radiusAnim : size / 2,
              opacity: selected ? opacityAnim : 0,
              borderWidth: size / 5,
            },
          ]}
        />
          <View
            style={[
              styles.dot,
              {
                backgroundColor: selected ? colors.primary : "green",
                borderRadius: size / 2,
                height: size,
                width: size,
              },
            ]}
          />
        </View>
      </TouchableOpacity>
    </Marker>
  );
};

const styles = StyleSheet.create({
  dot: {
    position: "absolute"
  },
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  ring: {
    borderColor: colors.primaryMarkerRing,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomMarker;
