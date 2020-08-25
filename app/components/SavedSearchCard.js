import React, { useRef, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";

import Button from "./Button";
import CardCell from "../components/CardCell";
import colors from "../config/colors";

const borderWidth = 1;
const borderColor = colors.gray;
const iconColor = colors.gray;
const iconSize = 25;
const animationDuration = 300;

function SavedSearchCard({
  savedSearch,
  onPress,
  onPressDelete,
  onPressApply,
  expanded,
}) {
  const priceChanged =
    savedSearch.price_low > 0 || savedSearch.price_high < 5000;
  const bedsChanged = savedSearch.beds_low > 1 || savedSearch.beds_high < 5;
  const bathsChanged = savedSearch.baths_low > 1 || savedSearch.baths_high < 5;
  const distanceChanged =
    savedSearch.distance_low > 0 || savedSearch.distance_high < 25;
  const walkChanged = savedSearch.walk_low > 0 || savedSearch.walk_high < 50;
  const driveChanged = savedSearch.drive_low > 0 || savedSearch.drive_high < 40;

  const opacityAnim = useRef(new Animated.Value(0)).current;
  const paddingAnim = useRef(new Animated.Value(0)).current;

  const expand = () => {
    Animated.parallel([
      Animated.timing(paddingAnim, {
        toValue: 75,
        duration: animationDuration,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: animationDuration,
        delay: animationDuration / 2,
      }),
    ]).start();
  };

  const collapse = () => {
    Animated.parallel([
      Animated.timing(paddingAnim, {
        toValue: 0,
        duration: animationDuration,
        delay: animationDuration / 3,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: animationDuration,
      }),
    ]).start();
  };

  useEffect(() => {
    if (expanded) {
      expand();
    } else {
      collapse();
    }
  }, [expanded]);

  return (
    <Animated.View
      style={[styles.cardContainer, { paddingBottom: paddingAnim }]}
    >
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.4}
        onPress={onPress}
      >
        <View style={[styles.cardRow, styles.topRow]}>
          <CardCell
            style={[styles.cell, styles.leftCell]}
            iconName="dollar-sign"
            iconSize={iconSize}
            iconColor={iconColor}
            leftValue={savedSearch.price_low}
            rightValue={savedSearch.price_high}
            changed={priceChanged}
          />
          <CardCell
            style={styles.cell}
            iconName="bed"
            iconSize={iconSize}
            iconColor={iconColor}
            leftValue={savedSearch.beds_low}
            rightValue={savedSearch.beds_high}
            changed={bedsChanged}
          />
          <CardCell
            style={[styles.cell, styles.rightCell]}
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
            style={[styles.cell, styles.leftCell]}
            iconName="school"
            iconSize={iconSize}
            iconColor={iconColor}
            leftValue={savedSearch.distance_low}
            rightValue={savedSearch.distance_high}
            endingText="miles"
            changed={distanceChanged}
          />
          <CardCell
            style={styles.cell}
            iconName="walking"
            iconSize={iconSize}
            iconColor={iconColor}
            leftValue={savedSearch.walk_low}
            rightValue={savedSearch.walk_high}
            endingText="min"
            changed={walkChanged}
          />
          <CardCell
            style={[styles.cell, styles.rightCell]}
            iconName="car-side"
            iconSize={iconSize}
            iconColor={iconColor}
            leftValue={savedSearch.drive_low}
            rightValue={savedSearch.drive_high}
            endingText="min"
            changed={driveChanged}
          />
        </View>
      </TouchableOpacity>
      <Animated.View style={[styles.buttonContainer, { opacity: opacityAnim }]}>
        <Button style={styles.button} title="Apply" onPress={onPressApply} />
        <Button
          style={styles.button}
          title="Delete"
          color="danger"
          onPress={onPressDelete}
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    zIndex: 1,
  },
  button: {
    flex: 1,
    margin: 10,
  },
  card: {
    borderRadius: 15,
    overflow: "hidden",
    width: "100%",
    height: 200,
    borderWidth: borderWidth,
    borderColor: borderColor,
    backgroundColor: colors.white,
    zIndex: 50,
  },
  cardContainer: {
    borderRadius: 15,
    marginBottom: 20,
  },
  cardRow: {
    flexDirection: "row",
    height: "50%",
  },
  topRow: {
    borderBottomWidth: borderWidth,
    borderBottomColor: borderColor,
  },
  cell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  leftCell: {
    borderRightColor: borderColor,
    borderRightWidth: borderWidth,
  },
  rightCell: {
    borderLeftColor: borderColor,
    borderLeftWidth: borderWidth,
  },
});

export default SavedSearchCard;
