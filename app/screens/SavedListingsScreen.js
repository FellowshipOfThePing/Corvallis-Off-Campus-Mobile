import React, { useEffect, useState, useRef, useContext } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { useScrollToTop } from "@react-navigation/native";
import "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";

import ApiContext from "../api/context";
import AppText from "../components/AppText";
import AuthContext from "../auth/context";
import Card from "../components/Card";
import colors from "../config/colors";
import Screen from "../components/Screen";
import SavedContext from "../firestore/context";

function SavedListingsScreen({ navigation, route }) {
  const { user, setUser } = useContext(AuthContext);
  const { getListingsApi, filterState, setFilterState } = useContext(
    ApiContext
  );
  const isFocused = useIsFocused();
  const ref = useRef(null);
  useScrollToTop(ref);
  const [tapped, setTapped] = useState(false);

  const {
    addressIDs,
    setAddressIDs,
    favorites,
    setFavorites,
    refreshing,
    setRefreshing,
    getAddressIDs,
    getFavorites,
    addFavorite,
    removeFavorite,
  } = useContext(SavedContext);

  const onHeartPress = (listing) => {
    if (addressIDs.includes(listing.address_id)) {
      removeFavorite(listing);
      console.log("Listing removed from favorites");
    } else {
      addFavorite(listing);
      console.log("Listing added to favorites");
    }
    setTapped(!tapped);
  };

  useEffect(() => {
    getFavorites();
  }, [isFocused, tapped]);

  return (
    <>
      <Screen style={styles.screen}>
        <FlatList
          ref={ref}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 10 }}
          data={favorites}
          keyExtractor={(listing) => listing.address_id.toString()}
          refreshing={refreshing}
          onRefresh={() => getFavorites()}
          renderItem={({ item }) => (
            <Card
              listing={item}
              onPress={() =>
                navigation.navigate("ListingDetailNavigator", {
                  screen: "ListingDetailScreen",
                  params: { listing: item },
                })
              }
              saved={addressIDs.includes(item.address_id)}
              onPressHeart={() => onHeartPress(item)}
            />
          )}
          ListEmptyComponent={() => (
            <View style={styles.defaultCard}>
              {!favorites && <AppText>No Listings Found</AppText>}
            </View>
          )}
        ></FlatList>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 5,
  },
  defaultCard: {
    backgroundColor: colors.white,
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
    width: "100%",
    height: Dimensions.get("window").height * 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SavedListingsScreen;
