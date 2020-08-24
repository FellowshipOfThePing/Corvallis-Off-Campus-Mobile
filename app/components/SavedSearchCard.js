import React from "react";
import { View, StyleSheet } from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import AppText from "../components/AppText";
import colors from "../config/colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import CardCell from "../components/CardCell";

const borderWidth = 1;
const borderColor = colors.gray;
const iconColor = colors.gray;
const iconSize = 25;

function SavedSearchCard({ savedSearch }) {
  const priceChanged = savedSearch.price_low > 0 || savedSearch.price_high < 5000;
  const bedsChanged = savedSearch.beds_low > 1 || savedSearch.beds_high < 5;
  const bathsChanged = savedSearch.baths_low > 1 || savedSearch.baths_high < 5;
  const distanceChanged = savedSearch.distance_low > 0 || savedSearch.distance_high < 25;
  const walkChanged = savedSearch.walk_low > 0 || savedSearch.walk_high < 50;
  const driveChanged = savedSearch.drive_low > 0 || savedSearch.drive_high < 40;

  return (
    <TouchableWithoutFeedback style={styles.card} activeOpacity={0.4}>
      <View>
        <View style={[styles.cardRow, styles.topRow]}>
          <CardCell
            style={styles.leftCell}
            iconName="dollar-sign"
            iconSize={iconSize}
            iconColor={iconColor}
            leftValue={savedSearch.price_low}
            rightValue={savedSearch.price_high}
            changed={priceChanged}
          />
          <CardCell
            style={styles.centerCell}
            iconName="bed"
            iconSize={iconSize}
            iconColor={iconColor}
            leftValue={savedSearch.beds_low}
            rightValue={savedSearch.beds_high}
            changed={bedsChanged}
          />
          <CardCell
            style={styles.rightCell}
            iconName="bath"
            iconSize={iconSize}
            iconColor={iconColor}
            leftValue={savedSearch.baths_low}
            rightValue={savedSearch.baths_high}
            changed={bathsChanged}
          />
        </View>
        <View style={styles.cardRow}>
          <CardCell
            style={styles.leftCell}
            iconName="school"
            iconSize={iconSize}
            iconColor={iconColor}
            leftValue={savedSearch.distance_low}
            rightValue={savedSearch.distance_high}
            endingText="miles"
            changed={distanceChanged}
          />
          <CardCell
            style={styles.centerCell}
            iconName="walking"
            iconSize={iconSize}
            iconColor={iconColor}
            leftValue={savedSearch.walk_low}
            rightValue={savedSearch.walk_high}
            endingText="min"
            changed={walkChanged}
          />
          <CardCell
            style={styles.rightCell}
            iconName="car-side"
            iconSize={iconSize}
            iconColor={iconColor}
            leftValue={savedSearch.drive_low}
            rightValue={savedSearch.drive_high}
            endingText="min"
            changed={driveChanged}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
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
});

export default SavedSearchCard;
