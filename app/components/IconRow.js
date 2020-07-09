import React from "react";
import { View, StyleSheet } from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import colors from "../config/colors";
import AppText from "../components/AppText";

function IconRow({ listing, size = 20, fullSize, style }) {
  return (
    <View style={[styles.iconRow, style]}>
      {listing.beds && (
        <>
          <FontAwesome
            name="bed"
            size={size}
            color={colors.medium}
            style={styles.icon}
          />
          <AppText style={[styles.iconText, { fontSize: size }]}>{listing.beds} bd</AppText>
        </>
      )}
      {listing.baths && (
        <>
          <FontAwesome5
            name="bath"
            size={size}
            color={colors.medium}
            style={styles.icon}
          />
          <AppText style={[styles.iconText, { fontSize: size }]}>{listing.baths} ba</AppText>
        </>
      )}
      {listing.sqft && fullSize && (
        <>
          <FontAwesome5
            name="ruler-combined"
            size={size}
            color={colors.medium}
            style={styles.icon}
          />
          <AppText style={[styles.iconText, { fontSize: size }]}>{listing.sqft} sqft</AppText>
        </>
      )}
      {listing.walk_to_campus_minutes < 30 && fullSize && (
        <>
          <FontAwesome5
            name="walking"
            size={size}
            color={colors.medium}
            style={styles.icon}
          />
          <AppText style={[styles.iconText, { fontSize: size }]}>{Math.round(listing.walk_to_campus_minutes)} min</AppText>
        </>
      )}
      {listing.walk_to_campus_minutes > 30 && fullSize && (
        <>
          <FontAwesome5
            name="car-side"
            size={size}
            color={colors.medium}
            style={styles.icon}
          />
          <AppText style={[styles.iconText, { fontSize: size }]}>{Math.round(listing.drive_to_campus_minutes)} min</AppText>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  iconRow: {
    flexDirection: "row",
  },
  iconText: {
    marginHorizontal: 9,
  },
});

export default IconRow;
