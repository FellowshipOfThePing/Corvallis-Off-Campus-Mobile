import React, { useState } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import ActivityIndicator from "./ActivityIndicator";

function CarouselImageContainer({ imageUri }) {
  const [loading, setLoading] = useState(false);
  const defaultImage = "../../assets/placeholder.jpg";

  return (
    <View style={styles.container}>
      <Image
        source={
          imageUri ? { uri: imageUri, cache: "default" } : require(defaultImage)
        }
        style={styles.image}
        onLoadStart={() => {
          setLoading(true);
        }}
        onLoadEnd={() => {
          setLoading(false);
        }}
      />
      {loading && <ActivityIndicator visible={loading} />}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: "100%",
    width: "100%",
  },
  container: {
    height: "100%",
    width: Dimensions.get("window").width,
  },
});

export default React.memo(CarouselImageContainer);
