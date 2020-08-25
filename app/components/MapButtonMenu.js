import React from "react";
import { View, StyleSheet } from "react-native";
import MapButton from "../components/MapButton";
import colors from "../config/colors";

function MapButtonMenu({
  style,
  onPressZoomButton,
  onPressMarkerButton,
  onPressFollowButton,
  onPressReturnButton,
  onPressMenuToggleButton,
  following = true
}) {
  return (
    <View style={style}>
      <MapButton
        style={styles.mapButton}
        iconName="zoom-out-map"
        iconColor={colors.dark}
        onPress={onPressZoomButton}
        iconFamily="Material"
      />
      <MapButton
        style={styles.mapButton}
        iconName="map-marker"
        iconColor={colors.dark}
        onPress={onPressMarkerButton}
        iconFamily="Community"
      />
      <MapButton
        style={styles.mapButton}
        iconName="map-marker-distance"
        iconColor={colors.dark}
        onPress={onPressFollowButton}
        iconFamily="Community"
        active={following}
      />
      <MapButton
        style={styles.mapButton}
        iconName="keyboard-return"
        iconColor={colors.dark}
        onPress={onPressReturnButton}
        iconFamily="Material"
      />
      <MapButton
        style={styles.mapButton}
        iconName="arrow-drop-up"
        iconColor={colors.dark}
        onPress={() => console.log("Toggle Buttons Pressed")}
        iconFamily="Material"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mapButton: {
    backgroundColor: colors.light,
  },
});

export default MapButtonMenu;
