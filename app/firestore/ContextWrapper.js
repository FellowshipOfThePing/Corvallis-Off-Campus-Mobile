import React, { useState, useContext } from "react";
import firebase from "../auth/config";
import "firebase/firestore";

import SavedContext from "./context";
import ApiContext from "../api/context";
import AuthContext from "../auth/context";

export default ({ children }) => {
  const { email, db } = useContext(AuthContext);
  const { getListingsApi } = useContext(ApiContext);

  const [addressIDs, setAddressIDs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [savedSearches, setSavedSearches] = useState([]);
  const [refreshingFavorites, setRefreshingFavorites] = useState(false);
  const [refreshingSearches, setRefreshingSearches] = useState(false);
  const [heartPressed, setHeartPressed] = useState(false);

  const toggleHeartPressed = () => {
    setHeartPressed((previous) => !previous);
  };

  const getAddressIDs = () => {
    const docRef = db.collection("Users").doc(email);
    docRef
      .get()
      .then((doc) => {
        setAddressIDs(Object.values(doc.data().Favorites));
        if (__DEV__) {
          console.log(
            "[NETWORK] AddressIDs successfully retrieved from Firestore"
          );
        }
      })
      .catch((error) => {
        if (__DEV__) {
          console.log(
            "[NETWORK] Error getting Address IDs from Firestore:",
            error
          );
        }
      });
  };

  const syncFavorites = () => {
    setRefreshingFavorites(true);
    getAddressIDs();
    if (
      getListingsApi.data &&
      getListingsApi.data.length > 0 &&
      addressIDs.length > 0
    ) {
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
      setRefreshingFavorites(false);
    } else {
      setFavorites([]);
      setRefreshingFavorites(false);
    }
  };

  const addFavorite = async (listing) => {
    let addresses = addressIDs;
    addresses.push(listing.address_id);
    setAddressIDs(addresses);
    let docRef = db.collection("Users").doc(email);
    docRef.update({
      Favorites: addressIDs,
    });
    if (__DEV__) {
      console.log("[NETWORK] Listing added to favorites");
    }
  };

  const removeFavorite = async (listing) => {
    let index = addressIDs.indexOf(listing.address_id);
    let addresses = addressIDs;
    addresses.splice(index, 1);
    setAddressIDs(addresses);
    let docRef = db.collection("Users").doc(email);
    docRef.update({
      Favorites: addressIDs,
    });
    if (__DEV__) {
      console.log("[NETWORK] Listing removed from favorites");
    }
  };

  const getSavedSearches = () => {
    setRefreshingSearches(true);
    const docRef = db.collection("Users").doc(email);
    docRef
      .get()
      .then((doc) => {
        setSavedSearches(Object.values(doc.data().SavedSearches));
        setRefreshingSearches(false);
        if (__DEV__) {
          console.log("[NETWORK] Retrieved Saved Searches!");
        }
      })
      .catch((error) => {
        if (__DEV__) {
          console.log(
            "[NETWORK] Error getting Saved Searches from Firestore:",
            error
          );
        }
        setRefreshingSearches(false);
      });
  };

  const saveSearch = () => {
    setRefreshingSearches(true);
    const docRef = db.collection("Users").doc(email);
    docRef
      .update({
        SavedSearches: savedSearches,
      })
      .then(() => {
        setRefreshingSearches(false);
        if (__DEV__) {
          console.log("[NETWORK] Saved Search Modified!");
        }
      })
      .catch(() => {
        if (__DEV__) {
          console.log("[ERROR] Search could not be modified");
        }
      });
  };

  return (
    <SavedContext.Provider
      value={{
        addressIDs,
        setAddressIDs,
        favorites,
        setFavorites,
        refreshingFavorites,
        setRefreshingFavorites,
        refreshingSearches,
        setRefreshingSearches,
        getAddressIDs,
        syncFavorites,
        addFavorite,
        removeFavorite,
        getSavedSearches,
        savedSearches,
        saveSearch,
        setSavedSearches,
        heartPressed,
        toggleHeartPressed,
      }}
    >
      {children}
    </SavedContext.Provider>
  );
};
