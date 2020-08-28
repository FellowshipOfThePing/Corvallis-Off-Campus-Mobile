import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SettingsScreen from "../screens/SettingsScreen";
import Avatar from "../components/Avatar";
import ThemeContext from "../theme/context";

const Stack = createStackNavigator();

const SettingsNavigator = () => {
  const { colors } = useContext(ThemeContext);
  return (
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
            backgroundColor: colors.navHeaderBackground,
          },
          headerTitleStyle: {
            paddingBottom: 8,
            fontSize: 18,
          },
          headerTintColor: colors.navHeaderText,
          headerLeft: () => {
            return <Avatar size={35} color={colors.navHeaderText} onPress={() => navigation.openDrawer()} />;
          },
          headerLeftContainerStyle: {
            paddingLeft: 10,
            paddingBottom: 10,
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
