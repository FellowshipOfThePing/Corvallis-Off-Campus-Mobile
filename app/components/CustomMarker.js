import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";

import { Marker } from "react-native-maps";

class HouseMarker extends React.PureComponent {
  componentDidUpdate() {
    console.log(this.props.selected);
  }

  render() {
    return (
      <Marker coordinate={this.props.coordinate} onPress={this.props.onPress}>
        <View
          style={[
            styles.dot,
            this.props.selected
              ? { backgroundColor: "yellow" }
              : { backgroundColor: "green" },
          ]}
        />
      </Marker>
    );
  }
}

const styles = StyleSheet.create({
  dot: {
    height: 25,
    width: 25,
    borderRadius: 12.5,
    // backgroundColor: "green",
  },
});

export default HouseMarker;
