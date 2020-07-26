import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import { Marker } from "react-native-maps";

class HouseMarker extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selected: this.props.selected,
    };
  }

  render() {
    const { coordinate, onPress } = this.props;
    return (
      <Marker
        tracksViewChanges={this.props.tracksViewChanges}
        coordinate={coordinate}
        onPress={onPress}
      >
        <TouchableOpacity>
          <View style={[styles.dot]} />
        </TouchableOpacity>
      </Marker>
    );
  }
}

const styles = StyleSheet.create({
  dot: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: "green",
  },
});

export default HouseMarker;
