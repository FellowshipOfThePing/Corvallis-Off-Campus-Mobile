import React, { useEffect, useState, useRef, useContext } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  RefreshControl,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import "firebase/firestore";

import AppText from "../components/AppText";
import ApiContext from "../api/context";
import SavedContext from "../firestore/context";
import SavedSearchCard from "../components/SavedSearchCard";
import Screen from "../components/Screen";
import ThemeContext from "../theme/context";
import FocusAwareStatusBar from "../components/FocusAwareStatusBar";
import AuthContext from "../auth/context";
import RefreshIndicator from "../components/RefreshIndicator";

function SavedSearchesScreen({ navigation }) {
  const ref = useRef(null);
  const { user } = useContext(AuthContext);
  const { getListingsApi, setFilterState } = useContext(ApiContext);
  const {
    refreshing,
    getSavedSearches,
    setSavedSearches,
    savedSearches,
    saveSearch,
  } = useContext(SavedContext);
  const { colors } = useContext(ThemeContext);

  const isFocused = useIsFocused();
  const lottieRef = useRef(null);

  const [expanded, setExpanded] = useState(null);
  const [change, setChange] = useState(true);

  useEffect(() => {
    setExpanded(null);
    if (user && !isFocused) {
      getSavedSearches();
    }
  }, [isFocused]);

  useEffect(() => {
    if (user) {
      getSavedSearches();
    }
  }, []);

  useEffect(() => {
    if (refreshing) {
      lottieRef.current.play();
    } else {
      setTimeout(() => {
        lottieRef.current.reset();
      }, 400);
    }
  }, [refreshing]);

  const handlePress = (index) => {
    if (index === expanded) {
      setExpanded(null);
    } else {
      setExpanded(index);
    }
  };

  const onRemove = (index) => {
    let saved = savedSearches;
    saved.splice(index, 1);
    setSavedSearches(saved);
    saveSearch();
    setChange(!change);
  };

  const onApply = (filterState) => {
    setFilterState(filterState);
    setTimeout(() => {
      getListingsApi.request(filterState);
    }, 1000);
    navigation.navigate("Home");
  };

  return (
    <>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <Screen style={[styles.screen, { backgroundColor: colors.light }]}>
        <RefreshIndicator lottieRef={lottieRef} />
        <FlatList
          ref={ref}
          data={savedSearches}
          keyExtractor={(listing, index) => index.toString()}
          refreshControl={
            <RefreshControl
              tintColor="transparent"
              colors={["transparent"]}
              style={{ backgroundColor: "transparent" }}
              refreshing={refreshing}
              onRefresh={() => getSavedSearches()}
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 10 }}
          renderItem={({ item, index }) => (
            <SavedSearchCard
              colors={colors}
              savedSearch={item}
              onPress={() => handlePress(index)}
              onPressDelete={() => onRemove(index)}
              onPressApply={() => onApply(item)}
              expanded={index === expanded}
            />
          )}
          ListEmptyComponent={() => (
            <View
              style={[styles.defaultCard, { backgroundColor: colors.light }]}
            >
              <AppText>No Searches Found</AppText>
              <AppText>(Pull to Refresh!)</AppText>
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
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
    width: "100%",
    height: Dimensions.get("window").height * 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SavedSearchesScreen;
