import React, { useRef, useState, useEffect, useContext } from "react";
import { View, StyleSheet, Dimensions, Animated } from "react-native";
import AppText from "./AppText";
import ThemeContext from "../config/context";

const animationDuration = 200;

function ToggleFollowModal({ toggledOn }) {
  const opacityAnim = useRef(new Animated.Value(0)).current;
  // const [initialLoad, setInitialLoad] = useState(true);
  const { colors } = useContext(ThemeContext);

  const fadeThrough = () => {
    Animated.sequence([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
        delay: 700,
      }),
    ]).start();
  };

  useEffect(() => {
    fadeThrough();
  }, [toggledOn]);

  return (
    <Animated.View
      style={[
        styles.titleContainer,
        { opacity: opacityAnim, backgroundColor: colors.fadedBackground2 },
      ]}
    >
      <AppText style={styles.title}>Map-Follows-Scroll</AppText>
      <AppText style={styles.title}>{toggledOn ? "(On)" : "(Off)"}</AppText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    position: "absolute",
    top: Dimensions.get("window").height / 4,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 7,
  },
  title: {
    color: "#f8f4f4",
    fontSize: 25,
  },
});

export default ToggleFollowModal;
