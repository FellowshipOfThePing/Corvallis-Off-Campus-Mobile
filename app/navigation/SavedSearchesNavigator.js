import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Avatar from "../components/Avatar";
import SavedSearchesScreen from "../screens/SavedSearchesScreen";
import ThemeContext from "../config/context";

const Stack = createStackNavigator();

const SavedSearchesNavigator = () => {
  const { colors, text } = useContext(ThemeContext);
  return (
    <Stack.Navigator
      screenOptions={{
        gestureResponseDistance: { vertical: 500 },
        gestureVelocityImpact: 0.6,
      }}
    >
      <Stack.Screen
        name="Saved Searches"
        component={SavedSearchesScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.navHeaderBackground,
          },
          headerTitleStyle: {
            paddingBottom: 5,
            fontSize: 18,
            fontFamily: text.fontFamily,
          },
          headerTintColor: colors.navHeaderText,
          headerLeft: () => {
            return (
              <Avatar
                size={35}
                color={colors.navHeaderText}
                onPress={() => navigation.openDrawer()}
              />
            );
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

export default SavedSearchesNavigator;
