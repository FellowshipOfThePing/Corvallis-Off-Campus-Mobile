import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";

import useApi from "../hooks/useApi";
import listingsApi from "../api/listings";
import Screen from "../components/Screen";
import Card from "../components/Card";
import AppText from "../components/AppText";
import Button from "../components/Button";
import { useScrollToTop } from "@react-navigation/native";

function ListingsScreen({ navigation }) {
  const getListingsApi = useApi(listingsApi.getListings);
  const ref = useRef(null);
  useScrollToTop(ref);

  useEffect(() => {
    getListingsApi.request();
  }, []);

  return (
    <>
      <Screen style={styles.screen}>
        {getListingsApi.error && (
          <>
            <AppText>Couldn't retrieve the listings.</AppText>
            <Button title="Retry" onPress={getListingsApi.request} />
          </>
        )}
        <View style={styles.container}>
          <FlatList
            ref={ref}
            contentContainerStyle={{ paddingTop: 10 }}
            showsVerticalScrollIndicator={false}
            data={getListingsApi.data}
            keyExtractor={(listing) => listing.raw_id.toString()}
            refreshing={getListingsApi.loading}
            onRefresh={() => getListingsApi.request()}
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
          ></FlatList>
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 5,
    // marginTop: 15
  },
});

export default ListingsScreen;
