import React from "react";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import ListingDetailScreen from "../screens/ListingDetailScreen";
import Browser from "../screens/Browser";
import ImageCarouselScreen from "../components/ImageCarousel";

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
        headerLeft: (props) => {
          <HeaderBackButton
            {...props}
            label="listing"
            labelStyle={{ color: "black" }}
            onPress={() => navigation.pop()}
          />;
        },
      })}
    />
  </Stack.Navigator>
);

export default ListingDetailNavigator;
