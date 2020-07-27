import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";

import colors from "../config/colors";
import AppText from "../components/AppText";
import IconRow from "../components/IconRow";

function MapCard({ onPress, listing, style }) {
  const imageUri = listing.images[0] != null ? listing.images[0] : "";
  const [loading, setLoading] = useState(true);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.card, style]}>
        <View style={styles.imageContainer}>
          <Image
            onLoadStart={() => {
              setLoading(true);
            }}
            onLoadEnd={() => {
              setLoading(false);
            }}
            source={imageUri.length != 0 ? { uri: listing.images[0] } : null}
            style={styles.image}
          />
          <ActivityIndicator animating={loading} style={styles.indicator} size="large" />
        </View>
        <View style={styles.topRow}>
          <AppText style={styles.price}>${listing.price_high}/mo</AppText>
          <IconRow listing={listing} size={15} style={styles.iconRow} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    elevation: 2,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    overflow: "hidden",
    borderRadius: 15,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 7,
  },
  price: {
    color: colors.black,
    flex: 1,
    fontSize: 25,
    fontWeight: "bold",
  },
  iconRow: {
    marginVertical: 10,
    paddingTop: 5,
  },
  image: {
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "75%",
    width: "100%",
  },
  indicator: {
    position: "absolute",
  },
});

export default MapCard;
