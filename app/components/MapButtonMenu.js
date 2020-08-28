import React, { useRef, useState, useEffect, useContext } from "react";
import { StyleSheet, Dimensions, Animated, Easing } from "react-native";

import MapButton from "../components/MapButton";
import ThemeContext from "../theme/context";

function MapButtonMenu({
  onPressZoomButton,
  onPressMarkerButton,
  onPressFollowButton,
  onPressReturnButton,
  onLongPress,
  onPressOut,
}) {
  const { colors, isLefty } = useContext(ThemeContext);
  const initialHeight = Dimensions.get("window").height * 0.375;
  const animationDuration = 300;
  const [expanded, setExpanded] = useState(true);

  const heightAnim = useRef(new Animated.Value(initialHeight)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const rotationAnim = useRef(new Animated.Value(1)).current;

  const rotate = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["8deg", "188deg"],
  });

  useEffect(() => {
    if (expanded === false) {
      collapse();
    } else {
      expand();
    }
  }, [expanded]);

  const collapse = () => {
    Animated.parallel([
      Animated.timing(heightAnim, {
        toValue: 54,
        duration: animationDuration,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(rotationAnim, {
        toValue: 0,
        duration: animationDuration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const expand = () => {
    Animated.parallel([
      Animated.timing(heightAnim, {
        toValue: initialHeight,
        duration: animationDuration,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(rotationAnim, {
        toValue: 1,
        duration: animationDuration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View
      style={[
        styles.sideButtonContainer,
        { height: heightAnim },
        isLefty ? { right: 5 } : { left: 5 },
      ]}
    >
      {expanded && (
        <>
          <MapButton
            style={[
              styles.mapButton,
              { backgroundColor: colors.light, borderColor: colors.black },
            ]}
            iconName="zoom-out-map"
            iconColor={colors.dark}
            onPress={onPressZoomButton}
            iconFamily="Material"
            opacity={opacityAnim}
            onLongPress={onLongPress}
            onPressOut={onPressOut}
          />
          <MapButton
            style={[
              styles.mapButton,
              { backgroundColor: colors.light, borderColor: colors.black },
            ]}
            iconName="map-marker"
            iconColor={colors.dark}
            onPress={onPressMarkerButton}
            iconFamily="Community"
            opacity={opacityAnim}
            onLongPress={onLongPress}
            onPressOut={onPressOut}
          />
          <MapButton
            style={[
              styles.mapButton,
              { backgroundColor: colors.light, borderColor: colors.black },
            ]}
            iconName="map-marker-distance"
            iconColor={colors.dark}
            onPress={onPressFollowButton}
            iconFamily="Community"
            opacity={opacityAnim}
            onLongPress={onLongPress}
            onPressOut={onPressOut}
          />
          <MapButton
            style={[
              styles.mapButton,
              { backgroundColor: colors.light, borderColor: colors.black },
            ]}
            iconName="keyboard-return"
            iconColor={colors.dark}
            onPress={onPressReturnButton}
            iconFamily="Material"
            opacity={opacityAnim}
            onLongPress={onLongPress}
            onPressOut={onPressOut}
          />
        </>
      )}
      <Animated.View style={{ transform: [{ rotate: rotate }] }}>
        <MapButton
          style={[
            styles.mapButton,
            {
              transform: [{ rotate: 3 }],
              backgroundColor: colors.light,
              borderColor: colors.black,
            },
          ]}
          iconName="arrow-drop-up"
          iconColor={colors.dark}
          onPress={() => setExpanded(!expanded)}
          iconFamily="Material"
          onLongPress={onLongPress}
          onPressOut={onPressOut}
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  mapButton: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sideButtonContainer: {
    position: "absolute",
    top: Dimensions.get("window").height / 8,
    paddingHorizontal: 5,
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 7,
  },
});

export default MapButtonMenu;
