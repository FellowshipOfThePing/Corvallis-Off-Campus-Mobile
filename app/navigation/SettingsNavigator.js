import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SettingsScreen from "../screens/SettingsScreen";
import colors from "../config/colors";
import Avatar from "../components/Avatar";

const Stack = createStackNavigator();

const SettingsNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      gestureResponseDistance: { vertical: 500 },
      gestureVelocityImpact: 0.6,
    }}
  >
    <Stack.Screen
      name="Settings"
      component={SettingsScreen}
      options={({ navigation }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTitleStyle: {
          paddingBottom: 8,
          fontSize: 18,
        },
        headerTintColor: "#fff",
        headerLeft: () => {
          return <Avatar size={35} onPress={() => navigation.openDrawer()} />;
        },
        headerLeftContainerStyle: {
          paddingLeft: 10,
          paddingBottom: 10,
        },
      })}
    />
  </Stack.Navigator>
);

export default SettingsNavigator;
