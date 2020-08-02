import React from "react";
import DrawerNavigator from "./app/navigation/DrawerNavigator";
import { NavigationContainer } from "@react-navigation/native";

import ApiContext from "./app/api/context";
import useApi from "./app/hooks/useApi";
import listingsApi from "./app/api/listings";
import OfflineNotice from "./app/components/OfflineNotice";
import Screen from "./app/components/Screen";

export default function App() {
  const getListingsApi = useApi(listingsApi.getListings);

  return (
    <ApiContext.Provider value={getListingsApi}>
      <OfflineNotice />
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </ApiContext.Provider>
  );
}
