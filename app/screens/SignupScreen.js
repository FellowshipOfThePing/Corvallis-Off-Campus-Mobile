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
import * as Yup from "yup";

import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessage,
} from "../components/forms";

import ActivityIndicator from "../components/ActivityIndicator";
import AuthContext from "../auth/context";
import Screen from "../components/Screen";
import ThemeContext from "../theme/context";
import FocusAwareStatusBar from "../components/FocusAwareStatusBar";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

function Signup({ navigation }) {
  const { user, setUser } = useContext(AuthContext);
  const { colors, darkMode } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);

  const handleError = (error) => {
    console.log("[NETWORK] Error logging in:", error);
    let errorString = error.toString();
    if (errorString.includes("already in use")) {
      setErrorMessage("Email address unavailable");
    } else if (errorString.includes("password is invalid")) {
      setErrorMessage("Incorrect Password");
    } else {
      setErrorMessage("Too many login attempts. Try again later.");
    }
  };

  const createFavorites = (email) => {
    const db = firebase.firestore();
    db.collection("Users").doc(email).set({
      Favorites: [],
    });
    console.log("[NETWORK] Favorites collection successfully created!");
  };

  const handleSubmit = ({ username, email, password }) => {
    setLoading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("[NETWORK] User Successfully signed up!");
        setUser({ username, email, password });
        createFavorites(email);
        firebase
          .auth()
          .currentUser.updateProfile({
            displayName: username,
          })
          .then(() => console.log("[NETWORK] Profile Name Update Successful!"))
          .catch((error) =>
            console.log("[NETWORK] Error Updating Profile Name", error)
          );
        navigation.navigate("Home");
        setLoading(false);
        return setLoginFailed(false);
      })
      .catch((error) => {
        console.log("[NETWORK] Error Signing Up User", error);
        handleError(error);
        setLoading(false);
        return setLoginFailed(false);
      });
  };

  return (
    <Screen style={{ backgroundColor: colors.light }}>
      <FocusAwareStatusBar
        barStyle={darkMode ? "light-content" : "dark-content"}
        backgroundColor="#6a51ae"
      />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/Logo.png")}
          />
        </View>
        <AppForm
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <View style={styles.inputContainer}>
            <AppFormField
              style={[
                styles.inputBox,
                { borderColor: colors.gray, color: colors.black },
              ]}
              placeholder="Username"
              autoCapitalize="none"
              enablesReturnKeyAutomatically
              placeholder="Username"
              placeholderTextColor={colors.medium}
              textContentType="emailAddress"
              selectionColor={colors.dark}
              name="username"
              returnKeyType="go"
            />
            <AppFormField
              style={[
                styles.inputBox,
                { borderColor: colors.gray, color: colors.black },
              ]}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              enablesReturnKeyAutomatically
              returnKeyType="go"
              placeholderTextColor={colors.medium}
              selectionColor={colors.dark}
              textContentType="emailAddress"
              name="email"
            />
            <AppFormField
              style={[
                styles.inputBox,
                { borderColor: colors.gray, color: colors.black },
              ]}
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              enablesReturnKeyAutomatically
              returnKeyType="go"
              placeholderTextColor={colors.medium}
              selectionColor={colors.dark}
              textContentType="password"
              name="password"
            />
            <ErrorMessage error={errorMessage} visible={loginFailed} />
          </View>
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator
              visible={loading}
              style={{ backgroundColor: colors.light }}
            />
          </View>
          <View style={styles.buttonSection}>
            <SubmitButton
              color={colors.primary}
              textColor={colors.navHeaderText}
              title="Login"
            />
          </View>
        </AppForm>
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
    justifyContent: "center",
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
  activityIndicatorContainer: {
    alignItems: "center",
    flex: 1,
  },
});

export default Signup;
