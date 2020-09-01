import React, { useRef, useEffect, useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";

import Button from "./Button";
import CardCell from "../components/CardCell";

function SavedSearchCard({
  savedSearch,
  onPress,
  onPressDelete,
  onPressApply,
  expanded,
  colors
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

  const borderWidth = 1;
  const borderColor = colors.gray;
  const iconColor = colors.gray;
  const iconSize = 25;
  const animationDuration = 300;

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
        style={[
          styles.card,
          {
            backgroundColor: colors.white,
            borderWidth: borderWidth,
            borderColor: borderColor,
          },
        ]}
        activeOpacity={0.4}
        onPress={onPress}
      >
        <View
          style={[
            styles.cardRow,
            { borderBottomWidth: borderWidth, borderBottomColor: borderColor },
          ]}
        >
          <CardCell
            style={[
              styles.cell,
              {
                borderRightColor: borderColor,
                borderRightWidth: borderWidth,
              },
            ]}
            iconName="dollar-sign"
            iconSize={iconSize}
            iconColor={iconColor}
            leftValue={savedSearch.price_low}
            rightValue={savedSearch.price_high}
            changed={priceChanged}
            colors={colors}
          />
          <CardCell
            style={styles.cell}
            iconName="bed"
            iconSize={iconSize}
            iconColor={iconColor}
            leftValue={savedSearch.beds_low}
            rightValue={savedSearch.beds_high}
            changed={bedsChanged}
            colors={colors}
          />
          <CardCell
            style={[
              styles.cell,
              {
                borderLeftColor: borderColor,
                borderLeftWidth: borderWidth,
              },
            ]}
            iconName="bath"
            iconSize={iconSize}
            iconColor={iconColor}
            leftValue={savedSearch.baths_low}
            rightValue={savedSearch.baths_high}
            changed={bathsChanged}
            colors={colors}
          />
        </View>
        <View style={styles.cardRow}>
          <CardCell
            style={[
              styles.cell,
              {
                borderRightColor: borderColor,
                borderRightWidth: borderWidth,
              },
            ]}
            iconName="school"
            iconSize={iconSize}
            iconColor={iconColor}
            leftValue={savedSearch.distance_low}
            rightValue={savedSearch.distance_high}
            endingText="miles"
            changed={distanceChanged}
            colors={colors}
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
            colors={colors}
          />
          <CardCell
            style={[
              styles.cell,
              {
                borderLeftColor: borderColor,
                borderLeftWidth: borderWidth,
              },
            ]}
            iconName="car-side"
            iconSize={iconSize}
            iconColor={iconColor}
            leftValue={savedSearch.drive_low}
            rightValue={savedSearch.drive_high}
            endingText="min"
            changed={driveChanged}
            colors={colors}
          />
        </View>
      </TouchableOpacity>
      <Animated.View style={[styles.buttonContainer, { opacity: opacityAnim }]}>
        <Button style={styles.button} title="Apply" onPress={onPressApply} />
        <Button
          style={styles.button}
          title="Delete"
          color={colors.danger}
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
  cell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SavedSearchCard;
