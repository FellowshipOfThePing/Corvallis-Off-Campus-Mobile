import React, { useEffect, useRef, useState, useContext } from "react";
import { Animated, View, StyleSheet, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useFocusEffect } from "@react-navigation/native";

import ActivityIndicator from "../components/ActivityIndicator";
import MapCard from "../components/MapCard";
import CustomMarker from "../components/CustomMarker";
import ApiContext from "../api/context";
import AppText from "../components/AppText";
import LoadingModal from "../components/LoadingModal";
import MapButtonMenu from "../components/MapButtonMenu";

function MapScreen({ navigation, route }) {
  const { getListingsApi, filterState, setFilterState } = useContext(
    ApiContext
  );
  const mapRef = useRef(null);
  const flatListRef = useRef(null);

  const [firstLoad, setFirstLoad] = useState(true);
  const [markerPressed, setMarkerPressed] = useState(false);
  const [mapIndex, setMapIndex] = useState(0);
  const [following, setFollowing] = useState(true);

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
  const { width, height } = Dimensions.get("window");
  const CARD_HEIGHT = 220;
  const CARD_WIDTH = width * 0.9;
  const SPACING_FOR_CARD_INSET = width * 0.05;

  const listing_data = getListingsApi.data.map((marker) => {
    return marker;
  });

  const addresses = getListingsApi.data.map((marker) => {
    return marker.address;
  });

  const latitudes = Object.values(
    getListingsApi.data.map((marker, index) => {
      return marker.latitude;
    })
  );

  const longitudes = Object.keys(
    getListingsApi.data.map((marker, index) => {
      return marker.longitude;
    })
  );

  const zoomedOutDelta = {
    latitude: Math.max(...latitudes) - Math.min(...latitudes),
    longitude: Math.max(...longitudes) - Math.min(...longitudes),
  };

  const markerArray = listing_data.map((marker, index) => {
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
  });

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
      {
        latitude: initialRegion.latitude,
        longitude: initialRegion.longitude,
        latitudeDelta: zoomedOutDelta.latitude + 0.1,
        longitudeDelta: zoomedOutDelta.latitude,
      },
      700
    );
  };

  const zoomIn = () => {
    mapRef.current.animateToRegion(
      {
        latitude: listing_data[mapIndex].latitude,
        longitude: listing_data[mapIndex].longitude,
        latitudeDelta: zoomedOutDelta.latitude - 0.05,
        longitudeDelta: 0,
      },
      700
    );
  };

  const onMarkerPress = (index) => {
    const markerID = index;

    let offset = markerID * width;

    if (mapIndex !== markerID) {
      setMapIndex(markerID);
    }

    if (listing_data.length > 0) {
      if (following) {
        mapRef.current.animateToRegion(
          {
            latitude: listing_data[markerID].latitude,
            longitude: listing_data[markerID].longitude,
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
        if (route.params.sourceDetailScreen && listing_data.length > 0) {
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
      if (index >= listing_data.length) {
        index = listing_data.length - 1;
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
                  latitude: listing_data[index].latitude,
                  longitude: listing_data[index].longitude,
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
      <MapView
        ref={mapRef}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
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
        onPressFollowButton={() => setFollowing(!following)}
        following={following}
        onPressReturnButton={() => onMarkerPress(0)}
      />
      <Animated.FlatList
        ref={flatListRef}
        data={listing_data}
        horizontal
        pagingEnabled
        removeClippedSubviews
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
      ></Animated.FlatList>
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
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    shadowColor: "#000",
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
