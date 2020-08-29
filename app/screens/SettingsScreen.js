import React, { useContext, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import AppText from "../components/AppText";
import AuthContext from "../auth/context";
import Avatar from "../components/Avatar";
import ThemeContext from "../theme/context";
import FocusAwareStatusBar from "../components/FocusAwareStatusBar";

function SettingsScreen({ navigation }) {
  const { user, setUser, email } = useContext(AuthContext);
  const { colors, darkMode, toggleTheme, isLefty, toggleLefty } = useContext(
    ThemeContext
  );

  const borderColor = colors.medium;
  const textColor = colors.dark;

  return (
    <Screen style={[styles.container, { backgroundColor: colors.light }]}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <View
        style={[
          styles.headerSection,
          { backgroundColor: colors.white, borderColor: borderColor },
        ]}
      >
        <Avatar color={colors.black} size={100} />
        <AppText style={styles.username}>
          {user && user.username ? user.username : ""}
        </AppText>
        <AppText style={{ color: textColor }}>
          {user ? email : "User Not Logged In"}
        </AppText>
      </View>
      <View style={styles.optionsSection}>
        <View
          style={[
            styles.optionsBox,
            { backgroundColor: colors.white, borderColor: borderColor },
          ]}
        >
          {user && (
            <>
              <View style={styles.row}>
                <TouchableOpacity style={styles.rowContent}>
                  <>
                    <View style={{ flexDirection: "row" }}>
                      <MaterialCommunityIcons
                        name="pencil-circle"
                        size={24}
                        color={colors.black}
                        style={{ paddingRight: 5 }}
                      />
                      <AppText
                        style={[styles.optionText, { color: textColor }]}
                      >
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
                        color={colors.black}
                        style={{ paddingRight: 5 }}
                      />
                      <AppText style={styles.optionText}>
                        Change Password
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
            </>
          )}
          <View style={[styles.row, styles.rowContent]}>
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="moon-waning-crescent"
                size={24}
                color={colors.black}
                style={{ paddingRight: 5 }}
              />
              <AppText style={styles.optionText}>Dark Mode</AppText>
            </View>
            <Switch
              trackColor={{ true: colors.primary, false: colors.light }}
              thumbColor={darkMode ? colors.black : colors.white}
              ios_backgroundColor={colors.dark}
              onValueChange={toggleTheme}
              value={darkMode}
              style={{ borderWidth: 1, borderColor: borderColor }}
            />
          </View>
          <View style={[styles.row, styles.rowContent]}>
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="hand"
                size={24}
                color={colors.black}
                style={{ paddingRight: 5 }}
              />
              <AppText style={styles.optionText}>Left Handed</AppText>
            </View>
            <Switch
              trackColor={{ true: colors.primary, false: colors.light }}
              thumbColor={darkMode ? colors.black : colors.white}
              ios_backgroundColor={colors.dark}
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
  },
  headerSection: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 15,
    margin: 20,
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
    borderRadius: 15,
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
  },
});

export default SettingsScreen;
