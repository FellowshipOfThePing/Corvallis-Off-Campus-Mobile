import React from "react";
import { StyleSheet, View } from "react-native";

import MapButton from "../components/MapButton";

function MiniMapButtonMenu({
  onPressGoToMap,
  onPressWalking,
  onPressDriving,
  style,
  colors,
  isLefty,
}) {
  return (
    <View
      style={[
        styles.sideButtonContainer,
        style,
        isLefty ? { right: 5 } : { left: 5 },
      ]}
    >
      <MapButton
        style={[
          styles.mapButton,
          { backgroundColor: colors.light, borderColor: colors.black },
        ]}
        iconName="google-maps"
        iconColor={colors.dark}
        onPress={onPressGoToMap}
      />
      <MapButton
        style={[
          styles.mapButton,
          { backgroundColor: colors.light, borderColor: colors.black },
        ]}
        iconName="walking"
        iconFamily="FontAwesome5"
        iconColor={colors.dark}
        onPress={onPressWalking}
      />
      <MapButton
        style={[
          styles.mapButton,
          { backgroundColor: colors.light, borderColor: colors.black },
        ]}
        iconName="car-side"
        iconFamily="FontAwesome5"
        iconColor={colors.dark}
        onPress={onPressDriving}
        iconSize={23}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mapButton: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sideButtonContainer: {
    position: "absolute",
    top: 15,
    bottom: 50,
    paddingHorizontal: 5,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 7,
  },
});

export default MiniMapButtonMenu;
