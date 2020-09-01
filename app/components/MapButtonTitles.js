import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, Dimensions, Animated } from "react-native";
import AppText from "./AppText";

const animationDuration = 300;

function MapButtonTitles({ visible, colors, isLefty }) {
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const [initialLoad, setInitialLoad] = useState(true);

  const fadeOut = () => {
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  };

  const fadeIn = () => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    setTimeout(() => {
      fadeOut();
    }, 5000);
  }, []);

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      setTimeout(() => {
        fadeOut();
      }, 2000);
    } else if (visible) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [visible]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.titleContainer,
        { opacity: opacityAnim, backgroundColor: colors.fadedBackground2 },
        isLefty ? { right: 59 } : { left: 59 },
      ]}
    >
      <AppText style={styles.title}>Zoom Out</AppText>
      <AppText style={styles.title}>Zoom to Marker</AppText>
      <AppText style={styles.title}>Toggle Map-Follows-Scroll</AppText>
      <AppText style={styles.title}>Scroll to Beginning of List</AppText>
      <AppText style={styles.title}>Toggle Dropdown</AppText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    position: "absolute",
    top: Dimensions.get("window").height / 8,
    height: Dimensions.get("window").height * 0.375,
    paddingHorizontal: 10,
    justifyContent: "space-around",
    alignItems: "flex-start",
    borderRadius: 7,
  },
  title: {
    color: "#f8f4f4",
  },
});

export default MapButtonTitles;
