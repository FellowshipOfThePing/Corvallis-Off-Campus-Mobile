import React, { useState, useContext } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

import AppText from "./AppText";
import ThemeContext from "../theme/context";

function SliderSection({
  onChange,
  style,
  title,
  initialValues,
  snapped,
  changeFilterLow,
  changeFilterHigh,
  extremes,
  step = 1,
  low,
  high,
}) {
  const [touched, setTouched] = useState(false);
  const { colors } = useContext(ThemeContext);

  return (
    <View
      style={[styles.sliderSection, { backgroundColor: colors.white }, style]}
    >
      <AppText style={styles.sliderTitle}>
        {title}: {low} - {high}
      </AppText>
      <MultiSlider
        allowOverlap
        snapped={snapped}
        containerStyle={{ alignSelf: "center" }}
        onValuesChangeStart={() => {
          setTouched(true);
        }}
        onValuesChange={(values) => {
          changeFilterLow(values[0]);
          changeFilterHigh(values[1]);
        }}
        onValuesChangeFinish={() => {
          setTouched(false);
        }}
        selectedStyle={{
          backgroundColor: colors.primary,
        }}
        values={initialValues}
        min={extremes[0]}
        max={extremes[1]}
        touchDimensions={{
          height: 40,
          width: 40,
          borderRadius: 20,
          slipDisplacement: 100,
        }}
        sliderLength={Dimensions.get("window").width * 0.8}
        step={step}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sliderSection: {
    flex: 1,
    justifyContent: "center",
  },
  sliderTitle: {
    fontWeight: "bold",
    fontSize: 18,
    paddingLeft: 20,
  },
});

export default SliderSection;
