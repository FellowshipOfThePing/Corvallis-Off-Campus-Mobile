import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";

import AppText from "../components/AppText";
import AuthContext from "../auth/context";
import Button from "../components/Button";
import Screen from "../components/Screen";
import SavedContext from "../firestore/context";
import ActivityIndicator from "../components/ActivityIndicator";
import ThemeContext from "../config/context";
import FocusAwareStatusBar from "../components/FocusAwareStatusBar";

function Login({ navigation }) {
  const [email, setEnteredEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(AuthContext);
  const { setEmail, setDB } = useContext(SavedContext);
  const [loading, setLoading] = useState(false);
  const { colors, darkMode } = useContext(ThemeContext);

  const handleLogin = () => {
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setUser({
          name: firebase.auth().currentUser.displayName,
          email,
          password,
        });
        setEmail(firebase.auth().currentUser.email);
        setDB(firebase.firestore());
        navigation.navigate("Home");
        console.log("[NETWORK] Logged In");
        setLoading(false);
      })
      .catch((error) => {
        console.log("[NETWORK] Error logging in:", error);
        setLoading(false);
      });
  };

  return (
    <Screen style={{ backgroundColor: colors.light }}>
      <FocusAwareStatusBar barStyle={darkMode ? "light-content" : "dark-content"} backgroundColor="#6a51ae" />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/Logo.png")}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.inputBox,
              { borderColor: colors.gray, color: colors.black },
            ]}
            value={email}
            onChangeText={(email) => setEnteredEmail(email)}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            enablesReturnKeyAutomatically
            onSubmitEditing={(e) => handleLogin()}
            returnKeyType="go"
            placeholderTextColor={colors.medium}
          />
          <TextInput
            style={[
              styles.inputBox,
              { borderColor: colors.gray, color: colors.black },
            ]}
            value={password}
            onChangeText={(password) => setPassword(password)}
            placeholder="Password"
            secureTextEntry={true}
            enablesReturnKeyAutomatically
            onSubmitEditing={(e) => handleLogin()}
            returnKeyType="go"
            placeholderTextColor={colors.medium}
            selectionColor={colors.dark}
          />
        </View>
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator
            visible={loading}
            style={{ backgroundColor: colors.light }}
          />
        </View>
        <View style={styles.buttonSection}>
          <Button
            color={colors.primary}
            textColor={colors.navHeaderText}
            title="Login"
            onPress={() => handleLogin()}
          />
          <TouchableOpacity
            style={styles.signUpText}
            onPress={() => navigation.navigate("Signup")}
          >
            <View style={styles.textRow}>
              <AppText>Don't have an account yet? </AppText>
              <AppText style={{ color: colors.primary }}>Sign up</AppText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  buttonSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  inputBox: {
    width: "90%",
    margin: 10,
    padding: 15,
    fontSize: 18,
    borderBottomWidth: 1,
    textAlign: "center",
  },
  inputContainer: {
    alignItems: "center",
    flex: 1,
  },
  activityIndicatorContainer: {
    alignItems: "center",
    flex: 1,
  },
  logo: {
    height: 225,
    width: 225,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 2,
  },
  signUpText: {
    paddingVertical: 20,
  },
  textRow: {
    flexDirection: "row",
  },
});

export default Login;
