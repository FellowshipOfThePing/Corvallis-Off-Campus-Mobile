import React, { useState, useContext, useRef } from "react";
import { StyleSheet, View, Dimensions, Animated } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";

import SliderSection from "../components/SliderSection";
import Button from "../components/Button";
import colors from "../config/colors";
import ApiContext from "../api/context";
import SavedContext from "../firestore/context";
import AuthContext from "../auth/context";
import SavedSearchIndicator from "../components/SavedSearchIndicator";

const buttonDiameter = Dimensions.get("window").height * 0.09;
const fadeDuration = 300;

export default function FilterModalScreen({ navigation }) {
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const { user, setUser } = useContext(AuthContext);
  const { getListingsApi, filterState, setFilterState } = useContext(
    ApiContext
  );
  const {
    refreshing,
    savedSearches,
    saveSearch,
    setSavedSearches,
  } = useContext(SavedContext);

  const [saving, setSaving] = useState(false);

  const [priceLow, setPriceLow] = useState(filterState.price_low);
  const [priceHigh, setPriceHigh] = useState(filterState.price_high);
  const [bedsLow, setBedsLow] = useState(filterState.beds_low);
  const [bedsHigh, setBedsHigh] = useState(filterState.beds_high);
  const [bathsLow, setBathsLow] = useState(filterState.baths_low);
  const [bathsHigh, setBathsHigh] = useState(filterState.baths_high);
  const [distanceLow, setDistanceLow] = useState(filterState.distance_low);
  const [distanceHigh, setDistanceHigh] = useState(filterState.distance_high);
  const [driveLow, setDriveLow] = useState(filterState.drive_low);
  const [driveHigh, setDriveHigh] = useState(filterState.drive_high);
  const [walkLow, setWalkLow] = useState(filterState.walk_low);
  const [walkHigh, setWalkHigh] = useState(filterState.walk_high);

  const fadeOut = () => {
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: fadeDuration,
    }).start();
  };

  const fadeIn = () => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: fadeDuration,
    }).start();
  };

  const onClear = () => {
    if (!saving) {
      setPriceLow(0);
      setPriceHigh(5000);
      setBedsLow(1);
      setBedsHigh(5);
      setBathsLow(1);
      setBathsHigh(5);
      setDistanceLow(0);
      setDistanceHigh(25);
      setDriveLow(0);
      setDriveHigh(40);
      setWalkLow(0);
      setWalkHigh(50);
    }
  };

  const onApply = () => {
    if (!saving) {
      setTimeout(() => {
        setFilterState({
          price_low: priceLow,
          price_high: priceHigh,
          beds_low: bedsLow,
          beds_high: bedsHigh,
          baths_low: bathsLow,
          baths_high: bathsHigh,
          distance_low: distanceLow,
          distance_high: distanceHigh,
          drive_low: driveLow,
          drive_high: driveHigh,
          walk_low: walkLow,
          walk_high: walkHigh,
        });
      }, 1000);
      navigation.pop();
    }
  };

  const onSave = () => {
    if (user !== null) {
      setSaving(true);
      let saved = savedSearches;
      saved.push({
        price_low: priceLow,
        price_high: priceHigh,
        beds_low: bedsLow,
        beds_high: bedsHigh,
        baths_low: bathsLow,
        baths_high: bathsHigh,
        distance_low: distanceLow,
        distance_high: distanceHigh,
        drive_low: driveLow,
        drive_high: driveHigh,
        walk_low: walkLow,
        walk_high: walkHigh,
      });
      setSavedSearches(saved);
      saveSearch();
      setTimeout(() => {
        fadeOut();
        setTimeout(() => {
          setSaving(false);
          fadeIn();
        }, fadeDuration);
      }, 1500);
    }
  };

  return (
    <View style={styles.panel}>
      <View style={styles.topRow}>
        <View style={styles.buttonSection}>
          <Button
            style={styles.button}
            title="Apply"
            onPress={() => onApply()}
            textSize={buttonDiameter / 6}
          />
          <Button
            style={[styles.button, { borderWidth: 2, borderColor: "black" }]}
            title="Clear"
            onPress={() => onClear()}
            textSize={buttonDiameter / 6}
            color="white"
            textColor="black"
          />
          <Animated.View style={{ opacity: opacityAnim }}>
            {!saving && (
              <Button
                style={[styles.button]}
                title="Save"
                textSize={buttonDiameter / 6}
                color="primary"
                onPress={() => onSave()}
              />
            )}
            {saving && (
              <SavedSearchIndicator
                loading={refreshing}
                style={[styles.button]}
              />
            )}
          </Animated.View>
          <Button
            style={[styles.button, { borderWidth: 2, borderColor: "black" }]}
            title={
              <AntDesign name="close" size={buttonDiameter / 2} color="black" />
            }
            onPress={() => {
              if (!saving) {
                navigation.pop();
              }
            }}
            textSize={buttonDiameter / 6}
            color="white"
            textColor="black"
          />
        </View>
      </View>
      <SliderSection
        title="Price Range"
        changeFilterLow={setPriceLow}
        changeFilterHigh={setPriceHigh}
        initialValues={[priceLow, priceHigh]}
        extremes={[0, 5000]}
        step={100}
        snapped
      />
      <SliderSection
        title="Beds"
        initialValues={[bedsLow, bedsHigh]}
        snapped
        changeFilterLow={setBedsLow}
        changeFilterHigh={setBedsHigh}
        extremes={[1, 5]}
      />
      <SliderSection
        title="Baths"
        initialValues={[bathsLow, bathsHigh]}
        snapped
        changeFilterLow={setBathsLow}
        changeFilterHigh={setBathsHigh}
        extremes={[1, 5]}
      />
      <SliderSection
        title="Distance to Campus - Miles"
        changeFilterLow={setDistanceLow}
        changeFilterHigh={setDistanceHigh}
        initialValues={[distanceLow, distanceHigh]}
        extremes={[0, 25]}
      />
      <SliderSection
        title="Drive Time to Campus - Minutes"
        changeFilterLow={setDriveLow}
        changeFilterHigh={setDriveHigh}
        initialValues={[driveLow, driveHigh]}
        extremes={[0, 40]}
        step={5}
        snapped
      />
      <SliderSection
        title="Walk Time to Campus - Minutes"
        changeFilterLow={setWalkLow}
        changeFilterHigh={setWalkHigh}
        initialValues={[walkLow, walkHigh]}
        extremes={[0, 50]}
        step={5}
        snapped
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
  },
  panel: {
    height: "100%",
    backgroundColor: colors.white,
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
  },
  topRow: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  buttonSection: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    height: buttonDiameter,
    width: buttonDiameter,
    borderRadius: buttonDiameter / 2,
  },
  loadingIndicator: {
    position: "absolute",
    alignSelf: "center",
    top: 350,
  },
});
