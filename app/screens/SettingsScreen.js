import React, { useContext, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import AppText from "../components/AppText";
import AuthContext from "../auth/context";
import Avatar from "../components/Avatar";
import colors from "../config/colors";

const borderColor = colors.medium;
const textColor = colors.dark;

function SettingsScreen({ navigation }) {
  const [isLefty, setIsLefty] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleLefty = () => setIsLefty((previousState) => !previousState);
  const toggleDarkMode = () => setIsDarkMode((previousState) => !previousState);
  //   const { user, setUser } = useContext(AuthContext);

  return (
    <Screen style={styles.container}>
      <View style={styles.headerSection}>
        <Avatar color={colors.black} size={100} />
        <AppText style={styles.username}>Username</AppText>
        <AppText style={styles.email}>email@email.com</AppText>
      </View>
      <View style={styles.optionsSection}>
        <View style={styles.optionsBox}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.rowContent}>
              <>
                <View style={{ flexDirection: "row" }}>
                  <MaterialCommunityIcons
                    name="pencil-circle"
                    size={24}
                    color="black"
                    style={{ paddingRight: 5 }}
                  />
                  <AppText style={styles.optionText}>
                    Edit Username/Email
                  </AppText>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={30}
                  color={textColor}
                />
              </>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.rowContent}>
              <>
                <View style={{ flexDirection: "row" }}>
                  <MaterialIcons
                    name="verified-user"
                    size={24}
                    color="black"
                    style={{ paddingRight: 5 }}
                  />
                  <AppText style={styles.optionText}>Change Password</AppText>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={30}
                  color={textColor}
                />
              </>
            </TouchableOpacity>
          </View>
          <View style={[styles.row, styles.rowContent]}>
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="moon-waning-crescent"
                size={24}
                color="black"
                style={{ paddingRight: 5 }}
              />
              <AppText style={styles.optionText}>Dark Mode</AppText>
            </View>
            <Switch
              trackColor={{ true: colors.primary, false: "#767577" }}
              thumbColor={isLefty ? colors.white : colors.white}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleDarkMode}
              value={isDarkMode}
              style={{ borderWidth: 1, borderColor: borderColor }}
            />
          </View>
          <View style={[styles.row, styles.rowContent]}>
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="hand"
                size={24}
                color="black"
                style={{ paddingRight: 5 }}
              />
              <AppText style={styles.optionText}>Left Handed</AppText>
            </View>
            <Switch
              trackColor={{ true: colors.primary, false: "#767577" }}
              thumbColor={isLefty ? colors.white : colors.white}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleLefty}
              value={isLefty}
              style={{ borderWidth: 1, borderColor: borderColor }}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.light,
  },
  headerSection: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 15,
    margin: 20,
    backgroundColor: colors.white,
  },
  email: {
    color: textColor,
  },
  username: {
    fontSize: 25,
  },
  optionsSection: {
    flex: 3,
  },
  optionsBox: {
    width: "95%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 15,
    backgroundColor: colors.white,
  },
  row: {
    width: "100%",
    height: 60,
  },
  rowContent: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  optionText: {
    fontSize: 19,
    color: textColor,
  },
});

export default SettingsScreen;
