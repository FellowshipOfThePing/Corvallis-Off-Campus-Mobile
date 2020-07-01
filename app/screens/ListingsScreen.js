import React, { useState } from "react";
import { View, StyleSheet, FlatList, Modal, Button } from "react-native";

import Screen from "../components/Screen";
import Card from "../components/Card";

function ListingsScreen({ navigation }) {
  const listings = require("../../listings.json");

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <FlatList
          data={listings}
          keyExtractor={(listing) => listing.raw_id.toString()}
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
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 15,
  },
});

export default ListingsScreen;
