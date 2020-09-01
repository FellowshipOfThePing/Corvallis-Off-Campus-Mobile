import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

import AppText from "../components/AppText";
import IconRow from "../components/IconRow";
import ActivityIndicator from "../components/ActivityIndicator";

class MapCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.defaultImage = require("../../assets/placeholder.jpg");
    this.imageUri =
      this.props.listing.images.length > 0
        ? this.props.listing.images[0]
        : null;
    this.state = {
      loading: true,
    };
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View
          style={[
            styles.card,
            {
              backgroundColor: this.props.colors.mapCardBackground,
              shadowColor: this.props.colors.black,
            },
            this.props.style,
          ]}
        >
          <View style={styles.imageContainer}>
            <Image
              source={
                this.imageUri
                  ? { uri: this.imageUri, cache: "default" }
                  : this.defaultImage
              }
              style={styles.image}
              onLoadStart={() => {
                this.setState({
                  loading: true,
                });
              }}
              onLoadEnd={() => {
                this.setState({
                  loading: false,
                });
              }}
            />
            <ActivityIndicator visible={this.state.loading} />
          </View>
          <View style={styles.topRow}>
            <AppText style={[styles.price, { color: this.props.colors.black }]}>
              ${this.props.listing.price_high}/mo
            </AppText>
            <IconRow
              listing={this.props.listing}
              size={15}
              style={styles.iconRow}
              colors={this.props.colors}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    elevation: 2,
    shadowRadius: 5,
    shadowOpacity: 0.3,
    overflow: "hidden",
    borderRadius: 15,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 7,
  },
  price: {
    flex: 1,
    fontSize: 25,
    fontWeight: "bold",
  },
  iconRow: {
    marginVertical: 10,
    paddingTop: 5,
  },
  image: {
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "75%",
    width: "100%",
  },
  indicator: {
    position: "absolute",
  },
});

export default React.memo(MapCard);
