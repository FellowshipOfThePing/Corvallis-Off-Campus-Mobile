import React from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import AppText from "../components/AppText";
import colors from "../config/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const borderWidth = 1;
const borderColor = colors.gray;
const iconColor = colors.gray;
const iconSize = 25;

function SavedSearchCard({ savedSearch }) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.4}
    >
      <View>
        <View style={[styles.cardRow, styles.topRow]}>
          <View style={styles.leftCell}>
            <FontAwesome5
              name="dollar-sign"
              size={iconSize}
              color={iconColor}
            />
            <AppText style={styles.cellText}>
              {savedSearch.price_low} - {savedSearch.price_high}
            </AppText>
          </View>
          <View style={styles.centerCell}>
            <FontAwesome5 name="bed" size={iconSize} color={iconColor} />
            <AppText style={styles.cellText}>
              {savedSearch.beds_low} - {savedSearch.beds_high} beds
            </AppText>
          </View>
          <View style={styles.rightCell}>
            <FontAwesome5 name="bath" size={iconSize} color={iconColor} />
            <AppText style={styles.cellText}>
              {savedSearch.baths_low} - {savedSearch.baths_high} baths
            </AppText>
          </View>
        </View>
        <View style={styles.cardRow}>
          <View style={styles.leftCell}>
            <FontAwesome5 name="school" size={iconSize} color={iconColor} />
            <AppText style={styles.cellText}>
              {savedSearch.distance_low} - {savedSearch.distance_high} miles
            </AppText>
          </View>
          <View style={styles.centerCell}>
            <FontAwesome5 name="walking" size={iconSize} color={iconColor} />
            <AppText style={styles.cellText}>
              {savedSearch.walk_low} - {savedSearch.walk_high} min
            </AppText>
          </View>
          <View style={styles.rightCell}>
            <FontAwesome5 name="car-side" size={iconSize} color={iconColor} />
            <AppText style={styles.cellText}>
              {savedSearch.drive_low} - {savedSearch.drive_high} min
            </AppText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
    width: "100%",
    height: 200,
    borderWidth: borderWidth,
    borderColor: borderColor,
    backgroundColor: colors.white,
  },
  cardRow: {
    flexDirection: "row",
    height: "50%",
  },
  topRow: {
    borderBottomWidth: borderWidth,
    borderBottomColor: borderColor,
  },
  centerCell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  leftCell: {
    flex: 1,
    borderRightColor: borderColor,
    borderRightWidth: borderWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  rightCell: {
    flex: 1,
    borderLeftColor: borderColor,
    borderLeftWidth: borderWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    fontSize: 15,
    paddingTop: 8,
  },
});

export default SavedSearchCard;
