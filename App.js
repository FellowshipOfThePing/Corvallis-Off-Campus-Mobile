import React, { useState } from "react";
import DrawerNavigator from "./app/navigation/DrawerNavigator";
import { NavigationContainer } from "@react-navigation/native";
import * as firebase from "firebase";
import "firebase/firestore";

import ApiContext from "./app/api/context";
import AuthContext from "./app/auth/context";
import SavedContext from "./app/firestore/context";
import listingsApi from "./app/api/listings";
import OfflineNotice from "./app/components/OfflineNotice";
import useApi from "./app/hooks/useApi";

export default function App() {
  const [user, setUser] = useState(null);
  const getListingsApi = useApi(listingsApi.getListings);
  const [filterState, setFilterState] = useState({
    price_low: 0,
    price_high: 5000,
    beds_low: 1,
    beds_high: 5,
    baths_low: 1,
    baths_high: 5,
    distance_low: 0,
    distance_high: 25,
    drive_low: 0,
    drive_high: 40,
    walk_low: 0,
    walk_high: 50,
  });

  const [addressIDs, setAddressIDs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [savedSearches, setSavedSearches] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [email, setEmail] = useState(null);
  const [db, setDB] = useState(null);

  const getAddressIDs = async () => {
    if (user !== null) {
      const docRef = db.collection("Users").doc(email);
      docRef
        .get()
        .then((doc) => {
          setAddressIDs(Object.values(doc.data().Favorites));
          console.log(
            "[NETWORK] AddressIDs successfully retrieved from Firestore"
          );
        })
        .catch((error) => {
          console.log(
            "[NETWORK] Error getting Address IDs from Firestore:",
            error
          );
        });
    }
  };

  const getFavorites = () => {
    setRefreshing(true);
    getAddressIDs();
    if (getListingsApi.data.length > 0 && addressIDs.length > 0) {
      let listings = [];
      let addresses = [];

      // Create list of listing address IDs from API
      getListingsApi.data.forEach((listing) =>
        addresses.push(listing.address_id)
      );

      // Find indexes of favorite address_IDs
      addressIDs.forEach((id) => {
        let index = addresses.indexOf(id);
        if (index !== -1) {
          listings.push(getListingsApi.data[index]);
        }
      });
      setFavorites(listings);
    } else {
      setFavorites([]);
    }
    setRefreshing(false);
  };

  const addFavorite = (listing) => {
    let addresses = addressIDs;
    addresses.push(listing.address_id);
    setAddressIDs(addresses);
    let docRef = db.collection("Users").doc(email);
    docRef.update({
      Favorites: addressIDs,
    });
    console.log("[NETWORK] Listing added to favorites");
  };

  const removeFavorite = (listing) => {
    let index = addressIDs.indexOf(listing.address_id);
    let addresses = addressIDs;
    addresses.splice(index, 1);
    setAddressIDs(addresses);
    let docRef = db.collection("Users").doc(email);
    docRef.update({
      Favorites: addressIDs,
    });
    console.log("[NETWORK] Listing removed from favorites");
  };

  const getSavedSearches = () => {
    if (user !== null) {
      setRefreshing(true);
      const docRef = db.collection("Users").doc(email);
      docRef
        .get()
        .then((doc) => {
          setSavedSearches(Object.values(doc.data().SavedSearches));
          console.log("[NETWORK] Retrieved Saved Searches!");
        })
        .catch((error) => {
          console.log(
            "[NETWORK] Error getting Saved Searches from Firestore:",
            error
          );
        });
      setRefreshing(false);
    }
  };

  const saveSearch = () => {
    if (user !== null) {
      setRefreshing(true);
      const docRef = db.collection("Users").doc(email);
      docRef.update({
        SavedSearches: savedSearches,
      });
      setRefreshing(false);
      console.log("[NETWORK] Search Saved!");
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <ApiContext.Provider
        value={{ getListingsApi, filterState, setFilterState }}
      >
        <SavedContext.Provider
          value={{
            addressIDs,
            setAddressIDs,
            favorites,
            setFavorites,
            refreshing,
            setRefreshing,
            getAddressIDs,
            getFavorites,
            addFavorite,
            removeFavorite,
            setEmail,
            setDB,
            getSavedSearches,
            savedSearches,
            saveSearch,
            setSavedSearches,
          }}
        >
          <OfflineNotice />
          <NavigationContainer>
            <DrawerNavigator />
          </NavigationContainer>
        </SavedContext.Provider>
      </ApiContext.Provider>
    </AuthContext.Provider>
  );
}
