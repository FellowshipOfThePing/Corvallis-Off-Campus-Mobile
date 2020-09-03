import React, { useEffect, useState, useRef, useContext } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  RefreshControl,
} from "react-native";
import { useScrollToTop } from "@react-navigation/native";
import "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";

import RefreshIndicator from "../components/RefreshIndicator";
import ApiContext from "../api/context";
import AppText from "../components/AppText";
import Card from "../components/Card";
import Screen from "../components/Screen";
import SavedContext from "../firestore/context";
import ThemeContext from "../theme/context";
import FocusAwareStatusBar from "../components/FocusAwareStatusBar";

function SavedListingsScreen({ navigation }) {
  const { getListingsApi, filterState } = useContext(ApiContext);
  const { colors } = useContext(ThemeContext);
  const {
    addressIDs,
    favorites,
    syncFavorites,
    addFavorite,
    removeFavorite,
  } = useContext(SavedContext);

  const [tapped, setTapped] = useState(false);
  const [favsChanged, setFavsChanged] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [isRefreshing, setIsRefresing] = useState(true);

  const isFocused = useIsFocused();
  const lottieRef = useRef(null);
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
    if (initialLoad) {
      syncFavorites();
      lottieRef.current.play();
      setInitialLoad(false);
    }
  }, []);

  useEffect(() => {
    setIsRefresing(false);
  }, [favorites]);

  useEffect(() => {
    if (!isFocused && favsChanged) {
      syncFavorites();
      setFavsChanged(false);
    }
  }, [isFocused]);

  useEffect(() => {
    syncFavorites();
  }, [filterState, tapped]);

  useEffect(() => {
    if (isRefreshing) {
      lottieRef.current.play();
    } else {
      setTimeout(() => {
        lottieRef.current.reset();
      }, 400);
    }
  }, [isRefreshing]);

  const renderItem = ({ item }) => (
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
  );

  return (
    <>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <Screen style={[styles.screen, { backgroundColor: colors.light }]}>
        <RefreshIndicator lottieRef={lottieRef} />
        <FlatList
          ref={ref}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 10 }}
          data={favorites}
          extraData={filterState}
          keyExtractor={(listing) => listing.address_id.toString()}
          getItemLayout={(data, index) => ({
            length: 345,
            offset: 345 * index,
            index: index,
          })}
          refreshControl={
            <RefreshControl
              tintColor="transparent"
              colors={["transparent"]}
              style={{ backgroundColor: "transparent" }}
              refreshing={isRefreshing || getListingsApi.loading}
              onRefresh={() => {
                setIsRefresing(true);
                syncFavorites();
              }}
            />
          }
          renderItem={renderItem}
          ListEmptyComponent={() => (
            <View
              style={[styles.defaultCard, { backgroundColor: colors.light }]}
            >
              <AppText>No Listings Found</AppText>
              <AppText>(Pull to Refresh!)</AppText>
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
