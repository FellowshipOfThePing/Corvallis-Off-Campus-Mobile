import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Animated } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

const animationDuration = 200;

function ToggleFollowModal({ toggledOn }) {
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [initialLoad, setInitialLoad] = useState(true);

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
    if (!initialLoad) {
      fadeThrough();
    } else {
      setInitialLoad(false);
    }
  }, [toggledOn]);

  return (
    <Animated.View style={[styles.titleContainer, { opacity: opacityAnim }]}>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 7,
  },
  title: {
    color: colors.light,
    fontSize: 25,
  },
});

export default ToggleFollowModal;
