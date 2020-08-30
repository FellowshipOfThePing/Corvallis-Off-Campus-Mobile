import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import * as Yup from "yup";

import Screen from "../components/Screen";
import AppText from "../components/AppText";
import AuthContext from "../auth/context";
import Avatar from "../components/Avatar";
import ThemeContext from "../theme/context";
import FocusAwareStatusBar from "../components/FocusAwareStatusBar";
import DismissKeyboard from "../components/DismissKeyboard";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessage,
} from "../components/forms";
import Button from "../components/Button";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  email: Yup.string().required().email().label("Email"),
});

const passwordValidationSchema = Yup.object({
  password: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

function SettingsScreen({ navigation }) {
  const {
    user,
    setUser,
    email,
    updateUsername,
    updatePassword,
    updateEmail,
  } = useContext(AuthContext);
  const { colors, darkMode, toggleTheme, isLefty, toggleLefty } = useContext(
    ThemeContext
  );

  const [settingsOpen, setSettingsOpen] = useState(true);
  const [changingProfile, setChangingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [submitPressed, setSubmitPressed] = useState(false);

  const borderColor = colors.medium;
  const textColor = colors.dark;

  const handleSubmit = (props) => {
    if (changingProfile) {
      updateUsername(props.username, user.password);
      updateEmail(props.email);
    } else if (changingPassword) {
      updatePassword(props.password);
    }
  };

  return (
    <Screen style={[styles.container, { backgroundColor: colors.light }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <FocusAwareStatusBar
          barStyle="light-content"
          backgroundColor="#6a51ae"
        />
        <DismissKeyboard>
          <View
            style={[
              styles.headerSection,
              { backgroundColor: colors.white, borderColor: borderColor },
            ]}
          >
            <Avatar color={colors.black} size={100} />
            <AppText style={styles.username}>
              {user && user.username ? user.username : ""}
            </AppText>
            <AppText style={{ color: textColor }}>
              {user ? email : "User Not Logged In"}
            </AppText>
          </View>
        </DismissKeyboard>
        <View style={styles.optionsSection}>
          <View
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={[
              styles.optionsBox,
              { backgroundColor: colors.white, borderColor: borderColor },
            ]}
          >
            {settingsOpen && (
              <>
                {/* {user && (
                  <>
                    <View style={styles.row}>
                      <TouchableOpacity
                        style={styles.rowContent}
                        onPress={() => {
                          setChangingProfile(true);
                          setSettingsOpen(false);
                        }}
                      >
                        <>
                          <View style={{ flexDirection: "row" }}>
                            <MaterialCommunityIcons
                              name="pencil-circle"
                              size={24}
                              color={colors.black}
                              style={{ paddingRight: 5 }}
                            />
                            <AppText
                              style={[styles.optionText, { color: textColor }]}
                            >
                              Edit Username/Email
                            </AppText>
                          </View>
                          <MaterialCommunityIcons
                            name="chevron-right"
                            size={30}
                            color={textColor}
                          />
                        </>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                      <TouchableOpacity
                        style={styles.rowContent}
                        onPress={() => {
                          setChangingPassword(true);
                          setSettingsOpen(false);
                        }}
                      >
                        <>
                          <View style={{ flexDirection: "row" }}>
                            <MaterialIcons
                              name="verified-user"
                              size={24}
                              color={colors.black}
                              style={{ paddingRight: 5 }}
                            />
                            <AppText style={styles.optionText}>
                              Change Password
                            </AppText>
                          </View>
                          <MaterialCommunityIcons
                            name="chevron-right"
                            size={30}
                            color={textColor}
                          />
                        </>
                      </TouchableOpacity>
                    </View>
                  </>
                )} */}
                <View style={[styles.row, styles.rowContent]}>
                  <View style={{ flexDirection: "row" }}>
                    <MaterialCommunityIcons
                      name="moon-waning-crescent"
                      size={24}
                      color={colors.black}
                      style={{ paddingRight: 5 }}
                    />
                    <AppText style={styles.optionText}>Dark Mode</AppText>
                  </View>
                  <Switch
                    trackColor={{ true: colors.primary, false: colors.light }}
                    thumbColor={darkMode ? colors.black : colors.white}
                    ios_backgroundColor={colors.dark}
                    onValueChange={toggleTheme}
                    value={darkMode}
                    style={{ borderWidth: 1, borderColor: borderColor }}
                  />
                </View>
                <View style={[styles.row, styles.rowContent]}>
                  <View style={{ flexDirection: "row" }}>
                    <MaterialCommunityIcons
                      name="hand"
                      size={24}
                      color={colors.black}
                      style={{ paddingRight: 5 }}
                    />
                    <AppText style={styles.optionText}>Left Handed</AppText>
                  </View>
                  <Switch
                    trackColor={{ true: colors.primary, false: colors.light }}
                    thumbColor={darkMode ? colors.black : colors.white}
                    ios_backgroundColor={colors.dark}
                    onValueChange={toggleLefty}
                    value={isLefty}
                    style={{ borderWidth: 1, borderColor: borderColor }}
                  />
                </View>
              </>
            )}
            {changingProfile && (
              <View style={styles.inputContainer}>
                <AppForm
                  initialValues={{ username: "", email: "" }}
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}
                >
                  <View style={styles.inputFields}>
                    <AppFormField
                      style={[
                        styles.inputBox,
                        { borderColor: colors.gray, color: colors.black },
                      ]}
                      placeholder="Username"
                      autoCapitalize="none"
                      enablesReturnKeyAutomatically
                      placeholderTextColor={colors.medium}
                      selectionColor={colors.dark}
                      name="username"
                      returnKeyType="done"
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
                      returnKeyType="done"
                      placeholderTextColor={colors.medium}
                      selectionColor={colors.dark}
                      textContentType="emailAddress"
                      name="email"
                      error={submitPressed}
                    />
                  </View>
                  <View style={styles.submitContainer}>
                    <SubmitButton
                      style={styles.submitButton}
                      color={colors.primary}
                      textColor={colors.navHeaderText}
                      title="Submit"
                      onPress={() => {
                        setSubmitPressed(true);
                      }}
                    />
                    <Button
                      title="Cancel"
                      style={styles.cancelButton}
                      onPress={() => {
                        setChangingProfile(false);
                        setSettingsOpen(true);
                      }}
                    />
                  </View>
                </AppForm>
              </View>
            )}
            {changingPassword && (
              <View style={styles.inputContainer}>
                <AppForm
                  initialValues={{ password: "", passwordConfirmation: "" }}
                  onSubmit={handleSubmit}
                  validationSchema={passwordValidationSchema}
                >
                  <View style={styles.inputFields}>
                    <AppFormField
                      style={[
                        styles.inputBox,
                        { borderColor: colors.gray, color: colors.black },
                      ]}
                      placeholder="Password"
                      autoCapitalize="none"
                      placeholderTextColor={colors.medium}
                      selectionColor={colors.dark}
                      name="username"
                      returnKeyType="done"
                      error={submitPressed}
                    />
                    <AppFormField
                      style={[
                        styles.inputBox,
                        { borderColor: colors.gray, color: colors.black },
                      ]}
                      placeholder="Confirm Password"
                      autoCapitalize="none"
                      returnKeyType="done"
                      placeholderTextColor={colors.medium}
                      selectionColor={colors.dark}
                      name="password confirmation"
                      error={submitPressed}
                    />
                  </View>
                  <View style={styles.submitContainer}>
                    <SubmitButton
                      style={styles.submitButton}
                      color={colors.primary}
                      textColor={colors.navHeaderText}
                      title="Submit"
                      onPress={() => {
                        setSubmitPressed(true);
                      }}
                    />
                    <Button
                      title="Cancel"
                      style={styles.cancelButton}
                      onPress={() => {
                        setChangingPassword(false);
                        setSettingsOpen(true);
                      }}
                    />
                  </View>
                </AppForm>
              </View>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputFields: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  submitContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    paddingVertical: 20,
  },
  submitButton: {
    width: "45%",
  },
  cancelButton: {
    width: "45%",
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
    justifyContent: "space-around",
  },
  headerSection: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 15,
    margin: 20,
  },
  username: {
    fontSize: 25,
  },
  optionsSection: {
    flex: 3,
  },
  optionsBox: {
    width: "95%",
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 15,
  },
  row: {
    width: "100%",
    height: 60,
  },
  rowContent: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  optionText: {
    fontSize: 19,
  },
});

export default SettingsScreen;
