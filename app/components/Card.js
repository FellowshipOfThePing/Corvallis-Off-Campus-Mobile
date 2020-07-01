import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";

import AppText from "./AppText";
import IconRow from "./IconRow";
import Heart from "./Heart";
import colors from "../config/colors";

function Card({ listing, onPress }) {
  const [saved, setSaved] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image source={{ uri: listing.images[0] }} style={styles.image} />
        <View style={styles.detailContainer}>
          <View style={styles.topRow}>
            <AppText style={styles.price}>${listing.price_high}/mo</AppText>
            <Heart saved={saved} onPress={() => setSaved(!saved)} />
          </View>
          <IconRow listing={listing} style={styles.iconRow} />
          <AppText>{listing.address}</AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
    width: "100%",
  },
  detailContainer: {
    paddingVertical: 18,
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
    color: colors.black,
    flex: 1,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Card;
