import React, { useState, useContext } from "react";
import { View, StyleSheet, Image } from "react-native";
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

function SignupScreen({ navigation }) {
  const {
    signupErrorMessage,
    signUp,
    signIn,
    updateUsername,
    createFavorites,
    createSavedSearches,
    handleSignUpError,
  } = useContext(AuthContext);
  const { colors, darkMode } = useContext(ThemeContext);

  const [loading, setLoading] = useState(false);
  const [signUpFailed, setSignUpFailed] = useState(false);
  const [submitPressed, setSubmitPressed] = useState(false);

  const handleSubmit = async ({ username, email, password }) => {
    setSignUpFailed(false);
    setLoading(true);
    const signedUp = await signUp(username, email, password);
    if (signedUp === false) {
      setSignUpFailed(true);
      setLoading(false);
      return;
    }
    const signedIn = await signIn(email, password);
    if (signedIn === false) {
      setSignUpFailed(true);
      setLoading(false);
      return;
    }
    await updateUsername(username);
    await createFavorites(email);
    await createSavedSearches(email);
    navigation.navigate("Home");
    setSignUpFailed(false);
    setLoading(false);
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
              error={submitPressed}
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
              error={submitPressed}
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
              error={submitPressed}
            />
            <ErrorMessage error={signupErrorMessage} visible={signUpFailed} />
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
              title="Sign Up"
              onPress={() => {
                handleSignUpError("");
                setSubmitPressed(true);
              }}
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

export default SignupScreen;
