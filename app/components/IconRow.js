import React from "react";
import { View, StyleSheet } from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import colors from "../config/colors";
import AppText from "../components/AppText";

function IconRow({ listing, style }) {
  return (
    <View style={[styles.iconRow, style]}>
      {listing.beds && (
        <>
          <FontAwesome
            name="bed"
            size={20}
            color={colors.medium}
            style={styles.icon}
          />
          <AppText style={styles.iconText}>{listing.beds} bd</AppText>
        </>
      )}
      {listing.baths && (
        <>
          <FontAwesome5
            name="bath"
            size={20}
            color={colors.medium}
            style={styles.icon}
          />
          <AppText style={styles.iconText}>{listing.baths} ba</AppText>
        </>
      )}
      {listing.sqft && (
        <>
          <FontAwesome5
            name="ruler-combined"
            size={20}
            color={colors.medium}
            style={styles.icon}
          />
          <AppText style={styles.iconText}>{listing.sqft} sqft</AppText>
        </>
      )}
      {listing.walk_to_campus_minutes < 30 && (
        <>
          <FontAwesome5
            name="walking"
            size={20}
            color={colors.medium}
            style={styles.icon}
          />
          <AppText style={styles.iconText}>{Math.round(listing.walk_to_campus_minutes)} min</AppText>
        </>
      )}
      {listing.walk_to_campus_minutes > 30 && (
        <>
          <FontAwesome5
            name="car-side"
            size={20}
            color={colors.medium}
            style={styles.icon}
          />
          <AppText style={styles.iconText}>{Math.round(listing.drive_to_campus_minutes)} min</AppText>
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
