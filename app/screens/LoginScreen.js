import React from "react";
import { StyleSheet, View, Image } from "react-native";

import Screen from "../components/Screen";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import ErrorMessage from "../components/forms/ErrorMessage";

function LoginScreen() {
  return (
    <Screen style={styles.container}>
      <View style={styles.titleContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/Logo.png")}
        />
      </View>
      <View style={styles.formContainer}>
        <AppForm
          initialValues={{ email: "", password: "" }}
          onSubmit={() => console.log("Submitted!")}
        >
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <ErrorMessage error="Invalid email and/or password." visible />
          <View style={styles.buttonContainer}>
            <SubmitButton title="Login" color="primary" />
          </View>
        </AppForm>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 15
  },
  formContainer: {
    flex: 2,
    paddingTop: 20
  },
  logo: {
    height: 250,
    width: 250,
  },
  titleContainer: {
    alignItems: "center",
    padding: 20,
    flex: 1,
  },
});

export default LoginScreen;
