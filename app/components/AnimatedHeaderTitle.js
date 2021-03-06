import React, { useState, useRef, useEffect, useContext } from "react";
import { StyleSheet, Animated } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

import AppText from "./AppText";
import SavedContext from "../firestore/context";

const fadeTime = 200;
const delayTime = 1500;

function AnimatedHeaderTitle({
  headerTitle,
  color,
  textStyle,
  bannerStyle,
  data,
}) {
  const netInfo = useNetInfo();
  const offline =
    netInfo.type !== "unknown" && netInfo.isInternetReachable === false;

  const [initialLoad, setInitialLoad] = useState(true);
  const [fading, setFading] = useState(false);
  const [title, setTitle] = useState(headerTitle);
  const [loginMessageVisible, setLoginMessageVisible] = useState(false);

  const { heartPressed } = useContext(SavedContext);

  const opacityAnim = useRef(new Animated.Value(1)).current;

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
    if (!initialLoad) {
      if (!fading && !offline) {
        setFading(true);
        setTimeout(() => {
          setTitle("Log In to Save Listings");
          setLoginMessageVisible(true);
        }, fadeTime);
        setTimeout(() => {
          setTitle(headerTitle);
          setLoginMessageVisible(false);
        }, fadeTime * 3 + delayTime);
        setTimeout(() => {
          setFading(false);
        }, fadeTime * 4 + delayTime);
        transition();
      }
    } else {
      setInitialLoad(false);
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
      <AppText style={[styles.text, textStyle]}>
        {offline ? "No Internet Connection" : title}
        {!loginMessageVisible && data && data.length > 0
          ? " (" + data.length + ")"
          : null}
      </AppText>
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

export default AnimatedHeaderTitle;
