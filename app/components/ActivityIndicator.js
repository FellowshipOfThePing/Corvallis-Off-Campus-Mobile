import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";

class ActivityIndicator extends React.Component {
  constructor() {
    super();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.visible !== nextProps.visible;
  }

  render() {
    const { visible, style } = this.props;
    if (visible) {
      return (
        <View style={[styles.overlay, style]}>
          <LottieView
            autoPlay
            loop
            source={require("../../assets/animations/timer.json")}
          />
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 1,
    opacity: 0.8,
  },
});

export default ActivityIndicator;
