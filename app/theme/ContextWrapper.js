import React, { useState } from "react";
import ThemeContext from "./context";
import { Platform } from "react-native";

const lightTheme = {
  primary: "#d73f09",
  primaryFade: "#e6c4b8",
  primaryMarkerRing: "#ff8c00",
  black: "#000",
  white: "#fff",
  gray: "#a6a6a6",
  medium: "#6e6969",
  light: "#f8f4f4",
  dark: "#0c0c0c",
  danger: "#e50000",
  fadedBackground: "rgba(0, 0, 0, 0.2)",
  fadedBackground2: "rgba(0, 0, 0, 0.5)",
  mapCardBackground: "rgba(255, 255, 255, 0.85)",
  navHeaderBackground: "#d73f09",
  navHeaderText: "#fff",
  navHeaderTextInactive: "rgba(255,255,255,0.6)",
};

const darkTheme = {
  primary: "#d73f09",
  primaryFade: "#e6c4b8",
  primaryMarkerRing: "#ff8c00",
  black: "#fff",
  white: "#000",
  gray: "#f8f4f4",
  medium: "#f8f4f4",
  light: "#393939",
  dark: "#f8f4f4",
  danger: "#e50000",
  fadedBackground: "rgba(0, 0, 0, 0.2)",
  fadedBackground2: "rgba(0, 0, 0, 0.5)",
  mapCardBackground: "rgba(0, 0, 0, 0.85)",
  navHeaderBackground: "#000",
  navHeaderText: "#fff",
  navHeaderTextInactive: "rgba(255,255,255,0.6)",
};

export default ({ children }) => {
  const [colors, setColors] = useState(lightTheme);
  const [darkMode, setDarkMode] = useState(false);
  const [isLefty, setIsLefty] = useState(false);

  const text = {
    color: colors.dark,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "400",
  };

  const toggleTheme = () => {
    if (darkMode) {
      setColors(lightTheme);
      setDarkMode(false);
    } else {
      setColors(darkTheme);
      setDarkMode(true);
    }
  };

  const toggleLefty = () => {
    setIsLefty((previous) => !previous);
  };

  return (
    <ThemeContext.Provider
      value={{ colors, text, toggleTheme, darkMode, isLefty, toggleLefty }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
