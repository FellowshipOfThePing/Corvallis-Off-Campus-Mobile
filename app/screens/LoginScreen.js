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
import firebaseConfig from "../auth/config";
import Screen from "../components/Screen";

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(AuthContext);

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() =>
        setUser({
          name: firebase.auth().currentUser.displayName,
          email,
          password,
        })
      )
      .catch((error) => console.log(error));
    navigation.navigate("Home");
  };

  return (
    <Screen>
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
            onChangeText={(email) => setEmail(email)}
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
        <View style={styles.buttonSection}>
          <Button title="Login" onPress={() => handleLogin()} />
          <TouchableOpacity
            style={styles.signUpText}
            onPress={() => navigation.navigate("Signup")}
          >
            <AppText>Don't have an account yet? Sign up</AppText>
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
    flex: 2,
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
});

export default Login;
