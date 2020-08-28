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
import AppText from "../components/AppText";
import AuthContext from "../auth/context";
import Screen from "../components/Screen";
import SavedContext from "../firestore/context";
import ActivityIndicator from "../components/ActivityIndicator";
import ThemeContext from "../theme/context";
import FocusAwareStatusBar from "../components/FocusAwareStatusBar";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().label("Password"),
});

function LoginScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);
  const { setEmail } = useContext(SavedContext);
  const [loading, setLoading] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { colors, darkMode } = useContext(ThemeContext);

  const handleError = (error) => {
    console.log("[NETWORK] Error logging in:", error);
    let errorString = error.toString();
    if (errorString.includes("no user record")) {
      setErrorMessage("No account with that username was found");
    } else if (errorString.includes("password is invalid")) {
      setErrorMessage("Incorrect Password");
    } else {
      setErrorMessage("Too many login attempts. Try again later.");
    }
  };

  const handleSubmit = ({ email, password }) => {
    setLoading(true);
    setLoginFailed(false);
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
        navigation.navigate("Home");
        console.log("[NETWORK] Logged In");
        setLoading(false);
        return setLoginFailed(false);
      })
      .catch((error) => {
        handleError(error);
        setLoading(false);
        return setLoginFailed(true);
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
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <View style={styles.inputContainer}>
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
              error={false}
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
              error={false}
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
    paddingTop: 20,
    paddingBottom: 35,
  },
  textRow: {
    flexDirection: "row",
  },
});

export default LoginScreen;
