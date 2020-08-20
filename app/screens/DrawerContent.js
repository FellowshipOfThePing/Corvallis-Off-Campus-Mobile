import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import Screen from "../components/Screen";
import Avatar from "../components/Avatar";
import AppText from "../components/AppText";
import colors from "../config/colors";
import AuthContext from "../auth/context";
import DrawerRowButton from "../components/DrawerRowButton";

function DrawerContent({ navigation }) {
  const { user, setUser } = useContext(AuthContext);

  return (
    <Screen>
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
            onPress={() => {
              navigation.navigate("AuthNavigator", {
                screen: "Login",
              });
            }}
          />
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.bottomRow}
            onPress={() => {
              console.log("Settings pressed!");
              navigation.navigate("Home");
            }}
          >
            <MaterialCommunityIcons
              name="settings"
              size={25}
              color={colors.gray}
            />
            <AppText style={styles.bottomRowText}>Settings</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    flex: 4,
    justifyContent: "flex-end",
  },
  bottomRow: {
    alignItems: "center",
    flexDirection: "row",
    height: 75,
    paddingLeft: 15,
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
});

export default DrawerContent;
