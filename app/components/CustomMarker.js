import React, { useEffect, useRef, useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { Marker } from "react-native-maps";

const animationDuration = 1500;
const animationDelay = 0;

const CustomMarker = ({ coordinate, onPress, selected, size = 10, colors }) => {
  const selectedSize = size * 1.1;
  const sizeAnim = useRef(new Animated.Value(selected ? selectedSize : size))
    .current;
  const radiusAnim = useRef(new Animated.Value(selected ? size : size / 2))
    .current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (selected) {
      radiate.start();
    } else {
      radiate.stop();
    }
  }, [selected]);

  const radiate = Animated.loop(
    Animated.parallel([
      Animated.timing(sizeAnim, {
        toValue: selectedSize * 3,
        duration: animationDuration,
        delay: animationDelay,
      }),
      Animated.timing(radiusAnim, {
        toValue: selectedSize * 1.5,
        duration: animationDuration,
        delay: animationDelay,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: animationDuration,
        delay: animationDelay,
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
      style={selected ? { zIndex: 9999 } : null}
    >
      <TouchableOpacity
        style={[
          styles.wrapper,
          selected
            ? { height: selectedSize * 3, width: selectedSize * 3 }
            : { height: size * 3, width: size * 3 },
        ]}
      >
        <Animated.View
          style={[
            styles.ring,
            {
              borderColor: colors.primaryMarkerRing,
              height: selected ? sizeAnim : 0,
              width: selected ? sizeAnim : 0,
              borderRadius: selected ? radiusAnim : size / 2,
              opacity: selected ? opacityAnim : 0,
              borderWidth: selected ? selectedSize / 5 : size / 5,
            },
          ]}
        />
        <View
          style={[
            styles.dot,
            {
              backgroundColor: selected ? colors.primary : "#fff",
              borderWidth: 1,
              borderColor: "#000",
              borderRadius: selected ? size : size / 2,
              height: selected ? selectedSize : size,
              width: selected ? selectedSize : size,
            },
          ]}
        />
      </TouchableOpacity>
    </Marker>
  );
};

const styles = StyleSheet.create({
  dot: {
    position: "absolute",
  },
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  ring: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
});

export default React.memo(CustomMarker);
