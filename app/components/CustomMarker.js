import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Marker } from "react-native-maps";

import colors from "../config/colors";


const CustomMarker = ({ coordinate, onPress, selected }) => {
  return (
    <Marker
      tracksViewChanges={selected ? true : false}
      coordinate={coordinate}
      onPress={onPress}
      flat
    >
      <TouchableOpacity>
        <View
          style={[
            styles.dot,
            { 
              backgroundColor: selected ? colors.primary : "green",
            },
          ]}
        />
      </TouchableOpacity>
    </Marker>
  );
};
const styles = StyleSheet.create({
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
  },
});

export default CustomMarker;
