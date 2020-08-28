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
import SavedContext from "../firestore/context";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

function SignupScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);
  const { setEmail, db } = useContext(SavedContext);
  const { colors, darkMode } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [signUpFailed, setSignUpFailed] = useState(false);
  const [submitPressed, setSubmitPressed] = useState(false);
  const [createFavAttempts, setCreateFavAttempts] = useState(0);
  const [createSavedAttempts, setCreateSavedAttempts] = useState(0);

  const handleError = (error) => {
    let errorString = error.toString();
    if (errorString.includes("already in use")) {
      setErrorMessage("Email address unavailable");
    } else if (errorString.includes("password is invalid")) {
      setErrorMessage("Incorrect Password");
    } else if (errorString.includes("address is badly formatted")) {
      setErrorMessage("Invalid Email Address");
    } else {
      setErrorMessage("Too many login attempts. Try again later.");
    }
  };

  const signUp = (username, email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("[NETWORK] User Successfully signed up!");
        setUser({ username, email, password });
        setEmail(email);
      })
      .catch((error) => {
        console.log("[ERROR] Error Signing Up User", error);
        handleError(error);
      });
  };

  const signIn = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("[NETWORK] Logged In");
      })
      .catch((error) => {
        console.log("[ERROR] Error Logging In:", error);
      });
  };

  const updateUsername = (username) => {
    return firebase
      .auth()
      .currentUser.updateProfile({
        displayName: username,
      })
      .then(() => {
        console.log("[NETWORK] Profile Name Update Successful!");
      })
      .catch((error) => {
        console.log("[ERROR] Error Updating Profile Name", error);
      });
  };

  const createFavorites = (email) => {
    setCreateFavAttempts((previous) => previous + 1);
    return db
      .collection("Users")
      .doc(email)
      .set({
        Favorites: [],
      })
      .then(() => {
        console.log("[NETWORK] Favorites collection successfully created!");
      })
      .catch((error) => {
        if (createFavAttempts >= 5) {
          console.log("[ERROR] Favorites Could not be created");
        } else {
          console.log(
            "[ERROR] Favorites document not created.",
            error,
            "Trying again..."
          );
          setTimeout(createFavorites(email), 500);
        }
      });
  };

  const createSavedSearches = (email) => {
    setCreateSavedAttempts((previous) => previous + 1);
    return db
      .collection("Users")
      .doc(email)
      .update({
        SavedSearches: [],
      })
      .then(() => {
        console.log("[NETWORK] SavedSearches collection successfully created!");
      })
      .catch((error) => {
        if (createSavedAttempts >= 5) {
          console.log("[ERROR] SavedSearches Could not be created");
        } else {
          console.log(
            "[ERROR] SavedSearches document not created.",
            error,
            "Trying again..."
          );
          setTimeout(createSavedSearches(email), 500);
        }
      });
  };

  const handleSubmit = async ({ username, email, password }) => {
    setSignUpFailed(false);
    setLoading(true);
    await signUp(username, email, password);
    await signIn(email, password);
    await updateUsername(username);
    await createFavorites(email);
    await createSavedSearches(email);
    navigation.navigate("Home");
    setSignUpFailed(false);
    setLoading(false);
    return true;
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
            <ErrorMessage error={errorMessage} visible={signUpFailed} />
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
              onPress={() => setSubmitPressed((previous) => !previous)}
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
