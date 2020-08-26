import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as firebase from "firebase";
import "firebase/firestore";

import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/AppText";
import AuthContext from "../auth/context";
import Avatar from "../components/Avatar";
import colors from "../config/colors";
import DrawerRowButton from "../components/DrawerRowButton";
import Screen from "../components/Screen";
import SavedContext from "../firestore/context";

function DrawerContent({ navigation }) {
  const { user, setUser } = useContext(AuthContext);
  const { setAddressIDs, setFavorites, setEmail, setDB } = useContext(
    SavedContext
  );
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    firebase
      .auth()
      .signOut()
      .then(() => {
        setEmail(null);
        setDB(null);
        setFavorites([]);
        setAddressIDs([]);
        navigation.navigate("Home");
        setUser(null);
        console.log("[NETWORK] Signed Out");
        setLoading(false);
      })
      .catch((error) => {
        console.log("[NETWORK] Error Signing Out", error);
        setLoading(false);
      });
  };

  return (
    <Screen style={{ backgroundColor: colors.white }}>
      <View style={styles.container}>
        <View style={styles.profile}>
          {user && (
            <>
              <Avatar color="black" size={70} />
              <AppText style={styles.username}>{user.name}</AppText>
              <AppText style={styles.email}>{user.email}</AppText>
            </>
          )}
          {!user && (
            <Image
              style={styles.logo}
              source={require("../../assets/Logo.png")}
            />
          )}
        </View>
        <View style={styles.rows}>
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
            <ActivityIndicator
              visible={loading}
              style={{ backgroundColor: colors.white }}
            />
          </View>
          <View style={styles.bottomRow}>
            <TouchableOpacity
              style={[
                styles.bottomRowContainer,
                { borderRightWidth: 1, borderRightColor: colors.gray },
              ]}
              onPress={
                user
                  ? () => navigation.navigate("SettingsScreen")
                  : () =>
                      navigation.navigate("AuthNavigator", { screen: "Login" })
              }
            >
              <MaterialCommunityIcons
                name="settings"
                size={25}
                color={colors.gray}
              />
              <AppText style={styles.bottomRowText}>Settings</AppText>
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
              <AppText style={styles.bottomRowText}>
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
    color: colors.medium,
    fontSize: 17,
    paddingLeft: 10,
  },
  container: {
    flex: 1,
  },
  email: {
    color: colors.medium,
    fontSize: 15,
  },
  profile: {
    alignItems: "center",
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
    flex: 3,
    justifyContent: "center",
  },
  rows: {
    borderBottomColor: colors.gray,
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
