import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { useNetInfo } from "@react-native-community/netinfo";

import AppText from "./AppText";
import ThemeContext from "../theme/context";

function OfflineNotice({ colors }) {
  const netInfo = useNetInfo();

  if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
    return (
      <View style={[styles.container, { backgroundColor: colors.primary }]}>
        <AppText style={{ color: colors.navHeaderText }}>
          No Internet Connection
        </AppText>
      </View>
    );

  return null;
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 5,
    top: 0,
    zIndex: 9999,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default OfflineNotice;
