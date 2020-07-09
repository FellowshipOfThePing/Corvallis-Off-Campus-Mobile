import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { BlurView } from "expo-blur";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import AppText from "./AppText";
import colors from "../config/colors";
import IconRow from "./IconRow";
import Heart from "./Heart";

const AnimatedView = Animated.View;
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const snapPoints = [250, 600];

const CardBottomSheet = ({ listing }) => {
  let bottomSheetRef = React.createRef();
  let fall = new Animated.Value(1);

  const animatedHeaderContentOpacity = Animated.interpolate(fall, {
    inputRange: [0.75, 1],
    outputRange: [0, 1],
    extrapolate: Animated.Extrapolate.CLAMP,
  });

  const onContentPress = () => {
    bottomSheetRef.current.snapTo(0);
  };

  const onHeaderPress = () => {
    bottomSheetRef.current.snapTo(1);
  };

  const renderContent = () => {
    const animatedBackgroundOpacity = Animated.sub(
      1,
      animatedHeaderContentOpacity
    );
    const animatedContentOpacity = Animated.interpolate(fall, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Animated.Extrapolate.CLAMP,
    });

    return (
      <TouchableWithoutFeedback
        key={"content-container"}
        onPress={onContentPress}
      >
        <AnimatedView style={[styles.contentContainer]}>
          <AnimatedView
            style={[
              styles.contentBackground,
              { opacity: animatedContentOpacity },
            ]}
          />

          <AnimatedView style={{ opacity: animatedContentOpacity }}>
            <View style={styles.card}>
              <Image source={{ uri: listing.images[0] }} style={styles.image} />
              <View style={styles.topRow}>
                <AppText style={styles.price}>${listing.price_high}/mo</AppText>
                <Heart size={35} onPress={() => console.log("Liked")} />
              </View>
              <IconRow listing={listing} size={15} fullsize style={styles.iconRow} />
            </View>
          </AnimatedView>
        </AnimatedView>
      </TouchableWithoutFeedback>
    );
  };

  const renderHeader = () => {
    const animatedBackgroundOpacity = Animated.sub(
      1,
      animatedHeaderContentOpacity
    );
    return [
      <TouchableWithoutFeedback
        key={"header-container"}
        onPress={onHeaderPress}
      >
        <AnimatedView style={styles.headerContainer}>
          <AnimatedView
            style={[
              styles.headerBackground,
              {
                opacity: animatedBackgroundOpacity,
              },
            ]}
          ></AnimatedView>
          <AnimatedBlurView
            intensity={100}
            tint={"default"}
            style={[
              styles.headerContentContainer,
              {
                opacity: animatedHeaderContentOpacity,
              },
            ]}
          >
            <View style={styles.card}>
              <Image source={{ uri: listing.images[0] }} style={styles.image} />
              <View style={styles.topRow}>
                <AppText style={styles.price}>${listing.price_high}/mo</AppText>
                <IconRow listing={listing} size={15} style={styles.iconRow} />
              </View>
            </View>
            <View style={styles.headerTopBorder} />
          </AnimatedBlurView>
        </AnimatedView>
      </TouchableWithoutFeedback>,
    ];
  };

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        initialSnap={0}
        callbackNode={fall}
        snapPoints={snapPoints}
        renderHeader={renderHeader}
        renderContent={renderContent}
        enabledGestureInteraction={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // Screen
  card: {
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
    width: "100%",
    // backgroundColor: "black"
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0)",
  },
  image: {
    justifyContent: "center",
    height: 200,
    width: "100%",
  },

  // Content
  contentContainer: {
    height: snapPoints[1],
  },

  contentBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#fff",
  },

  // Header
  headerContainer: {
    height: snapPoints[0],
  },

  headerBackground: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
  },

  headerContentContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  headerTopBorder: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    opacity: 0.5,
    height: 0.25,
  },
  iconRow: {
    marginVertical: 10,
    paddingTop: 5,
  },
  listingInfo: {
    justifyContent: "center",
    paddingBottom: 15,
  },
  price: {
    color: colors.black,
    flex: 1,
    fontSize: 25,
    fontWeight: "bold",
    paddingLeft: 5,
  },
  topRow: {
    // backgroundColor: "green",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 7,
  },
});

export default CardBottomSheet;
