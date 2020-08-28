import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

import ActivityIndicator from "./ActivityIndicator";
import AppText from "./AppText";
import IconRow from "./IconRow";
import Heart from "./Heart";
import ThemeContext from "../theme/context";

function Card({ listing, iconRowSize, onPress, saved, onPressHeart }) {
  const imageUri = listing.images[0] != null ? listing.images[0] : "";
  const [loading, setLoading] = useState(true);
  const { colors } = useContext(ThemeContext);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.card, { backgroundColor: colors.white }]}>
        <View>
          <Image
            source={
              imageUri.length != 0
                ? { uri: listing.images[0], cache: "default" }
                : null
            }
            style={styles.image}
            onLoadStart={() => {
              setLoading(true);
            }}
            onLoadEnd={() => {
              setLoading(false);
            }}
          />
          <ActivityIndicator visible={loading} />
        </View>
        <View style={styles.detailContainer}>
          <View style={[styles.topRow]}>
            <AppText style={[styles.price, { color: colors.black }]}>
              ${listing.price_high}/mo
            </AppText>
            <Heart saved={saved} onPress={onPressHeart} />
          </View>
          <IconRow
            listing={listing}
            size={iconRowSize}
            fullSize
            style={styles.iconRow}
          />
          <AppText style={{ paddingTop: 3 }}>{listing.address}</AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
    width: "100%",
    height: 325,
  },
  detailContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  iconRow: {
    marginVertical: 7,
  },
  iconText: {
    marginHorizontal: 10,
  },
  image: {
    alignItems: "center",
    height: 200,
    width: "100%",
  },
  price: {
    fontSize: 25,
    fontWeight: "bold",
    flex: 1,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Card;
