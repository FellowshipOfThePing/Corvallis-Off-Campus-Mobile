import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Screen from "../components/Screen";
import Avatar from "../components/Avatar";
import AppText from "../components/AppText";
import colors from "../config/colors";
import {
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import DrawerRowButton from "../components/DrawerRowButton";

function DrawerContent(props) {
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.profile}>
          <Avatar
            color="black"
            size={70}
            onPress={() => {
              props.navigation.navigate("Login");
            }}
          />
          <AppText style={styles.username}>Username</AppText>
          <AppText style={styles.email}>me@email.com</AppText>
        </View>
        <View style={styles.rows}>
          <DrawerRowButton
            icon="home"
            text="Home"
            onPress={() => {
              props.navigation.navigate("Home");
            }}
          />
          <DrawerRowButton
            icon="folder"
            text="Saved Listings"
            onPress={() => {
              console.log("Saved Listings pressed!");
              props.navigation.navigate("Home");
            }}
          />
          <DrawerRowButton
            icon="folder-search"
            text="Saved Searches"
            onPress={() => {
              console.log("Saved Searches pressed!");
              props.navigation.navigate("Home");
            }}
          />
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.bottomRow}
            onPress={() => {
              console.log("Settings pressed!");
              props.navigation.navigate("Home");
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
});

export default DrawerContent;
