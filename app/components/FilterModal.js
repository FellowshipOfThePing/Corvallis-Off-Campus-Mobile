import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import SliderSection from "./SliderSection";
import Button from "./Button";
import colors from "../config/colors";
import Screen from "./Screen";
import ApiContext from "../api/context";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function FilterModal({ navigation }) {
  const { getListingsApi, filterState, setFilterState } = useContext(
    ApiContext
  );

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

  const onClear = () => {
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
  };

  const onApply = () => {
    navigation.navigate("MaterialTabs");
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
  };

  return (
    <View style={styles.panel}>
      <View style={styles.topRow}>
        <View style={styles.buttonSection}>
          <Button
            style={styles.button}
            title="Apply"
            onPress={() => onApply()}
          />
          <Button
            style={styles.button}
            title="Clear"
            onPress={() => onClear()}
          />
        </View>
        <View style={styles.closeSection}>
          <TouchableOpacity onPress={() => navigation.navigate("MaterialTabs")}>
            <MaterialCommunityIcons
              name="close-circle-outline"
              size={50}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
      <SliderSection
        title="Price Range"
        changeFilterLow={setPriceLow}
        changeFilterHigh={setPriceHigh}
        initialValues={[priceLow, priceHigh]}
        extremes={[0, 5000]}
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
      />
      <SliderSection
        title="Walk Time to Campus - Minutes"
        changeFilterLow={setWalkLow}
        changeFilterHigh={setWalkHigh}
        initialValues={[walkLow, walkHigh]}
        extremes={[0, 50]}
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
    width: "75%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    height: "90%",
    width: "45%",
    borderRadius: 25,
  },
  closeSection: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "25%",
  },
});
