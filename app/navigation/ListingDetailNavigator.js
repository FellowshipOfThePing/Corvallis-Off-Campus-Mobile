import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ListingDetailScreen from "../screens/ListingDetailScreen";
import Browser from "../screens/Browser";
import AppText from "../components/AppText";
import ThemeContext from "../theme/context";

const Stack = createStackNavigator();

const ListingDetailNavigator = () => {
  const { colors, text } = useContext(ThemeContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureResponseDistance: { vertical: 500 },
        gestureVelocityImpact: 0.6,
      }}
    >
      <Stack.Screen
        name="ListingDetailScreen"
        component={ListingDetailScreen}
      />
      <Stack.Screen
        name="Browser"
        component={Browser}
        options={({ navigation, route }) => ({
          headerShown: true,
          headerTitle: route.params.title,
          headerBackTitle: "Listing",
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.black,
          headerTitleStyle: {
            fontFamily: text.fontFamily,
            paddingBottom: 5,
            fontSize: 15,
          },
          headerLeft: () => {
            return (
              <TouchableOpacity
                delayPressIn={0}
                style={styles.backButton}
                onPress={() => navigation.pop()}
              >
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={30}
                  color={colors.black}
                />
                <AppText style={{ paddingTop: 3 }}>Listing</AppText>
              </TouchableOpacity>
            );
          },
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  backButton: {
    flexDirection: "row",
    paddingBottom: 8,
  },
});

export default ListingDetailNavigator;
