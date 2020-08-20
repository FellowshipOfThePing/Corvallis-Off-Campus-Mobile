import React, { useEffect, useState, useRef, useContext } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { useScrollToTop } from "@react-navigation/native";
import * as firebase from "firebase";
import "firebase/firestore";

import ApiContext from "../api/context";
import AppText from "../components/AppText";
import AuthContext from "../auth/context";
import Card from "../components/Card";
import colors from "../config/colors";
import Screen from "../components/Screen";

function SavedListingsScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);
  const { getListingsApi, filterState, setFilterState } = useContext(
    ApiContext
  );
  const [addressIDs, setAddressIDs] = useState([]);
  const [listings, setListings] = useState([]);

  const ref = useRef(null);
  useScrollToTop(ref);

  const getAddressIDs = () => {
    let email = firebase.auth().currentUser.email;
    let db = firebase.firestore();
    let docRef = db.collection("Favorites").doc(email);
    docRef
      .get()
      .then((doc) => {
        setAddressIDs(Object.values(doc.data().Address_ID));
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };

  const getFavorites = () => {
    getAddressIDs();
    if (getListingsApi.data.length > 0 && addressIDs.length > 0) {
      let favorites = [];
      let addresses = [];
      // Create list of listing address IDS from API
      getListingsApi.data.forEach((listing) =>
        addresses.push(listing.address_id)
      );

      // Find indexes of favorite address_IDS
      addressIDs.forEach((id) => {
        let index = addresses.indexOf(id);
        if (index !== -1) {
          favorites.push(getListingsApi.data[index]);
        }
      });
      setListings(favorites);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <>
      <Screen style={styles.screen}>
          <FlatList
            ref={ref}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 10 }}
            data={listings}
            keyExtractor={(listing) => listing.address_id.toString()}
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
                {!listings && <AppText>No Listings Found</AppText>}
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
    backgroundColor: colors.white,
    borderRadius: 15,
    overflow: "hidden",
    width: "100%",
    height: Dimensions.get("window").height * 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SavedListingsScreen;
