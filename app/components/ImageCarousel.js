import React, { useRef, useState, useContext } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";

import CarouselImageContainer from "./CarouselImageContainer";
import AppText from "./AppText";
import ThemeContext from "../theme/context";
import Constants from "expo-constants";

const width = Dimensions.get("window").width;

function ImageCarousel({ listing, style }) {
  const carouselRef = useRef(null);
  const [index, setIndex] = useState(1);
  const { colors } = useContext(ThemeContext);

  const onScrolled = (e) => {
    let offsetX = e.nativeEvent.targetContentOffset.x;
    let newIndex = offsetX / width + 1;
    if (offsetX >= 0 && newIndex <= listing.images.length) {
      setIndex(newIndex);
    }
  };

  return (
    <View style={style}>
      <FlatList
        ref={carouselRef}
        scrollEnabled={listing.images.length > 1}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        initialNumToRender={5}
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
          {index}/{listing.images.length > 0 ? listing.images.length : "1"}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  count: {
    position: "absolute",
    top: Constants.statusBarHeight,
    left: 20,
    padding: 5,
    borderRadius: 5,
  },
});

export default ImageCarousel;
