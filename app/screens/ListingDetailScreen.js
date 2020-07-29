import React, { useState, useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { decode } from "@mapbox/polyline";

import ActivityIndicator from "../components/ActivityIndicator";
import colors from "../config/colors";
import ListingDetails from "../components/ListingDetails";
import RadiatingMarker from "../components/RadiatingMarker";
import IconButton from "../components/IconButton";

const getDirections = async (startLoc, destinationLoc, mode) => {
  try {
    const KEY = "AIzaSyA-bCS80fMCp6T5Em6u8RvIIs-l8_skXM0";
    let resp = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}&mode=${mode}`
    );
    let respJson = await resp.json();
    let points = decode(respJson.routes[0].overview_polyline.points);
    let coords = points.map((point, index) => {
      return {
        latitude: point[0],
        longitude: point[1],
      };
    });
    return coords;
  } catch (error) {
    return error;
  }
};

function ListingDetailScreen({ navigation, route }) {
  const listing = route.params.listing;
  const [loading, setLoading] = useState(true);
  const [coords, setCoords] = useState([]);

  useEffect(() => {
    var mode = listing.walk_to_campus_minutes <= 20 ? "walking" : "driving";
    getDirections(
      listing.latitude + "," + listing.longitude,
      OSU_lat + "," + OSU_long,
      mode
    )
      .then((coords) => {
        setCoords(coords);
      })
      .catch((err) => console.log("Something went wrong"));
  }, []);

  const OSU_lat = 44.5647;
  const OSU_long = -123.28225;

  const distanceLat = (listing.latitude * 1000 - OSU_lat * 1000) / 1000;
  const distanceLong = (listing.longitude * 1000 - OSU_long * 1000) / 1000;

  const centerLat = OSU_lat + distanceLat / 2;
  const centerLong = OSU_long + distanceLong / 2;

  const deltaLat = distanceLat * 1.6;
  const deltaLong = distanceLong * 1.6;

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
        {loading && <ActivityIndicator visible={loading} />}
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
          {coords.length > 0 && (
            <Polyline coordinates={coords} strokeWidth={2} />
          )}
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
              <FontAwesome5 name="school" size={30} color={colors.primary} />
            </View>
          </Marker>
        </MapView>
        <IconButton
          style={styles.mapButton}
          onPress={() =>
            navigation.navigate("Map", {
              screen: "MapScreen",
              params: {
                listing: listing,
                sourceDetailScreen: true,
              },
            })
          }
        />
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
  mapButton: {
    position: "absolute",
    bottom: Dimensions.get("window").height / 4 - 15,
    left: 10,
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
