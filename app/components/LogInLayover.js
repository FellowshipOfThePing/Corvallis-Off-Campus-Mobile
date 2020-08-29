import React, { useState, useRef, useEffect, useContext } from "react";
import { StyleSheet, Animated } from "react-native";
import AppText from "./AppText";
import SavedContext from "../firestore/context";

const fadeTime = 200;
const delayTime = 1200;

function LogInLayover({ color, textStyle }) {
  const { heartPressed } = useContext(SavedContext);
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [fading, setFading] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  const transition = () => {
    Animated.sequence([
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
    ]).start();
  };

  useEffect(() => {
    if (!fading && !firstRender) {
      setFading(true);
      setTimeout(() => {
        setFading(false);
      }, fadeTime * 2 + delayTime);
      transition();
    } else {
      setFirstRender(false);
    }
  }, [heartPressed]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.container,
        { backgroundColor: color, opacity: opacityAnim },
      ]}
    >
      <AppText style={[styles.text, textStyle]}>
        Log In to Save Listings
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
    position: "absolute",
  },
  text: {
    color: "#fff",
  },
});

export default LogInLayover;
