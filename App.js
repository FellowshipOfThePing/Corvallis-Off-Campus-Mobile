import React from "react";
import DrawerNavigator from "./app/navigation/DrawerNavigator";
import { NavigationContainer } from "@react-navigation/native";
import firebase from "./app/auth/config";
import "firebase/firestore";

import logger from "./app/utils/logger";
import ApiContext from "./app/api/ContextWrapper";
import AuthContext from "./app/auth/ContextWrapper";
import SavedContext from "./app/firestore/ContextWrapper";
import ThemeContext from "./app/theme/ContextWrapper";

logger.start();

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
