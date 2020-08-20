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

import ActivityIndicator from "./ActivityIndicator";
import AppText from "./AppText";
import IconRow from "./IconRow";
import Heart from "./Heart";
import colors from "../config/colors";

function Card({ listing, iconRowSize, onPress, liked, onPressHeart }) {
  const imageUri = listing.images[0] != null ? listing.images[0] : "";
  const [saved, setSaved] = useState(liked);
  const [loading, setLoading] = useState(true);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
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
          <View style={styles.topRow}>
            <AppText style={styles.price}>${listing.price_high}/mo</AppText>
            <Heart saved={saved} onPress={() => setSaved(!saved)} />
          </View>
          <IconRow
            listing={listing}
            size={iconRowSize}
            fullSize
            style={styles.iconRow}
          />
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
    color: colors.black,
    flex: 1,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Card;
