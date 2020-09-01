import React, { useEffect, useState, useRef, useContext } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { useScrollToTop } from "@react-navigation/native";
import firebase from "../auth/config";
import "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";

import Screen from "../components/Screen";
import Card from "../components/Card";
import ApiContext from "../api/context";
import AppText from "../components/AppText";
import ActivityIndicator from "../components/ActivityIndicator";
import AuthContext from "../auth/context";
import SavedContext from "../firestore/context";
import ThemeContext from "../theme/context";
import FocusAwareStatusBar from "../components/FocusAwareStatusBar";

function ListingsScreen({ navigation, route }) {
  const { colors } = useContext(ThemeContext);
  const { user, email } = useContext(AuthContext);
  const { getListingsApi, filterState } = useContext(ApiContext);
  const {
    addressIDs,
    favorites,
    syncFavorites,
    addFavorite,
    removeFavorite,
    toggleHeartPressed,
  } = useContext(SavedContext);

  const ref = useRef(null);
  useScrollToTop(ref);

  const isFocused = useIsFocused();
  const [tapped, setTapped] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [favsChanged, setFavsChanged] = useState(false);

  const onHeartPress = (listing) => {
    if (user !== null) {
      if (addressIDs.includes(listing.address_id)) {
        removeFavorite(listing);
      } else {
        addFavorite(listing);
      }
      setTapped(!tapped);
      setFavsChanged(true);
    }
  };

  useEffect(() => {
    if (initialLoad) {
      getListingsApi.request(filterState);
    }
  }, []);

  useEffect(() => {
    ref.current.scrollToOffset({ animated: true, offset: 0 });
  }, [getListingsApi.data, filterState]);

  useEffect(() => {
    if (email && initialLoad) {
      syncFavorites();
      setInitialLoad(false);
    }
  }, [email]);

  useEffect(() => {
    if (user && !isFocused && favsChanged) {
      syncFavorites();
      setFavsChanged(false);
    }
  }, [isFocused]);

  const renderItem = ({ item, index }) => (
    <Card
      listing={item}
      onPress={() =>
        navigation.navigate("ListingDetailNavigator", {
          screen: "ListingDetailScreen",
          params: { listing: item, index: index },
        })
      }
      colors={colors}
      saved={addressIDs.includes(item.address_id)}
      onPressHeart={() => {
        if (!user) {
          toggleHeartPressed();
        }
        onHeartPress(item);
      }}
    />
  );

  return (
    <>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <Screen style={[styles.screen, { backgroundColor: colors.light }]}>
        <FlatList
          ref={ref}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 10 }}
          initialNumToRender={10}
          data={getListingsApi.data}
          extraData={favorites}
          keyExtractor={(listing) => listing.address_id.toString()}
          refreshing={getListingsApi.loading}
          onRefresh={() => getListingsApi.request(filterState)}
          getItemLayout={(data, index) => ({
            length: 345,
            offset: 345 * index,
            index: index,
          })}
          renderItem={renderItem}
          ListEmptyComponent={() => (
            <View
              style={[styles.defaultCard, { backgroundColor: colors.white }]}
            >
              <ActivityIndicator visible={getListingsApi.loading} />
              {!getListingsApi.loading && <AppText>No Listings Found</AppText>}
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
    height: Dimensions.get("window").height * 0.75,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListingsScreen;
