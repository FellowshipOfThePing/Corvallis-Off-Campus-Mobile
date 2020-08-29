import React, { useState, useRef, useEffect, useContext } from "react";
import { StyleSheet, Animated } from "react-native";
import AppText from "./AppText";
import SavedContext from "../firestore/context";

const fadeTime = 200;
const delayTime = 1500;

function LogInBanner({ headerTitle, color, textStyle, bannerStyle }) {
  const { heartPressed } = useContext(SavedContext);
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const [fading, setFading] = useState(false);
  const [title, setTitle] = useState(headerTitle);

  const transition = () => {
    Animated.sequence([
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: fadeTime,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: fadeTime,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: fadeTime,
        useNativeDriver: true,
        delay: delayTime,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: fadeTime,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (!fading) {
      setFading(true);
      setTimeout(() => {
        setTitle("Log In to Save Listings");
      }, fadeTime);
      setTimeout(() => {
        setTitle(headerTitle);
      }, fadeTime * 3 + delayTime);
      setTimeout(() => {
        setFading(false);
      }, fadeTime * 4 + delayTime);
      transition();
    }
  }, [heartPressed]);

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: color, opacity: opacityAnim },
        bannerStyle,
      ]}
    >
      <AppText style={[styles.text, textStyle]}>{title}</AppText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
});

export default LogInBanner;
