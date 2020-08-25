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
import SavedSearchIndicator from "./app/components/SavedSearchIndicator";
import ImageCarousel from "./app/components/ImageCarousel";
import CarouselImageContainer from "./app/components/CarouselImageContainer";

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

  const listing = {
    images: [
      "https://static.trulia-cdn.com/pictures/thumbs_3/ps.116/b/a/5/f/picture-uh=9f8341ff4a9b2708c84f1352a505d42-ps=ba5f1f169119442efbf9a5187ef95d7d.jpg",
      "https://static.trulia-cdn.com/pictures/thumbs_3/ps.116/c/2/6/c/picture-uh=d1dcd0461e54da237570acfe2c161575-ps=c26ce2ad715e43a13c0973c1aee46f0.jpg",
      "https://static.trulia-cdn.com/pictures/thumbs_3/ps.116/e/b/d/5/picture-uh=41aaf3b514d3ca723a182a337545fc4c-ps=ebd52d65a117b0d92de72367776f5bfb.jpg",
      "https://static.trulia-cdn.com/pictures/thumbs_3/ps.116/5/3/1/1/picture-uh=acbce39df2983ea3b2c545aef70ab8-ps=5311553d8be97078a4cf334bbcabe421.jpg",
      "https://static.trulia-cdn.com/pictures/thumbs_3/ps.116/2/8/b/3/picture-uh=eaddad23beb439a65fec23a58951ee6-ps=28b3eabbd56d33f271b2a28b3fd9e.jpg",
      "https://static.trulia-cdn.com/pictures/thumbs_3/ps.116/e/1/b/3/picture-uh=bb2401975d8f790b5e17fc51063f66e-ps=e1b31d6953efc7c8da55456c2b98.jpg",
      "https://static.trulia-cdn.com/pictures/thumbs_3/ps.116/9/9/8/1/picture-uh=e1e19abb06f1a7ab6247883a6c5b58-ps=9981e46f37e387b865125f5dae63e24f.jpg",
      "https://static.trulia-cdn.com/pictures/thumbs_3/ps.116/b/f/5/5/picture-uh=d8f07e532e88d2eb3a7661f8e345058-ps=bf558de48be3501b15bfa6d93ff89648.jpg",
      "https://static.trulia-cdn.com/pictures/thumbs_3/ps.116/6/0/e/2/picture-uh=1d6f1639e53b41af182c2299a565b36-ps=60e2f54fb75add1e59b167b28ad76b4.jpg",
      "https://static.trulia-cdn.com/pictures/thumbs_3/ps.116/b/e/5/d/picture-uh=367b9961de1e58e22cc4a2afe43591-ps=be5d171deebeb276676a2c61da22f0ae.jpg",
      "https://static.trulia-cdn.com/pictures/thumbs_3/ps.116/5/b/f/f/picture-uh=fd47831dc6dd1056d82a76d6fbaa5814-ps=5bff19ec32beccbf50608addef7b8.jpg",
      "https://static.trulia-cdn.com/pictures/thumbs_3/ps.116/1/7/f/e/picture-uh=b26031f34a11f11240501d1557a7287-ps=17fe1b2ae68c58727f63df7bbdf279.jpg",
      "https://static.trulia-cdn.com/pictures/thumbs_3/ps.116/6/a/1/b/picture-uh=24c868ffe4c9e0b75761b9cd9dc3b44-ps=6a1b010e03b4a341eedbec36ab58069.jpg",
      "https://static.trulia-cdn.com/pictures/thumbs_3/ps.116/c/d/8/a/picture-uh=7e2b7a06d2ba2c57de54267a89cde-ps=cd8ae146abb241cbc833bc71523ad41d.jpg",
      "https://static.trulia-cdn.com/pictures/thumbs_3/ps.116/f/6/e/3/picture-uh=b4ebc7459b7a9a742b30f7e08a7c99-ps=f6e359f779a9e42efc611592de214810.jpg",
      "https://photos.zillowstatic.com/p_e/ISfg1svaae5nni1000000000.jpg",
      "https://static.trulia-cdn.com/pictures/thumbs_3/ps.116/1/8/1/c/picture-uh=397459af5d977a47dd5449e359bf3245-ps=181caafe49fc89c81b58ad9d8519.jpg",
      "https://static.trulia-cdn.com/pictures/thumbs_3/ps.116/6/6/e/4/picture-uh=b9b64184bf4ebdd117434a29343435fd-ps=66e42b3e052dca3e5ff39392e0784.jpg",
      "https://static.trulia-cdn.com/pictures/thumbs_3/ps.116/3/7/1/8/picture-uh=f90b4e18ebef6dbe49cbc5a5c93d469-ps=37188d4724ca246186dd3aef759feb1b.jpg",
    ],
    duplicates: [
      {
        provider: "Zillow",
        URL:
          "https://www.zillow.com/homedetails/1895-NW-Arthur-Cir-Corvallis-OR-97330/48194630_zpid/",
      },
    ],
    _id: "5eb37aef26d0e2c72089868c",
    address: "1895 NW Arthur Cir",
    unitNum: null,
    price_high: 2200,
    price_low: null,
    beds: 4,
    baths: 1.5,
    pets: true,
    sqft: 1284,
    provider: "Trulia",
    URL:
      "https://www.trulia.com/p/or/corvallis/1895-nw-arthur-cir-corvallis-or-97330--1113891053",
    original_site: null,
    available: "Now",
    latitude: 44.583599,
    longitude: -123.272191,
    raw_id: "1895NWARTHURCIR-2200P-4BD-1.5BA-1284SQ",
    walk_to_campus_miles: 1.627,
    walk_to_campus_minutes: 31.405,
    drive_to_campus_miles: 1.89,
    drive_to_campus_minutes: 8.017,
  };

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
