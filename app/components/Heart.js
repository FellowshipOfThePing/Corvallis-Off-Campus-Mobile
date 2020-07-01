import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";

import colors from "../config/colors";

function Heart({ onPress, saved, size = 30 }) {
  return (
    <View style={styles.container}>
      {saved && (
        <FontAwesome
          name="heart"
          size={size}
          color={colors.primary}
          onPress={onPress}
        />
      )}
      {!saved && (
        <FontAwesome
          name="heart-o"
          size={size}
          color={colors.black}
          onPress={onPress}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Heart;
