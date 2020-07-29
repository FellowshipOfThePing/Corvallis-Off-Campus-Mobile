import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import Button from "../components/Button";
import AppText from "../components/AppText";
import colors from "../config/colors";

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image style={styles.logo} source={require("../../assets/Logo_with_white_no_bg.png")}/>
        <AppText style={styles.title}>OSU</AppText>
        <AppText style={styles.subtitle}>Off Campus Housing</AppText>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Browse" color="white" textColor="black" onPress={() => navigation.navigate('MaterialTabs')} />
        <Button title="Login" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d73f09",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 40,
    padding: 15,
  },
  logo: {
    height: 250,
    width: 250
  },
  titleContainer: {
    top: 80,
    position: "absolute",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 60,
    textAlign: "center",
    fontFamily: "Georgia",
    color: colors.white
  },
  subtitle: {
    fontSize: 40,
    textAlign: "center",
    fontFamily: "Georgia",
    color: colors.white
  }
});

export default WelcomeScreen;
