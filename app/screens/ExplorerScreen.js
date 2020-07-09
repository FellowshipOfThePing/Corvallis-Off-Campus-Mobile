import React, { useEffect } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  Animated,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useTheme } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "reanimated-bottom-sheet";
import Reanimated from "react-native-reanimated";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { markers, mapDarkStyle, mapStandardStyle } from "../model/mapData";
import Card from "../components/Card";
import CardBottomSheet from "../components/CardBottomSheet";
import AppleMusic from "../components/AppleMusic";



const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 300;
const CARD_WIDTH = width * 0.9;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;



const ExplorerScreen = () => {
  const theme = useTheme();

  const initialMapState = {
    markers,
    region: {
      latitude: 44.5647,
      longitude: -123.28225,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };

  const [state, setState] = React.useState(initialMapState);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= state.markers.length) {
        index = state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { latitude, longitude } = state.markers[index];
          _map.current.animateToRegion(
            {
              ...{ latitude, longitude },
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  });

  const interpolations = state.markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.getNode().scrollTo({ x: x, y: 0, animated: true });
  };

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        initialRegion={state.region}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        customMapStyle={theme.dark ? mapDarkStyle : mapStandardStyle}
      >
        {state.markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <MapView.Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              onPress={(e) => onMarkerPress(e)}
            >
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require("../../assets/map_marker.png")}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </MapView.Marker>
          );
        })}
      </MapView>
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        pagingEnabled
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
        }}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                x: mapAnimation,
              },
            },
          },
        ])}
      >
        {state.markers.map((marker, index) => (
          <View style={styles.card} key={index}>
            <CardBottomSheet listing={marker} />
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 2,
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH
  },
  container: {
    flex: 1,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: "absolute",
    top: Platform.OS === "ios" ? 45 : 35,
    paddingHorizontal: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  marker: {
    width: 30,
    height: 30,
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
});

export default ExplorerScreen;
