import React, { useState, useContext } from "react";
import SavedContext from "./context";
import ApiContext from "../api/context";

export default ({ children }) => {
  const [addressIDs, setAddressIDs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [savedSearches, setSavedSearches] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [email, setEmail] = useState(null);
  const [db, setDB] = useState(null);
  const { getListingsApi } = useContext(ApiContext);

  const getAddressIDs = async () => {
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
  };

  const saveSearch = () => {
    setRefreshing(true);
    const docRef = db.collection("Users").doc(email);
    docRef.update({
      SavedSearches: savedSearches,
    });
    setRefreshing(false);
    console.log("[NETWORK] Saved Search Modified!");
  };

  return (
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
      {children}
    </SavedContext.Provider>
  );
};
