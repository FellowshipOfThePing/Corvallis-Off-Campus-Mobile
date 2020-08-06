import React, { useEffect, useState, useRef, useContext } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";

import Screen from "../components/Screen";
import Card from "../components/Card";
import { useScrollToTop } from "@react-navigation/native";
import ApiContext from "../api/context";
import colors from "../config/colors";
import AppText from "../components/AppText";
import ActivityIndicator from "../components/ActivityIndicator";

function ListingsScreen({ navigation }) {
  const { getListingsApi, filterState, setFilterState } = useContext(
    ApiContext
  );
  const ref = useRef(null);
  useScrollToTop(ref);

  useEffect(() => {
    getListingsApi.request(filterState);
  }, [filterState]);

  useEffect(() => {
    ref.current.scrollToOffset({ animated: true, offset: 0 });
  }, [getListingsApi.data]);

  return (
    <>
      <Screen style={styles.screen}>
        <View style={styles.container}>
          <FlatList
            ref={ref}
            contentContainerStyle={{ paddingTop: 10 }}
            showsVerticalScrollIndicator={false}
            data={getListingsApi.data}
            keyExtractor={(listing) => listing.raw_id.toString()}
            refreshing={getListingsApi.loading}
            onRefresh={() => getListingsApi.request(filterState)}
            renderItem={({ item }) => (
              <Card
                listing={item}
                onPress={() =>
                  navigation.navigate("ListingDetailNavigator", {
                    screen: "ListingDetailScreen",
                    params: { listing: item },
                  })
                }
              />
            )}
            ListEmptyComponent={() => (
              <View style={styles.defaultCard}>
                <ActivityIndicator visible={getListingsApi.loading} />
                {!getListingsApi.loading && (
                  <AppText>No Listings Found</AppText>
                )}
              </View>
            )}
          ></FlatList>
        </View>
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
    height: Dimensions.get("window").height * .75,
    justifyContent: "center",
    alignItems: "center"
  },
});

export default ListingsScreen;
