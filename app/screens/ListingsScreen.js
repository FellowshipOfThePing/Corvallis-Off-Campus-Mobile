import React, { useEffect, useState, useRef, useContext } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  StatusBar,
} from "react-native";
import { useScrollToTop } from "@react-navigation/native";
import "firebase/firestore";
import * as firebase from "firebase";
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
  const { getListingsApi, filterState, setFilterState } = useContext(
    ApiContext
  );
  const { colors } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const width = Dimensions.get("window").width - 10;
  const isFocused = useIsFocused();
  const ref = useRef(null);
  useScrollToTop(ref);
  const [tapped, setTapped] = useState(false);

  const {
    addressIDs,
    favorites,
    getFavorites,
    addFavorite,
    removeFavorite,
  } = useContext(SavedContext);

  const onHeartPress = (listing) => {
    if (user !== null) {
      if (addressIDs.includes(listing.address_id)) {
        removeFavorite(listing);
      } else {
        addFavorite(listing);
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
    ref.current.scrollToOffset({ animated: true, offset: 0 });
  }, [getListingsApi.data, filterState]);

  useEffect(() => {
    refresh();
  }, [filterState]);

  useEffect(() => {
    if (user !== null && isFocused === true) {
      getFavorites();
    }
  }, [tapped, isFocused]);

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
          onRefresh={() => refresh()}
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
