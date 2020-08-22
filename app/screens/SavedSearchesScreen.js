import React, { useEffect, useState, useRef, useContext } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { useScrollToTop } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import "firebase/firestore";

import AppText from "../components/AppText";
import AuthContext from "../auth/context";
import SavedContext from "../firestore/context";
import colors from "../config/colors";
import SavedSearchCard from "../components/SavedSearchCard";
import Screen from "../components/Screen";

function SavedSearchesScreen() {
  const ref = useRef(null);
  const { user, setUser } = useContext(AuthContext);
  const { refreshing, getSavedSearches, savedSearches } = useContext(
    SavedContext
  );
  const isFocused = useIsFocused();

  useEffect(() => {
    if (user !== null && isFocused === true) {
      getSavedSearches();
    }
  }, [isFocused]);

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
          renderItem={({ item }) => <SavedSearchCard savedSearch={item} />}
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
