import React, { useEffect, useRef, useState, useContext } from "react";
import {
  Animated,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useFocusEffect } from "@react-navigation/native";

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
  const { getListingsApi, filterState } = useContext(ApiContext);
  const { colors, darkMode } = useContext(ThemeContext);
  const mapRef = useRef(null);
  const flatListRef = useRef(null);

  const darkMapTheme = require("../theme/darkMapTheme.json");
  const lightMapTheme = require("../theme/lightMapTheme.json");

  const [firstLoad, setFirstLoad] = useState(true);
  const [markerPressed, setMarkerPressed] = useState(false);
  const [mapIndex, setMapIndex] = useState(0);
  const [following, setFollowing] = useState(true);
  const [titlesVisible, setTitlesVisible] = useState(false);

  const [listingData, setListingData] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [latitudes, setLatitudes] = useState([]);
  const [longitudes, setLongitudes] = useState([]);
  const [zoomedOutDelta, setZoomedOutDelta] = useState(null);
  const [markerArray, setMarkerArray] = useState(null);

  const initialRegion = {
    latitude: 44.5547,
    longitude: -123.28225,
    latitudeDelta: 0.04864195044303443,
    longitudeDelta: 0.040142817690068,
  };

  const [mapDelta, setMapDelta] = useState({
    latitudeDelta: initialRegion.latitudeDelta,
    longitudeDelta: initialRegion.longitudeDelta,
  });

  let mapAnimation = new Animated.Value(0);
  const { width } = Dimensions.get("window");
  const CARD_HEIGHT = 220;
  const CARD_WIDTH = width * 0.9;
  const SPACING_FOR_CARD_INSET = width * 0.05;

  useEffect(() => {
    if (getListingsApi.data) {
      setListingData(
        getListingsApi.data.map((marker) => {
          return marker;
        })
      );

      setAddresses(
        getListingsApi.data.map((marker) => {
          return marker.address;
        })
      );

      setLatitudes(
        Object.values(
          getListingsApi.data.map((marker, index) => {
            return marker.latitude;
          })
        )
      );

      setLongitudes(
        Object.keys(
          getListingsApi.data.map((marker, index) => {
            return marker.longitude;
          })
        )
      );

      setZoomedOutDelta({
        latitude: Math.max(...latitudes) - Math.min(...latitudes),
        longitude: Math.max(...longitudes) - Math.min(...longitudes),
      });

      setMarkerArray(
        listingData.map((marker, index) => {
          return (
            <CustomMarker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              onPress={() => onMarkerPress(index)}
              selected={index === mapIndex}
            />
          );
        })
      );
    }
  }, [getListingsApi.data]);

  const waitForMapIndex = (newMapIndex) => {
    if (
      typeof newMapIndex !== "undefined" &&
      newMapIndex !== -1 &&
      newMapIndex !== mapIndex
    ) {
      console.log("New Map Index: " + newMapIndex);
      onMarkerPress(newMapIndex);
    } else {
      setTimeout(waitForMapIndex, 250);
    }
  };

  const changeRegion = (region) => {
    setMapDelta({
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
    });
  };

  const zoomOut = () => {
    mapRef.current.animateToRegion(
      zoomedOutDelta
        ? {
            latitude: initialRegion.latitude,
            longitude: initialRegion.longitude,
            latitudeDelta: zoomedOutDelta.latitude + 0.1,
            longitudeDelta: zoomedOutDelta.latitude,
          }
        : {
            latitude: initialRegion.latitude,
            longitude: initialRegion.longitude,
            latitudeDelta: initialRegion.latitudeDelta,
            longitudeDelta: initialRegion.longitudeDelta,
          },
      750
    );
  };

  const zoomIn = () => {
    mapRef.current.animateToRegion(
      listingData !== [] && zoomedOutDelta
        ? {
            latitude: listingData[mapIndex].latitude,
            longitude: listingData[mapIndex].longitude,
            latitudeDelta: zoomedOutDelta.latitude * 0.05,
            longitudeDelta: 0,
          }
        : {
            latitude: initialRegion.latitude,
            longitude: initialRegion.longitude,
            latitudeDelta: initialRegion.latitudeDelta,
            longitudeDelta: initialRegion.longitudeDelta,
          },
      750
    );
  };

  const onMarkerPress = (index) => {
    const markerID = index;

    let offset = markerID * width;

    if (mapIndex !== markerID) {
      setMapIndex(markerID);
    }

    if (listingData.length > 0) {
      if (following) {
        mapRef.current.animateToRegion(
          {
            latitude: listingData[markerID].latitude,
            longitude: listingData[markerID].longitude,
            latitudeDelta: mapDelta.latitudeDelta,
            longitudeDelta: mapDelta.longitudeDelta,
          },
          500
        );
      }

      setMarkerPressed(true);

      setTimeout(() => {
        flatListRef.current.getNode().scrollToOffset({
          offset: offset,
          animated: true,
        });
      }, 10);

      setTimeout(() => {
        setMarkerPressed(false);
      }, 3000);
    }
  };

  useEffect(() => {
    if (!firstLoad) {
      getListingsApi.request(filterState);
    } else {
      setFirstLoad(false);
    }
  }, [filterState]);

  useEffect(() => {
    onMarkerPress(0);
  }, [getListingsApi.data]);

  useFocusEffect(
    React.useCallback(() => {
      if (route.params) {
        if (route.params.sourceDetailScreen && listingData.length > 0) {
          let newMapIndex = addresses.indexOf(route.params.listing.address);
          waitForMapIndex(newMapIndex);
        }
        route.params.sourceDetailScreen = false;
      }
    }, [route])
  );

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.round(value / width);
      if (index >= listingData.length) {
        index = listingData.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      if (!markerPressed) {
        clearTimeout(regionTimeout);

        const regionTimeout = setTimeout(() => {
          if (mapIndex !== index) {
            setMapIndex(index);
            if (following) {
              mapRef.current.animateToRegion(
                {
                  latitude: listingData[index].latitude,
                  longitude: listingData[index].longitude,
                  latitudeDelta: mapDelta.latitudeDelta,
                  longitudeDelta: mapDelta.longitudeDelta,
                },
                500
              );
            }
          }
        }, 10);
      }
    });
  });

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
        onRegionChangeComplete={(region) => changeRegion(region)}
      >
        {markerArray}
      </MapView>
      {getListingsApi.loading && (
        <View style={styles.loadingIndicator}>
          <LoadingModal />
        </View>
      )}
      <MapButtonMenu
        onPressZoomButton={() => zoomOut()}
        onPressMarkerButton={() => zoomIn()}
        onPressFollowButton={() => setFollowing((previous) => !previous)}
        onPressReturnButton={() => onMarkerPress(0)}
        onLongPress={() => setTitlesVisible(true)}
        onPressOut={() => setTitlesVisible(false)}
      />
      <MapButtonTitles visible={titlesVisible} />
      <ToggleFollowModal toggledOn={following} />
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
        renderItem={({ item }) => (
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
        )}
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
