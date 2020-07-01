import React from "react";
import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import * as WebBrowser from "expo-web-browser";

import colors from "../config/colors";
import ListingDetails from "../components/ListingDetails";

function ListingDetailScreen({ navigation, route }) {
  const listing = route.params.listing;

  const OSU_lat = 44.5647;
  const OSU_long = -123.28225;

  const distanceLat = (listing.latitude * 1000 - OSU_lat * 1000) / 1000;
  const distanceLong = (listing.longitude * 1000 - OSU_long * 1000) / 1000;

  const centerLat = OSU_lat + distanceLat / 2;
  const centerLong = OSU_long + distanceLong / 2;

  if (distanceLat > distanceLong) {
    var deltaLat = distanceLat * 2;
    var deltaLong = distanceLat;
  } else {
    var deltaLong = distanceLong * 2;
    var deltaLat = distanceLong * 4;
  }

  return (
    <>
      <View style={styles.imageContainer}>
        <Image source={{ uri: listing.images[0] }} style={styles.image} />
      </View>
      <ListingDetails
        listing={listing}
        onPressProvider={() => navigation.navigate("Browser", listing.URL)}
        style={styles.detailsContainer}
      />
      <View style={styles.mapContainer}>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: centerLat,
            longitude: centerLong,
            latitudeDelta: deltaLat,
            longitudeDelta: deltaLong,
          }}
        >
          <Marker
            coordinate={{
              latitude: listing.latitude,
              longitude: listing.longitude,
            }}
            title={listing.address}
            image={require("../../assets/House_Pin_Orange_Black.png")}
          />
          <Marker
            coordinate={{ latitude: OSU_lat, longitude: OSU_long }}
            title="OSU"
            image={require("../../assets/OSU_Pin.png")}
          />
        </MapView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 18,
  },
  imageContainer: {
    flex: 2,
  },
  image: {
    alignItems: "center",
    flex: 1,
    width: "100%",
    paddingBottom: 20,
  },
  mapContainer: {
    flex: 2,
    borderTopColor: colors.medium,
    borderTopWidth: 1,
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: "100%",
  },
});

export default ListingDetailScreen;
