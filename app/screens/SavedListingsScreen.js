import React, { useEffect, useState, useRef, useContext } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { useScrollToTop } from "@react-navigation/native";
import "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";

import ApiContext from "../api/context";
import AppText from "../components/AppText";
import Card from "../components/Card";
import Screen from "../components/Screen";
import SavedContext from "../firestore/context";
import ThemeContext from "../theme/context";
import FocusAwareStatusBar from "../components/FocusAwareStatusBar";

function SavedListingsScreen({ navigation, route }) {
  const { getListingsApi } = useContext(ApiContext);
  const { colors } = useContext(ThemeContext);
  const {
    addressIDs,
    favorites,
    refreshing,
    syncFavorites,
    addFavorite,
    removeFavorite,
  } = useContext(SavedContext);

  const [tapped, setTapped] = useState(false);
  const [favsChanged, setFavsChanged] = useState(false);

  const isFocused = useIsFocused();
  const ref = useRef(null);
  useScrollToTop(ref);

  const onHeartPress = (listing) => {
    if (addressIDs.includes(listing.address_id)) {
      removeFavorite(listing);
    } else {
      addFavorite(listing);
    }
    setTapped(!tapped);
    setFavsChanged(true);
  };

  useEffect(() => {
    if (!isFocused && favsChanged) {
      syncFavorites();
      setFavsChanged(false);
    }
  }, [isFocused]);

  return (
    <>
      <Screen style={[styles.screen, { backgroundColor: colors.light }]}>
        <FocusAwareStatusBar
          barStyle="light-content"
          backgroundColor="#6a51ae"
        />
        <FlatList
          ref={ref}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 10 }}
          data={favorites}
          keyExtractor={(listing) => listing.address_id.toString()}
          refreshing={refreshing || getListingsApi.loading}
          onRefresh={() => syncFavorites()}
          getItemLayout={(data, index) => ({
            length: 345,
            offset: 345 * index,
            index: index,
          })}
          renderItem={({ item }) => (
            <Card
              listing={item}
              colors={colors}
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
            <View
              style={[styles.defaultCard, { backgroundColor: colors.light }]}
            >
              <AppText>No Listings Found</AppText>
            </View>
          )}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 5,
  },
  defaultCard: {
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
