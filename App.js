import React from "react";
import { View, StyleSheet } from "react-native";
import DrawerNavigator from "./app/navigation/DrawerNavigator";
import { NavigationContainer } from "@react-navigation/native";
import * as firebase from "firebase";
import "firebase/firestore";
import firebaseConfig from "./app/auth/config";

import ApiContext from "./app/api/ContextWrapper";
import AuthContext from "./app/auth/ContextWrapper";
import SavedContext from "./app/firestore/ContextWrapper";
import ThemeContext from "./app/theme/ContextWrapper";

export default function App() {
  return (
    <ThemeContext>
      <AuthContext>
        <ApiContext>
          <SavedContext>
            <NavigationContainer>
              <DrawerNavigator />
            </NavigationContainer>
          </SavedContext>
        </ApiContext>
      </AuthContext>
    </ThemeContext>
  );
}
