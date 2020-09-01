import React, { useState, useContext, useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import { View, StyleSheet, Dimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { decode } from "@mapbox/polyline";
import { useIsFocused } from "@react-navigation/native";

import ListingDetails from "../components/ListingDetails";
import RadiatingMarker from "../components/RadiatingMarker";
import SavedContext from "../firestore/context";
import AuthContext from "../auth/context";
import ImageCarousel from "../components/ImageCarousel";
import ThemeContext from "../theme/context";
import FocusAwareStatusBar from "../components/FocusAwareStatusBar";
import LogInOverlay from "../components/LogInOverlay";
import MiniMapButtonMenu from "../components/MiniMapButtonMenu";
import TimeToCampusBanner from "../components/TimeToCampusBanner";
import LoadingModal from "../components/LoadingModal";

const getDirections = async (startLoc, destinationLoc, mode) => {
  try {
    let resp = await fetch(
      `https://7al5auoqme.execute-api.us-west-2.amazonaws.com/Prod?startLoc=${startLoc}&destinationLoc=${destinationLoc}&mode=${mode}`
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
    addFavorite,
    removeFavorite,
    toggleHeartPressed,
    syncFavorites,
  } = useContext(SavedContext);

  const lightMapTheme = require("../theme/lightMapTheme.json");
  const darkMapTheme = require("../theme/darkMapTheme.json");

  const listing = route.params.listing;
  const index = route.params.index;

  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [directionsMode, setDirectionsMode] = useState(null);
  const [directionsDistance, setDirectionsDistance] = useState(0);
  const [coords, setCoords] = useState([]);
  const [tapped, setTapped] = useState(addressIDs.includes(listing.address_id));
  const [changed, setChanged] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [drivingCoords, setDrivingCoords] = useState(null);
  const [walkingCoords, setWalkingCoords] = useState(null);

  const onHeartPress = (listing) => {
    if (user !== null) {
      setTapped(!tapped);
      if (addressIDs.includes(listing.address_id)) {
        removeFavorite(listing);
        setTapped(false);
      } else {
        addFavorite(listing);
        setTapped(true);
      }
      setChanged(true);
    }
  };

  useEffect(() => {
    if (!isFocused && changed) {
      syncFavorites();
    }
  }, [isFocused]);

  const directions = (mode) => {
    setLoading(true);
    if (bannerVisible) {
      setBannerVisible(false);
    }
    if (mode === "walking" && walkingCoords) {
      setCoords(walkingCoords);
      setDirectionsDistance(Math.round(listing.walk_to_campus_minutes));
      setDirectionsMode("walking");
      setLoading(false);
      setBannerVisible(true);
    } else if (mode === "driving" && drivingCoords) {
      setCoords(drivingCoords);
      setDirectionsDistance(Math.round(listing.drive_to_campus_minutes));
      setDirectionsMode("driving");
      setLoading(false);
      setBannerVisible(true);
    } else {
      getDirections(
        listing.latitude + "," + listing.longitude,
        OSU_lat + "," + OSU_long,
        mode
      )
        .then((coords) => {
          setCoords(coords);
          setDirectionsMode(mode);
          if (mode === "walking") {
            setDirectionsDistance(Math.round(listing.walk_to_campus_minutes));
            setWalkingCoords(coords);
          } else {
            setDirectionsDistance(Math.round(listing.drive_to_campus_minutes));
            setDrivingCoords(coords);
          }
          setLoading(false);
          setBannerVisible(true);
          console.log(
            "[NETWORK] Directions successfully retrieved from Google."
          );
        })
        .catch((err) => {
          setLoading(false);
          console.log("[NETWORK] Something went wrong:", err);
        });
    }
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
          colors={colors}
          listing={listing}
          style={{ backgroundColor: colors.white }}
        />
        <LogInOverlay
          color={colors.fadedBackground2}
          textStyle={{ fontSize: 25 }}
        />
      </View>
      <ListingDetails
        colors={colors}
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
            colors={colors}
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
          colors={colors}
          isLefty={isLefty}
          onPressGoToMap={() =>
            navigation.navigate("Map", {
              screen: "MapScreen",
              params: {
                listing: listing,
                index: index,
              },
            })
          }
          onPressWalking={() => directions("walking")}
          onPressDriving={() => directions("driving")}
        />
        <TimeToCampusBanner
          minutes={directionsDistance}
          mode={directionsMode}
          visible={bannerVisible}
          colors={colors}
        />
        <View style={styles.loadingModal}>
          {loading && (
            <LoadingModal colors={colors} style={styles.loadingIndicator} />
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 18,
  },
  loadingModal: {
    height: "100%",
    justifyContent: "center",
    position: "absolute",
    alignSelf: "center",
  },
  loadingIndicator: {
    backgroundColor: "rgba(0,0,0,0)",
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
