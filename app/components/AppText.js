import React, { useContext } from "react";
import { Text } from "react-native";
import ThemeContext from "../theme/context";

function AppText({ children, style, ...otherProps }) {
  const { text } = useContext(ThemeContext);
  return (
    <Text style={[text, style]} {...otherProps}>
      {children}
    </Text>
  );
}

export default AppText;
