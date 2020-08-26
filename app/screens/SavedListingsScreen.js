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
    } else {
      addFavorite(listing);
    }
    setTapped(!tapped);
  };

  useEffect(() => {
    if (isFocused === true) {
      getFavorites();
    }
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
          refreshing={refreshing || getListingsApi.loading}
          onRefresh={() => getFavorites()}
          getItemLayout={(data, index) => ({
            length: 345,
            offset: 345 * index,
            index: index,
          })}
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
              <AppText>No Listings Found</AppText>
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
    backgroundColor: colors.light,
  },
  defaultCard: {
    backgroundColor: colors.light,
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
    width: "100%",
    height: Dimensions.get("window").height * 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SavedListingsScreen;
