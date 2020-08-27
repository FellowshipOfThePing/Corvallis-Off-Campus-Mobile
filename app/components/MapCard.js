import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

import AppText from "../components/AppText";
import IconRow from "../components/IconRow";
import ActivityIndicator from "../components/ActivityIndicator";
import ThemeContext from "../config/context";

export default React.memo(({ onPress, listing, style }) => {
  const imageUri = listing.images[0] != null ? listing.images[0] : "";
  const [loading, setLoading] = useState(true);
  const { colors } = useContext(ThemeContext);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.mapCardBackground,
            shadowColor: colors.black,
          },
          style,
        ]}
      >
        <View style={styles.imageContainer}>
          <Image
            onLoadStart={() => {
              setLoading(true);
            }}
            onLoadEnd={() => {
              setLoading(false);
            }}
            source={
              imageUri.length != 0
                ? { uri: listing.images[0], cache: "default" }
                : null
            }
            style={styles.image}
          />
          <ActivityIndicator visible={loading} />
        </View>
        <View style={styles.topRow}>
          <AppText style={[styles.price, { color: colors.black }]}>
            ${listing.price_high}/mo
          </AppText>
          <IconRow listing={listing} size={15} style={styles.iconRow} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  card: {
    elevation: 2,
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
