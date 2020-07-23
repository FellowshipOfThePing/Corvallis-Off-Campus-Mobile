import React, { useEffect, useRef, useState } from "react";
import { Animated, View, StyleSheet, FlatList, Dimensions } from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  MapViewAnimated,
} from "react-native-maps";

import useApi from "../hooks/useApi";
import listingsApi from "../api/listings";
import MapCard from "../components/MapCard";
import colors from "../config/colors";

function MapScreen({ navigation }) {
  const getListingsApi = useApi(listingsApi.getListings);
  const mapRef = useRef(null);
  const flatListRef = useRef(null);
  const [markerPressed, setMarkerPressed] = useState(false);
  let mapAnimation = new Animated.Value(0);
  let mapIndex = 0;
  const listing_data = getListingsApi.data.map((marker) => {
    return marker;
  });

  const { width, height } = Dimensions.get("window");
  const CARD_HEIGHT = 220;
  const CARD_WIDTH = width * 0.9;
  const SPACING_FOR_CARD_INSET = width * 0.05;

  const state = {
    region: {
      latitude: 44.583599,
      longitude: -123.272191,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };

  useEffect(() => {
    getListingsApi.request();
  }, []);

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
            mapIndex = index;
            mapRef.current.animateToRegion(
              {
                latitude: listing_data[index].latitude,
                longitude: listing_data[index].longitude,
                latitudeDelta: state.region.latitudeDelta,
                longitudeDelta: state.region.longitudeDelta,
              },
              350
            );
          }
        }, 10);
      }
    });
  });

  const onMarkerPress = (index) => {
    const markerID = index;
    console.log("\nMarkerID: " + markerID);

    let offset = markerID * width;

    if (mapIndex !== markerID) {
      mapIndex = markerID;
    }

    console.log("Current Object Price: " + listing_data[markerID].price_high);
    console.log("Current Object Beds: " + listing_data[markerID].beds);
    console.log("Current Object Baths: " + listing_data[markerID].baths);

    mapRef.current.animateToRegion(
      {
        latitude: listing_data[markerID].latitude,
        longitude: listing_data[markerID].longitude,
        latitudeDelta: state.region.latitudeDelta,
        longitudeDelta: state.region.longitudeDelta,
      },
      350
    );

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
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        initialRegion={state.region}
      >
        {listing_data.map((marker, index) => {
          return (
            <Marker
              key={index}
              tracksViewChanges={false}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              onPress={() => onMarkerPress(index)}
            >
              <View style={styles.dot} />
            </Marker>
          );
        })}
      </MapView>
      <Animated.FlatList
        ref={flatListRef}
        data={listing_data}
        horizontal
        pagingEnabled
        removeClippedSubviews={false}
        scrollEventThrottle={1}
        style={styles.flatList}
        snapToInterval={width}
        snapToAlignment="center"
        decelerationRate={0.9}
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
  dot: {
    height: 25,
    width: 25,
    backgroundColor: "green",
  },
  flatList: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
});

export default MapScreen;
