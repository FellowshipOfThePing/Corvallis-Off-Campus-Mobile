import React, { useState } from "react";
import firebase from "../auth/config";
import "firebase/firestore";

import logger from "../utils/logger";
import AuthContext from "./context";

export default ({ children }) => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [db, setDB] = useState(firebase.firestore());
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [signupErrorMessage, setSignupErrorMessage] = useState("");
  const [createFavAttempts, setCreateFavAttempts] = useState(0);
  const [createSavedAttempts, setCreateSavedAttempts] = useState(0);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLoginError = (error) => {
    let errorString = error.toString();
    if (errorString.includes("no user record")) {
      setLoginErrorMessage("No account with that username was found");
    } else if (errorString.includes("password is invalid")) {
      setLoginErrorMessage("Incorrect Password");
    } else {
      setLoginErrorMessage(errorString);
    }
  };

  const handleSignUpError = (error) => {
    let errorString = error.toString();
    if (errorString.includes("already in use")) {
      setSignupErrorMessage("Email address unavailable");
    } else if (errorString.includes("address is badly formatted")) {
      setSignupErrorMessage("Invalid Email Address");
    } else {
      setSignupErrorMessage(errorString);
    }
  };

  const signUp = async (username, email, password) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log("[NETWORK] User Successfully signed up!");
      setUser({ username, email, password });
      setEmail(email);
      return true;
    } catch (error) {
      logger.log("[ERROR] Error Signing Up User", error);
      handleSignUpError(error);
      return false;
    }
  };

  const signIn = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      getUsername(password);
      setEmail(email);
      setUser({ email, password });
      console.log("[NETWORK] Logged In");
      return true;
    } catch (error) {
      logger.log("[ERROR] Error Logging In:", error);
      handleLoginError(error);
      setEmail(null);
      setUser(null);
      return false;
    }
  };

  const updateUsername = async (username, password) => {
    try {
      await firebase.auth().currentUser.updateProfile({
        displayName: username,
      });
      setUser({ username, email, password });
      console.log("[NETWORK] Profile Name Update Successful!");
      return true;
    } catch (error) {
      logger.log("[ERROR] Error Updating Profile Name", error);
      return false;
    }
  };

  const createFavorites = async (email) => {
    setCreateFavAttempts((previous) => previous + 1);
    try {
      await db.collection("Users").doc(email).set({
        Favorites: [],
      });
      console.log("[NETWORK] Favorites collection successfully created!");
      return true;
    } catch (error) {
      if (createFavAttempts >= 5) {
        logger.log("[ERROR] Favorites Could not be created");
        return false;
      } else {
        logger.log(
          "[ERROR] Favorites document not created.",
          error,
          "Trying again..."
        );
        setTimeout(createFavorites(email), 500);
      }
    }
  };

  const createSavedSearches = async (email) => {
    setCreateSavedAttempts((previous) => previous + 1);
    try {
      await db.collection("Users").doc(email).update({
        SavedSearches: [],
      });
      console.log("[NETWORK] SavedSearches collection successfully created!");
      return true;
    } catch (error) {
      if (createSavedAttempts >= 5) {
        logger.log("[ERROR] SavedSearches Could not be created");
        return false;
      } else {
        logger.log(
          "[ERROR] SavedSearches document not created.",
          error,
          "Trying again..."
        );
        setTimeout(createSavedSearches(email), 500);
      }
    }
  };

  const logout = async () => {
    try {
      setLoggingOut(true);
      await firebase.auth().signOut();
      setEmail(null);
      setUser(null);
      console.log("[NETWORK] Signed Out");
      setLoggingOut(false);
      return true;
    } catch (error) {
      logger.log("[ERROR] Error Signing Out", error);
      setLoggingOut(false);
      return false;
    }
  };

  const getUsername = (password) => {
    try {
      const username = firebase.auth().currentUser.displayName;
      setUser({ username, email, password });
      console.log("[NETWORK] Profile Name Successfully Retrieved!");
    } catch (error) {
      logger.log("[ERROR] Error Retrieving Profile Name", error);
    }
  };

  const updatePassword = async (password) => {
    try {
      await firebase.auth().currentUser.updatePassword(password);
      setUser({ username: user.username, email, password });
      console.log("[NETWORK] Password Successfully Updated!");
      return true;
    } catch (error) {
      logger.log("[ERROR] Error Updating Password:", error);
      return false;
    }
  };

  const updateEmail = async (email) => {
    try {
      await firebase.auth().currentUser.updateEmail(email);
      setUser({ username: user.username, email, password: user.password });
      console.log("[NETWORK] Email Successfully Updated!");
      return true;
    } catch (error) {
      logger.log("[ERROR] Error Updating Email:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        email,
        setEmail,
        db,
        setDB,
        handleSignUpError,
        handleLoginError,
        loginErrorMessage,
        setLoginErrorMessage,
        signupErrorMessage,
        setSignupErrorMessage,
        signUp,
        signIn,
        logout,
        updateUsername,
        createFavorites,
        createSavedSearches,
        updatePassword,
        updateEmail,
        loggingOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
