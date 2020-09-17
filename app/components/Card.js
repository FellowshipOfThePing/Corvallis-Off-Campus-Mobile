import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

import ActivityIndicator from "./ActivityIndicator";
import AppText from "./AppText";
import IconRow from "./IconRow";
import Heart from "./Heart";

class Card extends React.Component {
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

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.saved !== nextProps.saved ||
      this.props.colors !== nextProps.colors ||
      this.state.loading !== nextState.loading
    );
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View
          style={[styles.card, { backgroundColor: this.props.colors.white }]}
        >
          <View>
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
          <View style={styles.detailContainer}>
            <View style={[styles.topRow]}>
              <AppText
                style={[styles.price, { color: this.props.colors.black }]}
              >
                ${this.props.listing.price_high}/mo
              </AppText>
              <Heart
                colors={this.props.colors}
                saved={this.props.saved}
                onPress={this.props.onPressHeart}
              />
            </View>
            <IconRow
              listing={this.props.listing}
              size={this.props.iconRowSize}
              fullSize
              style={styles.iconRow}
              colors={this.props.colors}
            />
            <AppText style={{ paddingTop: 3 }}>
              {this.props.listing.address}
            </AppText>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
    width: "100%",
    height: 325,
  },
  detailContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  iconRow: {
    marginVertical: 7,
  },
  iconText: {
    marginHorizontal: 10,
  },
  image: {
    alignItems: "center",
    height: 200,
    width: "100%",
  },
  price: {
    fontSize: 25,
    fontWeight: "bold",
    flex: 1,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Card;
