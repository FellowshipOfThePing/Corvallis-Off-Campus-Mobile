import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as firebase from "firebase";
import "firebase/firestore";

import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/AppText";
import AuthContext from "../auth/context";
import Avatar from "../components/Avatar";
import DrawerRowButton from "../components/DrawerRowButton";
import Screen from "../components/Screen";
import SavedContext from "../firestore/context";
import ThemeContext from "../theme/context";

function DrawerContent({ navigation }) {
  const { user, email, logout } = useContext(AuthContext);
  const { setAddressIDs, setFavorites } = useContext(SavedContext);
  const { colors } = useContext(ThemeContext);

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    const loggedOut = await logout();
    if (loggedOut === false) {
      setLoading(false);
      return;
    }
    setFavorites([]);
    setAddressIDs([]);
    setLoading(false);
    navigation.navigate("Home");
  };

  return (
    <Screen style={{ backgroundColor: colors.light }}>
      <View style={styles.container}>
        <View style={[styles.profile, { borderBottomColor: colors.gray }]}>
          {user && (
            <>
              <Avatar color={colors.black} size={70} />
              <AppText style={styles.username}>{user.username}</AppText>
              <AppText style={[styles.email, { color: colors.medium }]}>
                {email}
              </AppText>
            </>
          )}
          {!user && (
            <Image
              style={styles.logo}
              source={require("../../assets/Logo.png")}
            />
          )}
        </View>
        <View style={[styles.rows, { borderBottomColor: colors.gray }]}>
          <DrawerRowButton
            icon="home"
            text="Home"
            onPress={() => {
              navigation.navigate("Home");
            }}
          />
          <DrawerRowButton
            icon="folder"
            text="Saved Listings"
            onPress={
              user
                ? () => {
                    navigation.navigate("SavedListingsNavigator", {
                      screen: "SavedListings",
                    });
                  }
                : () => {
                    navigation.navigate("AuthNavigator", { screen: "Login" });
                  }
            }
          />
          <DrawerRowButton
            icon="folder-search"
            text="Saved Searches"
            onPress={
              user
                ? () => {
                    navigation.navigate("SavedSearchesNavigator");
                  }
                : () => {
                    navigation.navigate("AuthNavigator", { screen: "Login" });
                  }
            }
          />
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator visible={loading} />
          </View>
          <View style={styles.bottomRow}>
            <TouchableOpacity
              style={[
                styles.bottomRowContainer,
                { borderRightWidth: 1, borderRightColor: colors.gray },
              ]}
              onPress={() => navigation.navigate("SettingsNavigator")}
            >
              <MaterialCommunityIcons
                name="settings"
                size={25}
                color={colors.gray}
              />
              <AppText style={[styles.bottomRowText, { color: colors.medium }]}>
                Settings
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomRowContainer}
              onPress={
                user
                  ? () => handleLogout()
                  : () =>
                      navigation.navigate("AuthNavigator", { screen: "Login" })
              }
            >
              <MaterialCommunityIcons
                name="login"
                size={25}
                color={colors.gray}
              />
              <AppText style={[styles.bottomRowText, { color: colors.medium }]}>
                {user ? "Logout" : "Log In"}
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 4,
    justifyContent: "flex-end",
  },
  bottomRow: {
    alignItems: "center",
    flexDirection: "row",
    height: 100,
    width: "100%",
  },
  bottomRowText: {
    fontSize: 17,
    paddingLeft: 10,
  },
  container: {
    flex: 1,
  },
  email: {
    fontSize: 15,
  },
  profile: {
    alignItems: "center",
    borderBottomWidth: 1,
    flex: 3,
    justifyContent: "center",
  },
  rows: {
    borderBottomWidth: 1,
    flex: 3,
  },
  username: {
    fontSize: 22,
  },
  logo: {
    height: 150,
    width: 150,
  },
  bottomRowContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DrawerContent;
