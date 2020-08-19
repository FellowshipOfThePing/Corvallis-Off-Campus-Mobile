import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import firebase from "firebase";

import AuthContext from "../auth/context";
import Firebase from "../auth/config";
import colors from "../config/colors";
import Button from "../components/Button";
import AppText from "../components/AppText";
import Screen from "../components/Screen";

function Signup({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(AuthContext);

  const handleSignUp = () => {
    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        setUser({ name, email, password });
        firebase
          .auth()
          .currentUser.updateProfile({
            displayName: name,
          })
          .then(() => console.log("Profile Name pdate Successful!"))
          .catch((error) => console.log(error));
      })
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
            value={name}
            onChangeText={(name) => setName(name)}
            placeholder="Name"
            autoCapitalize="words"
          />
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
          <Button title="Sign Up" onPress={() => handleSignUp()} />
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
