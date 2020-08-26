import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import colors from "../config/colors";
import Avatar from "../components/Avatar";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={({ navigation }) => ({
      headerTransparent: true,
      headerTitleStyle: {
        paddingBottom: 8,
        fontSize: 18,
      },
      title: false,
      headerTintColor: colors.white,
      headerLeft: () => {
        return (
          <Avatar
            size={35}
            color={colors.black}
            onPress={() => navigation.openDrawer()}
          />
        );
      },
      headerLeftContainerStyle: {
        paddingLeft: 10,
        paddingBottom: 10,
      },
    })}
  >
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
