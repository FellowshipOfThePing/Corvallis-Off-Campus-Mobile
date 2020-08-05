import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";

import SliderSection from "./SliderSection";
import Button from "./Button";
import colors from "../config/colors";

export default function FilterModal(props) {
  const [scrollable, setScrollable] = useState(true);
  const bottomSheetRef = React.createRef();

  const [priceLow, setPriceLow] = useState(0);
  const [priceHigh, setPriceHigh] = useState(5000);
  const [bedsLow, setBedsLow] = useState(1);
  const [bedsHigh, setBedsHigh] = useState(5);
  const [bathsLow, setBathsLow] = useState(1);
  const [bathsHigh, setBathsHigh] = useState(5);
  const [distanceLow, setDistanceLow] = useState(0);
  const [distanceHigh, setDistanceHigh] = useState(25);
  const [driveLow, setDriveLow] = useState(0);
  const [driveHigh, setDriveHigh] = useState(40);
  const [walkLow, setWalkLow] = useState(0);
  const [walkHigh, setWalkHigh] = useState(50);

  const closeModal = () => {
    bottomSheetRef.current.snapTo(2);
  };

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

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={styles.buttonsSection}>
        <Button
          title="Apply"
          style={styles.applyButton}
          onPress={() => closeModal()}
        />
        <Button
          title="Clear"
          style={styles.applyButton}
          onPress={() => onClear()}
        />
      </View>
      <SliderSection
        onChange={setScrollable}
        title="Price Range"
        changeFilterLow={setPriceLow}
        changeFilterHigh={setPriceHigh}
        initialValues={[priceLow, priceHigh]}
        extremes={[0, 5000]}
      />
      <SliderSection
        onChange={setScrollable}
        title="Beds"
        initialValues={[bedsLow, bedsHigh]}
        snapped
        changeFilterLow={setBedsLow}
        changeFilterHigh={setBedsHigh}
        extremes={[1, 5]}
      />
      <SliderSection
        onChange={setScrollable}
        title="Baths"
        initialValues={[bathsLow, bathsHigh]}
        snapped
        changeFilterLow={setBathsLow}
        changeFilterHigh={setBathsHigh}
        extremes={[1, 5]}
      />
      <SliderSection
        onChange={setScrollable}
        title="Distance to Campus - Miles"
        changeFilterLow={setDistanceLow}
        changeFilterHigh={setDistanceHigh}
        initialValues={[distanceLow, distanceHigh]}
        extremes={[0, 25]}
      />
      <SliderSection
        onChange={setScrollable}
        title="Drive Time to Campus - Minutes"
        changeFilterLow={setDriveLow}
        changeFilterHigh={setDriveHigh}
        initialValues={[driveLow, driveHigh]}
        extremes={[0, 40]}
      />
      <SliderSection
        onChange={setScrollable}
        title="Walk Time to Campus - Minutes"
        changeFilterLow={setWalkLow}
        changeFilterHigh={setWalkHigh}
        initialValues={[walkLow, walkHigh]}
        extremes={[0, 50]}
      />
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["95%", "50%", 100]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={0}
        enabledGestureInteraction={scrollable}
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
  },
  header: {
    backgroundColor: "#f7f5eee8",
    shadowColor: "#000000",
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  buttonsSection: {
    height: "10%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  applyButton: {
    width: "40%",
    height: "80%",
    borderRadius: 20,
  },
});
