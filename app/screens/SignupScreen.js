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

import AuthContext from "../auth/context";
import Button from "../components/Button";
import Screen from "../components/Screen";
import ThemeContext from "../config/context";

function Signup({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(AuthContext);
  const { colors } = useContext(ThemeContext);

  const createFavorites = (email) => {
    const db = firebase.firestore();
    db.collection("Users").doc(email).set({
      Favorites: [],
    });
    console.log("[NETWORK] Favorites collection successfully created!");
  };

  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("[NETWORK] User Successfully signed up!");
        setUser({ name, email, password });
        createFavorites(email);
        firebase
          .auth()
          .currentUser.updateProfile({
            displayName: name,
          })
          .then(() => console.log("[NETWORK] Profile Name Update Successful!"))
          .catch((error) =>
            console.log("[NETWORK] Error Updating Profile Name", error)
          );
        navigation.navigate("Home");
      })
      .catch((error) => console.log("[NETWORK] Error Signing Up User", error));
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
            style={[
              styles.inputBox,
              { borderColor: colors.gray, color: colors.black },
            ]}
            value={name}
            onChangeText={(name) => setName(name)}
            placeholder="Name"
            autoCapitalize="words"
            placeholderTextColor={colors.medium}
          />
          <TextInput
            style={[
              styles.inputBox,
              { borderColor: colors.gray, color: colors.black },
            ]}
            value={email}
            onChangeText={(email) => setEmail(email)}
            placeholder="Email"
            autoCapitalize="none"
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
            placeholderTextColor={colors.medium}
          />
        </View>
        <View style={styles.buttonSection}>
          <Button
            title="Sign Up"
            color={colors.primary}
            onPress={() => handleSignUp()}
          />
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
    flex: 3,
    paddingBottom: 65,
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

export default Signup;
