import React, { useEffect, useRef, useState, useContext } from "react";
import { Animated, View, StyleSheet, Dimensions, Platform } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { FontAwesome5 } from "@expo/vector-icons";

import ActivityIndicator from "../components/ActivityIndicator";
import MapCard from "../components/MapCard";
import CustomMarker from "../components/CustomMarker";
import ApiContext from "../api/context";
import AppText from "../components/AppText";
import LoadingModal from "../components/LoadingModal";
import MapButtonMenu from "../components/MapButtonMenu";
import MapButtonTitles from "../components/MapButtonTitles";
import ToggleFollowModal from "../components/ToggleFollowModal";
import ThemeContext from "../theme/context";
import FocusAwareStatusBar from "../components/FocusAwareStatusBar";

function MapScreen({ navigation, route }) {
  const initialRegion = {
    latitude: 44.5547,
    longitude: -123.28225,
    latitudeDelta: 0.04864195044303443,
    longitudeDelta: 0.040142817690068,
  };

  const darkMapTheme = require("../theme/darkMapTheme.json");
  const lightMapTheme = require("../theme/lightMapTheme.json");
  const { width } = Dimensions.get("window");
  const CARD_HEIGHT = 220;
  const CARD_WIDTH = width * 0.9;
  const SPACING_FOR_CARD_INSET = width * 0.05;
  const OSU_lat = 44.5656;
  const OSU_long = -123.2789;

  const { getListingsApi } = useContext(ApiContext);
  const { colors, darkMode, isLefty } = useContext(ThemeContext);

  const mapRef = useRef(null);
  const flatListRef = useRef(null);
  let mapAnimation = new Animated.Value(0);

  const [markerPressed, setMarkerPressed] = useState(false);
  const [mapIndex, setMapIndex] = useState(0);
  const [following, setFollowing] = useState(true);
  const [titlesVisible, setTitlesVisible] = useState(false);

  const [listingData, setListingData] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [latitudes, setLatitudes] = useState([]);
  const [longitudes, setLongitudes] = useState([]);
  const [zoomedOutDelta, setZoomedOutDelta] = useState({
    latitude: initialRegion.latitudeDelta,
    longitude: initialRegion.longitudeDelta,
  });

  const [mapDelta, setMapDelta] = useState({
    latitudeDelta: initialRegion.latitudeDelta,
    longitudeDelta: initialRegion.longitudeDelta,
  });

  useEffect(() => {
    if (getListingsApi.data !== []) {
      let data = getListingsApi.data.map((marker) => {
        return marker;
      });
      setListingData(data);
      setFollowing(true);
      if (route.params && route.params.index) {
        setMapIndex(route.params.index);
      } else {
        setMapIndex(0);
      }
    }
  }, [getListingsApi.data]);

  useEffect(() => {
    if (listingData.length > 0) {
      let adds = getListingsApi.data.map((marker) => {
        return marker.address;
      });
      setAddresses(adds);
    }
  }, [listingData]);

  useEffect(() => {
    if (addresses.length > 0) {
      let lats = Object.values(
        getListingsApi.data.map((marker) => {
          return marker.latitude;
        })
      );
      setLatitudes(lats);
    }
  }, [addresses]);

  useEffect(() => {
    if (latitudes.length > 0) {
      let longs = Object.values(
        getListingsApi.data.map((marker) => {
          return marker.longitude;
        })
      );
      setLongitudes(longs);
    }
  }, [latitudes]);

  useEffect(() => {
    if (longitudes.length > 1) {
      let zoom = {
        latitude: Math.max(...latitudes) - Math.min(...latitudes),
        longitude: Math.max(...longitudes) - Math.min(...longitudes),
      };
      setZoomedOutDelta(zoom);
    }
  }, [longitudes]);

  useEffect(() => {
    if (getListingsApi.data && getListingsApi.data.length > 0) {
      onMarkerPress(0);
      mapRef.current.animateToRegion(
        {
          latitude: getListingsApi.data[0].latitude,
          longitude: getListingsApi.data[0].longitude,
          latitudeDelta: mapDelta.latitudeDelta,
          longitudeDelta: mapDelta.longitudeDelta,
        },
        500
      );
    }
  }, [zoomedOutDelta]);

  const markerArray =
    listingData.length > 0
      ? listingData.map((marker, index) => {
          return (
            <CustomMarker
              key={index}
              colors={colors}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              onPress={() => onMarkerPress(index)}
              selected={index === mapIndex}
            />
          );
        })
      : null;

  const changeRegionDelta = (region) => {
    setMapDelta({
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
    });
  };

  const zoomOut = () => {
    if (listingData.length > 0 && isFinite(zoomedOutDelta.latitude)) {
      mapRef.current.animateToRegion(
        {
          latitude: initialRegion.latitude,
          longitude: initialRegion.longitude,
          latitudeDelta: zoomedOutDelta.latitude + 0.1,
          longitudeDelta: zoomedOutDelta.latitude,
        },
        750
      );
    } else {
      mapRef.current.animateToRegion(
        {
          latitude: initialRegion.latitude,
          longitude: initialRegion.longitude,
          latitudeDelta: initialRegion.latitudeDelta,
          longitudeDelta: initialRegion.longitudeDelta,
        },
        750
      );
    }
  };

  const zoomIn = () => {
    if (listingData.length > 0 && isFinite(zoomedOutDelta.latitude)) {
      mapRef.current.animateToRegion(
        {
          latitude: listingData[mapIndex].latitude,
          longitude: listingData[mapIndex].longitude,
          latitudeDelta: zoomedOutDelta.latitude * 0.05,
          longitudeDelta: 0,
        },
        750
      );
    } else if (listingData.length > 0 && !isFinite(zoomedOutDelta.latitude)) {
      mapRef.current.animateToRegion(
        {
          latitude: listingData[mapIndex].latitude,
          longitude: listingData[mapIndex].longitude,
          latitudeDelta: initialRegion.latitudeDelta,
          longitudeDelta: initialRegion.longitudeDelta,
        },
        750
      );
    } else {
      mapRef.current.animateToRegion(
        {
          latitude: initialRegion.latitude,
          longitude: initialRegion.longitude,
          latitudeDelta: initialRegion.latitudeDelta,
          longitudeDelta: initialRegion.longitudeDelta,
        },
        750
      );
    }
  };

  const onMarkerPress = (index) => {
    if (!markerPressed) {
      let offset = index * width;

      if (mapIndex !== index) {
        setMapIndex(index);
      }

      if (listingData.length > 0) {
        setMarkerPressed(true);
        clearTimeout(scrollTimeout);
        clearTimeout(markerPressedTimeout);

        const scrollTimeout = setTimeout(() => {
          flatListRef.current.getNode().scrollToOffset({
            offset: offset,
            animated: true,
          });
        }, 10);

        const markerPressedTimeout = setTimeout(() => {
          setMarkerPressed(false);
        }, 1000);
      }
    }
  };

  const waitForMarkers = () => {
    if (getListingsApi.data.length > 0) {
      setFollowing(true);
      onMarkerPress(route.params.index);
    } else {
      setTimeout(() => {
        console.log(listingData.length);
        waitForMarkers();
      }, 2000);
    }
  };

  useEffect(() => {
    if (route.params && route.params.index) {
      waitForMarkers();
    }
  }, [route]);

  useEffect(() => {
    if (following && listingData.length > 0) {
      mapRef.current.animateToRegion(
        {
          latitude: listingData[mapIndex].latitude,
          longitude: listingData[mapIndex].longitude,
          latitudeDelta: mapDelta.latitudeDelta,
          longitudeDelta: mapDelta.longitudeDelta,
        },
        500
      );
    }
  }, [mapIndex]);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.round(value / width);
      if (index >= listingData.length) {
        index = listingData.length - 1;
      } else if (index <= 0) {
        index = 0;
      }

      if (!markerPressed) {
        clearTimeout(regionTimeout);

        const regionTimeout = setTimeout(() => {
          if (mapIndex !== index) {
            setMapIndex(index);
          }
        }, 100);
      }
    });
  });

  const renderItem = ({ item }) => (
    <MapCard
      listing={item}
      colors={colors}
      onPress={() =>
        navigation.navigate("ListingDetailNavigator", {
          screen: "ListingDetailScreen",
          params: { listing: item },
        })
      }
      style={{
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        marginHorizontal: width * 0.05,
      }}
    />
  );

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        barStyle={darkMode ? "light-content" : "dark-content"}
        backgroundColor="#6a51ae"
      />
      <MapView
        ref={mapRef}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        customMapStyle={darkMode ? darkMapTheme : lightMapTheme}
        initialRegion={initialRegion}
        showsTraffic={false}
        loadingEnabled
        onRegionChangeComplete={(region) => changeRegionDelta(region)}
      >
        {markerArray}
        <Marker coordinate={{ latitude: OSU_lat, longitude: OSU_long }}>
          <View>
            <FontAwesome5 name="school" size={30} color={colors.primary} />
          </View>
        </Marker>
      </MapView>
      {getListingsApi.loading && (
        <View style={styles.loadingIndicator}>
          <LoadingModal colors={colors} />
        </View>
      )}
      <MapButtonMenu
        onPressZoomButton={() => zoomOut()}
        onPressMarkerButton={() => zoomIn()}
        onPressFollowButton={() => setFollowing((previous) => !previous)}
        onPressReturnButton={() => onMarkerPress(0)}
        onLongPress={() => setTitlesVisible(true)}
        onPressOut={() => setTitlesVisible(false)}
        colors={colors}
        isLefty={isLefty}
      />
      <MapButtonTitles
        isLefty={isLefty}
        colors={colors}
        visible={titlesVisible}
      />
      <ToggleFollowModal toggledOn={following} colors={colors} />
      <Animated.FlatList
        ref={flatListRef}
        data={listingData}
        horizontal
        pagingEnabled
        initialNumToRender={10}
        scrollEventThrottle={1}
        style={styles.flatList}
        snapToInterval={width}
        snapToAlignment="center"
        decelerationRate="fast"
        disableIntervalMomentum
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
        }}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index: index,
        })}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        ListEmptyComponent={() => (
          <View
            style={[
              styles.defaultCard,
              {
                backgroundColor: colors.mapCardBackground,
                shadowColor: colors.black,
                height: CARD_HEIGHT,
                width: CARD_WIDTH,
                marginHorizontal: width * 0.05,
              },
            ]}
          >
            <ActivityIndicator visible={getListingsApi.loading} />
            {!getListingsApi.loading && <AppText>No Listings Found</AppText>}
          </View>
        )}
        keyExtractor={(listing, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  defaultCard: {
    elevation: 2,
    shadowRadius: 5,
    shadowOpacity: 0.3,
    overflow: "hidden",
    borderRadius: 15,
    shadowOffset: { x: 2, y: -2 },
    justifyContent: "center",
    alignItems: "center",
  },
  loadingIndicator: {
    position: "absolute",
    alignSelf: "center",
    top: 250,
  },
});

export default MapScreen;
