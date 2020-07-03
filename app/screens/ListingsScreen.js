import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";

import useApi from "../hooks/useApi";
import listingsApi from "../api/listings";
import Screen from "../components/Screen";
import Card from "../components/Card";
import AppText from "../components/AppText";
import Button from "../components/Button";

function ListingsScreen({ navigation }) {
  const getListingsApi = useApi(listingsApi.getListings);

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
            data={getListingsApi.data}
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
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 15,
  },
});

export default ListingsScreen;
