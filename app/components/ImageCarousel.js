import React, { useRef, useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Dimensions, Animated } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import CarouselImageContainer from "./CarouselImageContainer";
import AppText from "./AppText";
import colors from "../config/colors";

const width = Dimensions.get("window").width;

function ImageCarousel({ listing, style }) {
  const carouselRef = useRef(null);
  const [index, setIndex] = useState(1);

  const opacityAnim = useRef(new Animated.Value(1)).current;

  const fadeOutArrows = () => {
    Animated.timing(opacityAnim, {
      duration: 500,
      toValue: 0,
      delay: 2000,
    }).start();
  };

  const onScrolled = (e) => {
    let offsetX = e.nativeEvent.targetContentOffset.x;
    let newIndex = offsetX / width + 1;
    if (offsetX >= 0 && newIndex <= listing.images.length) {
      setIndex(newIndex);
    }
  };

  useEffect(() => {
    fadeOutArrows();
  }, []);

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
        keyExtractor={(item) => item.toString()}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index: index,
        })}
        renderItem={({ item }) => <CarouselImageContainer imageUri={item} />}
        ListEmptyComponent={() => <CarouselImageContainer />}
      />
      <View style={styles.count}>
        <AppText>
          {index}/{listing.images.length}
        </AppText>
      </View>
      <Animated.View
        style={[styles.arrowBox, { opacity: opacityAnim, left: 20 }]}
      >
        <MaterialCommunityIcons
          name="chevron-left"
          color={colors.light}
          size={25}
        />
      </Animated.View>
      <Animated.View
        style={[styles.arrowBox, { opacity: opacityAnim, right: 20 }]}
      >
        <MaterialCommunityIcons
          name="chevron-right"
          color={colors.light}
          size={25}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  count: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    top: 50,
    left: 20,
    padding: 5,
    borderRadius: 5,
  },
  arrowBox: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    top: Dimensions.get("window").height * 0.2 - 25,
    padding: 5,
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
  },
});

export default ImageCarousel;
