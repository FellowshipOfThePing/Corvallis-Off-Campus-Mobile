import React from "react";
import {
  createStackNavigator,
} from "@react-navigation/stack";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ListingDetailScreen from "../screens/ListingDetailScreen";
import Browser from "../screens/Browser";
import colors from "../config/colors";
import defaultStyles from "../config/styles";
import AppText from "../components/AppText";

const Stack = createStackNavigator();

const ListingDetailNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      gestureResponseDistance: { vertical: 500 },
      gestureVelocityImpact: 0.6,
    }}
  >
    <Stack.Screen name="ListingDetailScreen" component={ListingDetailScreen} />
    <Stack.Screen
      name="Browser"
      component={Browser}
      options={({ navigation, route }) => ({
        headerShown: true,
        headerTitle: route.params.title,
        headerBackTitle: "Listing",
        headerStyle: {
          backgroundColor: colors.white
        },
        headerTintColor: colors.black,
        headerTitleStyle: {
          fontFamily: defaultStyles.text.fontFamily,
          fontWeight: "bold",
          paddingBottom: 7,
        },
        headerLeft: () => {
          return (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.pop()}
            >
              <MaterialCommunityIcons
                name="chevron-left"
                size={30}
                color={colors.medium}
              />
              <AppText style={{ paddingTop: 2 }}>Listing</AppText>
            </TouchableOpacity>
          );
        },
      })}
    />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  backButton: {
    flexDirection: "row",
    paddingBottom: 8,
  },
});

export default ListingDetailNavigator;
