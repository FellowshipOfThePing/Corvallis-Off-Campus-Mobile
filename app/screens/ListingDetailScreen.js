import React, { useState, useEffect, useContext } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { decode } from "@mapbox/polyline";

import ListingDetails from "../components/ListingDetails";
import RadiatingMarker from "../components/RadiatingMarker";
import GoToMapButton from "../components/GoToMapButton";
import SavedContext from "../firestore/context";
import AuthContext from "../auth/context";
import ImageCarousel from "../components/ImageCarousel";
import ThemeContext from "../theme/context";
import FocusAwareStatusBar from "../components/FocusAwareStatusBar";
import LogInLayover from "../components/LogInLayover";
import MiniMapButtonMenu from "../components/MiniMapButtonMenu";

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
  const { user } = useContext(AuthContext);
  const { colors, darkMode, isLefty } = useContext(ThemeContext);
  const {
    addressIDs,
    getFavorites,
    addFavorite,
    removeFavorite,
    toggleHeartPressed,
  } = useContext(SavedContext);

  const lightMapTheme = require("../theme/lightMapTheme.json");
  const darkMapTheme = require("../theme/darkMapTheme.json");

  const listing = route.params.listing;
  const [coords, setCoords] = useState([]);
  const [tapped, setTapped] = useState(addressIDs.includes(listing.address_id));

  const onHeartPress = (listing) => {
    if (user !== null) {
      setTapped(!tapped);
      getFavorites();
      if (addressIDs.includes(listing.address_id)) {
        removeFavorite(listing);
        setTapped(false);
      } else {
        addFavorite(listing);
        setTapped(true);
      }
    }
  };

  const directions = (mode) => {
    getDirections(
      listing.latitude + "," + listing.longitude,
      OSU_lat + "," + OSU_long,
      mode
    )
      .then((coords) => {
        setCoords(coords);
        console.log("[NETWORK] Directions successfully retrieved from Google.");
      })
      .catch((err) => console.log("[NETWORK] Something went wrong:", err));
  };

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
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <View style={styles.imageContainer}>
        <ImageCarousel
          listing={listing}
          style={{ backgroundColor: colors.white }}
        />
        <LogInLayover
          color={colors.fadedBackground2}
          textStyle={{ fontSize: 25 }}
        />
      </View>
      <ListingDetails
        listing={listing}
        saved={tapped}
        onPressHeart={() => {
          if (!user) {
            toggleHeartPressed();
          }
          onHeartPress(listing);
        }}
        onPressProvider={() =>
          navigation.navigate("Browser", {
            url: listing.URL,
            title: listing.provider,
          })
        }
        style={[
          styles.detailsContainer,
          darkMode
            ? null
            : { borderBottomWidth: 1, borderBottomColor: colors.dark },
        ]}
      />
      <View style={styles.mapContainer}>
        <MapView
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          customMapStyle={darkMode ? darkMapTheme : lightMapTheme}
          initialRegion={{
            latitude: centerLat,
            longitude: centerLong,
            latitudeDelta: deltaLat,
            longitudeDelta: deltaLong,
          }}
        >
          {coords.length > 0 && (
            <Polyline
              coordinates={coords}
              strokeWidth={2}
              strokeColor={colors.black}
            />
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
        <MiniMapButtonMenu
          onPressGoToMap={() =>
            navigation.navigate("Map", {
              screen: "MapScreen",
              params: {
                listing: listing,
                sourceDetailScreen: true,
              },
            })
          }
          onPressWalking={() => directions("walking")}
          onPressDriving={() => directions("driving")}
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
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "100%",
    paddingBottom: 20,
  },
  mapButton: {
    position: "absolute",
    top: 10,
  },
  mapContainer: {
    flex: 2,
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
