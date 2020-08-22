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
import colors from "../config/colors";
import Screen from "../components/Screen";
import SavedContext from "../firestore/context";
import ActivityIndicator from "../components/ActivityIndicator";

function Login({ navigation }) {
  const [email, setEnteredEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(AuthContext);
  const { setEmail, setDB } = useContext(SavedContext);
  const [loading, setLoading] = useState(false);

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
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/Logo.png")}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputBox}
            value={email}
            onChangeText={(email) => setEnteredEmail(email)}
            placeholder="Email"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.inputBox}
            value={password}
            onChangeText={(password) => setPassword(password)}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator
            visible={loading}
            style={{ backgroundColor: colors.light }}
          />
        </View>
        <View style={styles.buttonSection}>
          <Button color="primary" title="Login" onPress={() => handleLogin()} />
          <TouchableOpacity
            style={styles.signUpText}
            onPress={() => navigation.navigate("Signup")}
          >
            <View style={styles.textRow}>
              <AppText>Don't have an account yet? </AppText>
              <AppText style={styles.text}>Sign up</AppText>
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
    borderColor: colors.gray,
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
  text: {
    color: colors.primary,
  },
});

export default Login;
