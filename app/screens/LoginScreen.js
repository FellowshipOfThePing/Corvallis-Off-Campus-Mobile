import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
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
import ActivityIndicator from "../components/ActivityIndicator";
import ThemeContext from "../theme/context";
import FocusAwareStatusBar from "../components/FocusAwareStatusBar";
import DismissKeyboard from "../components/DismissKeyboard";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().label("Password"),
});

function LoginScreen({ navigation, route }) {
  const { signIn, loginErrorMessage, handleLoginError } = useContext(
    AuthContext
  );
  const { colors, darkMode } = useContext(ThemeContext);

  const [loading, setLoading] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [submitPressed, setSubmitPressed] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    setLoginFailed(false);
    setLoading(true);
    try {
      const signedIn = await signIn(email, password);
      if (signedIn === false) {
        setLoginFailed(true);
        setLoading(false);
      } else {
        setLoading(false);
        if (
          route.params &&
          route.params.intendedNavigator &&
          route.params.intendedScreen
        ) {
          navigation.navigate(route.params.intendedNavigator, {
            screen: route.params.intendedScreen,
          });
        } else {
          navigation.navigate("Home");
        }
      }
    } catch (error) {
      setLoginFailed(true);
      setLoading(false);
    }
  };

  return (
    <Screen style={{ backgroundColor: colors.light }}>
      <FocusAwareStatusBar
        barStyle={darkMode ? "light-content" : "dark-content"}
        backgroundColor="#6a51ae"
      />
      <View style={styles.container}>
        <DismissKeyboard>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("../../assets/Logo.png")}
            />
          </View>
        </DismissKeyboard>
        <AppForm
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <KeyboardAvoidingView
            style={styles.inputContainer}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
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
              textContentType="oneTimeCode"
              name="password"
              error={submitPressed}
            />
            <ErrorMessage error={loginErrorMessage} visible={loginFailed} />
          </KeyboardAvoidingView>
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
              onPress={() => {
                handleLoginError("");
                setSubmitPressed(true);
              }}
            />
            <TouchableOpacity
              style={styles.signUpText}
              onPress={() =>
                route.params
                  ? navigation.navigate("Signup", {
                      params: {
                        intendedNavigator: route.params.intendedNavigator,
                        intendedScreen: route.params.intendedScreen,
                      },
                    })
                  : navigation.navigate("Signup")
              }
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
