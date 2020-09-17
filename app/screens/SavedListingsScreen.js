import React, { useEffect, useState, useRef, useContext } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  RefreshControl,
  Animated,
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
  const { filterState } = useContext(ApiContext);
  const { colors, darkMode } = useContext(ThemeContext);
  const {
    addressIDs,
    favorites,
    syncFavorites,
    addFavorite,
    removeFavorite,
    refreshingFavorites,
  } = useContext(SavedContext);

  const [tapped, setTapped] = useState(false);
  const [favsChanged, setFavsChanged] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const isFocused = useIsFocused();
  const lottieRef = useRef(null);
  const ref = useRef(null);
  useScrollToTop(ref);

  let scrollY = new Animated.Value(0);
  let opacityAnimation = scrollY.interpolate({
    inputRange: [-50, 0],
    outputRange: [1, 0],
  });

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
      if (__DEV__) {
        console.log("EFFECT 1: Initial Load");
      }
      syncFavorites();
      lottieRef.current.play();
      setInitialLoad(false);
    } else if (!isFocused && favsChanged) {
      if (__DEV__) {
        console.log("EFFECT 1: Syncing Favorites");
      }
      syncFavorites();
      setFavsChanged(false);
    }
  }, [isFocused]);

  useEffect(() => {
    if (!initialLoad) {
      syncFavorites();
      if (__DEV__) {
        console.log("EFFECT 2: Syncing Favorites");
      }
    }
  }, [filterState, tapped]);

  useEffect(() => {
    if (refreshingFavorites) {
      lottieRef.current.play();
      if (__DEV__) {
        console.log("EFFECT 3: Playing Lottie");
      }
    } else {
      if (__DEV__) {
        console.log("EFFECT 3: Resetting Lottie");
      }
      setTimeout(() => {
        lottieRef.current.reset();
      }, 200);
    }
  }, [refreshingFavorites]);

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
      <Screen
        style={[styles.screen, { backgroundColor: colors.light }]}
        noBottom
      >
        <RefreshIndicator
          lottieRef={lottieRef}
          darkMode={darkMode}
          opacity={opacityAnimation}
        />
        <Animated.FlatList
          ref={ref}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 10 }}
          data={favorites}
          extraData={initialLoad}
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
              refreshing={refreshingFavorites}
              onRefresh={() => {
                syncFavorites();
              }}
            />
          }
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollY,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          renderItem={renderItem}
          ListEmptyComponent={() => (
            <View style={[styles.defaultCard]}>
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
