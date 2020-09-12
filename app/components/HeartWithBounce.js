import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as Animatable from "react-native-animatable";


const AnimatedIcon = Animatable.createAnimatableComponent(FontAwesome);

function Heart({ saved, onPress, size = 35, colors }) {
  const [animatedIcon, setAnimatedIcon] = useState(null);

  const handleIconRef = (ref) => {
    setAnimatedIcon(ref);
  }

  const handleOnPressLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    animatedIcon.bounceIn();
    onPress();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={1} onPress={() => handleOnPressLike()}>
        <AnimatedIcon
          ref={handleIconRef}
          style={styles.icon}
          name={saved ? "heart" : "heart-o"}
          size={size}
          color={saved ? colors.primary : colors.black}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Heart;
