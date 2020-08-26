import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function FilterButton({ size = 25, color = colors.white, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialCommunityIcons
        name="filter-outline"
        size={size}
        color={color}
      />
    </TouchableOpacity>
  );
}

export default FilterButton;
