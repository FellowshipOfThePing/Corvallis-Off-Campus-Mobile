import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import AppText from "./AppText";
import colors from "../config/colors";
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

  return (
    <View style={[styles.container, style]}>
      <View style={styles.listingInfo}>
        <View style={styles.topRow}>
          <AppText style={styles.price}>${listing.price_high}/mo</AppText>
          <Heart size={35} saved={saved} onPress={onPressHeart} />
        </View>
        <IconRow listing={listing} fullSize style={styles.iconRow} />
        <AppText>{listing.address}</AppText>
      </View>
      <View style={styles.providerContainer}>
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
  container: {
    backgroundColor: colors.white,
  },
  iconRow: {
    marginVertical: 10,
  },
  listingInfo: {
    justifyContent: "center",
    paddingBottom: 15,
  },
  price: {
    color: colors.black,
    flex: 1,
    fontSize: 30,
    fontWeight: "bold",
  },
  providerContainer: {
    borderTopColor: colors.medium,
    borderTopWidth: 1,
    paddingTop: 15,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ListingDetails;
