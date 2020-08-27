import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";

import AppText from "./AppText";
import ThemeContext from "../config/context";
import Heart from "./Heart";
import IconRow from "./IconRow";
import ListItem from "./ListItem";

function ListingDetails({
  listing,
  onPressProvider,
  onPressHeart,
  saved,
  style,
}) {
  if (listing.provider === "Trulia") {
    var providerImage = require("../../assets/Trulia.png");
  } else if (listing.provider === "Zillow") {
    var providerImage = require("../../assets/Zillow.png");
  } else {
    var providerImage = require("../../assets/Local.png");
  }
  const { colors } = useContext(ThemeContext);

  return (
    <View style={[{ backgroundColor: colors.white }, style]}>
      <View style={styles.listingInfo}>
        <View style={styles.topRow}>
          <AppText style={[styles.price, { color: colors.black }]}>
            ${listing.price_high}/mo
          </AppText>
          <Heart size={35} saved={saved} onPress={onPressHeart} />
        </View>
        <IconRow listing={listing} fullSize style={styles.iconRow} />
        <AppText>{listing.address}</AppText>
      </View>
      <View
        style={[styles.providerContainer, { borderTopColor: colors.medium }]}
      >
        {providerImage && (
          <ListItem
            image={providerImage}
            title={listing.provider}
            subTitle="See Listing Details"
            onPress={onPressProvider}
            style={{ backgroundColor: colors.white }}
          />
        )}
        {!providerImage && (
          <ListItem title={listing.provider} subTitle="See Listing Details" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconRow: {
    marginVertical: 10,
  },
  listingInfo: {
    justifyContent: "center",
    paddingBottom: 15,
  },
  price: {
    flex: 1,
    fontSize: 30,
    fontWeight: "bold",
  },
  providerContainer: {
    borderTopWidth: 1,
    paddingTop: 15,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ListingDetails;
