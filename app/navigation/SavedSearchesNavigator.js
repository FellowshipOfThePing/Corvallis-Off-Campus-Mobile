import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Avatar from "../components/Avatar";
import SavedSearchesScreen from "../screens/SavedSearchesScreen";
import ThemeContext from "../theme/context";
import SavedContext from "../firestore/context";

const Stack = createStackNavigator();

const SavedSearchesNavigator = () => {
  const { colors, text } = useContext(ThemeContext);
  const { savedSearches } = useContext(SavedContext);
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
            fontSize: text.fontSize,
            fontFamily: text.fontFamily,
            fontWeight: text.fontWeight,
          },
          headerTintColor: colors.navHeaderText,
          headerTitle: "Saved Searches (" + savedSearches.length + ")",
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
