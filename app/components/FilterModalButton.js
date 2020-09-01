import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Dimensions, Animated } from "react-native";

import Button from "../components/Button";
import SavedSearchIndicator from "../components/SavedSearchIndicator";

function FilterModalButton({ onPress, title, textSize, colors, style, loading }) {
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const fadeOut = () => {
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: fadeDuration,
      useNativeDriver: true,
    }).start();
  };

  const fadeIn = () => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: fadeDuration,
      useNativeDriver: true,
    }).start();
  };
  return (
    <Animated.View style={{ opacity: opacityAnim }}>
      {!saving && (
        <Button
          style={[styles.button]}
          title={title}
          textSize={textSize}
          color={colors.primary}
          onPress={() => onSave()}
        />
      )}
      {saving && (
        <SavedSearchIndicator loading={refreshing} style={[styles.button]} />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: buttonDiameter,
    width: buttonDiameter,
    borderRadius: buttonDiameter / 2,
  },
});

export default FilterModalButton;
