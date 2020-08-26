import React, { useEffect, useState, useRef, useContext } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { useScrollToTop } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import "firebase/firestore";

import AppText from "../components/AppText";
import AuthContext from "../auth/context";
import ApiContext from "../api/context";
import SavedContext from "../firestore/context";
import colors from "../config/colors";
import SavedSearchCard from "../components/SavedSearchCard";
import Screen from "../components/Screen";

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
  const isFocused = useIsFocused();
  const [expanded, setExpanded] = useState(null);
  const [change, setChange] = useState(true);

  useEffect(() => {
    setExpanded(null);
    if (isFocused === true) {
      getSavedSearches();
    }
  }, [isFocused, change]);

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
      <Screen style={styles.screen}>
        <FlatList
          ref={ref}
          data={savedSearches}
          keyExtractor={(listing, index) => index.toString()}
          refreshing={refreshing}
          onRefresh={() => getSavedSearches()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 10 }}
          renderItem={({ item, index }) => (
            <SavedSearchCard
              savedSearch={item}
              onPress={() => handlePress(index)}
              onPressDelete={() => onRemove(index)}
              onPressApply={() => onApply(item)}
              expanded={index === expanded}
            />
          )}
          ListEmptyComponent={() => (
            <View style={styles.defaultCard}>
              <AppText>No Searches Found</AppText>
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

export default SavedSearchesScreen;
