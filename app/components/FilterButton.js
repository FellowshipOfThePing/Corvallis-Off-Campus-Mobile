import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function FilterButton({ size = 25, color, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} delayPressIn={0}>
      <MaterialCommunityIcons name="filter-outline" size={size} color={color} />
    </TouchableOpacity>
  );
}

export default FilterButton;
