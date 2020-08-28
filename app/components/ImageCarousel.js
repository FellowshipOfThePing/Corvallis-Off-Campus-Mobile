import React, { useRef, useEffect, useState, useContext } from "react";
import { View, StyleSheet, FlatList, Dimensions, Animated } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import CarouselImageContainer from "./CarouselImageContainer";
import AppText from "./AppText";
import ThemeContext from "../theme/context";
import Constants from "expo-constants";

const width = Dimensions.get("window").width;

function ImageCarousel({ listing, style }) {
  const carouselRef = useRef(null);
  const [index, setIndex] = useState(1);
  const { colors } = useContext(ThemeContext);

  // const opacityAnim = useRef(new Animated.Value(1)).current;

  // const fadeOutArrows = () => {
  //   Animated.timing(opacityAnim, {
  //     duration: 500,
  //     toValue: 0,
  //     delay: 2000,
  //   }).start();
  // };

  const onScrolled = (e) => {
    let offsetX = e.nativeEvent.targetContentOffset.x;
    let newIndex = offsetX / width + 1;
    if (offsetX >= 0 && newIndex <= listing.images.length) {
      setIndex(newIndex);
    }
  };

  // useEffect(() => {
  //   fadeOutArrows();
  // }, []);

  return (
    <View style={style}>
      <FlatList
        ref={carouselRef}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        onScrollEndDrag={(e) => onScrolled(e)}
        snapToInterval={width}
        snapToAlignment="center"
        decelerationRate="fast"
        disableIntervalMomentum
        scrollEventThrottle={1}
        data={listing.images}
        keyExtractor={(item, index) => index.toString()}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index: index,
        })}
        renderItem={({ item }) => <CarouselImageContainer imageUri={item} />}
        ListEmptyComponent={() => <CarouselImageContainer />}
      />
      <View style={[styles.count, { backgroundColor: colors.fadedBackground }]}>
        <AppText style={{ color: "#fff" }}>
          {index}/{listing.images.length}
        </AppText>
      </View>
      {/* <Animated.View
        style={[
          styles.arrowBox,
          {
            opacity: opacityAnim,
            left: 20,
            backgroundColor: colors.fadedBackground,
          },
        ]}
      >
        <MaterialCommunityIcons name="chevron-left" color="white" size={25} />
      </Animated.View>
      <Animated.View
        style={[
          styles.arrowBox,
          {
            opacity: opacityAnim,
            right: 20,
            backgroundColor: colors.fadedBackground,
          },
        ]}
      >
        <MaterialCommunityIcons name="chevron-right" color="white" size={25} />
      </Animated.View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  count: {
    position: "absolute",
    top: Constants.statusBarHeight + 10,
    left: 20,
    padding: 5,
    borderRadius: 5,
  },
  arrowBox: {
    position: "absolute",
    top: Dimensions.get("window").height * 0.2 - 30,
    padding: 5,
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
  },
});

export default ImageCarousel;
