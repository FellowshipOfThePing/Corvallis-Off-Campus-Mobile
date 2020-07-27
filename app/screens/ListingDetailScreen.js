import React, { useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";

import colors from "../config/colors";
import ListingDetails from "../components/ListingDetails";
import RadiatingMarker from "../components/RadiatingMarker";
import { FontAwesome5 } from "@expo/vector-icons";

function ListingDetailScreen({ navigation, route }) {
  const listing = route.params.listing;
  const [loading, setLoading] = useState(true);

  const OSU_lat = 44.5647;
  const OSU_long = -123.28225;

  const distanceLat = (listing.latitude * 1000 - OSU_lat * 1000) / 1000;
  const distanceLong = (listing.longitude * 1000 - OSU_long * 1000) / 1000;

  const centerLat = OSU_lat + distanceLat / 2;
  const centerLong = OSU_long + distanceLong / 2;

  const deltaLat = distanceLat * 1.5;
  const deltaLong = distanceLong * 1.5;

  return (
    <>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: listing.images[0] }}
          style={styles.image}
          onLoadStart={() => {
            setLoading(true);
          }}
          onLoadEnd={() => {
            setLoading(false);
          }}
        />
        {loading && (
          <ActivityIndicator
            animating={loading}
            style={styles.indicator}
            size="large"
          />
        )}
      </View>
      <ListingDetails
        listing={listing}
        onPressProvider={() =>
          navigation.navigate("Browser", {
            url: listing.URL,
            title: listing.provider,
          })
        }
        style={styles.detailsContainer}
      />
      <View style={styles.mapContainer}>
        <MapView
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: centerLat,
            longitude: centerLong,
            latitudeDelta: deltaLat,
            longitudeDelta: deltaLong,
          }}
        >
          <RadiatingMarker
            coordinate={{
              latitude: listing.latitude,
              longitude: listing.longitude,
            }}
            size={15}
            title={listing.address}
          />
          <Marker
            coordinate={{ latitude: OSU_lat, longitude: OSU_long }}
            title="OSU"
          >
            <View>
              <FontAwesome5
                name="school"
                size={30}
                color={colors.primary}
              />
            </View>
          </Marker>
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
    height: "100%",
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
  indicator: {
    position: "absolute",
    alignSelf: "center",
    top: 125,
  },
});

export default ListingDetailScreen;
