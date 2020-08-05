import React, { useEffect, useState, useRef, useContext } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";

import Screen from "../components/Screen";
import Card from "../components/Card";
import { useScrollToTop } from "@react-navigation/native";
import ApiContext from "../api/context";

function ListingsScreen({ navigation }) {
  const { getListingsApi } = useContext(ApiContext);
  const ref = useRef(null);
  useScrollToTop(ref);

  useEffect(() => {
    getListingsApi.request();
  }, []);

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
