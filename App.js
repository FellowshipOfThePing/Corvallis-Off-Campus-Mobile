import React, { useState } from "react";
import DrawerNavigator from "./app/navigation/DrawerNavigator";
import { NavigationContainer } from "@react-navigation/native";

import ApiContext from "./app/api/context";
import useApi from "./app/hooks/useApi";
import listingsApi from "./app/api/listings";
import OfflineNotice from "./app/components/OfflineNotice";
import Screen from "./app/components/Screen";
import FilterModal from "./app/components/FilterModal";

export default function App() {
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

  return (
    <ApiContext.Provider
      value={{ getListingsApi, filterState, setFilterState }}
    >
      <OfflineNotice />
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </ApiContext.Provider>
  );
}
