import React, { useEffect, useState, useRef, useContext } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { useScrollToTop } from "@react-navigation/native";
import "firebase/firestore";
import * as firebase from "firebase";
import { useIsFocused } from "@react-navigation/native";

import Screen from "../components/Screen";
import Card from "../components/Card";
import ApiContext from "../api/context";
import colors from "../config/colors";
import AppText from "../components/AppText";
import ActivityIndicator from "../components/ActivityIndicator";
import AuthContext from "../auth/context";
import SavedContext from "../firestore/context";

function ListingsScreen({ navigation, route }) {
  const { getListingsApi, filterState, setFilterState } = useContext(
    ApiContext
  );
  const { user, setUser } = useContext(AuthContext);
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
    if (user !== null) {
      if (addressIDs.includes(listing.address_id)) {
        removeFavorite(listing);
        console.log("Listing removed from favorites");
      } else {
        addFavorite(listing);
        console.log("Listing added to favorites");
      }
      setTapped(!tapped);
    }
  };

  const refresh = () => {
    getListingsApi.request(filterState);
    if (user !== null) {
      getFavorites();
    }
  };

  useEffect(() => {
    refresh();
  }, [filterState]);

  useEffect(() => {
    if (user !== null) {
      getFavorites();
    }
  }, [tapped]);

  useEffect(() => {
    ref.current.scrollToOffset({ animated: true, offset: 0 });
  }, [getListingsApi.data]);

  return (
    <>
      <Screen style={styles.screen}>
        <FlatList
          ref={ref}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 10 }}
          data={getListingsApi.data}
          extraData={favorites}
          keyExtractor={(listing) => listing.address_id.toString()}
          refreshing={getListingsApi.loading}
          onRefresh={() => refresh()}
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
              <ActivityIndicator visible={getListingsApi.loading} />
              {!getListingsApi.loading && <AppText>No Listings Found</AppText>}
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
    height: Dimensions.get("window").height * 0.75,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListingsScreen;
